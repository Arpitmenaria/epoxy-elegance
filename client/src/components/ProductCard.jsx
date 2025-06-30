import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const minPrice = Math.min(...product.sizes.map((s) => s.price));

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={product.images[0]}
          alt={product.title}
          className="product-image"
        />
      </div>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">Starting from ₹{minPrice}</p>
      <Link to={`/product/${product._id}`} className="view-button">
        View
      </Link>
    </div>
  );
};

export default ProductCard;
