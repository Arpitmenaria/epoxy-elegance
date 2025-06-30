import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import "./Admin.css";

function AdminDashboard() {
  const { logout } = useAdminAuth();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-buttons">
        <Link to="/admin/upload"><button>📤 Upload Product</button></Link>
        <Link to="/admin/orders"><button>📦 View Orders</button></Link>
        <button onClick={logout}>🚪 Logout</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
