import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./ProductListing.css";
import ProductCard from "../components/ProductCard";

function ProductListing() {
  const { type } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = "";

    if (location.pathname.startsWith("/category/")) {
      url = `${import.meta.env.VITE_BACKEND_URL}/api/products?category=${type}`;
    } else if (location.pathname.startsWith("/themes/")) {
      url = `${import.meta.env.VITE_BACKEND_URL}/api/products?theme=${type}`;
    } else {
      url = "${import.meta.env.VITE_BACKEND_URL}/api/products";
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products", err));
  }, [type, location.pathname]);

  return (
    <div className="product-list-container">
      <h2>{type ? type.replace("-", " ") : "All Products"}</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductListing;
