const cors = require("cors");
const express = require("express");
const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/hello", (req, res) => {
  res.json({ message: "Hello API!" });
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
