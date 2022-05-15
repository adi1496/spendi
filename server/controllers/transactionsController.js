const fs = require('fs');

const mongoose = require('mongoose');

const transactionsSchema = require('./../models/transactionsSchema.js');
const userController = require('./userController.js');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError.js');
const queryOptions = require('./../utils/queryOptions.js');

exports.getOneTransaction = catchAsync(async(req, res, next) => {
    console.log(req.params);
    
    res.status(200).json({
        status: 'success',
    })
});

exports.createNewTransaction = catchAsync(async(req, res, next) => {
    const transaction = {
        type: req.body.type,
        category: req.body.category,
        value: req.body.value,
        description: req.body.description,
        userId: req.user._id
    }

    // if date is format like "2022-03-19"
    transaction.date = new Date(req.body.date);
    // if date is timestamp format like "1649583559962"
    if(isNaN(transaction.date.getDate())) transaction.date = new Date(parseInt(req.body.date));

    if(isNaN(transaction.date.getDate())) return next(new AppError('The date is invalid, please try again', 400));

    const Transaction = mongoose.model(`${req.user._id}`, transactionsSchema);
    const newTransaction = await Transaction.create(transaction);

    console.log(newTransaction);
    // check if user has transactions on this month of the year, if not add to array
    // userController.checkUserTransactionsDates(req.user._id, newTransaction.year, newTransaction.month);
    

    if(!newTransaction) return next(new AppError('Could not insert the transaction', 400));

    res.status(200).json({
        status: 'success',
        newTransaction
    });

});

exports.getTransactions = catchAsync(async(req, res, next) => {
    let query = queryOptions.transactionQuery(req.query);

    const Transaction = mongoose.model(`${req.user._id}`, transactionsSchema);

    console.log(query);
    const transactions = await Transaction.find(query).sort('date');

    // transactions.forEach(async transaction => {
    //     await Transaction.findByIdAndUpdate(transaction._id,{date: new Date(Date.now())});

    // });

    res.status(200).json({
        status: 'success',
        transactionsFound: transactions.length,
        transactions
    });
});