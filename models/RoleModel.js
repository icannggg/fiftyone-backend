const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "db",
});

async function getRoleById(id) {
  const [results] = await connection.execute("SELECT * FROM roles WHERE id = ?", [id]);
  return results[0];
}

module.exports = {
  getRoleById,
};
