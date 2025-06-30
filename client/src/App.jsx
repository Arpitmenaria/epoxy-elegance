import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import ThemeTables from './pages/ThemeTables';
import AdminUpload from './pages/AdminUpload';
import AdminOrders from './pages/AdminOrders';
import Enquiry from './pages/Enquiry';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MiniCart from './pages/MiniCart';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import "yet-another-react-lightbox/styles.css";
import Customization from './pages/Customization';
import WhatsAppIcon from './pages/WhatsAppIcon';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';

function ProtectedRoute({ children }) {
  const { isAdminLoggedIn } = useAdminAuth();
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <AdminAuthProvider>
      <>
        <Navbar />
        <WhatsAppIcon />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/category/:type" element={<ProductListing />} />
          <Route path="/themes/:type" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/theme-tables" element={<ThemeTables />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/customization" element={<Customization />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/upload" element={<ProtectedRoute><AdminUpload /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />

        </Routes>
        <MiniCart />
        <Footer />
      </>
    </AdminAuthProvider>
  );
}

export default App;
