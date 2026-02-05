import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Viewdetails.css';
import WhatApp from '../../Customer/WhatsApp/WhatApp';
import { useAuth } from '../../AuthContext/AuthContext';
import { useCart } from '../../AuthContext/CartContext';
import { useWishlist } from '../../AuthContext/WishlistContext';
import { Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';
import ZoomImage from './ZoomImage';
import axios from 'axios';
import baseURL from "../../Api/Api";

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
  const [mainImage, setMainImage] = useState(product?.images?.[0] || '');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // In your Viewdetails component
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/getbyId/products/${id}`);
        const productData = response.data.data;

        // Transform the product data to match your existing structure
        const transformedProduct = {
          ...productData,
          id: productData.id.toString(),
          weightOptions: (productData.weightOptions || []).map(option => ({
            ...option,
            price: typeof option.price === 'number' ? option.price : parseFloat(option.price) || 0,
            originalPrice: option.originalPrice ?
              (typeof option.originalPrice === 'number' ? option.originalPrice : parseFloat(option.originalPrice)) :
              null
          })),
          images: productData.images || [] // Leave image paths as relative
        };


        setProduct(transformedProduct);

        if (transformedProduct.weightOptions?.length > 0) {
          setSelectedWeightOption(transformedProduct.weightOptions[0]);
        }
        if (transformedProduct.images?.length > 0) {
          setMainImage(transformedProduct.images[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToWishlist = async (product) => {
    // Determine the image to use - prioritize product.image, fall back to mainImage if available
    const productImage = product.image || (typeof mainImage !== 'undefined' ? mainImage : '');

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
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${baseURL}/feedback/product/${id}`);
        const result = await response.json();
        console.log("Feedback",result.data)

        if (result.success) {
          setReviews(result.data || []);
        } else {
          console.error('Failed to fetch reviews:', result.message);
          setReviews([]);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setLoading(true);

      try {
        if (currentUser?.uid) {
          const response = await axios.get(`${baseURL}/wishlist/${currentUser.uid}`);

          if (response.data.success) {
            setWishlistItems(response.data.data || []);
          } else {
            console.warn("Failed to fetch wishlist items. Response:", response.data);
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

  const handleAddToCart = async () => {
    if (!selectedWeightOption) {
      alert('Please select a weight option for the product.');
      return;
    }

    if (!currentUser) {
      // Handle guest cart using localStorage
      const guestCart = JSON.parse(
        localStorage.getItem("guest_cart_items") || "[]"
      );

      const existingItemIndex = guestCart.findIndex(
        (item) =>
          item.product_id === product.id &&
          item.weight === selectedWeightOption.weight
      );

      if (existingItemIndex >= 0) {
        guestCart[existingItemIndex].quantity += 1;
      } else {
        guestCart.push({
          product_id: product.id,
          name: product.name,
          price: selectedWeightOption.price,
          originalPrice: isNaN(selectedWeightOption.originalPrice) ? null : selectedWeightOption.originalPrice,
          image: mainImage || product.image,
          weight: selectedWeightOption.weight,
          quantity: 1,
          addedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem("guest_cart_items", JSON.stringify(guestCart));
      refreshCart();

      Swal.fire({
        icon: 'success',
        title: '🛒 Added to Cart!',
        html: `<strong>${product.name}</strong> (${selectedWeightOption.weight}) has been added to your cart.`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
        backdrop: true,
        allowOutsideClick: false,
      });
      return;
    }

    // Prepare payload for MySQL API
    const cartItemData = {
      customer_id: currentUser.uid,
      product_id: product.id,
      name: product.name,
      image: mainImage || product.image,
      originalPrice: isNaN(selectedWeightOption.originalPrice) ? null : selectedWeightOption.originalPrice,
      price: selectedWeightOption.price,
      quantity: quantity,
      weight: selectedWeightOption.weight,
    };

    try {
      const response = await axios.post(`${baseURL}/cart-items`, cartItemData);

      if (response.data?.success !== false) {
        refreshCart();
        Swal.fire({
          icon: 'success',
          title: '🛒 Added to Cart!',
          html: `<strong>${product.name}</strong> (${selectedWeightOption.weight}) has been added to your cart.`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
          backdrop: true,
          allowOutsideClick: false,
        });
      } else {
        throw new Error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add to Cart',
          text: error.response?.data?.message || 'Please try again',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
        });
      } else {
        refreshCart();
        Swal.fire({
          icon: 'success',
          title: '🛒 Added to Cart!',
          html: `<strong>${product.name}</strong> (${selectedWeightOption.weight}) has been added to your cart.`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
          backdrop: true,
          allowOutsideClick: false,
        });
      }
    }
  };



  const handleBuyClick = async (productId) => {
    if (!selectedWeightOption) {
      alert('Please select a weight option for the product.');
      return;
    }
    navigate(`/buynow/${productId}`, { state: { selectedWeightOption } });
  };

  const isInWishlist = (productId) => {
    if (currentUser) {
      return wishlistItems.some(item => item.product_id.toString() === productId.toString());
    } else {
      const guestWishlist = JSON.parse(
        localStorage.getItem("guest_wishlist_items") || "[]"
      );
      return guestWishlist.some(item => item.product_id === productId);
    }
  };

  if (loading) {
    return (
      <>
        <Loading isLoading={loading} />
      </>
    );
  }

  if (!product) return <><Header /><div className="container my-5">Product not found.</div></>;

  const { name, description, spicyLevel, rating, tag, weightOptions, images } = product;

  const renderStars = (count) => [...Array(5)].map((_, i) => (
    <span key={i} style={{ color: i < count ? '#ffc107' : '#e4e5e9' }}>★</span>
  ));

  const renderChillies = (count) => [...Array(5)].map((_, i) => (
    <span key={i} style={{ color: i < count ? 'red' : '#e4e5e9', fontSize: '1.2rem' }}>🌶</span>
  ));

  return (
    <>
      <Header />
      <WhatApp />
      <div className="container my-5 pt-5 viewdetails">
        <div className="row">
          {/* Image Section */}
          <div className="col-md-4 col-12 mb-4">
            <div
              className="border mb-3 mx-auto"
              style={{
                height: 'auto',
                maxWidth: '100%',
                backgroundColor: '#e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1 / 1',
              }}
            >
              <div className="magnifier-container w-100 h-100">
                <ZoomImage src={`${baseURL}${mainImage}`} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>

            <div
              className="d-grid"
              style={{
                gridTemplateColumns: `repeat(${images.length}, 1fr)`,
                gap: '8px',
              }}
            >
             {images.map((img, index) => (
  <img
    key={index}
    src={`${baseURL}${img}`}
    alt={`thumb-${index}`}
    onClick={() => setMainImage(img)}   //<--- FIXED
    style={{
      height: '50px',
      width: '100%',
      objectFit: 'cover',
      border: img === mainImage ? '2px solid #c65300' : '1px solid #ccc',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'border 0.3s',
    }}
  />
))}

            </div>


          </div>

          {/* Details Section */}
          <div className="col-md-8 col-12">
            <h2 className="text-danger">{name}</h2>
            {tag && <span className="badge bg-success me-2">{tag}</span>}

            <div className="d-flex align-items-center flex-wrap mb-3">
              <h4 className="me-3 text-dark">
                {selectedWeightOption ? `₹${Number(selectedWeightOption.price).toFixed(2)}` : 'N/A'}
              </h4>
              <div className="d-flex align-items-center mt-2 mt-md-0 ms-md-3">
                <button
                  className="btn btn-outline-secondary p-1"
                  style={{ width: '30px', height: '30px' }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  className="btn btn-outline-secondary p-1"
                  style={{ width: '30px', height: '30px' }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Weight Option */}
            {weightOptions && (
              <div className="mb-3 p-3 border rounded bg-white">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
                  <label className="form-label fw-bold" style={{ color: '#c65300' }}>
                    <i className="bi bi-bag me-2"></i> Select Weight:
                    <span
                      style={{
                        fontWeight: 'bold',
                        color: '#007bff',
                        backgroundColor: '#e6f0ff',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        border: '1px solid #007bff',
                        fontSize: '0.9rem',
                        marginLeft: '5px',
                      }}
                    >
                      {selectedWeightOption ? `${selectedWeightOption.weight}` : 'N/A'}
                    </span>
                  </label>
                  <div className="d-flex align-items-center mt-2 mt-md-0">
                    <span className="me-2">Rating:</span>
                    {renderStars(Math.round(rating))}
                    <span className="ms-1">({rating})</span>
                  </div>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  {weightOptions.map((option, i) => (
                    <button
                      key={i}
                      type="button"
                      className={selectedWeightOption?.weight === option.weight ? 'btn-selected' : 'btn-unselected'}
                      onClick={() => setSelectedWeightOption(option)}
                    >
                      {option.weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="border p-3 mb-3 rounded-3">
              <h5>Description</h5>
              <p>{description}</p>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-danger flex-fill" onClick={handleAddToCart} disabled={!selectedWeightOption}>
                Add to Cart
              </button>
              <button className="btn btn-warning flex-fill" onClick={() => handleBuyClick(id)} disabled={!selectedWeightOption}>
                Buy Now
              </button>

              <Button
                variant="outline-secondary"
                size="sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px' }}
                onClick={() => addToWishlist(product)}
              >
                {isInWishlist(id) ? (
                  <FaHeart size={14} className="text-danger" /> // Changed to text-danger
                ) : (
                  <FaRegHeart size={14} />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4">Customer Reviews</h3>

            {reviewsLoading ? (
              <div className="text-center">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="alert alert-info">No reviews yet. Be the first to review!</div>
            ) : (
              <div className="reviews-container">
                {reviews.map((review, index) => (
                  <div key={index} className="card mb-3 review-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
                        <div>
                          <h5 className="card-title mb-0">{review.user_name || 'Anonymous'}</h5>
                          <small className="text-muted">
                            {new Date(review.feedback_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </small>
                        </div>
                        <div className="text-warning mt-2 mt-md-0">
                          {renderStars(review.rating)}
                          <span className="ms-2 text-dark">{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="card-text mt-3">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}