const jwt = require('jsonwebtoken');

const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError');

const User = require('./../models/userModel.js');

exports.signUp = catchAsync(async (req, res, next) => {
    // assign only data that is needed from the body
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    if(req.body.accountType) user.accountType = req.body.accountType;

    const newUser = await User.create(user);

    if(!newUser) return next(new AppError('The user was not created, please try again later', 500));
    


    newUser.password = undefined;
    newUser.passwordChangedAt = undefined;
    res.status(200).json({
        status: 'success',
        message: 'The user has been created!'
    });
});

exports.login = catchAsync(async(req, res, next) => {
    if(!req.body.email) return next(new AppError('The email is required in order to login'));
    if(!req.body.password) return next(new AppError('The password is required in order to login'));

    console.log(req.body);
    const user = await User.findOne({email: req.body.email}).select('+password');
    if(!user) return next(new AppError('Email or password incorect', 400));

    if(user.active === false) return next(new AppError('This user is not active', 400));

    if(!await user.comparePasswords(req.body.password)) return next(new AppError('User or password incorect', 400));

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});

    res.status(200).json({
        status: 'success',
        token
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    if(!req.headers.authorization) return next(new AppError('You are not logged in!', 401));

    let token;
    if(req.headers.authorization.startsWith('Bearer ')) token = req.headers.authorization.split('Bearer ')[1];

    if(!token) return next(new AppError('You are not logged in!', 401));

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if(!decodedToken) return next(new AppError('You are not logged in!', 401));

    //check if jwt token expired
    if(decodedToken.exp * 1000 < Date.now()) return next(new AppError('The login token expired, please login again!', 401));

    const user = await User.findById(decodedToken.id).select('+passwordChangedAt');

    if(!user) return next(new AppError('You are not logged in!', 401));

    //check if the password was not changed after jwt was issued
    if(!user.checkPasswordChangedAfter(decodedToken.iat)) return next(new AppError('The password was changed, please login again', 401));

    user.passwordChangedAt = undefined;
    req.user = user;
    next();
});


exports.isLoggedClient = catchAsync(async (req, res, next) => {
    if(!req.headers.authorization) return next(new AppError('You are not logged in!', 401));

    let token;
    if(req.headers.authorization.startsWith('Bearer ')) token = req.headers.authorization.split('Bearer ')[1];

    if(!token) return next(new AppError('You are not logged in!', 401));

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if(!decodedToken) return next(new AppError('You are not logged in!', 401));

    //check if jwt token expired
    if(decodedToken.exp * 1000 < Date.now()) return next(new AppError('The login token expired, please login again!', 401));

    const user = await User.findById(decodedToken.id).select('+passwordChangedAt');

    if(!user) return next(new AppError('You are not logged in!', 401));

    //check if the password was not changed after jwt was issued
    if(!user.checkPasswordChangedAfter(decodedToken.iat)) return next(new AppError('The password was changed, please login again', 401));

    user.passwordChangedAt = undefined;
    // req.user = user;
    res.status(200).json ({
        status: 'success',
        user
    });
});

exports.resetPassword = (req, res, next) => {
    
}
