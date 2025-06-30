const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  categories: [{ type: String }],
  theme: { type: String }, // ✅ this is required for theme filtering
  sizes: [
    {
      label: { type: String },
      price: { type: Number }
    }
  ],
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
