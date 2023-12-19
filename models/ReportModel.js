const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abc1234",
  database: "db",
});

async function getReports() {
  const [results] = await connection.execute(
    "SELECT transactions.code_trans, users.name, transactions.tot_price, transactions.createdAt FROM transactions JOIN users ON transactions.user_id = users.id"
  );
  return results;
}

module.exports = {
  getReports,
};
