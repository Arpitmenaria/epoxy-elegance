import { useEffect, useState } from "react";
import "./ThemeTables.css";
import ProductCard from "../components/ProductCard";

const themes = [
  { label: "Ocean Theme", key: "ocean-theme" },
  { label: "Beach Theme", key: "beach-theme" },
  { label: "Spices Theme", key: "spices-theme" },
  { label: "Bar Theme", key: "bar-theme" },
];

export default function ThemeTables() {
  const [selectedTheme, setSelectedTheme] = useState("ocean-theme");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products?theme=${selectedTheme}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching theme products", err));
  }, [selectedTheme]);

  return (
    <div className="theme-page-container">
      <div className="theme-sidebar">
        <h2>Select Theme</h2>
        <ul className="theme-list">
          {themes.map((theme) => (
            <li
              key={theme.key}
              className={selectedTheme === theme.key ? "active" : ""}
              onClick={() => setSelectedTheme(theme.key)}
            >
              {theme.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="theme-products">
        <h2>{selectedTheme.replace("-", " ")}</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found for this theme.</p>
          )}
        </div>
      </div>
    </div>
  );
}
