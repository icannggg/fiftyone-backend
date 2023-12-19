// routes/ProductRoutes.js
const express = require("express");
const multer = require("multer");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Gunakan nama asli file tanpa mengganti
    cb(null, file.originalname);
  },
});

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: storage });

router.post("/", upload.single("gambar"), ProductController.createProduct);
// router.post("/", ProductController.createProduct);
router.get("/product-sayuran", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", upload.single("gambar"), ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

// http://localhost:4000/api/v1/products/product-sayuran

module.exports = router;
