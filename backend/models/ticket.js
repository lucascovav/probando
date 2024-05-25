const mongoose = require('mongoose');


const TicketsSchema = new mongoose.Schema({
  email: String,
  total_tickets: Number,
  flight: String,
  status: Boolean
  })

module.exports = {
  TicketModel: mongoose.model('Ticket', TicketsSchema)
}