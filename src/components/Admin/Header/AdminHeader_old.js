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
import { NavLink, useNavigate } from 'react-router-dom'; // ⬅️ import useNavigate
import { Dropdown } from 'react-bootstrap';
import { 
  FaHome, 
  FaBox, 
  FaClipboardList, 
  FaSignOutAlt, 
  FaUserCog, 
  FaBars 
} from 'react-icons/fa';
import './AdminHeader.css';
import { useAuth } from '../../AuthContext/AuthContext';

function Header() {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // ⬅️ initialize navigate

  const handleLogout = () => {
    logout();
    navigate('/a-login'); // ⬅️ redirect to login
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="admin-navbar">
        <div className="admin-logo">
          <span className="admin-logo-text">South Sutra</span>
          <span className="admin-logo-subtext">Admin Panel</span>
        </div>
        
        <button className="admin-mobile-toggle" onClick={toggleMobileMenu}>
          <FaBars className={isMobileMenuOpen ? 'admin-icon-rotate' : ''} />
        </button>
        
        <nav className={`admin-nav-items ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <NavLink 
            to="/home" 
            onClick={toggleMobileMenu}
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <FaHome className="admin-icon" />
            <span className="admin-text">Home</span>
          </NavLink>
          
          <NavLink 
            to="/a-products" 
            onClick={toggleMobileMenu}
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <FaBox className="admin-icon" />
            <span className="admin-text">Products</span>
          </NavLink>
          
          <NavLink 
            to="/a-orders" 
            onClick={toggleMobileMenu}
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <FaClipboardList className="admin-icon" />
            <span className="admin-text">Orders</span>
          </NavLink>

          <Dropdown align="end" className="admin-dropdown-container">
            <Dropdown.Toggle
              as="button"
              className="bg-transparent border-0 d-flex align-items-center gap-2 admin-dropdown-toggle"
            >
              <FaUserCog className="admin-icon" />
              <span className="admin-text">Admin</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="admin-dropdown-menu">
              <Dropdown.Item 
                as={NavLink}
                to="/admin/settings"
                className="admin-dropdown-item"
                onClick={toggleMobileMenu}
                activeclassname="active"
              >
                <FaUserCog className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item 
                onClick={() => { handleLogout(); toggleMobileMenu(); }} 
                className="admin-dropdown-item"
               
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
      </header>
      
      {isMobileMenuOpen && (
        <div className="admin-mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
}

export default Header;
