import React, { useEffect, useState } from 'react';
import { FaHome, FaHeart, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import './Header.css';
import { useAuth } from '../../AuthContext/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

function Header() {
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (currentUser?.uid) {
        try {
          const cartDoc = await getDoc(doc(db, 'cart_items', currentUser.uid));
          if (cartDoc.exists()) {
            const data = cartDoc.data();
            const items = data.items || [];
            
            // Simply sum up all quantities without combining by product_id
            const totalItems = items.reduce((total, item) => {
              return total + Number(item.quantity || 0);
            }, 0);
            
            setCartCount(totalItems); // Total count of all items
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartCount();
  }, [currentUser]);

  return (
    <header className="header">
      <div className="header-logo">
        <span className="header-logo-text">SutraCart</span>
      </div>
      <nav className="header-nav-items">
        <a href="/"><FaHome /></a>
        <a href="/products">Products</a>
        <a href="/wishlist"><FaHeart /></a>
        <a href="/Shoppingcart" className="header-cart-icon">
          <FaShoppingCart />
          <span className="header-cart-count">{cartCount}</span>
        </a>
        <button className="header-login-btn">
          <FaSignInAlt /> Login
        </button>
      </nav>
    </header>
  );
}

export default Header;