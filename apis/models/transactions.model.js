const mongoose = require('mongoose');

const senderSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    IDNumber: { type: String, required: true }
});

const recipientSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bank: { type: String, required: true }
});

const transactionSchema = mongoose.Schema({
    id: { type: String, required: true },
    date: { type: Number, required: true },
    sender: { type: senderSchema, required: true },
    recipient: { type: recipientSchema, required: true },
    Amount: { type: Number, required: true },
    CurrencyCd: { type: String, required: true },
    Comments: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
