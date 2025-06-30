import { sendOrderEmail } from '../utils/sendOrderEmail.js';
import Order from '../models/orderModel.js';

export const placeOrder = async (req, res) => {
  try {
    const { userName, email, phone, address, items } = req.body;
    const total = items.reduce((sum, item) => sum + item.selectedSize.price, 0);

    const newOrder = new Order({ userName, email, phone, address, items, total });
    await newOrder.save();

    await sendOrderEmail(newOrder); // ✉️ Send email to admin
    

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
