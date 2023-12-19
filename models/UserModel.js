const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "db",
});

async function createUser(name, email, password, role_id) {
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

  const [results] = await connection.execute("INSERT INTO users (name, email, password, role_id, createdAt) VALUES (?, ?, ?, ?, ?)", [name, email, password, role_id, createdAt]);
  return results.insertId;
}

async function getAllUsers() {
  const [results] = await connection.execute("SELECT email , name, createdAt FROM users where role_id = 2");
  return results;
}

async function getUserByEmail(email) {
  const [results] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
  return results[0];
}

async function deleteUser(id) {
  await connection.execute("DELETE FROM users WHERE id = ?", [id]);
}

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  deleteUser,
};
