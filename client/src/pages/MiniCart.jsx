import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./MiniCart.css";

function MiniCart() {
  const { cart, showCartPreview, setShowCartPreview } = useCart();

  if (!showCartPreview || cart.length === 0) return null;

  return (
    <div className="mini-cart">
      <button className="close-btn" onClick={() => setShowCartPreview(false)}>×</button>
      <h4>🛒 Item Added to Cart</h4>
      <div className="mini-cart-items">
        {cart.slice(-2).map((item, index) => (
          <div key={index} className="mini-cart-item">
            <img src={item.images?.[0]} alt={item.title} />
            <div>
              <p>{item.title}</p>
              <p>₹{item.selectedSize?.price}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart" onClick={() => setShowCartPreview(false)}>
        <button className="view-cart-btn">Go to Cart</button>
      </Link>
    </div>
  );
}

export default MiniCart;
