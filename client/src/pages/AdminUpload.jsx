import { useEffect, useState } from 'react';
import './AdminUpload.css';

const categoryOptions = [
  "coffee-table", "side-table", "dining-table", "console-table", "nesting-table",
  "wall-art", "kitchen-accessory", "door"
];

const themeOptions = [
  "", "ocean-theme", "beach-theme", "deep-sea", "staircase", "wall-panel", "spices-theme", "bar-theme"
];

export default function AdminUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categories: [],
    theme: "", // ✅ NEW
    sizes: [{ label: "", price: "" }],
    images: [""],
  });

  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const handleCheckboxChange = (category) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSizeChange = (index, key, value) => {
    const newSizes = [...form.sizes];
    newSizes[index][key] = value;
    setForm({ ...form, sizes: newSizes });
  };

  const deleteSize = (index) => {
    const newSizes = [...form.sizes];
    newSizes.splice(index, 1);
    setForm({ ...form, sizes: newSizes });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addSize = () => setForm({ ...form, sizes: [...form.sizes, { label: "", price: "" }] });
  const addImage = () => setForm({ ...form, images: [...form.images, ""] });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      categories: [],
      theme: "", // reset theme too
      sizes: [{ label: "", price: "" }],
      images: [""],
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/products/${editId}`
      : "http://localhost:5000/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert(`✅ Product ${editId ? "Updated" : "Added"} Successfully!`);
      resetForm();
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      title: product.title,
      description: product.description || "",
      categories: product.categories,
      theme: product.theme || "",
      sizes: product.sizes,
      images: product.images,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="admin-upload">
      <h2>{editId ? "✏️ Edit Product" : "➕ Add New Product"}</h2>

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Product Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Product Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <div className="category-box">
          <label>Select Categories:</label>
          <div className="checkbox-list">
            {categoryOptions.map(cat => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={form.categories.includes(cat)}
                  onChange={() => handleCheckboxChange(cat)}
                />
                {cat.replace(/-/g, " ")}
              </label>
            ))}
          </div>
        </div>

        <div className="theme-box">
          <label>Select Theme (optional):</label>
          <select
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
          >
            {themeOptions.map(theme => (
              <option key={theme} value={theme}>
                {theme ? theme.replace(/-/g, " ") : "-- No Theme --"}
              </option>
            ))}
          </select>
        </div>

        <div className="sizes">
          <label>Sizes and Prices:</label>
          {form.sizes.map((s, i) => (
            <div key={i} className="size-entry">
              <input
                type="text"
                placeholder="Size Label (e.g. 4x2)"
                value={s.label}
                onChange={(e) => handleSizeChange(i, "label", e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={s.price}
                onChange={(e) => handleSizeChange(i, "price", e.target.value)}
                required
              />
              {form.sizes.length > 1 && (
                <button type="button" onClick={() => deleteSize(i)}>❌</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSize}>+ Add Size</button>
        </div>

        <div className="images">
          <label>Image Links (Cloudinary URLs):</label>
          {form.images.map((img, i) => (
            <input
              key={i}
              type="text"
              placeholder="Image URL"
              value={img}
              onChange={(e) => handleImageChange(i, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addImage}>+ Add Image</button>
        </div>

        <div className="form-buttons">
          <button type="submit">{editId ? "Update Product" : "Add Product"}</button>
          {editId && <button type="button" onClick={resetForm}>Cancel Edit</button>}
        </div>
      </form>

      <h3>🗂 Uploaded Products</h3>
      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <img src={p.images[0]} alt={p.title} />
            <h4>{p.title}</h4>
            <p><strong>Categories:</strong> {p.categories.join(", ")}</p>
            {p.theme && <p><strong>Theme:</strong> {p.theme.replace(/-/g, " ")}</p>}
            <p><strong>Description:</strong> {p.description}</p>
            <ul>
              {p.sizes.map((s, i) => (
                <li key={i}>{s.label}: ₹{s.price}</li>
              ))}
            </ul>
            <div className="action-buttons">
              <button onClick={() => handleEdit(p)}>✏️ Edit</button>
              <button onClick={() => handleDelete(p._id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
