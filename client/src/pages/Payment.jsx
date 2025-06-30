import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Payment.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount, customer } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    if (!data.id) {
      alert("❌ Failed to create payment");
      return;
    }

    const options = {
      key: "rzp_test_M4iRM6fthLXpHX", // ✅ Use .env in production
      amount: data.amount,
      currency: data.currency,
      name: "Epoxy Elegance",
      description: "Table Order Payment",
      image: "https://epoxyelegance.in/logo.png",
      order_id: data.id,
      handler: async function (response) {
        alert("✅ Payment Successful!");

        // ✅ Call backend to send confirmation email with Razorpay order ID
        await fetch("http://localhost:5000/api/orders/send-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            razorpayOrderId: data.id,
          }),
        });

        navigate("/order-confirmation", { state: { orderId } });
      },
      prefill: {
        name: customer?.name || "",
        email: customer?.email || "",
        contact: customer?.phone || "",
      },
      theme: {
        color: "#0f4a8a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  if (!orderId) return <p>Invalid order.</p>;

  return (
    <div className="payment-page">
      <h2>Secure Payment</h2>
      <p>Order ID: {orderId}</p>
      <p>Total: ₹{amount}</p>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </div>
  );
}
