// backend/models/Passenger.js
const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    gender:    { type: String, enum: ['male', 'female'], required: true },
    dob:       { type: String },
    email:     { type: String },
    phone:     { type: String },
    ecFirst:   { type: String },
    ecLast:    { type: String },
    ecEmail:   { type: String },
    ecPhone:   { type: String },
    sameAsP1:  { type: Boolean, default: false },
    flightId:  { type: String, required: true }, 
    seatId:    { type: String, required: true }, 
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestId: { type: String, default: null },
  },
  { timestamps: true }
);

passengerSchema.index({ flightId: 1, seatId: 1, userId: 1 });

module.exports = mongoose.model('Passenger', passengerSchema);
