"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/productRoutes.ts
var productRoutes_exports = {};
__export(productRoutes_exports, {
  productRoutes: () => productRoutes
});
module.exports = __toCommonJS(productRoutes_exports);
var import_express = __toESM(require("express"));

// src/models/Product.ts
var import_mongoose = __toESM(require("mongoose"));
var { Schema } = import_mongoose.default;
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
    },
    image: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);
var Product = import_mongoose.default.model("Product", productSchema);

// src/controllers/productController.ts
var createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
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
    if (!product) {
      res.status(404).json({ error: "Produto n\xE3o encontrado." });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
var deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Produto n\xE3o encontrado." });
    } else {
      res.status(204).end();
    }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productRoutes
});
