import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer"; // import here
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { addToCart } = useCart();

  // Image viewer state
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [showDescription, setShowDescription] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.images[0]);
        setSelectedSize(data.sizes[0]);
      })
      .catch((err) => console.error("Error fetching product", err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    alert("🛒 Added to cart!");
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    alert("🛒 Added to cart!");
  };

  // Open image viewer modal
  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  // Close image viewer modal
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <div className="detail-image-section">
        {/* Main image clickable to open viewer */}
        <img
          src={mainImage}
          alt={product.title}
          className="main-image"
          onClick={() => openImageViewer(product.images.indexOf(mainImage))}
          style={{ cursor: "pointer" }}
        />
        <div className="thumbnail-row">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumbnail-${i}`}
              onClick={() => setMainImage(img)}
              className={mainImage === img ? "thumbnail active" : "thumbnail"}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      <div className="detail-info">
        <h2>{product.title}</h2>

        <div className="size-selector">
          <label>Select Size:</label>
          <select
            value={selectedSize?.label}
            onChange={(e) =>
              setSelectedSize(
                product.sizes.find((s) => s.label === e.target.value)
              )
            }
          >
            {product.sizes.map((size, i) => (
              <option key={i} value={size.label}>
                {size.label} - ₹{size.price}
              </option>
            ))}
          </select>
        </div>

        <div className="price">Price: ₹{selectedSize?.price}</div>

        <div className="buttons">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>

        {/* Collapsible: Product Description */}
        <div className="collapsible-block">
          <div
            className="collapsible-header"
            onClick={() => setShowDescription(!showDescription)}
          >
            <h4>📄 Product Description</h4>
            <span>{showDescription ? "−" : "+"}</span>
          </div>
          {showDescription && (
            <div className="collapsible-content">
              <p>{product.description}</p>
            </div>
          )}
        </div>

        {/* Collapsible: Shipping & Return Policy */}
        <div className="collapsible-block">
          <div
            className="collapsible-header"
            onClick={() => setShowPolicy(!showPolicy)}
          >
            <h4>🚚 Shipping & Return Policy</h4>
            <span>{showPolicy ? "−" : "+"}</span>
          </div>
          {showPolicy && (
            <div className="collapsible-content">
              <p>
                ✔️ We ship within 7-10 business days. <br />
                ✔️ Easy 7-day return for damaged or incorrect products. <br />
                ❌ No return on customized products. <br />
                💬 For queries, contact us via WhatsApp or Email.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isViewerOpen && (
        <ImageViewer
          src={product.images}
          currentIndex={currentImageIndex}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        />
      )}
    </div>
  );
}

export default ProductDetail;
