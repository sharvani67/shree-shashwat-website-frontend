// useWishlistCheck.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from "../Api/Api";
import { useAuth } from "../AuthContext/AuthContext";

export const useWishlistCheck = (productId) => {
  const { currentUser } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        if (currentUser) {
          // For logged-in users, check via API
          const response = await axios.get(
            `${baseURL}/wishlist/check/${currentUser.uid}/${productId}`
          );
          setIsInWishlist(response.data.exists);
        } else {
          // For guests, check localStorage
          const guestWishlist = JSON.parse(
            localStorage.getItem("guest_wishlist_items") || "[]"
          );
          setIsInWishlist(guestWishlist.some(item => item.product_id === productId));
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    checkWishlistStatus();
  }, [productId, currentUser]);

  return { isInWishlist, loading };
};