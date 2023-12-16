// routes/TransactionRoutes.js
const express = require('express');
const TransactionController = require('../controllers/TransactionController');

const router = express.Router();

router.post('/', TransactionController.createTransaction);
router.get('/details', TransactionController.getTransactionsWithDetails);

module.exports = router;
