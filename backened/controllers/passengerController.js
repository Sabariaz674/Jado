const mongoose = require('mongoose');
const Passenger = require('../models/Passenger');
const User = require('../models/User');
const isValidObjectId = (v) => mongoose.Types.ObjectId.isValid(String(v || ''));

exports.createPassenger = async (req, res) => {
  try {
    const {
      firstName, lastName, gender, dob, email, phone,
      ecFirst, ecLast, ecEmail, ecPhone, sameAsP1,
      flightId, seatId,

      // User identification data (either ObjectId or guest UUID)
      userId: rawUserId,   
      userEmail,           
    } = req.body;

    if (!firstName || !lastName || !gender || !flightId || !seatId) {
      return res.status(400).json({ message: 'firstName, lastName, gender, flightId, seatId are required' });
    }

   
    let resolvedUserId = null;
    if (isValidObjectId(rawUserId)) {
      resolvedUserId = new mongoose.Types.ObjectId(rawUserId);
    } else if (userEmail) {
      
      const user = await User.findOne({ email: userEmail.toLowerCase() }).select('_id').lean();
      if (user) resolvedUserId = user._id;
    }

    const guestId = resolvedUserId ? null : (rawUserId || userEmail || null);

    const passenger = new Passenger({
      firstName, lastName, gender, dob, email, phone,
      ecFirst, ecLast, ecEmail, ecPhone, sameAsP1,
      flightId, seatId,
      userId: resolvedUserId,
      guestId,
    });
    
    await passenger.save();
    res.status(201).json({ ok: true, id: passenger._id });

  } catch (error) {
    console.error('Error creating passenger:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
