const fs = require('fs');

const mongoose = require('mongoose');

const transactionsSchema = require('./../models/transactionsSchema.js');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError.js');

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
        date: new Date(parseInt(req.body.date)),
        value: req.body.value,
        description: req.body.description,
        userId: req.user._id
    }

    if(isNaN(transaction.date.getDate())) return next(new AppError('The date is invalid, please try again', 400));

    const Transaction = mongoose.model(`${req.user._id}-${transaction.date.getFullYear()}`, transactionsSchema);
    const newTransaction = await Transaction.create(transaction);

    if(!newTransaction) return next(new AppError('Could not insert the transaction', 400));

    res.status(200).json({
        status: 'success',
        newTransaction
    });

});

exports.getTransactions = catchAsync(async(req, res, next) => {
    
});