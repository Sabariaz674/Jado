const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  logo: String,            // '/uploads/filename.ext'
  flightCode: String,
  departure: String,       // "7:00 AM - 4:15 PM"
  departureTime: String,
  arrivalTime: String,
  stop: String,            // "0", "1", ...
  duration: String,
  price: Number,
  type: String,
  baggage: String,
  meal: String,            // "No Meal" | "1 Meal" | "2 Meals"
  lax: String,             // from airport
  laf: String              // to airport
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
