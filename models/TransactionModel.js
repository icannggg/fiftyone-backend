// models/TransactionModel.js
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abc1234",
  database: "db",
});

function generateTransactionCode() {
  const timestamp = new Date().getTime();
  const randomComponent = Math.floor(Math.random() * 10); // Adjust as needed for uniqueness
  const transactionCode = `trans${timestamp}${randomComponent}`;

  return transactionCode;
}

async function createTransaction(user_id, product_id, product, amount, price, tot_price) {
  const code_trans = generateTransactionCode(); // Implementasi kode transaksi unik
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

  const [results] = await connection.execute("INSERT INTO transactions (code_trans, user_id, product_id, product, amount, price, tot_price, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
    code_trans,
    user_id,
    product_id,
    product,
    amount,
    price,
    tot_price,
    createdAt,
  ]);
  return results.insertId;
}

async function getTransactionsWithDetails() {
  const [results] = await connection.execute(`
    SELECT transactions.*, products.product_name, users.name
    FROM transactions
    JOIN products ON transactions.product_id = products.id
    JOIN users ON transactions.user_id = users.id
  `);

  return results;
}

module.exports = {
  createTransaction,
  getTransactionsWithDetails,
};
