import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './CheckOut.css';
import { useAuth } from '../../AuthContext/AuthContext';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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

  //     const orderItems = cartItems.map((item) => ({
  //       ...item,
  //       order_item_id: uuidv4(),
  //     }));

  //     const orderId = uuidv4(); // Unique order ID

  //     const newOrder = {
  //       orderId,
  //       items: orderItems,
  //       shippingAddress,
  //       status: "Pending",
  //       createdAt: new Date(),
  //     };

  //     // Save order to user's orders
  //     const userOrdersRef = doc(db, "orders", currentUser.uid);
  //     const userOrdersDoc = await getDoc(userOrdersRef);

  //     if (userOrdersDoc.exists()) {
  //       await setDoc(userOrdersRef, { [orderId]: newOrder }, { merge: true });
  //     } else {
  //       await setDoc(userOrdersRef, { [orderId]: newOrder });
  //     }

  //     // Save status to order_status collection
  //     const orderStatusEntry = {
  //       status: "Pending",
  //       timestamp: new Date(),
  //     };

  //     const orderStatusRef = doc(db, "order_status", orderId);
  //     await setDoc(orderStatusRef, {
  //       statusHistory: [orderStatusEntry],
  //     });

  //     // Save shipping address to user's address book
  //     const addressData = {
  //       ...shippingAddress,
  //       address_id: uuidv4(),
  //       isDefault: true,
  //       createdAt: new Date(),
  //     };

  //     const userAddressRef = doc(db, "addresses", currentUser.uid);
  //     const userAddressDoc = await getDoc(userAddressRef);

  //     if (userAddressDoc.exists()) {
  //       await setDoc(
  //         userAddressRef,
  //         {
  //           addresses: [
  //             ...(userAddressDoc.data().addresses || []),
  //             addressData,
  //           ],
  //         },
  //         { merge: true }
  //       );
  //     } else {
  //       await setDoc(userAddressRef, {
  //         addresses: [addressData],
  //       });
  //     }

  //     // Clear the cart
  //     await setDoc(doc(db, "cart_items", currentUser.uid), { items: [] });

  //     alert("Order placed successfully!");
  //     navigate("/myorders");

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
      // First create the Razorpay order
      const amount = calculateTotal();
      await createRazorpayOrder(amount);

    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script);
    })
  }

  const createRazorpayOrder = async (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/orders",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      await handleRazorpayScreen(response.data.amount, amount);
    } catch (error) {
      console.log("error at", error);
      throw error;
    }
  }

  const handleRazorpayScreen = async (amountInPaise, originalAmount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const options = {
      key: 'rzp_test_PhWbtmUxU6a9Vf',
      amount: amountInPaise,
      currency: 'INR',
      name: "papaya coders",
      description: "payment to papaya coders",
      image: "https://papayacoders.com/demo.png",
      handler: async function (response) {
        // Payment successful - now create the order in your database
        await createOrderInDatabase(response.razorpay_payment_id, originalAmount);
      },
      prefill: {
        name: currentUser?.fullName || "Customer",
        email: currentUser?.email || "customer@example.com",
        contact: currentUser?.phone || ""
      },
      theme: {
        color: "#F4C430"
      }
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // const createOrderInDatabase = async (paymentId, amount) => {
  //   try {
  //     // Prepare shipping address
  //     const shippingAddress = {
  //       ...formData,
  //       country: 'India',
  //       fullName: currentUser.fullName || '',
  //       email: currentUser.email || '',
  //       phone: currentUser.phone || ''
  //     };

  //     const orderItems = cartItems.map((item) => ({
  //       ...item,
  //       order_item_id: uuidv4(),
  //     }));

  //     const orderId = uuidv4(); // Unique order ID
  //     const createdAt = new Date();

  //     // Create transaction record first
  //     const transactionData = {
  //       orderId,
  //       paymentStatus: "Paid",
  //       paymentId,
  //       paymentAmount: amount,
  //       createdAt,
  //       userId: currentUser.uid // Adding user reference
  //     };

  //     // Add transaction to transactions collection
  //     const transactionsRef = collection(db, "transactions");
  //     await addDoc(transactionsRef, transactionData);

  //     // Create order document
  //     const newOrder = {
  //       orderId,
  //       items: orderItems,
  //       shippingAddress,
  //       status: "Pending",
  //       createdAt,
  //       paymentId,
  //       paymentAmount: amount,
  //       paymentStatus: "Paid"
  //     };

  //     // Save order to user's orders
  //     const userOrdersRef = doc(db, "orders", currentUser.uid);
  //     const userOrdersDoc = await getDoc(userOrdersRef);

  //     if (userOrdersDoc.exists()) {
  //       await setDoc(userOrdersRef, { [orderId]: newOrder }, { merge: true });
  //     } else {
  //       await setDoc(userOrdersRef, { [orderId]: newOrder });
  //     }

  //     // Save status to order_status collection
  //     const orderStatusEntry = {
  //       status: "Pending",
  //       timestamp: createdAt,
  //     };

  //     const orderStatusRef = doc(db, "order_status", orderId);
  //     await setDoc(orderStatusRef, {
  //       statusHistory: [orderStatusEntry],
  //     });

  //     // Save shipping address to user's address book if requested
  //     if (saveToAccount) {
  //       const addressData = {
  //         ...shippingAddress,
  //         address_id: uuidv4(),
  //         isDefault: true,
  //         createdAt,
  //         label: formData.addressLabel || 'My Address'
  //       };

  //       const userAddressRef = doc(db, "addresses", currentUser.uid);
  //       const userAddressDoc = await getDoc(userAddressRef);

  //       if (userAddressDoc.exists()) {
  //         await setDoc(
  //           userAddressRef,
  //           {
  //             addresses: [
  //               ...(userAddressDoc.data().addresses || []),
  //               addressData,
  //             ],
  //           },
  //           { merge: true }
  //         );
  //       } else {
  //         await setDoc(userAddressRef, {
  //           addresses: [addressData],
  //         });
  //       }
  //     }

  //     // Clear the cart
  //     await setDoc(doc(db, "cart_items", currentUser.uid), { items: [] });

  //     // Send order confirmation email
  //     try {
  //       const emailData = {
  //         email: currentUser.email,
  //         orderId,
  //         amount,
  //         items: cartItems.map(item => ({
  //           name: item.name,
  //           quantity: item.quantity,
  //           price: (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)
  //         }))
  //       };

  //       await axios.post('http://localhost:5000/send-order-confirmation', emailData);
  //     } catch (emailError) {
  //       console.error('Error sending email:', emailError);
  //       // Don't fail the order if email fails
  //     }

  //     alert("Order placed successfully!");
  //     navigate("/myorders");

  //   } catch (error) {
  //     console.error("Error creating order in database:", error);
  //     alert('Payment was successful but there was an error saving your order. Please contact support.');
  //   }
  // };

    const createOrderInDatabase = async (paymentId, amount) => {
    try {
      // Prepare shipping address
      let shippingAddress;
      if (selectedAddress === 'home' && defaultAddress) {
        shippingAddress = defaultAddress;
      } else if (selectedAddress === 'home' && !defaultAddress) {
        shippingAddress = {
          addressLine1: formData.addressLine1 || '',
          addressLine2: formData.addressLine2 || '',
          city: formData.city || '',
          state: formData.state || '',
          postalCode: formData.postalCode || '',
          country: formData.country || 'India',
          fullName: currentUser.fullName || '',
          email: currentUser.email || '',
          phone: currentUser.phone || ''
        };
      } else {
        shippingAddress = {
          ...formData,
          country: 'India',
          fullName: currentUser.fullName || '',
          email: currentUser.email || '',
          phone: currentUser.phone || ''
        };
      }

      const orderItems = cartItems.map((item) => ({
        ...item,
        order_item_id: uuidv4(),
      }));

      const orderId = uuidv4(); // Unique order ID
      const createdAt = new Date();

      // Create transaction record first
      const transactionData = {
        orderId,
        paymentStatus: "Paid",
        paymentId,
        paymentAmount: amount,
        createdAt,
        userId: currentUser.uid // Adding user reference
      };

      // Add transaction to transactions collection
      const transactionsRef = collection(db, "transactions");
      await addDoc(transactionsRef, transactionData);

      // Create order document
      const newOrder = {
        orderId,
        items: orderItems,
        shippingAddress,
        status: "Pending",
        createdAt,
        paymentId,
        paymentAmount: amount,
        paymentStatus: "Paid"
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
        timestamp: createdAt,
      };

      const orderStatusRef = doc(db, "order_status", orderId);
      await setDoc(orderStatusRef, {
        statusHistory: [orderStatusEntry],
      });

      // Save shipping address to user's address book if requested
      if (selectedAddress === 'new' && saveToAccount) {
        const addressData = {
          ...shippingAddress,
          address_id: uuidv4(),
          isDefault: true,
          label: formData.addressLabel || 'Home',
          createdAt: new Date(),
        };

        const userAddressRef = doc(db, "addresses", currentUser.uid);
        const userAddressDoc = await getDoc(userAddressRef);

        let updatedAddresses = [];

        if (userAddressDoc.exists()) {
          const existingAddresses = userAddressDoc.data().addresses || [];
          updatedAddresses = existingAddresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
        }

        updatedAddresses.push(addressData);

        await setDoc(userAddressRef, {
          addresses: updatedAddresses,
        });
      }

      // Clear the cart
      await setDoc(doc(db, "cart_items", currentUser.uid), { items: [] });

      // Send order confirmation email
      try {
        const emailData = {
          email: currentUser.email,
          orderId,
          amount,
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)
          }))
        };

        await axios.post('http://localhost:5000/send-order-confirmation', emailData);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the order if email fails
      }

      alert("Order placed successfully!");
      navigate("/myorders");

    } catch (error) {
      console.error("Error creating order in database:", error);
      alert('Payment was successful but there was an error saving your order. Please contact support.');
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