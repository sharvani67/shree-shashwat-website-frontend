import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import baseURL from '../Api/Api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const refreshCart = async () => {
    if (currentUser?.uid) {
      // ✅ Logged-in user: fetch from API
      try {
        const response = await axios.get(`${baseURL}/cart-items/customer/${currentUser.uid}`);
        if (response.status === 200) {
          const items = response.data || [];
          setCartItems(items);

          const totalItems = items.reduce((total, item) => {
            return total + Number(item.quantity || 0);
          }, 0);
          setCartCount(totalItems);
        } else {
          setCartItems([]);
          setCartCount(0);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
        setCartCount(0);
      }
    } else {
      // ✅ Guest user: use localStorage
      try {
        const guestCart = JSON.parse(localStorage.getItem('guest_cart_items')) || [];
        setCartItems(guestCart);

        const totalItems = guestCart.reduce((total, item) => {
          return total + Number(item.quantity || 0);
        }, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error parsing guest cart items:", error);
        setCartItems([]);
        setCartCount(0);
      }
    }
  };

  useEffect(() => {
    const handleAuthChange = async () => {
      refreshCart();
    };

    handleAuthChange();
  }, [currentUser]);

  return (
    <CartContext.Provider value={{ cartCount, cartItems, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}