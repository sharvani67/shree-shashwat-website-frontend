// Wishlist.js
import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatApp from '../../Customer/WhatsApp/WhatApp';
import { useAuth } from '../../AuthContext/AuthContext';
import { useWishlist } from '../../AuthContext/WishlistContext';
import { useCart } from '../../AuthContext/CartContext';
import { FaHeart, FaCartPlus, FaShoppingBag, FaStar, FaRegStar } from 'react-icons/fa';
import { LuHeartOff } from "react-icons/lu";
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import baseURL from "../../Api/Api";

const Wishlist = () => {
  const { currentUser } = useAuth();
  const { refreshWishlist, isInWishlist } = useWishlist();
  const { refreshCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setLoading(true);
      try {
        if (currentUser?.uid) {
          const response = await axios.get(`${baseURL}/wishlist/${currentUser.uid}`);
          if (response.data.success) {
            setWishlistItems(response.data.data || []);
          } else {
            setWishlistItems([]);
          }
        } else {
          const guestWishlist = JSON.parse(localStorage.getItem("guest_wishlist_items")) || [];
          setWishlistItems(guestWishlist);
        }
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [currentUser, refreshWishlist]);

  const removeFromWishlist = async (productId) => {
    try {
      if (currentUser?.uid) {
        // First find the wishlist item ID
        const itemToRemove = wishlistItems.find(item =>
          (item.product_id === productId || item.id === productId)
        );

        if (itemToRemove?.id) {
          await axios.delete(`${baseURL}/wishlist/${itemToRemove.id}`);
        }
        setWishlistItems(prev => prev.filter(item =>
          item.product_id !== productId && item.id !== productId
        ));
      } else {
        const guestWishlist = JSON.parse(localStorage.getItem("guest_wishlist_items")) || [];
        const updatedWishlist = guestWishlist.filter(item => item.product_id !== productId);
        localStorage.setItem("guest_wishlist_items", JSON.stringify(updatedWishlist));
        setWishlistItems(updatedWishlist);
      }

      refreshWishlist();
      Swal.fire({
        icon: 'success',
        title: '❤️ Removed from Wishlist!',
        html: `Item removed from wishlist!`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f', // Optional: match your brand color
        backdrop: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove item from wishlist',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    }
  };

  const addToCart = async (product) => {
    if (!currentUser) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to add items to your cart.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    try {
      const cartItemData = {
        customer_id: currentUser.uid,
        product_id: product.product_id || product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.original_price || product.price,
        price: product.price,
        quantity: 1,
        weight: product.weight || ""
      };

      const response = await axios.post(`${baseURL}/cart-items`, cartItemData);

      if (response.data?.success !== false) {
        refreshCart();

        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          html: `<strong>${product.name}</strong> has been added to your cart.`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add item to cart',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    }
  };

  const handleBuyClick = async (productId) => {
    try {
      await axios.post(`${baseURL}/shiprocket-login`);
      navigate(`/buynow/${productId}`);
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to initiate purchase',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    }
  };

  // const handleBuyClick = async (productId) => {
  //   navigate(`/buynow/${productId}`);
  // };

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (wishlistItems.length === 0) {
    return (
      <>
        <Header />
        <WhatApp />
        <Container className="wishlist-page-container text-center py-5">
          <div className="empty-wishlist-container">
            <LuHeartOff className="empty-wishlist-icon mb-3" size={48} />
            <h2 className="wishlist-page-title fw-bold mb-3">Your Wishlist is Empty</h2>
            <p className="text-muted">Looks like you haven't added any products to your wishlist yet.</p>
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
      <Container className="wishlist-page-container">
        <h2 className="wishlist-page-title fw-bold mb-4 mt-2">
          Your Wishlist ({wishlistItems.length})
        </h2>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {wishlistItems.map((item) => (
            <Col key={item.product_id} xs={12} sm={6} lg={3}>
              <Card
                className="shadow-sm h-100 border-0"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  background: "#fffdf9",
                  border: "1px solid rgba(193, 68, 14, 0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 20px rgba(193, 68, 14, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{ position: "relative" }}>
                  <Card.Img
                    variant="top"
                    src={`${baseURL}${item.image}`}
                    alt={item.name}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>

                <div className="p-3 d-flex flex-column my-orders-card-body">
                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <Card.Title
                        className="h6 fw-bold mb-1"
                        style={{ color: "#333", fontSize: "1rem" }}
                      >
                        {item.name}
                      </Card.Title>
                    </div>
                    <Card.Subtitle
                      className="mb-2 text-muted"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.weight}
                    </Card.Subtitle>

                    <Card.Text
                      style={{
                        fontSize: "0.85rem",
                        color: "#555",
                        minHeight: "40px",
                      }}
                    >
                      {item.description || "No description available"}
                    </Card.Text>

                    <div className="d-flex align-items-center mb-3">
                      <span
                        className="fw-bold text-danger me-2"
                        style={{ fontSize: "1.1rem" }}
                      >
                        ₹
                        {item.price}
                      </span>
                      {/* {item.originalPrice && (
                        <span
                          className="text-decoration-line-through text-muted"
                          style={{ fontSize: "0.8rem" }}
                        >
                          ₹{Number(item.originalPrice).toFixed(2)}
                        </span>
                      )} */}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between gap-2 mb-3">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                        style={{ borderRadius: "20px" }}
                        onClick={() => addToCart(item)}
                      >
                        <FaCartPlus size={14} /> Add
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                        style={{ borderRadius: "20px" }}
                        onClick={() => handleBuyClick(item.product_id)}
                      >
                        <FaShoppingBag size={14} /> Buy
                      </Button>
                      <button
                        className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => removeFromWishlist(item.product_id)}
                      >
                        <FaHeart className="text-danger" size={18} />
                      </button>

                    </div>

                    <div className="text-center mb-3">
                      <a
                        className="text-decoration-none fw-semibold d-flex align-items-center justify-content-center gap-1"
                        style={{
                          fontSize: "0.85rem",
                          color: "#C1440E",
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#e35f1c";
                          e.currentTarget.style.transform = "translateX(5px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#C1440E";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                        onClick={() => navigate(`/viewdetails/${item.product_id}`)}
                      >
                        View Details <span style={{ transition: "all 0.2s ease" }}>→</span>
                      </a>
                    </div>

                    <button
                      className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                      onClick={() => removeFromWishlist(item.product_id)}
                    >
                      <LuHeartOff className="me-2" /> Remove from Wishlist
                    </button>
                  </div>
                </div>
              </Card>
            </Col>

          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Wishlist;