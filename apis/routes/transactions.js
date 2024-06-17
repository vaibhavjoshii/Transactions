var express = require('express');
var router = express.Router();
const transactionModel = require('../models/transactions.model');
const transactionService = require('../services/transactions.service');

/* Get all transactions. */
router.get('/list', async function(req, res, next) {
    try {
        const result = await transactionService.getTransactionsList();
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

/* Create new transaction. */
router.post('/add', async function(req, res, next) {
    try {
        const transaction = new transactionModel(req.body);
        const result = await transactionService.addTransaction(transaction);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

/* Update existing transaction. */
router.put('/update/:id', async function(req, res, next) {
    try {
        const transaction = transactionModel(req.body);
        const result = await transactionService.updateTransaction(req.params.id, transaction);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

/* Delete transaction. */
router.delete('/delete/:id', async function(req, res, next) {
    try {
        const result = await transactionService.deleteTransaction(req.params.id);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
