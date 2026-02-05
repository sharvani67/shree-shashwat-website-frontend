// WishlistContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios"
import baseURL from '../Api/Api';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { currentUser } = useAuth();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);

  const refreshWishlist = async () => {
    if (currentUser?.uid) {
      try {
        const response = await axios.get(`${baseURL}/wishlist/${currentUser.uid}`);
        if (response.data.success) {
          setWishlistItems(response.data.data || []);
          setWishlistCount(response.data.data?.length || 0);
        } else {
          setWishlistItems([]);
          setWishlistCount(0);
        }
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
        setWishlistItems([]);
        setWishlistCount(0);
      }
    } else {
      // Guest wishlist logic
      try {
        const guestData = localStorage.getItem('guest_wishlist_items');
        if (guestData) {
          const guestItems = JSON.parse(guestData);
          if (Array.isArray(guestItems)) {
            setWishlistItems(guestItems);
            setWishlistCount(guestItems.length);
          } else {
            setWishlistItems([]);
            setWishlistCount(0);
          }
        } else {
          setWishlistItems([]);
          setWishlistCount(0);
        }
      } catch (error) {
        console.error('Error parsing guest wishlist:', error);
        setWishlistItems([]);
        setWishlistCount(0);
      }
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, [currentUser]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product_id === productId || item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistCount, 
      wishlistItems, 
      refreshWishlist,
      isInWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}