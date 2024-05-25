const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    email: String,
    token: String,
    amount: Number,
    status: String,
    flightId: String
});

module.exports = {
    TransactionModel: mongoose.model('Transaction', TransactionSchema)
}
