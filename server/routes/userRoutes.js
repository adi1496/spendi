const express = require('express');

const authController = require('./../controllers/authController.js');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/logged-client').get(authController.isLoggedClient);


module.exports = router;