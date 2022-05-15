const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validators = require('./../utils/validators.js');

const transactionYearsSchema = new mongoose.Schema({
    year: Number,
    months: [{
        type: Number,
        min: 1,
        max: 12
    }]
});

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
        unique: [true, 'There is an account asociated with this email'],
        validate: {
            validator: function(currentEmail){
                return validators.validateEmail(currentEmail);
            },
            message: "This not a valid e-mail"
        }
    },

    herotag: {
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, 'This herotag already exists!'],
        minlength: [2, "The herotag musht have at least 2 characters"],
        validate: {
            validator: function(el) {
                return el.startsWith('@');
            },
            message: 'The herotag must begin with @'
        }
    },

    temporaryHerotag: {
        type: Boolean,
        default: true,
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

    emailVerified: {
        type: Boolean,
        default: false
    },
    
    accountType: {
        type: String,
        enum: ['solo', 'family'],
        default: 'solo'
    },

    baseCurrency: {
        type: String,
        enum: ['$', 'RON', '€', '£']
    },

    transactionsTimeline: [
        {
            type: String
        }
    ],

    photo: String,

    userRole: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    configDone: {
        type: Boolean,
        default: false
    },

    active: {
        type: Boolean,
        default: true
    },

    accountCreatedAt: Date,

    activateAccount: String,

    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordChangedAt: {
        type: Date,
        select: false,
        default: undefined
    }
});


// if user is new
userSchema.pre('save', function(next) {
    if(this.isNew){
        this.accountCreatedAt = new Date(Date.now());

        this.transactionsTimeline.push(`${this.accountCreatedAt.getMonth() + 1}
                                        -${this.accountCreatedAt.getFullYear()}`);
    }

    next();
})


// if password is modified
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    this.passwordChangedAt = Date.now() - 1000;

    next();
});

// if the user is new create a temporary herotag
userSchema.pre('save', function(next) {
    if(this.isNew === false) return next();
    this.herotag = `@${this.firstName}${Date.now()}`;
    next();
});

userSchema.methods.comparePasswords = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.checkPasswordChangedAfter = function(jwtIssued) {
    return this.passwordChangedAt < jwtIssued * 1000;
}

userSchema.methods.checkAndUpdateUserTransactionsDates = function(monthYear) {
    return this.transactionsTimeline.includes(monthYear);
}

const User = mongoose.model('User',userSchema);

module.exports = User;