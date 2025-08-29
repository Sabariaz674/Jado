const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema(
  {
    flightId: { type: String, required: true, index: true }, // e.g. ASDKF233
    seatId:   { type: String, required: true },              // e.g. 6D
    class:    { type: String, enum: ['economy', 'business'], default: 'economy' },
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestId: { type: String, default: null },
    reservedByGender: { type: String, enum: ['male', 'female'], required: true },
    reservedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
SeatSchema.index({ flightId: 1, seatId: 1 }, { unique: true });

module.exports = mongoose.model('Seat', SeatSchema);
