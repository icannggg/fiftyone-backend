// controllers/TransactionController.js
const TransactionModel = require('../models/TransactionModel');

async function createTransaction(req, res) {
  try {
    const { user_id, product_id, product, amount, price, tot_price} = req.body;
    console.log(user_id, product_id, product, amount, price, tot_price);
    // Validasi data (sesuaikan dengan kebutuhan)
    if (!user_id || !product_id || !product || !amount || !price || !tot_price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const transactionId = await TransactionModel.createTransaction(user_id, product_id, product, amount, price, tot_price);
    res.status(201).json({ id: transactionId, message: 'Transaction created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getTransactionsWithDetails(req, res) {
  try {
    const transactions = await TransactionModel.getTransactionsWithDetails();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createTransaction,
  getTransactionsWithDetails,
};
