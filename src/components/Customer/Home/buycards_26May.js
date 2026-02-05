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
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from "../../AuthContext/AuthContext";
import { useCart } from '../../AuthContext/CartContext';
import { useWishlist } from '../../AuthContext/WishlistContext';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MasalaPastes = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();
  // console.log("Current User Details:", currentUser); // Keep this for debugging auth if needed

  const iconMap = {
    Bestseller: <FaFire className="text-danger" />,
    Premium: <FaLeaf className="text-success" />,
    New: <FaPepperHot className="text-warning" />,
    Organic: <FaSeedling className="text-info" />,
  };

  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          // Initialize with default product data, ensuring numerical conversion
          let priceToUse = parseFloat(data.price) || 0; // Default to 0 if parsing fails
          let originalPriceToUse = parseFloat(data.originalPrice);
          let weightToUse = data.weight || ""; // Default to empty string if not present

          // If weightOptions exist, prioritize the first one's price and weight
          if (data.weightOptions && data.weightOptions.length > 0) {
            priceToUse = parseFloat(data.weightOptions[0].price) || 0; // Default to 0
            originalPriceToUse = parseFloat(
              data.weightOptions[0].originalPrice
            );
            weightToUse = data.weightOptions[0].weight || ""; // Default to empty string
          }

          // Ensure originalPriceToUse is null if it's NaN after parsing
          if (isNaN(originalPriceToUse)) {
            originalPriceToUse = null;
          }

          return {
            id: doc.id,
            ...data,
            price: priceToUse, // This should now always be a number
            originalPrice: originalPriceToUse, // This should now always be a number or null
            weight: weightToUse, // Use the default weight or the first weight option's weight
            // Keep the original weightOptions array for view details page or future use
            weightOptions: data.weightOptions || [],
          };
        });
        setProducts(productList);
        console.log(
          "Fetched and processed products (MasalaPastes):",
          productList
        ); // IMPORTANT: Check this log
      } catch (error) {
        console.error("Error fetching products:", error);
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
      alert("Please log in to add items to your cart.");
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
      alert(`${product.name} (${selectedWeight}) added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const addToWishlist = async (product) => {
    if (!currentUser) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    const wishlistRef = doc(db, "wishlist_items", currentUser.uid);

    try {
      const wishlistSnap = await getDoc(wishlistRef);

      // Ensure price and originalPrice are parsed to numbers for wishlist
      let wishlistPrice = parseFloat(product.price) || 0;
      let wishlistOriginalPrice = parseFloat(product.originalPrice);

      if (isNaN(wishlistOriginalPrice)) wishlistOriginalPrice = null;

      const wishlistProduct = {
        product_id: product.id,
        name: product.name,
        price: wishlistPrice,
        originalPrice: wishlistOriginalPrice,
        image: product.image,
        weight: product.weight || "", // Use the product's weight
        description: product.description,
        spicyLevel: product.spicyLevel,
        tag: product.tag,
        // Quantity in wishlist typically isn't managed like in cart, but keeping it if needed
        quantity: 1,
        addedAt: new Date().toISOString(),
      };

      if (wishlistSnap.exists()) {
        const existingItems = wishlistSnap.data().items || [];
        const productIndex = existingItems.findIndex(
          (item) => item.product_id === product.id
        );

        if (productIndex !== -1) {
          const updatedItems = existingItems.filter(
            (item) => item.product_id !== product.id
          );
          await updateDoc(wishlistRef, {
            items: updatedItems,
          });
          alert(`${product.name} removed from wishlist!`);
        } else {
          await updateDoc(wishlistRef, {
            items: arrayUnion(wishlistProduct),
          });
          alert(`${product.name} added to wishlist!`);
        }
      } else {
        await setDoc(wishlistRef, {
          userId: currentUser.uid,
          items: [wishlistProduct],
        });
        alert(`${product.name} added to wishlist!`);
      }

      const updatedWishlist = await getDoc(wishlistRef);
      setWishlistItems(
        updatedWishlist.exists() ? updatedWishlist.data().items : []
      );
      refreshWishlist();
    } catch (error) {
      console.error("Error managing wishlist:", error);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (currentUser?.uid) {
        try {
          const wishlistDoc = await getDoc(
            doc(db, "wishlist_items", currentUser.uid)
          );
          if (wishlistDoc.exists()) {
            setWishlistItems(wishlistDoc.data().items || []);
          }
        } catch (error) {
          console.error("Error fetching wishlist items:", error);
        }
      }
    };
    fetchWishlistItems();
  }, [currentUser]);

  const handleBuyClick = (product) => {
    navigate(`/buynow/${product.id}`);
  };

  return (
    <>
      <Header />
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
            Our Signature Masala Pastes
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
            Authentic regional flavors crafted with traditional recipes
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
                  e.currentTarget.style.boxShadow =
                    "0 12px 20px rgba(193, 68, 14, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{ position: "relative" }}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  {product.tag && (
                    <Badge
                      pill
                      bg="danger"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: "0.7rem",
                        padding: "5px 10px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      }}
                    >
                      {product.tag}
                    </Badge>
                  )}
                  {/* <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      background: "rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    {product.icon}
                  </div> */}
                </div>

                <Card.Body className="p-3 d-flex flex-column">
                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <Card.Title
                        className="h6 fw-bold mb-1"
                        style={{ color: "#333", fontSize: "1rem" }}
                      >
                        {product.name}
                      </Card.Title>
                    </div>
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
                        ({product.rating?.toFixed(1) || "0.0"}){" "}
                        {/* Safely display rating */}
                      </span>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2" style={{ fontSize: "0.8rem" }}>
                        Spice:
                      </span>
                      {[...Array(5)].map((_, i) => (
                        <FaPepperHot
                          key={i}
                          className={
                            i < product.spicyLevel
                              ? "text-danger"
                              : "text-secondary"
                          }
                          style={{ opacity: i < product.spicyLevel ? 1 : 0.3 }}
                          size={12}
                        />
                      ))}
                    </div>

                    <Card.Text
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
                      {/* Display the price dynamically based on what's set in state */}
                      <span
                        className="fw-bold text-danger me-2"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {/* Check if product.price is a valid number before toFixed */}
                        ₹
                        {typeof product.price === "number" &&
                          !isNaN(product.price)
                          ? product.price.toFixed(2)
                          : "N/A"}
                      </span>
                      {product.originalPrice !== null &&
                        typeof product.originalPrice === "number" &&
                        !isNaN(product.originalPrice) && (
                          <span
                            className="text-decoration-line-through text-muted"
                            style={{ fontSize: "0.8rem" }}
                          >
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                    </div>

                    <div className="d-flex justify-content-between gap-2 mb-3">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                        style={{ borderRadius: "20px" }}
                        onClick={() => addToCart(product)}
                      >
                        <FaCartPlus size={14} /> Add
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                        style={{ borderRadius: "20px" }}
                        onClick={handleBuyClick}
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
                        onClick={() => addToWishlist(product)}
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
                        onClick={() => navigate(`/viewdetails/${product.id}`)}
                      >
                        View Details{" "}
                        <span style={{ transition: "all 0.2s ease" }}>→</span>
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MasalaPastes;
