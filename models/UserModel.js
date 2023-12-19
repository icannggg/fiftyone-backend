// models/UserModel.js
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abc1234",
  database: "db",
});

async function createUser(name, email, password, role_id) {
  const [results] = await connection.execute("INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)", [name, email, password, role_id]);
  return results.insertId;
}

async function getUserByEmail(email) {
  const [results] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
  return results[0];
}

module.exports = {
  createUser,
  getUserByEmail,
};
