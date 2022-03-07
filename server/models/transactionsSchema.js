const mongoose = require('mongoose');

const monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const  transactionsSchema = new mongoose.Schema({
    type: {
        required: [true, 'A transaction must be of a type'],
        type: String,
        enum: ['income', 'expense', 'invest']
    },
    category: {
        type: String,
        required: [true, 'The transaction must belong to a category'],
        trim: true
    },
    month: {
        type: Number,
    },
    monthName: {
        type: String,
    },
    value: {
        type: Number,
        required: [true, 'A transaction must have a value'],
        min: 0,
    },
    percent: {
        type: Number,
        min: 0
    },
    date: {
        type: Date,
        required: [true,'A transaction must have a date when it was made']
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

transactionsSchema.pre('save', function(next) {
    if(!this.isModified('date')) return next();

    const month = this.date.getMonth();
    this.monthName = monthsNames[month];
    this.month = month + 1;

    next();
});


module.exports = transactionsSchema;