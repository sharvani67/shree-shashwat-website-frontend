// import React, { useEffect, useState } from 'react';
// import { Dropdown } from 'react-bootstrap';
// import { FaHome, FaHeart, FaShoppingCart, FaSignInAlt, FaBox, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import './Header.css';
// import { useAuth } from '../../AuthContext/AuthContext';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// function Header() {
//   const { currentUser, logout } = useAuth();
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   useEffect(() => {
//     const fetchCartCount = async () => {
//       if (currentUser?.uid) {
//         try {
//           const cartDoc = await getDoc(doc(db, 'cart_items', currentUser.uid));
//           if (cartDoc.exists()) {
//             const data = cartDoc.data();
//             const items = data.items || [];

//             const totalItems = items.reduce((total, item) => {
//               return total + Number(item.quantity || 0);
//             }, 0);

//             setCartCount(totalItems);
//           }
//         } catch (error) {
//           console.error("Error fetching cart items:", error);
//         }
//       }
//     };

//     const fetchWishlistCount = async () => {
//       if (currentUser?.uid) {
//         try {
//           const wishlistDoc = await getDoc(doc(db, 'wishlist_items', currentUser.uid));
//           if (wishlistDoc.exists()) {
//             const data = wishlistDoc.data();
//             const items = data.items || [];
//             setWishlistCount(items.length); // Count of items in wishlist
//           }
//         } catch (error) {
//           console.error("Error fetching wishlist items:", error);
//         }
//       }
//     };

//     fetchCartCount();
//     fetchWishlistCount();
//   }, [currentUser]);

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <header className="header">
//       <div className="header-logo">
//         <span className="header-logo-text">SutraCart</span>
//       </div>
//       <nav className="header-nav-items">
//         <a href="/"><FaHome /></a>
//         <a href="/products">Products</a>
//         <a href="/myorders">My Orders</a>
//         <a href="/wishlist" className="header-wishlist-icon">
//           <FaHeart />
//           {wishlistCount > 0 && <span className="header-wishlist-count">{wishlistCount}</span>}
//         </a>
//         <a href="/Shoppingcart" className="header-cart-icon">
//           <FaShoppingCart />
//           {cartCount > 0 && <span className="header-cart-count">{cartCount}</span>}
//         </a>

//         {currentUser ? (
//           <Dropdown align="end">
//             <Dropdown.Toggle
//               as="button"
//               className="bg-transparent border-0 d-flex align-items-center gap-2"
//               id="dropdown-custom-components"
//             >
//               <FaUser />
//               <span>customer</span>
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//               <Dropdown.Item href="/account">
//                 <FaCog className="me-2" />
//                 My Account
//               </Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>
//                 <FaSignOutAlt className="me-2" />
//                 Logout
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         ) : (
//           <a href="/login" className="header-login-btn">
//             <FaSignInAlt /> Login
//           </a>
//         )}
//       </nav>
//     </header>
//   );
// }

// export default Header;

// import React, { useEffect, useState } from 'react';
// import { Dropdown } from 'react-bootstrap';
// import { FaHome, FaHeart, FaShoppingCart, FaSignInAlt, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
// import './Header.css';
// import { useAuth } from '../../AuthContext/AuthContext';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// function Header() {
//   const { currentUser, logout } = useAuth();
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchCartCount = async () => {
//       if (currentUser?.uid) {
//         try {
//           const cartDoc = await getDoc(doc(db, 'cart_items', currentUser.uid));
//           if (cartDoc.exists()) {
//             const data = cartDoc.data();
//             const items = data.items || [];

//             const totalItems = items.reduce((total, item) => {
//               return total + Number(item.quantity || 0);
//             }, 0);

//             setCartCount(totalItems);
//           }
//         } catch (error) {
//           console.error("Error fetching cart items:", error);
//         }
//       }
//     };

//     const fetchWishlistCount = async () => {
//       if (currentUser?.uid) {
//         try {
//           const wishlistDoc = await getDoc(doc(db, 'wishlist_items', currentUser.uid));
//           if (wishlistDoc.exists()) {
//             const data = wishlistDoc.data();
//             const items = data.items || [];
//             setWishlistCount(items.length);
//           }
//         } catch (error) {
//           console.error("Error fetching wishlist items:", error);
//         }
//       }
//     };

//     fetchCartCount();
//     fetchWishlistCount();
//   }, [currentUser]);

//   const handleLogout = () => {
//     logout();
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <>
//       <header className="header">
//         <div className="header-logo">
//           <span className="header-logo-text">South Sutra</span>
//         </div>

//         {/* Mobile menu button (hidden on desktop) */}
//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         <nav className={`header-nav-items ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
//           {/* Close button for mobile menu */}
//           <button className="mobile-menu-close" onClick={toggleMobileMenu}>
//             <FaTimes />
//           </button>

//           <a href="/" onClick={toggleMobileMenu}><FaHome className="icon" /><span className="text">Home</span></a>
//           <a href="/products" onClick={toggleMobileMenu}><span className="text">Products</span></a>
//           <a href="/myorders" onClick={toggleMobileMenu}><span className="text">My Orders</span></a>
//           <a href="/wishlist" className="header-wishlist-icon" onClick={toggleMobileMenu}>
//             <FaHeart className="icon" />
//             {wishlistCount > 0 && <span className="header-wishlist-count">{wishlistCount}</span>}
//             <span className="text">Wishlist</span>
//           </a>
//           <a href="/Shoppingcart" className="header-cart-icon" onClick={toggleMobileMenu}>
//             <FaShoppingCart className="icon" />
//             {cartCount > 0 && <span className="header-cart-count">{cartCount}</span>}
//             <span className="text">Cart</span>
//           </a>

//           {currentUser ? (
//             <Dropdown align="end" className="dropdown-container">
//               <Dropdown.Toggle
//                 as="button"
//                 className="bg-transparent border-0 d-flex align-items-center gap-2 dropdown-toggle-custom"
//               >
//                 <FaUser className="icon" />
//                 <span className="text">customer</span>
//               </Dropdown.Toggle>

//               <Dropdown.Menu className="dropdown-menu-custom">
//                 <Dropdown.Item href="/account" className="dropdown-item-custom" onClick={toggleMobileMenu}>
//                   <FaCog className="me-2" />
//                   My Account
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => { handleLogout(); toggleMobileMenu(); }} className="dropdown-item-custom">
//                   <FaSignOutAlt className="me-2" />
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           ) : (
//             <a href="/login" className="header-login-btn" onClick={toggleMobileMenu}>
//               <FaSignInAlt className="icon" /> <span className="text">Login</span>
//             </a>
//           )}
//         </nav>
//       </header>

//       {/* Overlay for mobile menu */}
//       {isMobileMenuOpen && (
//         <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
//       )}
//     </>
//   );
// }

// export default Header;

// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";
// import {
//   FaHome,
//   FaHeart,
//   FaShoppingCart,
//   FaSignInAlt,
//   FaUser,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
//   FaBoxOpen,
//   FaClipboardList,
//   FaInfoCircle,
//   FaEnvelope,FaUserCog
// } from "react-icons/fa";
// import "./Header.css";
// import { useAuth } from "../../AuthContext/AuthContext";
// import { useCart } from "../../AuthContext/CartContext";
// import { useWishlist } from "../../AuthContext/WishlistContext";
// import logo from "../../../assets/SSLogo4-removebg-preview.png";
// import { color } from "framer-motion";
// import { red } from "@mui/material/colors";

// function Header() {
//   const location = useLocation();
//   const { currentUser, logout } = useAuth();
//   const { cartCount } = useCart();
//   const { wishlistCount } = useWishlist();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     window.location.reload();
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const isMyOrdersActive =
//     location.pathname.startsWith("/myorders") ||
//     location.pathname.startsWith("/ordersDetails/");

//   return (
//     <>
//       <header className="header">
//         <div className="header-logo">
//           <img src={logo} alt="South Sutra Logo" className="logo-image" />
//         </div>

//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
//           <FaBars className={isMobileMenuOpen ? "icon-rotate" : ""} />
//         </button>

//         <nav
//           className={`header-nav-items ${isMobileMenuOpen ? "mobile-menu-open" : ""
//             }`}
//         >
//           <NavLink to="/" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//             <FaHome className="icon" />
//             <span className="text">Home</span>
//           </NavLink>

//           <NavLink to="/about" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//             <FaInfoCircle className="icon" />
//             <span className="text">About Us</span>
//           </NavLink>

//           <NavLink to="/gallery" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//             <FaEnvelope className="icon" />
//             <span className="text">Gallery</span>
//           </NavLink>

//           <NavLink to="/contact" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//             <FaEnvelope className="icon" />
//             <span className="text">Contact Us</span>
//           </NavLink>

//           <NavLink to="/products" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//             <FaBoxOpen className="icon" />
//             <span className="text">Products</span>
//           </NavLink>

//           <NavLink to="/myorders" onClick={toggleMobileMenu} className={`nav-link ${isMyOrdersActive ? "active" : ""}`}>
//             <FaClipboardList className="icon" />
//             <span className="text">My Orders</span>
//           </NavLink>

//           <NavLink to="/wishlist" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//             <FaHeart className="icon" />
//             {wishlistCount > 0 && <span className="header-wishlist-count">{wishlistCount}</span>}
//             <span className="text">Wishlist</span>
//           </NavLink>

//           <NavLink to="/shoppingcart" onClick={toggleMobileMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//             <FaShoppingCart className="icon" />
//             {cartCount > 0 && <span className="header-cart-count">{cartCount}</span>}
//             <span className="text">Cart</span>
//           </NavLink>

//           {currentUser ? (
//             <Dropdown align="end" className="dropdown-container">
//               <Dropdown.Toggle
//                 as="button"
//                 className="bg-transparent border-0 d-flex align-items-center gap-2 dropdown-toggle-custom text-white"
//               >
//                 <FaUser className="icon text-white" />
//                 <span className="text-white">customer</span>
//               </Dropdown.Toggle>

//               <Dropdown.Menu className="dropdown-menu-custom">
//                 <Dropdown.Item
//                   as={NavLink}
//                   to="/profile"
//                   className={({ isActive }) =>
//                     `dropdown-item-custom ${isActive ? "active-dropdown" : ""}`
//                   }
//                   onClick={toggleMobileMenu}
//                 >
//                   <FaUserCog className="me-2" />
//                   My Profile
//                 </Dropdown.Item>

//                 <Dropdown.Item onClick={() => { handleLogout(); toggleMobileMenu(); }} className="dropdown-item-custom" style={{ color: "red" }}>
//                   <FaSignOutAlt className="me-2" />
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           ) : (
//             <NavLink to="/login" onClick={toggleMobileMenu} className={({ isActive }) => `header-login-btn ${isActive ? "active-login" : ""}`}>
//               <FaSignInAlt className="icon" />
//               <span className="text">Login</span>
//             </NavLink>
//           )}
//         </nav>
//       </header>

//       {isMobileMenuOpen && (
//         <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
//       )}
//     </>
//   );
// }

// export default Header;




// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";
// import {
//   FaHome,
//   FaHeart,
//   FaShoppingCart,
//   FaSignInAlt,
//   FaUser,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
//   FaBoxOpen,
//   FaClipboardList,
//   FaInfoCircle,
//   FaEnvelope,
//   FaUserCog,
// } from "react-icons/fa";
// import "./Header.css";
// import { useAuth } from "../../AuthContext/AuthContext";
// import { useCart } from "../../AuthContext/CartContext";
// import { useWishlist } from "../../AuthContext/WishlistContext";
// import logo from "../../../assets/logobigger.png";

// function Header() {

//   const location = useLocation();
//   const { currentUser, logout } = useAuth();
//   const { cartCount } = useCart();
//   const { wishlistCount } = useWishlist();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logout(); // make sure this is an async signOut function
//       localStorage.removeItem('customer');
//       window.location.reload();
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };


//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleNavClick = () => {
//     window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//     setIsMobileMenuOpen(false);
//   };

//   const isMyOrdersActive =
//     location.pathname.startsWith("/myorders") ||
//     location.pathname.startsWith("/ordersDetails/");

//   const isProductsActive =
//     location.pathname.startsWith("/products") ||
//     location.pathname.startsWith("/viewdetails/");

//   return (
//     <>
//       <header className="header">
//         <div className="header-logo">
//           <img src={logo} alt="South Sutra Logo" className="logo-image" />
//         </div>

//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
//           <FaBars className={isMobileMenuOpen ? "icon-rotate" : ""} />
//         </button>

//         <nav className={`header-nav-items ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
//           <NavLink
//             to="/"
//             onClick={handleNavClick}
//             className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//           >
//             <FaHome className="icon" />
//             <span className="text">Home</span>
//           </NavLink>


//           <NavLink
//             to="/products"
//             onClick={handleNavClick}
//             className={`nav-link ${isProductsActive ? "active" : ""}`}
//           >
//             <FaBoxOpen className="icon" />
//             <span className="text">Products</span>
//           </NavLink>



//           <NavLink
//             to="/gallery"
//             onClick={handleNavClick}
//             className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//           >
//             <FaEnvelope className="icon" />
//             <span className="text">Gallery</span>
//           </NavLink>

//           <NavLink
//             to="/about"
//             onClick={handleNavClick}
//             className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//           >
//             <FaInfoCircle className="icon" />
//             <span className="text">Our Story</span>
//           </NavLink>


//           <NavLink
//             to="/contact"
//             onClick={handleNavClick}
//             className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//           >
//             <FaEnvelope className="icon" />
//             <span className="text">Contact Us</span>
//           </NavLink>



//           <NavLink
//             to="/myorders"
//             onClick={handleNavClick}
//             className={`nav-link ${isMyOrdersActive ? "active" : ""}`}
//           >
//             <FaClipboardList className="icon" />
//             <span className="text">My Orders</span>
//           </NavLink>

//           <NavLink
//             to="/wishlist"
//             onClick={handleNavClick}
//             className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//           >
//             <span className="icon-wrapper">
//               <FaHeart className="icon" />
//               {wishlistCount > 0 && (
//                 <span className="header-wishlist-count">{wishlistCount}</span>
//               )}
//             </span>
//             <span className="text">Wishlist</span>
//           </NavLink>

//           <NavLink
//             to="/shoppingcart"
//             onClick={handleNavClick}
//             className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//           >
//             <span className="icon-wrapper">
//               <FaShoppingCart className="icon" />
//               {cartCount > 0 && (
//                 <span className="header-cart-count">{cartCount}</span>
//               )}
//             </span>
//             <span className="text">Cart</span>
//           </NavLink>


//           {currentUser ? (
//             <Dropdown align="end" className="dropdown-container">
//               <Dropdown.Toggle
//                 as="button"
//                 className="bg-transparent border-0 d-flex align-items-center gap-2 dropdown-toggle-custom text-white"
//               >
//                 <FaUser className="icon text-white" />
//                 <span className="text-white">Customer</span>
//               </Dropdown.Toggle>

//               <Dropdown.Menu className="dropdown-menu-custom">
//                 <Dropdown.Item
//                   as={NavLink}
//                   to="/profile"
//                   onClick={handleNavClick}
//                   className={({ isActive }) =>
//                     `dropdown-item-custom ${isActive ? "active-dropdown" : ""}`
//                   }
//                 >
//                   <FaUserCog className="me-2" />
//                   My Profile
//                 </Dropdown.Item>

//                 <Dropdown.Item
//                   onClick={() => {
//                     handleLogout();
//                     handleNavClick();
//                   }}
//                   className="dropdown-item-custom"
//                   style={{ color: "red" }}
//                 >
//                   <FaSignOutAlt className="me-2" />
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           ) : (
//             <NavLink
//               to="/login"
//               onClick={handleNavClick}
//               className={({ isActive }) =>
//                 `header-login-btn ${isActive ? "active-login" : ""}`
//               }
//             >
//               <FaSignInAlt className="icon" />
//               <span className="text">Login</span>
//             </NavLink>
//           )}
//         </nav>
//       </header>

//       {isMobileMenuOpen && (
//         <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
//       )}
//     </>
//   );
// }

// export default Header;




import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  FaHome,
  FaHeart,
  FaShoppingCart,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaBoxOpen,
  FaClipboardList,
  FaInfoCircle,
  FaEnvelope,
  FaUserCog,
} from "react-icons/fa";
import "./Header.css";
import { useAuth } from "../../AuthContext/AuthContext";
import { useCart } from "../../AuthContext/CartContext";
import { useWishlist } from "../../AuthContext/WishlistContext";

function Header() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("customer");
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsMobileMenuOpen(false);
  };

  const isMyOrdersActive =
    location.pathname.startsWith("/myorders") ||
    location.pathname.startsWith("/ordersDetails/");

  const isProductsActive =
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/viewdetails/");

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <span className="logo-text">SHREE SHASHWATRAJ </span>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <FaBars className={isMobileMenuOpen ? "icon-rotate" : ""} />
        </button>

        <nav
          className={`header-nav-items ${
            isMobileMenuOpen ? "mobile-menu-open" : ""
          }`}
        >
          <NavLink
            to="/"
            onClick={handleNavClick}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <FaHome className="icon" />
            <span className="text">Home</span>
          </NavLink>

          <NavLink
            to="/products"
            onClick={handleNavClick}
            className={`nav-link ${isProductsActive ? "active" : ""}`}
          >
            <FaBoxOpen className="icon" />
            <span className="text">Products</span>
          </NavLink>

          {/* <NavLink
            to="/gallery"
            onClick={handleNavClick}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <FaEnvelope className="icon" />
            <span className="text">Gallery</span>
          </NavLink> */}

          <NavLink
            to="/about"
            onClick={handleNavClick}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <FaInfoCircle className="icon" />
            <span className="text">Our Story</span>
          </NavLink>

          <NavLink
            to="/contact"
            onClick={handleNavClick}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <FaEnvelope className="icon" />
            <span className="text">Contact Us</span>
          </NavLink>

          <NavLink
            to="/myorders"
            onClick={handleNavClick}
            className={`nav-link ${isMyOrdersActive ? "active" : ""}`}
          >
            <FaClipboardList className="icon" />
            <span className="text">My Orders</span>
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={handleNavClick}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="icon-wrapper">
              <FaHeart className="icon" />
              {wishlistCount > 0 && (
                <span className="header-wishlist-count">{wishlistCount}</span>
              )}
            </span>
            <span className="text">Wishlist</span>
          </NavLink>

          <NavLink
            to="/shoppingcart"
            onClick={handleNavClick}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="icon-wrapper">
              <FaShoppingCart className="icon" />
              {cartCount > 0 && (
                <span className="header-cart-count">{cartCount}</span>
              )}
            </span>
            <span className="text">Cart</span>
          </NavLink>

          {currentUser ? (
            <Dropdown align="end" className="dropdown-container">
              <Dropdown.Toggle
                as="button"
                className="bg-transparent border-0 d-flex align-items-center gap-2 dropdown-toggle-custom text-white"
              >
                <FaUser className="icon text-white" />
                <span className="text-white">Customer</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-custom">
                <Dropdown.Item
                  as={NavLink}
                  to="/profile"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `dropdown-item-custom ${isActive ? "active-dropdown" : ""}`
                  }
                >
                  <FaUserCog className="me-2" />
                  My Profile
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    handleLogout();
                    handleNavClick();
                  }}
                  className="dropdown-item-custom"
                  style={{ color: "red" }}
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <NavLink
              to="/login"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `header-login-btn ${isActive ? "active-login" : ""}`
              }
            >
              <FaSignInAlt className="icon" />
              <span className="text">Login</span>
            </NavLink>
          )}
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
}

export default Header;