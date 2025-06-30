const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const sendOrderEmail = require("../utils/sendOrderEmail"); // ✅ import Nodemailer utility

// POST - Place a new order and send email
router.post("/", async (req, res) => {
  try {
    const { userName, email, phone, address, items } = req.body;

    const total = items.reduce((sum, item) => sum + item.selectedSize.price, 0);

    const newOrder = new Order({ userName, email, phone, address, items, total });
    const savedOrder = await newOrder.save();

    await sendOrderEmail(savedOrder); // ✅ Send email to admin

    res.status(201).json({ message: "Order placed successfully", orderId: savedOrder._id });

  } catch (error) {
    console.error("Order save error:", error);
    res.status(500).json({ message: "Error saving order", error });
  }
});

// GET - Get all orders (Admin use)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
  console.error("Error fetching orders:", error); // ✅ This will show real error in terminal
  res.status(500).json({ message: "Error fetching orders", error: error.message });
}
});
// POST - Send confirmation email after payment with Razorpay Order ID
router.post("/send-confirmation", async (req, res) => {
  try {
    const { orderId, razorpayOrderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await sendOrderEmail(order, razorpayOrderId);
    res.status(200).json({ message: "Email sent with Razorpay Order ID" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});


module.exports = router;
