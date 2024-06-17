const { mongoose } = require('mongoose');
const transactionModel = require('../models/transactions.model');

async function getTransactionsList() {
    try {
        const transactionsLists = await transactionModel.find();
        return { status: 200, recordCount: transactionsLists.length, lists: transactionsLists };
    } catch (err) {
        console.log("Error!");
        throw { status: 500, message: 'Failed to get list of transactions!' };
    }
}

async function addTransaction(transactionObj) {
    try {
        const result = await transactionObj.save();
        return {status: 200, message: 'Successfully saved new transaction.', transactionDetails: result};
    } catch (err) {
        throw {status: 500, message: 'Failed to add new transaction!'};
    }
}

async function updateTransaction(id, transactionObj) {
    try {
        // const result = await transactionModel.findByIdAndUpdate(id, transactionObj);
        const result = await transactionModel.findOneAndUpdate(
            { _id: id }, // Custom filter condition
            { $set: transactionObj, $unset: { _id: 1 } }, // Update fields excluding _id
            { new: true, runValidators: true }
        );
        
        return {status: 200, message: 'Successfully updated the transaction.', transactionDetails: result};
    } catch (err) {
        console.log(err);
        throw {status: 500, message: 'Failed to update transaction details!'};
    }
}

async function deleteTransaction(id) {
    try {
        const result = await transactionModel.findByIdAndDelete(id);
        return {status: 200, message: 'Successfully deleted the transaction.', transactionDetails: result};
    } catch (err) {
        throw {status: 500, message: 'Failed to deelte transaction!'};
    }
}

module.exports = {
    getTransactionsList, addTransaction, updateTransaction, deleteTransaction
};