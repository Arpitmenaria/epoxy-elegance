const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_M4iRM6fthLXpHX",      // in .env
  key_secret: "mlClAJ3mLI2S2ZcXhUkiVJ7i"   // in .env
});

// ✅ Create Razorpay Order
const createRazorpayOrder = async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  try {
    const options = {
      amount: amount * 100,  // Razorpay uses paise
      currency,
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create Razorpay order", details: err.message });
  }
};

module.exports = { createRazorpayOrder };
