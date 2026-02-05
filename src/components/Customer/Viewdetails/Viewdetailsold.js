import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import Header from "../Header/Header"; // Assuming this is the correct path for the general Header
import "./Viewdetails.css";
import WhatApp from "../../Customer/WhatsApp/WhatApp";
import { useAuth } from "../../AuthContext/AuthContext";
import { useCart } from "../../AuthContext/CartContext";
import { useWishlist } from "../../AuthContext/WishlistContext";
import { Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function Viewdetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedWeightOption, setSelectedWeightOption] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct({ ...productData, id });
          if (
            productData.weightOptions &&
            productData.weightOptions.length > 0
          ) {
            setSelectedWeightOption(productData.weightOptions[0]);
          }
        } else {
          console.error("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
          else {
            setWishlistItems([]); // Ensure empty if no doc exists
          }
        } catch (error) {
          console.error("Error fetching wishlist items:", error);
        }
      }
    };
    fetchWishlistItems();
  }, [currentUser]);

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert("Please login to add items to your cart.");
      return;
    }

    if (!selectedWeightOption) {
      alert("Please select a weight option for the product.");
      return;
    }

    const cartRef = doc(db, "cart_items", currentUser.uid);
    try {
      const cartSnap = await getDoc(cartRef);
      let updatedItems = [];

      const itemToAdd = {
        product_id: id,
        name: product.name,
        price: selectedWeightOption.price,
        image: product.images?.[0] || "", // <-- Use first image from images array
        weight: selectedWeightOption.weight,
        quantity: quantity,
        originalPrice: selectedWeightOption.originalPrice || null,
      };

      if (cartSnap.exists()) {
        const existingItems = cartSnap.data().items || [];
        const index = existingItems.findIndex(
          (item) =>
            item.product_id === id &&
            item.weight === selectedWeightOption.weight
        );
        if (index !== -1) {
          existingItems[index].quantity += quantity;
        } else {
          existingItems.push(itemToAdd);
        }
        updatedItems = existingItems;
      } else {
        updatedItems = [itemToAdd];
      }

      await setDoc(cartRef, { items: updatedItems });
      refreshCart();
      alert(`${product.name} (${selectedWeightOption.weight}) added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
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

      const wishlistProduct = {
        product_id: id,
        name: product.name || "",
        price: product.price || product.weightOptions?.[0]?.price || 0,
        originalPrice:
          product.originalPrice ||
          product.weightOptions?.[0]?.originalPrice ||
          0,
        image: product.images?.[0] || "", // <-- Use first image from images array
        weight: product.weight || product.weightOptions?.[0]?.weight || "",
        description: product.description || "",
        spicyLevel: product.spicyLevel || 0,
        tag: product.tag || "",
        quantity: 1,
        addedAt: new Date().toISOString(),
      };

      if (wishlistSnap.exists()) {
        const existingItems = wishlistSnap.data().items || [];
        const productIndex = existingItems.findIndex(
          (item) => item.product_id === id
        );

        if (productIndex !== -1) {
          const updatedItems = existingItems.filter(
            (item) => item.product_id !== id
          );
          await updateDoc(wishlistRef, {
            items: updatedItems,
          });
          setWishlistItems(updatedItems);
          alert(`${product.name} removed from wishlist!`);
        } else {
          await updateDoc(wishlistRef, {
            items: arrayUnion(wishlistProduct),
          });
          setWishlistItems([...existingItems, wishlistProduct]);
          alert(`${product.name} added to wishlist!`);
        }
      } else {
        await setDoc(wishlistRef, {
          userId: currentUser.uid,
          items: [wishlistProduct],
        });
        setWishlistItems([wishlistProduct]);
        alert(`${product.name} added to wishlist!`);
      }
      refreshWishlist();
    } catch (error) {
      console.error("Error managing wishlist:", error);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  const handleBuyClick = (productId) => {
    if (!selectedWeightOption) {
      alert("Please select a weight option for the product.");
      return;
    }
    const weightOptionParam = encodeURIComponent(
      JSON.stringify(selectedWeightOption)
    );
    navigate(`/buynow/${productId}?weightOption=${weightOptionParam}`);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container my-5">Loading...</div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="container my-5">Product not found.</div>
      </>
    );
  }

  const { name, description, spicyLevel, rating, tag, weightOptions } = product;

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? "#ffc107" : "#e4e5e9" }}>
        ★
      </span>
    ));
  };

  const renderChillies = (count) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{ color: i < count ? "red" : "#e4e5e9", fontSize: "1.2rem" }}
      >
        🌶
      </span>
    ));
  };

  return (
    <>
      <Header />
      <WhatApp />
      <div className="container my-5 pt-5 viewdetails">
        <div className="row">
          <div className="col-md-6">
            {product.images && product.images.length > 0 ? (
              <div>
                <div className="main-image mb-3">
                  <img
                    src={product.images[0]}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  {product.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumbnail-${idx}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="text-muted"
                style={{
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e9ecef",
                }}
              >
                No images available
              </div>
            )}
          </div>

          <div className="col-md-6">
            <h2 className="text-danger">{name}</h2>
            <div className="mb-2">
              {tag && <span className="badge bg-success me-2">{tag}</span>}
            </div>

            <div
              className="mb-3 p-3 border rounded"
              style={{ background: "#fff" }}
            >
              <label
                className="form-label fw-bold d-flex align-items-center mb-3"
                style={{ color: "#c65300" }}
              >
                <i className="bi bi-bag me-2"></i> Select Weight:
              </label>
              <div className="d-flex gap-3 flex-wrap">
                {weightOptions &&
                  weightOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`btn ${
                        selectedWeightOption?.weight === option.weight
                          ? "btn-selected"
                          : "btn-unselected"
                      }`}
                      onClick={() => setSelectedWeightOption(option)}
                    >
                      {option.weight}
                    </button>
                  ))}
              </div>
            </div>

            <div className="d-flex align-items-center mb-2">
              <h4 className="me-3 text-dark">
                {selectedWeightOption
                  ? `₹${selectedWeightOption.price.toFixed(2)}`
                  : "N/A"}
              </h4>
              {selectedWeightOption?.originalPrice && (
                <del className="text-muted">
                  ₹{selectedWeightOption.originalPrice.toFixed(2)}
                </del>
              )}
            </div>

            <div className="mb-3">
              <strong>Rating:</strong> {renderStars(Math.round(rating))} (
              {rating})
            </div>

            <div className="mb-3">
              <strong>Spicy Level:</strong> {renderChillies(spicyLevel)}
            </div>

            <div className="border p-3 mb-3">
              <h5>Description</h5>
              <p>{description}</p>
            </div>

            <div className="d-flex align-items-center mb-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-3">{quantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="d-flex gap-3">
              <button
                className="btn btn-danger flex-fill"
                onClick={handleAddToCart}
                disabled={!selectedWeightOption}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-warning flex-fill"
                disabled={!selectedWeightOption}
                onClick={() => handleBuyClick(id)}
              >
                Buy Now
              </button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                style={{ borderRadius: "50%", width: "36px", height: "36px" }}
                onClick={() => addToWishlist(product)}
              >
                {wishlistItems.some((item) => item.product_id === id) ? (
                  <FaHeart size={14} className="text-secondary" />
                ) : (
                  <FaRegHeart size={14} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
