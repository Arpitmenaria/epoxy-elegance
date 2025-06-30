// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, addToCart, removeFromCart, removeAllOfItem } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = item?.selectedSize?.price || item?.sizes?.[0]?.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>🛒 Cart is empty. <Link to="/">Shop now</Link></p>
      ) : (
        <div className="cart-items">
          {cart.map((item, i) => {
            const price = item?.selectedSize?.price || item?.sizes?.[0]?.price || 0;
            const sizeLabel = item?.selectedSize?.label || item?.sizes?.[0]?.label || "N/A";
            const quantity = item.quantity || 1;

            return (
              <div className="cart-card" key={`${item._id}-${sizeLabel}`}>
                <img src={item.images?.[0]} alt={item.title} />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>Size: {sizeLabel}</p>
                  <p>Price per unit: ₹{price}</p>
                  <p>Total: ₹{price * quantity}</p>

                  <div className="qty-buttons">
                    <button onClick={() => removeFromCart(item._id, sizeLabel)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => addToCart(item, item.selectedSize)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeAllOfItem(item._id, sizeLabel)}
                  >
                    ❌ Remove All
                  </button>
                </div>
              </div>
            );
          })}

          <h3 className="cart-total">Total: ₹{total}</h3>
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
