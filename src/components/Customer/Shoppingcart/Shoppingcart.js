import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Shoppingcart.css';
import Header from '../Header/Header';
import WhatApp from '../../Customer/WhatsApp/WhatApp';
import { useAuth } from '../../AuthContext/AuthContext';
import { useCart } from '../../AuthContext/CartContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import { LuHeartOff, LuShoppingCart } from "react-icons/lu";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import baseURL from "../../Api/Api";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { refreshCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);

      if (currentUser?.uid) {
        // Logged-in user: fetch from your API
        try {
          const response = await fetch(`${baseURL}/cart-items/customer/${currentUser.uid}`);
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          const data = await response.json();
          const processedItems = data.map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            originalPrice: parseFloat(item.original_price) || null,
            id: item.product_id.toString(),
            weight: item.weight,
            quantity: item.quantity
          }));
          setCartItems(processedItems);
          console.log("Fetched and processed cart items:", processedItems);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          setCartItems([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Guest user: fetch from localStorage
        try {
          const guestCart = JSON.parse(localStorage.getItem('guest_cart_items') || '[]');
          const processedItems = guestCart.map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            originalPrice: parseFloat(item.originalPrice) || null
          }));
          setCartItems(processedItems);
          console.log("Fetched guest cart items:", processedItems);
        } catch (error) {
          console.error("Error parsing guest cart items from localStorage:", error);
          setCartItems([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCartItems();
  }, [currentUser]);

  const clearCartFromAPI = async (customerId) => {
    try {
      const response = await axios.delete(`${baseURL}/cartitems/customer/${customerId}`);
      if (response.status === 200) {
        console.log("Cart cleared successfully from database");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error clearing cart from API:", error);
      return false;
    }
  };

  const handleClearCart = async () => {
    if (currentUser?.uid) {
      // For logged-in user: clear via API
      const success = await clearCartFromAPI(currentUser.uid);
      if (success) {
        setCartItems([]);
        refreshCart();
      } else {
        alert("Failed to clear cart. Please try again.");
      }
    } else {
      // For guest user: clear from localStorage
      localStorage.removeItem('guest_cart_items');
      setCartItems([]);
      refreshCart();
    }
  };

  const updateCartQuantityViaAPI = async (productId, weight, newQuantity) => {
    try {
      const response = await axios.put(`${baseURL}/cart-items/${currentUser.uid}/${productId}`, {
        weight: weight,
        quantity: newQuantity
      });
      if (response.status !== 200) {
        throw new Error('Failed to update quantity');
      }
      return response.data; // Return the updated item data if needed
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const handleQuantityChange = async (productId, weight, delta) => {
    const currentItem = cartItems.find(item => item.product_id === productId && item.weight === weight);
    if (!currentItem) return;

    const newQuantity = Math.max(1, currentItem.quantity + delta);

    if (currentUser?.uid) {
      try {
        // For logged-in user: update via API first
        await updateCartQuantityViaAPI(productId, weight, newQuantity);

        // Only update local state if API update was successful
        const updatedItems = cartItems.map(item => {
          if (item.product_id === productId && item.weight === weight) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        setCartItems(updatedItems);
        refreshCart();
      } catch (error) {
        console.error("Failed to update quantity:", error);
        alert("Failed to update quantity. Please try again.");
      }
    } else {
      // For guest user: update localStorage directly
      const updatedItems = cartItems.map(item => {
        if (item.product_id === productId && item.weight === weight) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setCartItems(updatedItems);
      updateCartInLocalStorage(updatedItems);
      refreshCart();
    }
  };

  const deleteCartItemViaAPI = async (productId) => {
    try {
      const response = await axios.delete(`${baseURL}/cart-items/${currentUser.uid}/${productId}`);
      if (response.status === 200) {
        console.log("Item deleted successfully from database");
        return true;
      }
      throw new Error('Failed to delete item');
    } catch (error) {
      console.error("Error deleting cart item:", error);
      return false;
    }
  };

  const handleDeleteItem = async (productId, weight) => {
    if (currentUser?.uid) {
      // For logged-in user: delete via API first
      const success = await deleteCartItemViaAPI(productId);
      if (success) {
        // Only update local state if API deletion was successful
        const updatedItems = cartItems.filter(item => !(item.product_id === productId && item.weight === weight));
        setCartItems(updatedItems);
        refreshCart();
      } else {
        alert("Failed to delete item. Please try again.");
      }
    } else {
      // For guest user: update localStorage directly
      const updatedItems = cartItems.filter(item => !(item.product_id === productId && item.weight === weight));
      setCartItems(updatedItems);
      updateCartInLocalStorage(updatedItems);
      refreshCart();
    }
  };

  const updateCartInLocalStorage = (updatedItems) => {
    try {
      localStorage.setItem('guest_cart_items', JSON.stringify(updatedItems));
      console.log("Guest cart updated successfully.");
    } catch (error) {
      console.error("Failed to update guest cart:", error);
    }
  };

  const calculateDiscount = () => {
    const totalQuantity = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
    const total = parseFloat(calculateTotal());

    if (totalQuantity >= 4) {
      return (total * 0.10).toFixed(2); // 10% discount
    } else if (totalQuantity >= 2) {
      return (total * 0.05).toFixed(2); // 5% discount
    }
    return '0.00';
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => {
        const price = typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[^\d.]/g, ''))
          : Number(item.price);
        const quantity = Number(item.quantity);
        return acc + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateFinalTotal = () => {
    const total = parseFloat(calculateTotal());
    const discount = parseFloat(calculateDiscount());
    return (total - discount).toFixed(2);
  };

  const handleProceedToCheckout = async () => {
    try {
      await axios.post(`${baseURL}/shiprocket-login`);
      const checkoutData = {
        cartItems: cartItems.map(item => ({
          ...item,
          price: item.price.toString(),
          originalPrice: item.originalPrice?.toString() || null,
          quantity: item.quantity.toString()
        })),
        summary: {
          totalPrice: calculateTotal(), 
          totalDiscount: calculateDiscount(), 
          orderTotal: calculateFinalTotal() 
        }
      };
      navigate('/checkout', { state: checkoutData });
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to proceed to checkout. Please try again.');
    }
  };


  // const handleProceedToCheckout = async () => {
  //   const checkoutData = {
  //     cartItems: cartItems.map(item => ({
  //       ...item,
  //       price: item.price.toString(),
  //       originalPrice: item.originalPrice?.toString() || null,
  //       quantity: item.quantity.toString()
  //     })),
  //     summary: {
  //       totalPrice: calculateTotal(),
  //       totalDiscount: calculateDiscount(),
  //       orderTotal: calculateFinalTotal()
  //     }
  //   };
    
  //   navigate('/checkout', { state: checkoutData });
  // };


  if (loading) {
    return (
      <>
        <Loading isLoading={loading} />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <WhatApp />
        <Container className="wishlist-page-container text-center py-5">
          <div className="empty-wishlist-container">
            <LuShoppingCart className="empty-wishlist-icon mb-3" size={78} />
            <h2 className="wishlist-page-title fw-bold mb-3">Your Cart is Empty</h2>
            <p className="text-muted">Looks like you haven't added any products to your cart yet.</p>
            <button
              style={{ backgroundColor: '#f76f2f', borderColor: '#f76f2f' }}
              className="btn text-white mt-3"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <WhatApp />
      <div className="shoppingcart-header container my-5 py-4">
        <h2 className="fw-bold mb-4 mt-2">
          Your Shopping Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} item{cartItems.reduce((sum, item) => sum + item.quantity, 0) !== 1 ? 's' : ''})
        </h2>
        <div className="row g-4">
          <div className="col-md-8">
            <div className="card p-4 shadow-sm">
              <h4 className="fw-bold mb-3 pb-2 border-bottom">Cart Items</h4>
              <div>
                {cartItems.map((item, index) => (
                  <div key={`${item.product_id}-${item.weight}`} className="d-flex align-items-center py-3 border-bottom">
                    <div
                      className="me-4 flex-shrink-0"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #eee'
                      }}
                    >
                      {item.image ? (
                        <img
                          src={`${baseURL}${item.image}`}
                          alt={item.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg'; // optional fallback
                          }}
                        />
                      ) : (
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>No Image</span>
                      )}

                    </div>
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>{item.weight || 'N/A'}</p>
                      <p className="fw-bold mb-2" style={{ color: '#c65300', fontSize: '1.1rem' }}>
                        ₹{item.price.toFixed(2)}
                      </p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.product_id, item.weight, -1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="form-control text-center mx-2"
                          style={{ width: '60px' }}
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.product_id, item.weight, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      className="ms-auto text-end d-flex flex-column justify-content-between align-items-end"
                      style={{ minHeight: '100px' }}
                    >
                      <p className="fw-bold" style={{ color: '#c65300', fontSize: '1.2rem' }}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => handleDeleteItem(item.product_id, item.weight)}
                      >
                        <i className="bi bi-trash" style={{ fontSize: '1.2rem' }}></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {cartItems.length > 0 && (
                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h4 className="fw-bold mb-3 pb-2 border-bottom">Order Summary</h4>
              <div className="d-flex justify-content-between mt-3 mb-1">
                <span>Total Price</span>
                <span> + ₹{calculateTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="summary-label">Total Discount</span>
                <span className="summary-value text-success"> - ₹{calculateDiscount()}</span>
              </div>

              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Order Total</span>
                <span>₹{calculateFinalTotal()}</span>
              </div>
              <button
                className="btn w-100 mt-4 py-2"
                style={{ backgroundColor: '#c65300', color: 'white', border: 'none', borderRadius: '25px' }}
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>

              <button
                className="btn btn-outline-secondary w-100 mt-2 py-2"
                style={{ borderRadius: '25px' }}
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}