import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './CheckOut.css';
import { useAuth } from '../../AuthContext/AuthContext';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    addressLabel: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser?.uid) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        }
      }
    };
    fetchUserDetails();
  }, [currentUser]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (currentUser?.uid) {
        try {
          const cartDoc = await getDoc(doc(db, 'cart_items', currentUser.uid));
          if (cartDoc.exists()) {
            const data = cartDoc.data();
            const combinedItems = combineCartItems(data.items || []);
            setCartItems(combinedItems);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };
    fetchCartItems();
  }, [currentUser]);

  const combineCartItems = (items) => {
    const map = new Map();
    items.forEach((item) => {
      const id = item.product_id;
      const existing = map.get(id);
      if (existing) {
        existing.quantity += Number(item.quantity);
      } else {
        map.set(id, { ...item, quantity: Number(item.quantity) });
      }
    });
    return Array.from(map.values());
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        const quantity = Number(item.quantity);
        return acc + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handlePlaceOrder = async () => {
  //   if (!currentUser?.uid) {
  //     alert('Please login to place an order');
  //     return;
  //   }

  //   if (cartItems.length === 0) {
  //     alert('Your cart is empty');
  //     return;
  //   }

  //   if (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
  //     alert('Please fill in all required address fields');
  //     return;
  //   }

  //   setIsPlacingOrder(true);

  //   try {
  //     // Prepare shipping address
  //     const shippingAddress = {
  //       ...formData,
  //       country: 'India',
  //       fullName: currentUser.fullName || '',
  //       email: currentUser.email || '',
  //       phone: currentUser.phone || ''
  //     };

  //     // Each item gets a unique order_item_id and status
  //     const orderItems = cartItems.map(item => ({
  //       ...item,
  //       order_item_id: uuidv4(),
  //       status: 'Pending',
  //       shippingAddress
  //     }));

  //     const orderId = uuidv4(); // Unique order ID

  //     const newOrder = {
  //       items: orderItems,
  //     };

  //     // Reference to user orders document
  //     const userOrdersRef = doc(db, 'orders', currentUser.uid);
  //     const userOrdersDoc = await getDoc(userOrdersRef);

  //     if (userOrdersDoc.exists()) {
  //       await setDoc(userOrdersRef, {
  //         [orderId]: newOrder
  //       }, { merge: true });
  //     } else {
  //       await setDoc(userOrdersRef, {
  //         [orderId]: newOrder
  //       });
  //     }

  //     // Update address collection
  //     const addressData = {
  //       ...shippingAddress,
  //       address_id: uuidv4(),
  //       isDefault: true,
  //       createdAt: new Date()
  //     };

  //     const userAddressRef = doc(db, 'addresses', currentUser.uid);
  //     const userAddressDoc = await getDoc(userAddressRef);

  //     if (userAddressDoc.exists()) {
  //       await setDoc(userAddressRef, {
  //         addresses: [...(userAddressDoc.data().addresses || []), addressData],
  //       }, { merge: true });
  //     } else {
  //       await setDoc(userAddressRef, {
  //         addresses: [addressData],
  //       });
  //     }

  //     // Clear the cart
  //     await setDoc(doc(db, 'cart_items', currentUser.uid), { items: [] });

  //     alert('Order placed successfully!');
  //     navigate('/myorders');

  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     alert('Failed to place order. Please try again.');
  //   } finally {
  //     setIsPlacingOrder(false);
  //   }
  // };

  const handlePlaceOrder = async () => {
    if (!currentUser?.uid) {
      alert('Please login to place an order');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
      alert('Please fill in all required address fields');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Prepare shipping address
      const shippingAddress = {
        ...formData,
        country: 'India',
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      };

      const orderItems = cartItems.map((item) => ({
        ...item,
        order_item_id: uuidv4(),
      }));

      const orderId = uuidv4(); // Unique order ID

      const newOrder = {
        orderId,
        items: orderItems,
        shippingAddress,
        status: "Pending",
        createdAt: new Date(),
      };

      // Save order to user's orders
      const userOrdersRef = doc(db, "orders", currentUser.uid);
      const userOrdersDoc = await getDoc(userOrdersRef);

      if (userOrdersDoc.exists()) {
        await setDoc(userOrdersRef, { [orderId]: newOrder }, { merge: true });
      } else {
        await setDoc(userOrdersRef, { [orderId]: newOrder });
      }

      // Save status to order_status collection
      const orderStatusEntry = {
        status: "Pending",
        timestamp: new Date(),
      };

      const orderStatusRef = doc(db, "order_status", orderId);
      await setDoc(orderStatusRef, {
        statusHistory: [orderStatusEntry],
      });

      // Save shipping address to user's address book
      const addressData = {
        ...shippingAddress,
        address_id: uuidv4(),
        isDefault: true,
        createdAt: new Date(),
      };

      const userAddressRef = doc(db, "addresses", currentUser.uid);
      const userAddressDoc = await getDoc(userAddressRef);

      if (userAddressDoc.exists()) {
        await setDoc(
          userAddressRef,
          {
            addresses: [
              ...(userAddressDoc.data().addresses || []),
              addressData,
            ],
          },
          { merge: true }
        );
      } else {
        await setDoc(userAddressRef, {
          addresses: [addressData],
        });
      }

      // Clear the cart
      await setDoc(doc(db, "cart_items", currentUser.uid), { items: [] });

      alert("Order placed successfully!");
      navigate("/myorders");

    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }

  };
  


  const [saveToAccount, setSaveToAccount] = useState(false);

  const handleCheckboxChange = () => {
    setSaveToAccount((prev) => {
      const newState = !prev;
      if (newState && !formData.addressLabel) {
        setFormData((prevData) => ({
          ...prevData,
          addressLabel: '',
        }));
      }
      return newState;
    });
  };


  return (
    <>
      <Header />
      <div className="checkout-page">
        <h2 className="checkout-title mb-4">Checkout</h2>
        <div className="row">
          {/* Shipping Form */}
          <div className="col-lg-8 mb-4">
            <div className="shipping-box p-4 rounded shadow-sm bg-white">
              <h5 className="mb-4 shipping-heading">Enter Shipping Information</h5>
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label shipping-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control bg-light border rounded-3"
                      value={currentUser?.fullName || ''}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label shipping-label">Email</label>
                    <input
                      type="email"
                      className="form-control bg-light border rounded-3"
                      value={currentUser?.email || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label shipping-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control bg-light border rounded-3"
                    value={currentUser?.phone || ''}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label shipping-label">Address Line 1*</label>
                  <input
                    type="text"
                    name="addressLine1"
                    className="form-control bg-light border rounded-3"
                    placeholder="Street address, P.O. box"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label shipping-label">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    name="addressLine2"
                    className="form-control bg-light border rounded-3"
                    placeholder="Apartment, suite, unit"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label shipping-label">City*</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control bg-light border rounded-3"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label shipping-label">State / Province*</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control bg-light border rounded-3"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label shipping-label">Postal Code*</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="form-control bg-light border rounded-3"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label shipping-label">Country</label>
                    <div className="form-control bg-light border rounded-3">
                      India
                    </div>
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="saveToAccount"
                    checked={saveToAccount}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label text-muted" htmlFor="saveToAccount">
                    <strong>Save this address to my account</strong><br />
                    <small>For faster checkout next time.</small>
                  </label>
                </div>

                {saveToAccount && (
                  <div className="mb-3">
                    <label className="form-label shipping-label">
                      Label for this address (e.g., Home, Work)
                    </label>
                    <input
                      type="text"
                      name="addressLabel"
                      className="form-control bg-light border rounded-3"
                      placeholder="e.g., Home, Work"
                      value={formData.addressLabel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}


              </form>

            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary-box p-4 rounded shadow-sm bg-white">
              <h5 className="order-summary-title mb-4">Order Summary</h5>

              {cartItems.map((item) => (
                <div key={item.product_id} className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <div className="summary-item-name">
                      {item.name} (x{item.quantity})
                    </div>
                    <div className="summary-item-weight">
                      {item.weight || 'N/A'}
                    </div>
                  </div>
                  <div className="summary-item-price">
                    ₹{(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <hr />
              <div className="d-flex justify-content-between mb-1">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">₹{calculateTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">Free</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <hr />

              <button
                className="btn btn-place-order w-100"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;