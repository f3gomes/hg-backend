"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));

// src/config/database.ts
var import_dotenv = __toESM(require("dotenv"));
var import_mongoose = __toESM(require("mongoose"));
import_dotenv.default.config();
var main = async () => {
  try {
    import_mongoose.default.set("strictQuery", true);
    await import_mongoose.default.connect(process.env.DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(`Connect Error: ${error}`);
  }
};

// src/routes/productRoutes.ts
var import_express = __toESM(require("express"));

// src/models/Product.ts
var import_mongoose2 = __toESM(require("mongoose"));
var { Schema } = import_mongoose2.default;
var productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    grade: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
var Product = import_mongoose2.default.model("Product", productSchema);

// src/controllers/productController.ts
var createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
var getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
var updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
var deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// src/routes/productRoutes.ts
var productRoutes = import_express.default.Router();
productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

// src/app.ts
var app = (0, import_express2.default)();
var PORT = process.env.PORT || 9e3;
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
main();
app.use("/hello", (_req, res) => {
  res.json({ message: "Hello API!" });
});
app.use("/products", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
