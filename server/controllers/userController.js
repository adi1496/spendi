const mongoose = require('mongoose');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');

const User = require('./../models/userModel.js');


// check if user has transactions made for specified year and month
exports.checkUserTransactionsDates = catchAsync(async (id, year, month) => {
    const user = await User.findById(id);

    console.log(user);

    let indexT = null;
    user.transactionsTimeline.forEach((transaction, index) => {
        console.log(typeof transaction.year);
        if(transaction.year === year) indexT= index;
    });

    if(indexT !== null) {
        if(!user.transactionsTimeline[indexT].months.includes(month)){
            user.transactionsTimeline[indexT].months.push(month);
        }
    }else {
        user.transactionsTimeline.push({year: year, months: [month]})
    }

    user.save();
});



// setUp new user account
exports.configNewAccount = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id);
    if(!user) return next(new AppError('The User cannot be find in db', 400));

    user.baseCurrency = req.body.baseCurrency;
    user.configDone = true;

    if(req.body.herotag) user.herotag = req.body.herotag;

    await user.save({runValidators: true});

    console.log(user);

    res.status(200).json({
        status: 'success',
        message: 'The setup of your account is done!'
    })
});