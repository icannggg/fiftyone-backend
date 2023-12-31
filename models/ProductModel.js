const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abc1234",
  database: "db",
});

async function createProduct(product_id, product_name, stok, harga, gambar, jenis) {
  const [results] = await connection.execute("INSERT INTO products (product_id, product_name, stok, harga, gambar, jenis) VALUES (?, ?, ?, ?, ?, ?)", [
    product_id,
    product_name,
    stok,
    harga,
    gambar,
    jenis,
  ]);
  return results.insertId;
}

async function getAllProducts() {
  const [results] = await connection.execute("SELECT * FROM products");
  return results;
}

async function getProductById(id) {
  const [results] = await connection.execute("SELECT * FROM products WHERE id = ?", [id]);
  return results[0];
}

async function getProductByJenis(jenis) {
  const [results] = await connection.execute("SELECT * FROM products WHERE jenis = ?", [jenis]);
  return results;
}

async function updateProduct(id, data) {
  const { product_name, stok, harga, gambar, jenis } = data;

  const hargaValue = harga !== "" ? harga : null;
  const updateValues = [product_name, stok, hargaValue, gambar, jenis || null, id];

  try {
    await connection.execute("UPDATE products SET product_name = ?, stok = ?, harga = ?, gambar = ?, jenis = ? WHERE id = ?", updateValues);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteProduct(id) {
  await connection.execute("DELETE FROM products WHERE id = ?", [id]);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByJenis,
  updateProduct,
  deleteProduct,
};
