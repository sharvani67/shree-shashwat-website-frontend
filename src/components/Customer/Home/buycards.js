import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge,Modal, Form } from "react-bootstrap";
import {
  FaHeart,
  FaCartPlus,
  FaShoppingBag,
  FaStar,
  FaRegStar,
  FaFire,
  FaLeaf,
  FaPepperHot,
  FaSeedling,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatApp from "../../Customer/WhatsApp/WhatApp";
import { useAuth } from "../../AuthContext/AuthContext";
import { useCart } from "../../AuthContext/CartContext";
import { useWishlist } from "../../AuthContext/WishlistContext";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';
import BulkOrderSection from "../AboutUs/EventOrderSection";
import axios from 'axios';
import baseURL from "../../Api/Api";

const MasalaPastes = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

  const iconMap = {
    Bestseller: <FaFire className="text-danger" />,
    Premium: <FaLeaf className="text-success" />,
    New: <FaPepperHot className="text-warning" />,
    Organic: <FaSeedling className="text-info" />,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/get/products`);

        if (response.data.success) {
          const productList = response.data.data.map(product => {
            const parsedRating = parseFloat(product.rating) || 0;

            let priceToUse = parseFloat(product.price) || 0;
            let originalPriceToUse = product.originalPrice ? parseFloat(product.originalPrice) : null;
            let weightToUse = product.weight || "";

            if (product.weightOptions && product.weightOptions.length > 0) {
              priceToUse = parseFloat(product.weightOptions[0].price) || 0;
              originalPriceToUse = product.weightOptions[0].originalPrice ?
                parseFloat(product.weightOptions[0].originalPrice) : null;
              weightToUse = product.weightOptions[0].weight || "";
            }

            return {
              id: product.id.toString(),
              name: product.name,
              description: product.description,
              tag: product.tag,
              icon: product.icon,
              rating: parsedRating,
              spicyLevel: product.spicyLevel,
              price: priceToUse,
              originalPrice: originalPriceToUse,
              weight: weightToUse,
              images: product.images || [],
              image: product.image || "/uploads/default-product.jpg",
              weightOptions: product.weightOptions || [],
              createdAt: product.createdAt
            };
          });

          setProducts(productList);
          console.log("Products=", productList)
        } else {
          console.error("Failed to fetch products:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCartClick = (product) => {
      setSelectedProduct(product);
      setQuantity(1); // Reset quantity to 1 when opening modal
      setShowAddToCartModal(true);
    };
  
    const handleQuantityChange = (newQuantity) => {
      if (newQuantity < 1) return;
      if (newQuantity > 20) {
        Swal.fire({
          icon: 'warning',
          title: 'Maximum Quantity Reached',
          text: 'You can add up to 20 items at a time',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
        });
        return;
      }
      setQuantity(newQuantity);
    };
  
    const confirmAddToCart = async () => {
      if (!selectedProduct) return;
      
      const productToAdd = {
        ...selectedProduct,
        quantity: quantity
      };
  
      await addToCart(productToAdd);
      setShowAddToCartModal(false);
    };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStar key="half" className="text-warning" style={{ opacity: 0.5 }} />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" />);
    }

    return stars;
  };

  const addToCart = async (product) => {
    if (!currentUser) {
      // Handle guest cart using localStorage
      const guestCart = JSON.parse(
        localStorage.getItem("guest_cart_items") || "[]"
      );

      // Check if product already exists in cart with same weight
      const existingItemIndex = guestCart.findIndex(
        (item) =>
          item.product_id === product.id && item.weight === product.weight
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        guestCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        guestCart.push({
          product_id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          weight: product.weight,
          quantity: quantity,
          addedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem("guest_cart_items", JSON.stringify(guestCart));
      refreshCart();
      Swal.fire({
        icon: 'success',
        title: '🛒 Added to Cart!',
        html: `<strong>${product.name}</strong> (${product.weight}) has been added to your cart.`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
        backdrop: true,
        allowOutsideClick: false,
      });
      return;
    }

    // Final sanity check for product data
    if (isNaN(product.price) || product.price <= 0) {
      console.error(
        "Attempted to add item with invalid price (final check):",
        product.name,
        product.price
      );
      alert(
        "Cannot add to cart: Product price is invalid or zero. Please check product data."
      );
      return;
    }

    // Prepare cart item data for API
    const cartItemData = {
      customer_id: currentUser.uid,
      product_id: product.id,
      name: product.name,
      image: product.image,
      originalPrice: product.originalPrice || null,
      price: product.price,
      quantity: quantity,
      weight: product.weight || ""
    };

    try {
      // Make API call to add to cart
      const response = await axios.post(`${baseURL}/cart-items`, cartItemData);

      // More flexible success check - either response.data.success exists and is true,
      // or if it doesn't exist, assume success if we got a 200 response
      if (response.data?.success !== false) {
        refreshCart();
        Swal.fire({
          icon: 'success',
          title: '🛒 Added to Cart!',
          html: `<strong>${product.name}</strong> (${product.weight}) has been added to your cart.`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
          backdrop: true,
          allowOutsideClick: false,
        });
      } else {
        // If explicitly success: false in response
        throw new Error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Only show error if it's not a 200 response
      if (error.response?.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add to Cart',
          text: error.response?.data?.message || 'Please try again',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
        });
      } else {
        // If we get here, it means the request succeeded (status 200) but maybe the response format is unexpected
        refreshCart();
        Swal.fire({
          icon: 'success',
          title: '🛒 Added to Cart!',
          html: `<strong>${product.name}</strong> (${product.weight}) has been added to your cart.`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
          backdrop: true,
          allowOutsideClick: false,
        });
      }
    }
  };

  const addToWishlist = async (product) => {
    // Determine the image to use - prioritize product.image, fall back to mainImage if available
    const productImage = product.image

    if (!currentUser) {
      // Handle guest wishlist
      const guestWishlist = JSON.parse(
        localStorage.getItem("guest_wishlist_items") || "[]"
      );

      const existingIndex = guestWishlist.findIndex(
        item => item.product_id === product.id
      );

      if (existingIndex !== -1) {
        // Remove from wishlist
        const updatedWishlist = guestWishlist.filter(
          item => item.product_id !== product.id
        );
        localStorage.setItem(
          "guest_wishlist_items",
          JSON.stringify(updatedWishlist)
        );
        setWishlistItems(updatedWishlist);
        Swal.fire({
          icon: 'success',
          title: '❤️ Removed from Wishlist!',
          html: `<strong>${product.name}</strong> removed from wishlist!`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f', // Optional: match your brand color
          backdrop: true,
          allowOutsideClick: false,
        });
      } else {
        // Add to wishlist
        const wishlistItem = {
          product_id: product.id,
          name: product.name,
          price: parseFloat(product.price) || 0,
          original_price: product.originalPrice ? parseFloat(product.originalPrice) : parseFloat(product.price),
          image: productImage,
          weight: product.weight || "",
          description: product.description || "",
          added_at: new Date().toISOString()
        };

        const updatedWishlist = [...guestWishlist, wishlistItem];
        localStorage.setItem(
          "guest_wishlist_items",
          JSON.stringify(updatedWishlist)
        );
        setWishlistItems(updatedWishlist);
        Swal.fire({
          icon: 'success',
          title: '❤️ Added to Wishlist!',
          html: `<strong>${product.name}</strong> added to wishlist!`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f', // Optional: match your brand color
          backdrop: true,
          allowOutsideClick: false,
        });
      }

      refreshWishlist();
      return;
    }

    try {
      // Check if already in wishlist
      const checkResponse = await axios.get(
        `${baseURL}/wishlist/check/${currentUser.uid}/${product.id}`
      );

      if (checkResponse.data.exists) {
        // Remove from wishlist
        await axios.delete(`${baseURL}/wishlist/${checkResponse.data.wishlistItemId}`);

        // Update local state
        setWishlistItems(prev =>
          prev.filter(item => item.id !== checkResponse.data.wishlistItemId)
        );
        Swal.fire({
          icon: 'success',
          title: '❤️ Removed from Wishlist!',
          html: `<strong>${product.name}</strong> removed from wishlist!`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f', // Optional: match your brand color
          backdrop: true,
          allowOutsideClick: false,
        });
      } else {
        // Add to wishlist
        const wishlistData = {
          customer_id: currentUser.uid,
          product_id: product.id,
          name: product.name,
          image: productImage,
          original_price: product.originalPrice ? parseFloat(product.originalPrice) : parseFloat(product.price),
          price: parseFloat(product.price) || 0,
          quantity: 1,
          weight: product.weight || "",
          description: product.description || ""
        };

        const response = await axios.post(`${baseURL}/wishlist`, wishlistData);

        // Update local state with the complete wishlist item data
        setWishlistItems(prev => [...prev, {
          ...wishlistData,
          id: response.data.data.id,
          added_at: response.data.data.added_at
        }]);

        Swal.fire({
          icon: 'success',
          title: '❤️ Added to Wishlist!',
          html: `<strong>${product.name}</strong> added to wishlist!`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f', // Optional: match your brand color
          backdrop: true,
          allowOutsideClick: false,
        });
      }

      refreshWishlist();
    } catch (error) {
      console.error("Error managing wishlist:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update wishlist',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    const fetchWishlistItems = async () => {
      console.log("Fetching wishlist items...");
      setLoading(true);

      try {
        if (currentUser?.uid) {
          console.log(`Fetching wishlist for user UID: ${currentUser.uid}`);
          const response = await axios.get(`${baseURL}/wishlist/${currentUser.uid}`);
          console.log("Response received:", response.data);

          if (response.data.success) {
            console.log("Wishlist data:", response.data.data);
            setWishlistItems(response.data.data || []);
          } else {
            console.warn("Failed to fetch wishlist items. Response:", response.data);
            setWishlistItems([]);
          }
        } else {
          console.log("Fetching guest wishlist from localStorage...");
          const guestWishlist = JSON.parse(localStorage.getItem("guest_wishlist_items")) || [];
          console.log("Guest wishlist:", guestWishlist);
          setWishlistItems(guestWishlist);
        }
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setWishlistItems([]);
      } finally {
        setLoading(false);
        console.log("Wishlist loading complete.");
      }
    };

    fetchWishlistItems();
  }, [currentUser, refreshWishlist]);


  const handleBuyClick = async (product) => {
    try {
      await axios.post(`${baseURL}/shiprocket-login`);
      navigate(`/buynow/${product.id.toString()}`, {
        state: {
          product: product,
          selectedWeightOption: product.selectedWeightOption
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      alert('Shiprocket login failed!');
    }
  };

  // const handleBuyClick = async (product) => {
  //   navigate(`/buynow/${product.id}`);
  // };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product_id.toString() === productId.toString());
  };


  if (loading) {
    return (
      <>
        <Loading isLoading={loading} />
      </>
    );
  }

  return (
    <>
      {/* <Header /> */}
      {/* <WhatApp /> */}
      <Container className="my-5 py-4" style={{ maxWidth: "1200px" }}>
        <div className="text-center mb-5">
          <h1
            className="display-5 fw-bold mb-3"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "#C1440E",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              position: "relative",
              display: "inline-block",
            }}
          >
            Our Gojju
            <span
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #C1440E, #FFA500)",
                borderRadius: "2px",
              }}
            ></span>
          </h1>
          <p className="text-muted">
            SouthSutra is not just about food. It’s about the feeling you get
            when you eat something made with love-like at home. Simple &
            pure, you can trust us just like your own kitchen.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} lg={3}>
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
                <div style={{ position: "relative", height: "200px" }}>
                  <Card.Img
                    variant="top"
                    src={`${baseURL}${product.image}`}  // ⬅️ Now baseURL is applied here only
                    alt={product.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';  // fallback image if image fails to load
                    }}
                    onClick={() => navigate(`/viewdetails/${product.id}`)}
                  />

                  {product.tag && (
                    <Badge
                      pill
                      bg="danger"
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        fontSize: "0.7rem",
                        padding: "5px 10px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      }}
                    >
                      {product.tag}
                    </Badge>
                  )}
                </div>

                <Card.Body className="p-3 d-flex flex-column text-start">
                  <div className="mb-2">
                    <Card.Title
                      className="h6 fw-bold mb-1"
                      style={{ color: "#333", fontSize: "1rem" }}
                    >
                      {product.name}
                    </Card.Title>

                    <Card.Subtitle
                      className="mb-2 text-muted"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {product.weight}
                    </Card.Subtitle>

                    <div className="d-flex align-items-center mb-2">
                      {renderStars(product.rating)}
                      <span
                        className="ms-2 text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        ({(typeof product.rating === 'number' ? product.rating : 0).toFixed(1)})
                      </span>
                    </div>

                    {/* <div className="d-flex align-items-center mb-2">
        <span className="me-2" style={{ fontSize: "0.8rem" }}>
          Spice:
        </span>
        {[...Array(5)].map((_, i) => (
          <FaPepperHot
            key={i}
            className={i < product.spicyLevel ? "text-danger" : "text-secondary"}
            style={{ opacity: i < product.spicyLevel ? 1 : 0.3 }}
            size={12}
          />
        ))}
      </div> */}

                    <Card.Text
                      className="text-start"
                      style={{
                        fontSize: "0.85rem",
                        color: "#555",
                        minHeight: "40px",
                      }}
                    >
                      {product.description}
                    </Card.Text>
                  </div>

                  <div className="mt-auto">
                    <div className="d-flex align-items-center mb-3">
                      <span
                        className="fw-bold text-danger me-2"
                        style={{ fontSize: "1.1rem" }}
                      >
                        ₹
                        {typeof product.price === "number" && !isNaN(product.price)
                          ? product.price.toFixed(2)
                          : "N/A"}
                      </span>
                      {/* {product.originalPrice !== null &&
          typeof product.originalPrice === "number" &&
          !isNaN(product.originalPrice) && (
            <span
              className="text-decoration-line-through text-muted"
              style={{ fontSize: "0.8rem" }}
            >
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )} */}
                    </div>

                    <div className="d-flex justify-content-between gap-2 mb-3">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                        style={{ borderRadius: "20px" }}
                        onClick={() => handleAddToCartClick(product)}
                      >
                        <FaCartPlus size={14} /> Add
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                        style={{ borderRadius: "20px" }}
                        onClick={() => handleBuyClick(product)}
                      >
                        <FaShoppingBag size={14} /> Buy
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          color: isInWishlist(product.id) ? '#dc3545' : 'inherit'
                        }}
                        onClick={() => addToWishlist(product)}
                      >
                        {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                      </Button>
                    </div>

                    <div className="text-center">
                      <a
                        className="text-decoration-none fw-semibold d-flex align-items-center justify-content-center gap-1"
                        style={{
                          fontSize: "0.85rem",
                          color: "#C1440E",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#e35f1c";
                          e.currentTarget.style.transform = "translateX(5px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#C1440E";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                        onClick={() => navigate(`/viewdetails/${product.id}`)}
                      >
                        View Details <span style={{ transition: "all 0.2s ease" }}>→</span>
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Add to Cart Modal */}
      <Modal show={showAddToCartModal} onHide={() => setShowAddToCartModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div className="d-flex align-items-center mb-4">
              <img
                src={`${baseURL}${selectedProduct.image}`}
                alt={selectedProduct.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "15px"
                }}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <div>
                <h6 className="mb-1">{selectedProduct.name}</h6>
                <p className="mb-1 text-muted small">{selectedProduct.weight}</p>
                <h5 className="text-danger mb-0">
                  ₹{selectedProduct.price.toFixed(2)}
                </h5>
              </div>
            </div>
          )}
          
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="mb-0">Quantity:</h6>
            <div className="d-flex align-items-center">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <FaMinus />
              </Button>
              <Form.Control
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                style={{
                  width: "60px",
                  textAlign: "center",
                  margin: "0 10px"
                }}
              />
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 20}
              >
                <FaPlus />
              </Button>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fw-bold">Total:</span>
            <span className="fw-bold text-danger fs-5">
              ₹{(selectedProduct?.price * quantity).toFixed(2)}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddToCartModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmAddToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <BulkOrderSection /> */}
      {/* <Footer /> */}
    </>
  );
};

export default MasalaPastes;
