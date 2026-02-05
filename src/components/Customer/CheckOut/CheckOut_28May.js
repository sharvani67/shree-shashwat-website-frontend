import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './CheckOut.css';
import { useAuth } from '../../AuthContext/AuthContext';
import { useCart } from '../../AuthContext/CartContext';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import baseURL from "../../Api/Api";

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [hasAddresses, setHasAddresses] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);

  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    addressLabel: '',
  });

  const [selectedAddress, setSelectedAddress] = useState('home'); // 'home', 'new', or address_id
  const [saveToAccount, setSaveToAccount] = useState(false);

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

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     if (currentUser?.uid) {
  //       try {
  //         const cartDoc = await getDoc(doc(db, 'cart_items', currentUser.uid));
  //         if (cartDoc.exists()) {
  //           const data = cartDoc.data();
  //           const combinedItems = combineCartItems(data.items || []);
  //           setCartItems(combinedItems);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching cart items:", error);
  //       }
  //     }
  //   };
  //   fetchCartItems();
  // }, [currentUser]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (currentUser?.uid) {
        // Logged-in user: fetch from Firestore
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
      } else {
        // Guest user: fetch from localStorage
        try {
          const guestCart = JSON.parse(localStorage.getItem('guest_cart_items') || '[]');
          const combinedItems = combineCartItems(guestCart);
          setCartItems(combinedItems);
        } catch (error) {
          console.error("Error parsing guest cart items from localStorage:", error);
          setCartItems([]);
        }
      }
    };

    fetchCartItems();
  }, [currentUser]);


  useEffect(() => {
    const fetchAddresses = async () => {
      if (currentUser?.uid) {
        try {
          const addressDoc = await getDoc(doc(db, 'addresses', currentUser.uid));
          if (addressDoc.exists()) {
            const addresses = addressDoc.data().addresses || [];
            setAllAddresses(addresses);
            setHasAddresses(addresses.length > 0);

            const defaultAddr = addresses.find(addr => addr.isDefault);
            setDefaultAddress(defaultAddr || null);

            // If no default address but addresses exist, select the first one
            if (!defaultAddr && addresses.length > 0) {
              setDefaultAddress(addresses[0]);
            }

            // Set selected address based on available addresses
            if (addresses.length > 0) {
              const addressToSelect = defaultAddr || addresses[0];
              setSelectedAddress(addressToSelect.address_id);
              setFormData({
                addressLine1: addressToSelect.addressLine1 || '',
                addressLine2: addressToSelect.addressLine2 || '',
                city: addressToSelect.city || '',
                state: addressToSelect.state || '',
                postalCode: addressToSelect.postalCode || '',
                addressLabel: addressToSelect.label || '',
              });
            } else {
              // No addresses found, select 'new' by default
              setSelectedAddress('new');
              setFormData({
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                addressLabel: '',
              });
            }
          } else {
            // No address document found, select 'new' by default
            setHasAddresses(false);
            setAllAddresses([]);
            setSelectedAddress('new');
            setFormData({
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              postalCode: '',
              addressLabel: '',
            });
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        } finally {
          setLoadingAddress(false);
        }
      } else {
        // No user logged in, select 'new' by default
        setLoadingAddress(false);
        setHasAddresses(false);
        setAllAddresses([]);
        setSelectedAddress('new');
        setFormData({
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          addressLabel: '',
        });
      }
    };
    fetchAddresses();
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
        const price = typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[^\d.]/g, ''))
          : Number(item.price);
        const quantity = Number(item.quantity);
        return acc + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const getPriceDisplay = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `₹${price.toFixed(2)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    // Check if cart is empty
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Validate address selection
    if (selectedAddress !== 'new' && !defaultAddress) {
      alert('Please select a shipping address');
      return;
    }

    // Validate new address fields
    if (selectedAddress === 'new' &&
      (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode)) {
      alert('Please fill in all required address fields');
      return;
    }

    setIsPlacingOrder(true);

    try {
      let userId = currentUser?.uid;
      let userEmail = currentUser?.email;
      let userFullName = currentUser?.fullName;
      let userPhone = currentUser?.phone;

      // Handle guest checkout
      if (!userId) {
        // Validate guest user details
        if (!formData.email || !formData.fullName || !formData.phone) {
          alert('Please provide your contact information to proceed with checkout');
          return;
        }

        // Generate a password for the guest user
        const password = `${formData.fullName.replace(/\s+/g, '')}@${Math.floor(1000 + Math.random() * 9000)}`;

        try {
          // Create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(auth, formData.email, password);
          userId = userCredential.user.uid;
          userEmail = formData.email;
          userFullName = formData.fullName;
          userPhone = formData.phone;

          // Create customer document in Firestore
          await setDoc(doc(db, 'customers', userId), {
            uid: userId,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            createdAt: new Date(),
            isGuest: true // Mark as guest user
          });

          // Optional: Send welcome email with temporary password
          // await sendWelcomeEmail(formData.email, formData.fullName, password);

        } catch (error) {
          console.error("Error creating guest user:", error);
          if (error.code === 'auth/email-already-in-use') {
            alert('This email is already registered. Please login to continue.');
            navigate('/login');
          } else {
            alert('Error creating your account. Please try again.');
          }
          return;
        }
      }

      // Proceed with payment after ensuring we have a user
      const amount = calculateTotal();
      await createRazorpayOrder(amount, userId, userEmail, userFullName, userPhone);

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

  const createRazorpayOrder = async (amount, userId, userEmail, userFullName, userPhone) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
      userId: userId // Include userId in the order creation
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseURL}/orders`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    try {
      const response = await axios.request(config);
      await handleRazorpayScreen(response.data.amount, amount, userId, userEmail, userFullName, userPhone);
    } catch (error) {
      console.log("error at", error);
      throw error;
    }
  }

  // Modified handleRazorpayScreen to use provided user details
  const handleRazorpayScreen = async (amountInPaise, originalAmount, userId, userEmail, userFullName, userPhone) => {
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
        await createOrderInDatabase(response.razorpay_payment_id, originalAmount, userId, userEmail, userFullName, userPhone);
      },
      prefill: {
        name: userFullName || "Customer",
        email: userEmail || "customer@example.com",
        contact: userPhone || ""
      },
      theme: {
        color: "#F4C430"
      }
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // Modified createOrderInDatabase to use provided user details
  const createOrderInDatabase = async (paymentId, amount, userId, userEmail, userFullName, userPhone) => {
    try {
      let shippingAddress;

      if (selectedAddress === 'home' && defaultAddress) {
        shippingAddress = defaultAddress;
      } else if (selectedAddress === 'new') {
        shippingAddress = {
          ...formData,
          country: 'India',
          fullName: userFullName || '',
          email: userEmail || '',
          phone: userPhone || ''
        };
      } else {
        // Handle case where a specific address is selected from allAddresses
        const selectedAddr = allAddresses.find(addr => addr.address_id === selectedAddress);
        if (selectedAddr) {
          shippingAddress = selectedAddr;
        } else {
          throw new Error("Selected address not found");
        }
      }

      const orderItems = cartItems.map((item) => ({
        ...item,
        order_item_id: uuidv4(),
      }));

      const orderId = uuidv4();
      const createdAt = new Date();

      // Create transaction record
      const transactionData = {
        orderId,
        paymentStatus: "Paid",
        paymentId,
        paymentAmount: amount,
        createdAt,
        userId: userId
      };

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
        paymentStatus: "Paid",
        userId: userId // Store userId with the order
      };

      // Save order to orders collection
      const ordersRef = doc(db, "orders", userId);
      const ordersDoc = await getDoc(ordersRef);

      if (ordersDoc.exists()) {
        await setDoc(ordersRef, { [orderId]: newOrder }, { merge: true });
      } else {
        await setDoc(ordersRef, { [orderId]: newOrder });
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

      // Save shipping address to user's address book if requested and logged in
      if (saveToAccount && selectedAddress === 'new' && userId) {
        const addressData = {
          ...shippingAddress,
          address_id: uuidv4(),
          isDefault: true,
          createdAt,
          label: formData.addressLabel || 'My Address'
        };

        const userAddressRef = doc(db, "addresses", userId);
        const userAddressDoc = await getDoc(userAddressRef);

        let updatedAddresses = [];

        if (userAddressDoc.exists()) {
          updatedAddresses = (userAddressDoc.data().addresses || []).map(addr => ({
            ...addr,
            isDefault: false
          }));
        }

        updatedAddresses.push(addressData);

        await setDoc(userAddressRef, {
          addresses: updatedAddresses,
        });
      }

      // Clear the cart if user was logged in
      if (userId) {
        await setDoc(doc(db, "cart_items", userId), { items: [] });
      }

      localStorage.removeItem('guest_cart_items');

      // Send order confirmation email
      if (userEmail) {
        const emailSent = await sendOrderConfirmationEmail(
          userEmail,
          orderId,
          amount,
          orderItems
        );

        if (emailSent) {
          alert("Order placed successfully! Check your email for confirmation.");
        } else {
          alert("Order placed successfully! We couldn't send the confirmation email, but you can view your order in 'My Orders'.");
        }
      } else {
        alert("Order placed successfully!");
      }

      navigate("/myorders");

    } catch (error) {
      console.error("Error creating order in database:", error);
      alert('Payment was successful but there was an error saving your order. Please contact support.');
    }
  };

  const sendOrderConfirmationEmail = async (email, orderId, amount, items) => {
    console.log('[Email] Starting email sending process...');

    // Validate input data
    if (!email || !orderId || !amount || !items?.length) {
      console.error('[Email] Invalid input data:', { email, orderId, amount, items });
      return false;
    }

    const emailData = {
      email,
      orderId,
      amount: parseFloat(amount).toFixed(2),
      items: items.map(item => ({
        name: item.name || 'Unknown Item',
        quantity: item.quantity || 1,
        price: (parseFloat(String(item.price).replace(/[^\d.]/g, '') * (item.quantity || 1)).toFixed(2)
        )
      })),
      customerName: currentUser?.fullName || 'Customer'
    };

    console.log('[Email] Prepared email data:', emailData);

    try {
      // First attempt with fetch
      console.log('[Email] Attempting to send via fetch...');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${baseURL}/send-order-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Email] Fetch response not OK:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('[Email] Fetch success:', result);
      return true;

    } catch (fetchError) {
      console.error('[Email] Fetch attempt failed:', fetchError);

      // Fallback to axios if available
      if (typeof axios !== 'undefined') {
        console.log('[Email] Trying fallback with axios...');
        try {
          const axiosResponse = await axios.post(
            `${baseURL}/send-order-confirmation`,
            emailData,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              timeout: 10000
            }
          );

          console.log('[Email] Axios response:', axiosResponse.data);
          return true;
        } catch (axiosError) {
          console.error('[Email] Axios attempt failed:', axiosError);
        }
      }

      // Final fallback - save for later retry
      console.log('[Email] Saving failed email for retry...');
      const failedEmails = JSON.parse(localStorage.getItem('failedEmails') || '[]');
      failedEmails.push({
        emailData,
        timestamp: new Date().toISOString(),
        error: fetchError.message
      });
      localStorage.setItem('failedEmails', JSON.stringify(failedEmails));

      return false;
    }
  };

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

  const handleAddressSelection = (type, address = null) => {
    if (type === 'address' && address) {
      setSelectedAddress(address.address_id);
      setFormData({
        addressLine1: address.addressLine1 || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.postalCode || '',
        addressLabel: address.label || '',
      });
    } else if (type === 'new') {
      setSelectedAddress('new');
      setFormData({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        addressLabel: '',
      });
      setSaveToAccount(false);
    } else if (type === 'home' && defaultAddress) {
      setSelectedAddress('home');
      setFormData({
        addressLine1: defaultAddress.addressLine1 || '',
        addressLine2: defaultAddress.addressLine2 || '',
        city: defaultAddress.city || '',
        state: defaultAddress.state || '',
        postalCode: defaultAddress.postalCode || '',
        addressLabel: defaultAddress.label || '',
      });
    }
  };

  const renderAddressCard = (address, isDefault = false) => {
    return (
      <div
        key={address.address_id}
        className={`address-card mb-3 p-3 rounded ${selectedAddress === address.address_id ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white border'}`}
        onClick={() => handleAddressSelection('address', address)}
        style={{ cursor: 'pointer', border: '1px solid #dee2e6' }}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="addressSelection"
            id={`address-${address.address_id}`}
            checked={selectedAddress === address.address_id}
            onChange={() => handleAddressSelection('address', address)}
          />
          <label className="form-check-label w-100" htmlFor={`address-${address.address_id}`}>
            <h6 className="mb-2 fw-bold">
              {address.label || 'Address'} {isDefault && '(Default)'}
            </h6>
            <div className="address-details ps-4">
              <p className="mb-0">
                {address.addressLine1}
                {address.addressLine2 && `, ${address.addressLine2}`}
                {`, ${address.city}, ${address.state} ${address.postalCode}`}
              </p>
            </div>
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="checkout-page">
        <h2 className="checkout-title mb-4">Checkout</h2>
        <div className="row">
          <div className="col-lg-8 mb-4">
            {loadingAddress ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="shipping-address-selection mb-4">
                  <h5 className="mb-3">Select Shipping Address</h5>

                  {/* Default address card */}
                  {defaultAddress && (
                    <div
                      className={`address-card mb-3 p-3 rounded ${selectedAddress === defaultAddress.address_id ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white border'}`}
                      onClick={() => handleAddressSelection('address', defaultAddress)}
                      style={{ cursor: 'pointer', border: '1px solid #dee2e6' }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="addressSelection"
                          id="homeAddress"
                          checked={selectedAddress === defaultAddress.address_id}
                          onChange={() => handleAddressSelection('address', defaultAddress)}
                        />
                        <label className="form-check-label w-100" htmlFor="homeAddress">
                          <h6 className="mb-2 fw-bold">Home - {defaultAddress?.label || 'Default'}</h6>
                          <div className="address-details ps-4">
                            <p className="mb-0">
                              {defaultAddress.addressLine1}
                              {defaultAddress.addressLine2 && <>, {defaultAddress.addressLine2}</>}
                              {', ' + defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Other saved addresses */}
                  {allAddresses
                    .filter(addr => !addr.isDefault)
                    .map(address => renderAddressCard(address))}

                  {/* New address card */}
                  <div
                    className={`address-card p-3 rounded ${selectedAddress === 'new' ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white border'}`}
                    onClick={() => handleAddressSelection('new')}
                    style={{ cursor: 'pointer', border: '1px solid #dee2e6' }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addressSelection"
                        id="newAddress"
                        checked={selectedAddress === 'new'}
                        onChange={() => handleAddressSelection('new')}
                      />
                      <label className="form-check-label w-100" htmlFor="newAddress">
                        <h6 className="mb-1 fw-bold">Use a new address</h6>
                        <p className="text-muted mb-0 ps-4">Enter shipping details below.</p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Address form for selected address */}
                {(selectedAddress === 'home' || typeof selectedAddress === 'string') && (
                  <div className="shipping-box p-4 rounded shadow-sm bg-white" style={{ marginBottom: "100px" }}>
                    <h5 className="mb-4 shipping-heading">
                      {selectedAddress === 'new' ? 'Enter Shipping Information' : 'Confirm Shipping Information'}
                    </h5>

                    {selectedAddress === 'new' ? (
                      <form>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Full Name*</label>
                            <input
                              type="text"
                              name="fullName"
                              className="form-control bg-light border rounded-3"
                              value={formData.fullName || currentUser?.fullName || ''}
                              onChange={handleInputChange}
                              // readOnly={!currentUser}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Email*</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control bg-light border rounded-3"
                              value={formData.email || currentUser?.email || ''}
                              onChange={handleInputChange}
                              // readOnly={!currentUser}
                              required
                            />
                          </div>
                        </div>


                        <div className="mb-3">
                          <label className="form-label shipping-label">Phone*</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control bg-light border rounded-3"
                            value={formData.phone || currentUser?.phone || ''}
                            onChange={handleInputChange}
                            // readOnly={!currentUser}
                            required
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
                    ) : (
                      <>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Full Name</label>
                            <input
                              type="text"
                              name="fullName"
                              className="form-control bg-light border rounded-3"
                              value={formData.fullName || currentUser?.fullName || ''}
                              onChange={handleInputChange}
                              // readOnly={!currentUser}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Email</label>
                            <input
                              type="email"
                              className="form-control bg-light border rounded-3"
                              value={formData.email || currentUser?.email || ''}
                            // readOnly
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label shipping-label">Phone</label>
                          <div className="form-control bg-light border rounded-3">
                            {formData.phone || currentUser?.phone || ''}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label shipping-label">Address Line 1</label>
                          <div className="form-control bg-light border rounded-3">
                            {formData.addressLine1 || ''}
                          </div>
                        </div>

                        {formData.addressLine2 && (
                          <div className="mb-3">
                            <label className="form-label shipping-label">Address Line 2 (Optional)</label>
                            <div className="form-control bg-light border rounded-3">
                              {formData.addressLine2}
                            </div>
                          </div>
                        )}

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label shipping-label">City</label>
                            <div className="form-control bg-light border rounded-3">
                              {formData.city || ''}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label shipping-label">State / Province</label>
                            <div className="form-control bg-light border rounded-3">
                              {formData.state || ''}
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Postal Code</label>
                            <div className="form-control bg-light border rounded-3">
                              {formData.postalCode || ''}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Country</label>
                            <div className="form-control bg-light border rounded-3">
                              {formData.country || 'India'}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col-lg-4">
            <div className="order-summary-box p-4 rounded shadow-sm bg-white">
              <h5 className="order-summary-title mb-4">Order Summary</h5>

              {cartItems.map((item) => {
                const price = typeof item.price === 'string'
                  ? parseFloat(item.price.replace(/[^\d.]/g, ''))
                  : Number(item.price);
                const totalPrice = price * item.quantity;

                return (
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
                      ₹{totalPrice.toFixed(2)}
                    </div>
                  </div>
                );
              })}

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
      {/* <Footer /> */}
    </>
  );
};

export default CheckoutPage;