const ProductModel = require("../models/ProductModel");

async function createProduct(req, res) {
  try {
    const { product_id, product_name, stok, harga, jenis } = req.body;
    const gambar = req.file ? req.file.originalname : null;
    // Generate random code (contoh menggunakan timestamp)
    const timestamp = Date.now();
    // const kode = 0;
    // const newKode = kode + 1;
    // const generateKode = newKode.toString().padStart(3, "0");
    // const randomCode = `V-${generateKode}`;
    const randomCode = `V-${timestamp}`;

    const productId = await ProductModel.createProduct(randomCode, product_name, stok, harga, gambar, jenis);
    res.status(201).json({ id: productId, message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await ProductModel.getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProductByJenis(req, res) {
  const { jenis } = req.params;

  try {
    const products = await ProductModel.getProductByJenis(jenis);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { product_id, product_name, stok, harga } = req.body;
    const gambar = req.file ? req.file.filename : null;

    await ProductModel.updateProduct(id, { product_id, product_name, stok, harga, gambar });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await ProductModel.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByJenis,
  updateProduct,
  deleteProduct,
};
