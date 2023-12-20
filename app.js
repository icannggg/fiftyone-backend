const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const productRoutes = require("./routes/ProductRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");
const userRoutes = require("./routes/UserRoutes");
const reportRoutes = require("./routes/ReportRoutes");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/reports", reportRoutes);
app.use("/transactions", transactionRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
