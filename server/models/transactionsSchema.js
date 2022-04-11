const mongoose = require('mongoose');

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
    year: {
        type: Number
    },
    value: {
        type: Number,
        required: [true, 'A transaction must have a value'],
        min: 0,
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

// if date is Modified get month, monthName, year
transactionsSchema.pre('save', function(next) {
    const monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if(!this.isModified('date')) return next();

    const month = this.date.getMonth();
    this.monthName = monthsNames[month];
    this.month = month + 1;
    this.year = this.date.getFullYear();

    next();
});


module.exports = transactionsSchema;