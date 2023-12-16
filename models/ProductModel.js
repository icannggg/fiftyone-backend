// models/ProductModel.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db',
});

async function createProduct(product_id, product_name, stok, harga, gambar) {
  const [results] = await connection.execute(
    'INSERT INTO products (product_id, product_name, stok, harga, gambar) VALUES (?, ?, ?, ?, ?)',
    [product_id, product_name, stok, harga, gambar]
  );
  return results.insertId;
}

async function getAllProducts() {
  const [results] = await connection.execute('SELECT * FROM products');
  return results;
}

async function getProductById(id) {
  const [results] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return results[0];
}

async function updateProduct(id, data) {
    const { product_id, product_name, stok, harga, gambar } = data;
  
    // Periksa dan atur nilai default jika tidak ditemukan
    const hargaValue = harga !== '' ? harga : null;
    const updateValues = [product_id, product_name, stok, hargaValue, gambar || null, id];
  
    try {
      await connection.execute(
        'UPDATE products SET product_id = ?, product_name = ?, stok = ?, harga = ?, gambar = ? WHERE id = ?',
        updateValues
      );
    } catch (error) {
      console.error(error);
      throw error; // Lebih baik untuk melemparkan kembali kesalahan untuk ditangani di lapisan yang lebih tinggi
    }
  }
  

async function deleteProduct(id) {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
