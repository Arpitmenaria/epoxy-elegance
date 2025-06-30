const Product = require("../models/Product");

// ✅ Create Product
const createProduct = async (req, res) => {
  try {
    const { title, description, categories, sizes, images, theme } = req.body;
    const product = new Product({ title, description, categories, sizes, images, theme });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// ✅ Get All Products with filtering by category or theme
const getAllProducts = async (req, res) => {
  try {
    const { category, theme } = req.query;
    const filter = {};

    if (category) {
      filter.categories = { $in: [category] };
    }

    if (theme) {
      const themeMap = {
        ocean: "ocean-theme",
        beach: "beach-theme",
        spices: "spices-theme",
        bar: "bar-theme",
        "deep-sea": "deep-sea",
        "wall-panel": "wall-panel",
      };
      const mappedTheme = themeMap[theme] || theme;
      filter.theme = mappedTheme;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// ✅ Update Product
const updateProduct = async (req, res) => {
  try {
    const { title, description, categories, sizes, images, theme } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, categories, sizes, images, theme },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// ✅ Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
