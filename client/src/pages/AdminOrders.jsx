import { useEffect, useState } from 'react';
import './AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Name:</strong> {order.userName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.title} - ₹{item.selectedSize.price}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
