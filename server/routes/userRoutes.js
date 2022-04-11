const express = require('express');

const authController = require('./../controllers/authController.js');
const userController = require('./../controllers/userController.js');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/logged-client').get(authController.isLoggedClient);


router.use(authController.protect);

router.route('/config-new-account').post(userController.configNewAccount);


module.exports = router;