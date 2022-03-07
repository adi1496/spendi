const express = require('express');

const authController = require('./../controllers/authController.js');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);


module.exports = router;