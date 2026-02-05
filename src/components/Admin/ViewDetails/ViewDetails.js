import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import './ViewDetails.css';
import WhatApp from '../../Customer/WhatsApp/WhatApp';
import { useAuth } from '../../AuthContext/AuthContext';
import { useCart } from '../../AuthContext/CartContext';
import { useWishlist } from '../../AuthContext/WishlistContext';
import { Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';
import ZoomImage from '../ViewDetails/ZoomImage';
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
  const [mainImage, setMainImage] = useState(null);
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
          images: productData.images ?
            productData.images.map(img => img.startsWith('http') ? img : `${baseURL}${img}`) :
            []
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

  // Rest of the component remains exactly the same...
  // [Keep all other useEffect hooks and functions unchanged]
  // [Keep all the JSX rendering code unchanged]

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
      if (currentUser?.uid) {
        try {
          const wishlistDoc = await getDoc(doc(db, "wishlist_items", currentUser.uid));
          setWishlistItems(wishlistDoc.exists() ? wishlistDoc.data().items || [] : []);
        } catch (error) {
          console.error("Error fetching wishlist items:", error);
          setWishlistItems([]);
        }
      } else {
        try {
          const guestWishlist = JSON.parse(localStorage.getItem("guest_wishlist_items")) || [];
          setWishlistItems(guestWishlist);
        } catch (error) {
          console.error("Error reading guest wishlist:", error);
          setWishlistItems([]);
        }
      }
    };
    fetchWishlistItems();
  }, [currentUser]);

  const handleAddToCart = async () => {
    if (!currentUser) {
      if (!selectedWeightOption) {
        alert('Please select a weight option for the product.');
        return;
      }

      const guestCart = JSON.parse(
        localStorage.getItem("guest_cart_items") || "[]"
      );

      const existingItemIndex = guestCart.findIndex(
        (item) =>
          item.product_id === product.id && item.weight === selectedWeightOption.weight
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

    if (!selectedWeightOption) {
      alert('Please select a weight option for the product.');
      return;
    }

    const cartProduct = {
      product_id: id,
      name: product.name,
      price: selectedWeightOption.price,
      originalPrice: isNaN(selectedWeightOption.originalPrice) ? null : selectedWeightOption.originalPrice,
      image: mainImage || product.image,
      weight: selectedWeightOption.weight,
      quantity,
      addedAt: new Date().toISOString()
    };

    const cartRef = doc(db, 'cart_items', currentUser.uid);

    try {
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const existingItems = cartSnap.data().items || [];
        const existingItemIndex = existingItems.findIndex(
          item => item.product_id === cartProduct.product_id && item.weight === cartProduct.weight
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...existingItems];
          updatedItems[existingItemIndex].quantity += quantity;
          await updateDoc(cartRef, { items: updatedItems });
        } else {
          await updateDoc(cartRef, { items: arrayUnion(cartProduct) });
        }
      } else {
        await setDoc(cartRef, {
          userId: currentUser.uid,
          items: [cartProduct]
        });
      }

      refreshCart();
      Swal.fire({
        icon: 'success',
        title: '🛒 Added to Cart!',
        html: `<strong>${product.name}</strong> (${cartProduct.weight}) has been added to your cart.`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
        backdrop: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleBuyClick = async (productId) => {
    if (!selectedWeightOption) {
      alert('Please select a weight option for the product.');
      return;
    }

    try {
      await axios.post(`${baseURL}/shiprocket-login`);
      navigate(`/buynow/${productId}`, { state: { selectedWeightOption } });
    } catch (error) {
      console.error('Shiprocket login error:', error);
      alert('Shiprocket login failed!');
    }
  };


  const addToWishlist = async (product) => {
    const wishlistProduct = {
      product_id: product.id,
      name: product.name,
      price: parseFloat(product.price) || 0,
      originalPrice: isNaN(parseFloat(product.originalPrice)) ? null : parseFloat(product.originalPrice),
      image: mainImage || product.image,
      weight: product.weight || "",
      description: product.description,
      spicyLevel: product.spicyLevel,
      tag: product.tag,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    if (!currentUser) {
      const guestWishlist = JSON.parse(localStorage.getItem('guest_wishlist_items') || '[]');
      const index = guestWishlist.findIndex(item => item.product_id === product.id);
      const updatedWishlist = index >= 0
        ? guestWishlist.filter(item => item.product_id !== product.id)
        : [...guestWishlist, wishlistProduct];
      localStorage.setItem('guest_wishlist_items', JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
      refreshWishlist();

      Swal.fire({
        icon: 'success',
        title: index >= 0 ? 'Removed from Wishlist' : 'Added to Wishlist',
        text: `${product.name} has been ${index >= 0 ? 'removed from' : 'added to'} your wishlist.`,
        confirmButtonColor: '#f76f2f',
        confirmButtonText: 'OK',
        showConfirmButton: true,
      });
      return;
    }

    const wishlistRef = doc(db, "wishlist_items", currentUser.uid);
    try {
      const wishlistSnap = await getDoc(wishlistRef);
      let message = "";
      if (wishlistSnap.exists()) {
        const existingItems = wishlistSnap.data().items || [];
        const productIndex = existingItems.findIndex(item => item.product_id === product.id);
        const updatedItems = productIndex !== -1
          ? existingItems.filter(item => item.product_id !== product.id)
          : [...existingItems, wishlistProduct];
        await updateDoc(wishlistRef, { items: updatedItems });
        message = productIndex !== -1 ? 'removed from' : 'added to';
      } else {
        await setDoc(wishlistRef, { userId: currentUser.uid, items: [wishlistProduct] });
        message = 'added to';
      }

      const updatedWishlist = await getDoc(wishlistRef);
      setWishlistItems(updatedWishlist.exists() ? updatedWishlist.data().items : []);
      refreshWishlist();

      Swal.fire({
        icon: 'success',
        title: `Wishlist Updated`,
        text: `${product.name} has been ${message} your wishlist.`,
        confirmButtonColor: '#f76f2f',
        confirmButtonText: 'OK',
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Error managing wishlist:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update wishlist. Please try again.',
        confirmButtonColor: '#d33',
      });
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
                <ZoomImage src={mainImage} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setMainImage(img)}
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
              <button className="btn btn-danger flex-fill"
                // onClick={handleAddToCart} 
                disabled={!selectedWeightOption}>
                Add to Cart
              </button>
              <button className="btn btn-warning flex-fill"
                // onClick={() => handleBuyClick(id)} 
                disabled={!selectedWeightOption}>
                Buy Now
              </button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px' }}
              // onClick={() => addToWishlist(product)}
              >
                {wishlistItems.some(item => item.product_id === id)
                  ? <FaHeart size={14} className="text-secondary" />
                  : <FaRegHeart size={14} />}
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