const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  logo: String,
  flightCode: String,
  departure: [String], // Corrected: This field can now hold an array of strings
  departureTime: String,
  arrivalTime: String,
  stop: String,
  duration: String,
  price: Number,
  type: String,
  baggage: String,
  meal: String,
  lax: String,
  laf: String
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);