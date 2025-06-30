import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";
import { useNavigate } from "react-router-dom"; 

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce((sum, item) => sum + item.selectedSize.price, 0);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      items: cart.map(item => ({
        _id: item._id,
        title: item.title,
        selectedSize: item.selectedSize
      }))
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Send customer info too
        navigate("/payment", {
          state: {
            orderId: data.orderId,
            amount: total,
            customer: formData
          }
        });
      } else {
        alert("❌ Error placing order.");
      }
    } catch (err) {
      alert("❌ Server error.");
    }
  };

  if (cart.length === 0) return <p className="empty-cart-msg">🛒 Your cart is empty.</p>;

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <h2>🧾 Checkout</h2>

        <div className="checkout-columns">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>📦 Delivery Details</h3>
            <label>Name:
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </label>
            <label>Email:
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </label>
            <label>Phone:
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
            </label>
            <label>Address:
              <textarea name="address" required value={formData.address} onChange={handleChange} />
            </label>
            <button type="submit">Place Order</button>
          </form>

          <div className="order-summary">
            <h3>🛒 Order Summary</h3>
            {cart.map((item, i) => (
              <div key={i} className="order-item">
                <p><b>{item.title}</b></p>
                <p>Size: {item.selectedSize.label}</p>
                <p>Price: ₹{item.selectedSize.price}</p>
              </div>
            ))}
            <hr />
            <p className="free-shipping">🚚 Free Shipping</p>
            <h3>Total: ₹{total}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
