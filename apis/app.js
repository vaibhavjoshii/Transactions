var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionsRouter = require('./routes/transactions');

mongoose.connect('mongodb://localhost/transactions');

var app = express();

app.use(express.json());
app.use(cors());
app.use('/transactions', transactionsRouter);

module.exports = app;
