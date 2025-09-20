import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
  <h1>Epoxy Furnish</h1>
</Link>


      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {[
          ['/', 'Home'],
          ['/category/coffee-table', 'Coffee Tables'],
          ['/category/side-table', 'Side Tables'],
          ['/category/dining-table', 'Dining Tables'],
          ['/category/console-table', 'Console Tables'],
          ['/category/nesting-table', 'Accessories'],
          ['/category/wall-art', 'Wall Arts'],                 // ✅ New
          ['/category/kitchen-accessory', 'Kitchen and Dining'], // ✅ New
          ['/theme-tables', 'Theme Tables'],
          ['/category/door', 'Doors'],
          ['/customization', 'Customization'],
          ['/cart', '🛒 Cart'],
        ].map(([path, name]) => (
          <li key={path}>
            <Link to={path} onClick={closeMenu}>{name}</Link>
          </li>
        ))}
      </ul>
<Link to="/cart" className="mobile-cart-icon">🛒</Link>
    </nav>
  );
}

export default Navbar;
