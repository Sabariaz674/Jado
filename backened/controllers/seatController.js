const mongoose = require('mongoose');
const Seat = require('../models/Seat');
const User = require('../models/User');
const isValidObjectId = (v) => mongoose.Types.ObjectId.isValid(String(v || ''));
exports.listByFlight = async (req, res) => {
  try {
    const { flightId } = req.params;
    const { excludeUserId } = req.query;
    const query = { flightId };

    if (excludeUserId) {
      const excludeIds = [];
      
      if (isValidObjectId(excludeUserId)) {
        excludeIds.push({ userId: new mongoose.Types.ObjectId(excludeUserId) });
      } else {
        const user = await User.findOne({ email: excludeUserId.toLowerCase() }).select('_id');
        if (user) excludeIds.push({ userId: user._id });
        excludeIds.push({ guestId: excludeUserId });
      }
      query.$nor = excludeIds;
    }
    const seats = await Seat.find(query)
      .select('seatId reservedByGender userId guestId -_id')
      .lean();

    res.json(seats);
  } catch (e) {
    console.error('Error in listing seats:', e);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getOne = async (req, res) => {
  try {
    const { flightId, seatId } = req.params;
    const { userId } = req.query;

    const seat = await Seat.findOne({ flightId, seatId })
      .select('seatId reservedByGender userId guestId -_id')
      .lean();

    if (!seat) return res.json({ available: true });
    let isMine = false;
    if (userId) {
      isMine = String(seat.userId || '') === String(userId) || String(seat.guestId || '') === String(userId);

      if (!isMine && !isValidObjectId(userId)) {
        const user = await User.findOne({ email: userId.toLowerCase() }).select('_id').lean();
        if (user) isMine = String(seat.userId || '') === String(user._id);
      }
    }

    res.json({ available: false, reservedByGender: seat.reservedByGender, isMine });
  } catch (e) {
    console.error('Error in getting seat:', e);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.reserve = async (req, res) => {
  try {
    const { flightId, seatId, gender, klass = 'economy', userId = null, userEmail = null } = req.body;
    if (!flightId || !seatId || !gender) {
      return res.status(400).json({ message: 'flightId, seatId, gender are required' });
    }
    let resolvedUserId = null;
    if (isValidObjectId(userId)) {
      resolvedUserId = new mongoose.Types.ObjectId(userId);
    } else if (userEmail) {
      const user = await User.findOne({ email: userEmail.toLowerCase() }).select('_id').lean();
      if (user) resolvedUserId = user._id;
    }
    const guestId = resolvedUserId ? null : (userId || userEmail || null);

    // Check if the seat is already reserved
    const existingSeat = await Seat.findOne({ flightId, seatId });
    if (existingSeat) {
      const isSame = (resolvedUserId && String(existingSeat.userId) === String(resolvedUserId)) ||
                    (guestId && String(existingSeat.guestId) === String(guestId));

      if (isSame) {
        return res.status(200).json({ ok: true, seat: { seatId: existingSeat.seatId, reservedByGender: existingSeat.reservedByGender } });
      }

      return res.status(409).json({ message: 'Seat already reserved', reservedByGender: existingSeat.reservedByGender });
    }

    // Create and save the new reservation
    const newSeat = await Seat.create({
      flightId, seatId, class: klass, reservedByGender: gender,
      userId: resolvedUserId, guestId,
    });

    res.status(201).json({ ok: true, seat: { seatId: newSeat.seatId, reservedByGender: newSeat.reservedByGender } });
  } catch (e) {
    console.error('Error in reserving seat:', e);
    res.status(500).json({ message: 'Server error' });
  }
};

// Release a seat reservation
exports.release = async (req, res) => {
  try {
    const { flightId, seatId, userId } = req.body;
    if (!flightId || !seatId || !userId) {
      return res.status(400).json({ message: 'flightId, seatId, userId required' });
    }

    // Resolve userId or guestId for deletion check
    const orConditions = [];
    if (isValidObjectId(userId)) {
      orConditions.push({ userId: new mongoose.Types.ObjectId(userId) });
    } else {
      const user = await User.findOne({ email: userId.toLowerCase() }).select('_id').lean();
      if (user) orConditions.push({ userId: user._id });
      orConditions.push({ guestId: userId });
    }

    // Delete the seat reservation
    const result = await Seat.deleteOne({ flightId, seatId, $or: orConditions });
    res.json({ ok: true, deleted: result.deletedCount || 0 });
  } catch (e) {
    console.error('Error in releasing seat:', e);
    res.status(500).json({ message: 'Server error' });
  }
};
