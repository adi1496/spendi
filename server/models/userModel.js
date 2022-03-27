const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validators = require('./../utils/validators.js');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name'],
        maxlength: [50, 'First name should be maximun 50 chars'],
        minlength: [2, 'First name should be minimum 50 chars'],
        trim: true
    },

    lastName: {
        type: String,
        required: [true, 'Please provide your last name'],
        maxlength: [50, 'Last name should be maximun 50 chars'],
        minlength: [2, 'Last name should be minimum 50 chars'],
        trim: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: {
            validator: function(currentEmail){
                return validators.validateEmail(currentEmail);
            },
            message: "This not a valid e-mail"
        }
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'The password should be minimum 8 characters'],
        select: false
    },

    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        },
        select: false
    },
    accountType: {
        type: String,
        enum: ['solo', 'family'],
        default: 'solo'
    },

    transactionsMade: [{
        year: {
            yearNo: Number,
            months: [{
                type: Number,
                min: 1,
                max: 12
            }]
        }
    }],

    photo: String,

    userRole: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    active: {
        type: Boolean,
        default: true
    },

    activateAccount: String,

    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordChangedAt: {
        type: Date,
        select: false,
        default: undefined
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    this.passwordChangedAt = Date.now() - 1000;

    next();
});

userSchema.methods.comparePasswords = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.checkPasswordChangedAfter = function(jwtIssued) {
    return this.passwordChangedAt < jwtIssued * 1000;
}

const User = mongoose.model('User',userSchema);

module.exports = User;