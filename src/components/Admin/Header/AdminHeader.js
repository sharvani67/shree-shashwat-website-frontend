// import React from 'react';
// import { FaHome, FaHeart, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
// import './AdminHeader.css'; // Make sure to create this file or use inline styles

// function Header() {
//   return (
//     <header className="admin-header">
//       <div className="admin-header-logo">
//         <span className="admin-header-logo-text">SutraCart</span>
//       </div>
//       <nav className="admin-header-nav-items">
//         <a href="/home"><FaHome /></a>
//         <a href="/a-products">Products</a>
//         <a href="/a-orders">Orders</a>
//         {/* <a href="#"><FaHeart /></a>
//         <a href="#" className="header-cart-icon">
//           <FaShoppingCart />
//           <span className="header-cart-count">2</span>
//         </a> */}
//         <button className="admin-header-login-btn">
//           <FaSignInAlt /> Login
//         </button>
//       </nav>
//     </header>
//   );
// }

// export default Header;

// import React, { useState } from 'react';
// import { FaHome, FaHeart, FaShoppingCart, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
// import './AdminHeader.css';

// function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Add scroll effect like in the previous header
//   useState(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [scrolled]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <header className={`admin-header ${scrolled ? 'scrolled' : ''}`}>
//         <div className="admin-header-container">
//           <div className="admin-header-logo">
//             <span className="admin-header-logo-text">SutraCart</span>
//             <span className="admin-header-logo-subtext">Admin Panel</span>
//           </div>

//           <button 
//             className={`admin-mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} 
//             onClick={toggleMobileMenu}
//             aria-label="Toggle menu"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           <nav className={`admin-header-nav-items ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
//             <div className="admin-nav-links">
//               <a href="/home" onClick={closeMobileMenu} className="admin-nav-link">
//                 <FaHome className="icon" />
//                 <span className="text">Dashboard</span>
//               </a>
//               <a href="/a-products" onClick={closeMobileMenu} className="admin-nav-link">
//                 <span className="text">Products</span>
//                 <span className="link-underline"></span>
//               </a>
//               <a href="/a-orders" onClick={closeMobileMenu} className="admin-nav-link">
//                 <span className="text">Orders</span>
//                 <span className="link-underline"></span>
//               </a>
//             </div>

//             <div className="admin-nav-auth-section">
//               <button className="admin-header-login-btn" onClick={closeMobileMenu}>
//                 <FaSignInAlt className="icon" /> 
//                 <span className="text">Login</span>
//               </button>
//             </div>
//           </nav>
//         </div>
//       </header>

//       {isMobileMenuOpen && (
//         <div className="admin-mobile-menu-overlay" onClick={closeMobileMenu}></div>
//       )}
//     </>
//   );
// }

// export default Header;

import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // ⬅️ import useNavigate
import { Dropdown } from 'react-bootstrap';
import './AdminHeader.css';
import { useAuth } from '../../AuthContext/AuthContext';
import logo from "../../../assets/logobigger.png";
import {
  FaHome,
  FaHeart,
  FaShoppingCart,
  FaSignInAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaBox,
  FaClipboardList,
  FaInfoCircle,
  FaEnvelope, FaThLarge, FaUserCog
} from "react-icons/fa";

function Header() {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // ⬅️ initialize navigate

  const handleLogout = () => {
    logout();
    navigate('/login'); // ⬅️ redirect to login
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isMyOrdersActive = location.pathname.startsWith('/a-orders') || location.pathname.startsWith('/a-ordersDetails/');
  const isProductsActive = location.pathname.startsWith('/a-products') || location.pathname.startsWith('/a-viewdetails/');

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="South Sutra Logo" className="logo-image" />
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <FaBars className={isMobileMenuOpen ? "icon-rotate" : ""} />
        </button>

        <nav
          className={`header-nav-items ${isMobileMenuOpen ? "mobile-menu-open" : ""
            }`}
        >
          <NavLink to="/a-dashboard" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <FaThLarge className="icon" />
            <span className="text">Dashboard</span>
          </NavLink>
          
          <NavLink to="/a-customers" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <FaUser className="icon" />
            <span className="text">Customers</span>
          </NavLink>

          <NavLink to="/a-orders" onClick={toggleMobileMenu} className={`nav-link ${isMyOrdersActive ? "active" : ""}`}>
            <FaClipboardList className="icon" />
            <span className="text">Orders</span>
          </NavLink>
          <Dropdown align="end" className="admin-dropdown-container">
            <Dropdown.Toggle
              as="button"
              className="bg-transparent border-0 d-flex align-items-center gap-2 admin-dropdown-toggle"
            >
              <FaUserCog className="admin-icon" />
              <span className="admin-text">Admin</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-custom">
              <Dropdown.Item
                as={NavLink}
                to="/a-profile"
                className={({ isActive }) =>
                  `dropdown-item-custom ${isActive ? "active-dropdown" : ""}`
                }
                onClick={toggleMobileMenu}
                activeclassname="active"
              >
                <FaUserCog className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => { handleLogout(); toggleMobileMenu(); }}
                className="dropdown-item-custom"
                style={{ color: "red" }}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
}

export default Header;
