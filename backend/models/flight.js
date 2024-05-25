const mongoose = require('mongoose');


const flightSchema = new mongoose.Schema({
  flights: [{
    departure_airport: {
      name: String,
      id: String,
      time: Date
    },
    arrival_airport: {
      name: String,
      id: String,
      time: Date
    },
    duration: Number,
    airplane: String,
    airline: String,
    airline_logo: String
  }],
  carbonEmission: {
    this_flight: Number
  },
  price: Number,
  currency: String,
  airlineLogo: String,
  seats_available: Number
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = {
  Flight,
  flightSchema
};
