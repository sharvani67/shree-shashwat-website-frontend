import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
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
} from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Header from "../Header/AdminHeader";
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
// import BulkOrderSection from "../AboutUs/EventOrderSection";
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
              images: product.images.map(img => `${baseURL}${img}`),
              image: product.image ? `${baseURL}${product.image}` : `${baseURL}/uploads/default-product.jpg`,
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
        guestCart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        guestCart.push({
          product_id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          weight: product.weight,
          quantity: 1,
          addedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem("guest_cart_items", JSON.stringify(guestCart));
      refreshCart(); // This will update the cart context
      // alert(`${product.name} (${product.weight}) added to cart!`);
      Swal.fire({
        icon: 'success',
        title: '🛒 Added to Cart!',
        html: `<strong>${product.name}</strong> (${product.weight}) has been added to your cart.`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f', // Optional: match your brand color
        backdrop: true,
        allowOutsideClick: false,
      });
      return;
    }
    const cartRef = doc(db, "cart_items", currentUser.uid);

    // The product object passed here *should* already have valid numeric prices
    // due to the useEffect parsing. We'll still do a final check.
    let selectedPrice = product.price;
    let selectedOriginalPrice = product.originalPrice;
    let selectedWeight = product.weight;

    // Final sanity check, although useEffect should handle this now
    if (isNaN(selectedPrice) || selectedPrice <= 0) {
      console.error(
        "Attempted to add item with invalid price (final check):",
        product.name,
        selectedPrice
      );
      alert(
        "Cannot add to cart: Product price is invalid or zero. Please check product data."
      );
      return;
    }
    // Ensure originalPrice is null if it somehow became NaN here
    if (isNaN(selectedOriginalPrice)) selectedOriginalPrice = null;

    const cartProduct = {
      product_id: product.id,
      name: product.name,
      price: selectedPrice, // This is now guaranteed to be a number >= 0
      originalPrice: selectedOriginalPrice, // This is now guaranteed to be a number or null
      image: product.image,
      weight: selectedWeight,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    console.log("Attempting to add to cart:", cartProduct); // Log the product being added

    try {
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const existingItems = cartSnap.data().items || [];
        // Find existing item by both product_id AND weight for accurate merging
        const existingItemIndex = existingItems.findIndex(
          (item) =>
            item.product_id === cartProduct.product_id &&
            item.weight === cartProduct.weight
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...existingItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
          await updateDoc(cartRef, { items: updatedItems });
          console.log("Cart updated: Increased quantity for existing item.");
        } else {
          await updateDoc(cartRef, { items: arrayUnion(cartProduct) });
          console.log("Cart updated: Added new item.");
        }
      } else {
        await setDoc(cartRef, {
          userId: currentUser.uid,
          items: [cartProduct],
        });
        console.log("Cart created: First item added.");
      }
      refreshCart();
      Swal.fire({
        icon: 'success',
        title: '🛒 Added to Cart!',
        html: `<strong>${product.name}</strong> (${selectedWeight}) has been added to your cart.`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f', // Optional: match your brand color
        backdrop: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // const addToWishlist = async (product) => {
  //   if (!currentUser) {
  //     // Handle guest wishlist using localStorage
  //     let guestWishlist = JSON.parse(
  //       localStorage.getItem("guest_wishlist_items") || "[]"
  //     );

  //     // Check if product already exists
  //     const existingItemIndex = guestWishlist.findIndex(
  //       (item) => item.product_id === product.id
  //     );

  //     if (existingItemIndex !== -1) {
  //       // Remove item if it exists
  //       const updatedWishlist = guestWishlist.filter(
  //         (item) => item.product_id !== product.id
  //       );
  //       localStorage.setItem(
  //         "guest_wishlist_items",
  //         JSON.stringify(updatedWishlist)
  //       );
  //       setWishlistItems(updatedWishlist);
  //       Swal.fire({
  //         icon: 'success',
  //         title: '❤️ Removed from Wishlist!',
  //         html: `<strong>${product.name}</strong> removed from wishlist!`,
  //         confirmButtonText: 'OK',
  //         confirmButtonColor: '#f76f2f', // Optional: match your brand color
  //         backdrop: true,
  //         allowOutsideClick: false,
  //       });
  //       refreshWishlist();
  //     } else {
  //       // Add new item
  //       const wishlistProduct = {
  //         product_id: product.id,
  //         name: product.name,
  //         price: parseFloat(product.price) || 0,
  //         originalPrice: isNaN(parseFloat(product.originalPrice))
  //           ? null
  //           : parseFloat(product.originalPrice),
  //         image: product.image,
  //         weight: product.weight || "",
  //         description: product.description,
  //         spicyLevel: product.spicyLevel,
  //         tag: product.tag,
  //         quantity: 1,
  //         addedAt: new Date().toISOString(),
  //       };

  //       guestWishlist.push(wishlistProduct);
  //       localStorage.setItem(
  //         "guest_wishlist_items",
  //         JSON.stringify(guestWishlist)
  //       );
  //       setWishlistItems(guestWishlist);
  //       Swal.fire({
  //         icon: 'success',
  //         title: '❤️ Added to Wishlist!',
  //         html: `<strong>${product.name}</strong> added to wishlist!`,
  //         confirmButtonText: 'OK',
  //         confirmButtonColor: '#f76f2f', // Optional: match your brand color
  //         backdrop: true,
  //         allowOutsideClick: false,
  //       });
  //       refreshWishlist();
  //     }

  //     return;
  //   }

  //   // Continue with Firebase logic if user is logged in
  //   const wishlistRef = doc(db, "wishlist_items", currentUser.uid);

  //   try {
  //     const wishlistSnap = await getDoc(wishlistRef);

  //     const wishlistProduct = {
  //       product_id: product.id,
  //       name: product.name,
  //       price: parseFloat(product.price) || 0,
  //       originalPrice: isNaN(parseFloat(product.originalPrice))
  //         ? null
  //         : parseFloat(product.originalPrice),
  //       image: product.image,
  //       weight: product.weight || "",
  //       description: product.description,
  //       spicyLevel: product.spicyLevel,
  //       tag: product.tag,
  //       quantity: 1,
  //       addedAt: new Date().toISOString(),
  //     };

  //     if (wishlistSnap.exists()) {
  //       const existingItems = wishlistSnap.data().items || [];
  //       const productIndex = existingItems.findIndex(
  //         (item) => item.product_id === product.id
  //       );

  //       if (productIndex !== -1) {
  //         const updatedItems = existingItems.filter(
  //           (item) => item.product_id !== product.id
  //         );
  //         await updateDoc(wishlistRef, { items: updatedItems });
  //         Swal.fire({
  //           icon: 'success',
  //           title: '❤️ Removed from Wishlist!',
  //           html: `<strong>${product.name}</strong> removed from wishlist!`,
  //           confirmButtonText: 'OK',
  //           confirmButtonColor: '#f76f2f', // Optional: match your brand color
  //           backdrop: true,
  //           allowOutsideClick: false,
  //         });
  //       } else {
  //         await updateDoc(wishlistRef, { items: arrayUnion(wishlistProduct) });
  //         Swal.fire({
  //           icon: 'success',
  //           title: '❤️ Added to Wishlist!',
  //           html: `<strong>${product.name}</strong> added to wishlist!`,
  //           confirmButtonText: 'OK',
  //           confirmButtonColor: '#f76f2f', // Optional: match your brand color
  //           backdrop: true,
  //           allowOutsideClick: false,
  //         });
  //       }
  //     } else {
  //       await setDoc(wishlistRef, {
  //         userId: currentUser.uid,
  //         items: [wishlistProduct],
  //       });
  //       Swal.fire({
  //         icon: 'success',
  //         title: '❤️ Added to Wishlist!',
  //         html: `<strong>${product.name}</strong> added to wishlist!`,
  //         confirmButtonText: 'OK',
  //         confirmButtonColor: '#f76f2f', // Optional: match your brand color
  //         backdrop: true,
  //         allowOutsideClick: false,
  //       });
  //     }

  //     const updatedWishlist = await getDoc(wishlistRef);
  //     setWishlistItems(
  //       updatedWishlist.exists() ? updatedWishlist.data().items : []
  //     );
  //     refreshWishlist();
  //   } catch (error) {
  //     console.error("Error managing wishlist:", error);
  //     alert("Failed to update wishlist. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   const fetchWishlistItems = async () => {
  //     if (currentUser?.uid) {
  //       try {
  //         const wishlistDoc = await getDoc(
  //           doc(db, "wishlist_items", currentUser.uid)
  //         );
  //         if (wishlistDoc.exists()) {
  //           setWishlistItems(wishlistDoc.data().items || []);
  //         } else {
  //           setWishlistItems([]); // Ensure empty if no doc exists
  //         }
  //       } catch (error) {
  //         console.error("Error fetching wishlist items:", error);
  //         setWishlistItems([]);
  //       }
  //     } else {
  //       // Guest user: Load from localStorage
  //       try {
  //         const guestWishlist =
  //           JSON.parse(localStorage.getItem("guest_wishlist_items")) || [];
  //         setWishlistItems(guestWishlist);
  //       } catch (error) {
  //         console.error("Error reading guest wishlist:", error);
  //         setWishlistItems([]);
  //       }
  //     }
  //   };

  //   fetchWishlistItems();
  // }, [currentUser]);

  const handleBuyClick = async (product) => {
    try {
      await axios.post(`${baseURL}/shiprocket-login`);
      navigate(`/buynow/${product.id}`);
    } catch (error) {
      console.error('Login error:', error);
      alert('Shiprocket login failed!');
    }
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
      <Header />
      <WhatApp />
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
                <div style={{ position: "relative" , height: "200px" }}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{
                       height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                      onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                    
                    onClick={() => navigate(`/a-viewdetails/${product.id}`)}
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
                        // onClick={() => addToCart(product)}
                      >
                        <FaCartPlus size={14} /> Add
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                        style={{ borderRadius: "20px" }}
                        // onClick={() => handleBuyClick(product)}
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
                        }}
                        // onClick={() => addToWishlist(product)}
                      >
                        {wishlistItems.some(
                          (item) => item.product_id === product.id
                        ) ? (
                          <FaHeart size={14} className="text-secondary" />
                        ) : (
                          <FaRegHeart size={14} />
                        )}
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
                        onClick={() => navigate(`/a-viewdetails/${product.id}`)}
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
      {/* <BulkOrderSection /> */}
      <Footer />
    </>
  );
};

export default MasalaPastes;
