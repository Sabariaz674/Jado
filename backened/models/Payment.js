// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
      
    },
    passenger: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      seatId: String,
      gender: String,
      classType: String,
    },
    flights: [
  {
    airline: String,
    flightCode: String,
    departure: [String],
    departureTime: String,
    arrivalTime: String,
    stop: String,
    duration: String,
    price: Number,
    meal: String,
    baggage: String,
    flighttype: String,
  },
],

    totalPaid: Number,
    stripeSessionId: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
