import { Product } from "../models/product.js";

export async function cProduct(req, res) {
  try {
    const { name, stock, price, category } = req.body;
    const product = new Product({ name, stock, price, category });

    await product.save();

    res.status(201).json({
      msg: "Product created successfully",
      ok: true,
      product: product,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Invalid product data",
        ok: false,
        errors: Object.values(error.errors).map(({ path, message }) => ({ path, message })),
      });
    }

    console.error("Error creating product:", error);

    return res.status(500).json({
      msg: "Error creating new product",
      ok: false
    });
  }
}

export async function gProduct(req, res) {
  try {
    const { category } = req.query;
    const filter = {};

    if (typeof category === "string" && category.trim()) {
      filter.category = category.trim();
    }

    const products = await Product.find({
      ...filter,
      name: { $exists: true, $ne: "" },
      price: { $type: "number" },
      stock: { $type: "number" },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      msg: "Products retrieved successfully",
      ok: true,
      products,
    });
  } catch (error) {
    console.error("Error getting products:", error);

    return res.status(500).json({
      msg: "Error getting products",
      ok: false
    });
  }
}

export async function dProduct(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      msg: "Invalid ID",
      ok: false
    });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found", ok: false });
    }

    return res.status(200).json({
      msg: "Product deleted successfully",
      ok: true
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(400).json({ msg: "Invalid product ID", ok: false });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, stock, price, category } = req.body;
    const newProduct = await Product.findByIdAndUpdate(
      id,
      { name, stock, price, category },
      { new: true, runValidators: true }
    );

    if (!newProduct) {
      return res.status(404).json({ msg: "Product not found", ok: false });
    }

    res.status(200).json({
      msg: "Product updated successfully",
      ok: true,
      newProduct
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Invalid product data",
        ok: false,
        errors: Object.values(error.errors).map(({ path, message }) => ({ path, message })),
      });
    }

    console.error("Error updating product:", error);

    return res.status(500).json({
      msg: "Error updating product",
      ok: false
    });
  }
}