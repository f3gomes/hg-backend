import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

export const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);
