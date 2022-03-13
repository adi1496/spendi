const express = require('express');

const transactionsController = require('./../controllers/transactionsController.js');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(transactionsController.getTransactions)
.post(transactionsController.createNewTransaction);
router.route('/:id').get(transactionsController.getOneTransaction);

module.exports = router;