// OrderConfirmation.jsx
import { useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>✅ Order Confirmed!</h2>
      <p>Thank you for shopping with us.</p>
      <p><strong>Your Order ID:</strong> {orderId}</p>
    </div>
  );
}
