// routes/ProductRoutes.js
const express = require('express');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('gambar'), ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', upload.single('gambar'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
