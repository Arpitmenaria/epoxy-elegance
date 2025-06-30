// utils/sendOrderEmail.js
const nodemailer = require('nodemailer');

const sendOrderEmail = async (orderData, razorpayOrderId = '') => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'epoxyfurnishudr@gmail.com',
        pass: 'mcwp aize zjlg xmqz', // App password
      },
    });

    const itemsHtml = orderData.items.map((item) => `
      <li>
        <strong>${item.title}</strong> - Size: ${item.selectedSize.label} - ₹${item.selectedSize.price}
      </li>
    `).join('');

    const orderHtml = `
      <h2>Order Confirmation</h2>
      <p><strong>Name:</strong> ${orderData.userName}</p>
      <p><strong>Email:</strong> ${orderData.email}</p>
      <p><strong>Phone:</strong> ${orderData.phone}</p>
      <p><strong>Address:</strong> ${orderData.address}</p>
      <p><strong>Total:</strong> ₹${orderData.total}</p>
      ${razorpayOrderId ? `<p><strong>Razorpay Order ID:</strong> ${razorpayOrderId}</p>` : ""}
      <p><strong>Ordered Items:</strong></p>
      <ul>${itemsHtml}</ul>
      <p>Thank you for shopping with Epoxy Elegance!</p>
    `;

    const mailOptionsCustomer = {
      from: 'epoxyfurnishudr@gmail.com',
      to: orderData.email,
      subject: '🛒 Your Order Confirmation - Epoxy Elegance',
      html: orderHtml
    };

    const mailOptionsAdmin = {
      from: 'epoxyfurnishudr@gmail.com',
      to: 'epoxyfurnishudr@gmail.com',
      subject: '🛒 New Order Received',
      html: orderHtml
    };

    await transporter.sendMail(mailOptionsCustomer);
    await transporter.sendMail(mailOptionsAdmin);

    console.log('✅ Order emails sent to customer and admin');
  } catch (error) {
    console.error('❌ Failed to send order email:', error);
  }
};

module.exports = sendOrderEmail;
