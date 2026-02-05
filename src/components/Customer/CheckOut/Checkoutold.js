import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './CheckOut.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useCart } from '../../AuthContext/CartContext';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import baseURL from "../../Api/Api";
import Swal from 'sweetalert2';
import Logo from '../../../assets/favicon.jpg'

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { summary } = location.state || {};
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [hasAddresses, setHasAddresses] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    addressLabel: '',
  });

  const [selectedAddress, setSelectedAddress] = useState('home');
  const [saveToAccount, setSaveToAccount] = useState(false);
  const [cheapestCourier, setCheapestCourier] = useState(null);
  const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Fixed: Properly construct Firestore document references
  const fetchUserDetails = async () => {
    if (currentUser?.uid) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [currentUser]);

useEffect(() => {
  const fetchCartItems = async () => {
    if (currentUser?.uid) {
      try {
        // Fetch cart items from your API
        const response = await fetch(`${baseURL}/cart-items/customer/${currentUser.uid}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        
        const data = await response.json();
        
        // Process the API response to match your expected cart item structure
        const processedItems = data.map(item => ({
          ...item,
          price: parseFloat(item.price) || 0,
          originalPrice: parseFloat(item.original_price) || null,
          id: item.product_id.toString(),
          weight: item.weight,
          quantity: item.quantity
        }));
        
        setCartItems(processedItems);
        console.log("Fetched and processed cart items:", processedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
      }
    } else {
      // Guest user: fetch from localStorage
      try {
        const guestCart = JSON.parse(localStorage.getItem('guest_cart_items') || '[]');
        const processedItems = guestCart.map(item => ({
          ...item,
          price: parseFloat(item.price) || 0,
          originalPrice: parseFloat(item.originalPrice) || null
        }));
        setCartItems(processedItems);
        console.log("Fetched guest cart items:", processedItems);
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
          // Fixed: Proper document reference
          const addressDocRef = doc(db, 'addresses', currentUser.uid);
          const addressDoc = await getDoc(addressDocRef);
          
          if (addressDoc.exists()) {
            const addresses = addressDoc.data().addresses || [];
            setAllAddresses(addresses);
            setHasAddresses(addresses.length > 0);

            const defaultAddr = addresses.find(addr => addr.isDefault);
            setDefaultAddress(defaultAddr || null);

            if (!defaultAddr && addresses.length > 0) {
              setDefaultAddress(addresses[0]);
            }

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

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "postalCode" && (!/^\d{0,6}$/.test(value))) return;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Trigger Shiprocket order creation only when postalCode is 6 digits
    const postalCodeToUse = name === "postalCode" ? value : updatedFormData.postalCode;
    if (postalCodeToUse.length !== 6) return;

    try {
      const orderItems = cartItems.map((item) => ({
        ...item,
        order_item_id: uuidv4(),
      }));

      const orderId = uuidv4();

      const subTotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
      const totalWeight = cartItems.reduce((sum, item) => sum + (parseFloat(item.weight || 0) * item.quantity), 0) / 1000; // grams to kg

      const orderPayload = {
        order_id: orderId,
        order_date: new Date().toISOString().split("T")[0],
        pickup_location: "Mini_Factory_6363900869",
        comment: "Reseller: M/s " + (updatedFormData.lastName || 'Customer'),
        billing_customer_name: updatedFormData.firstName || 'First Name',
        billing_last_name: updatedFormData.lastName || '',
        billing_address: updatedFormData.addressLine1 || 'Address Line 1',
        billing_address_2: updatedFormData.addressLine2 || '',
        billing_city: updatedFormData.city || 'City',
        billing_pincode: postalCodeToUse,
        billing_state: updatedFormData.state || 'State',
        billing_country: updatedFormData.country || 'India',
        billing_email: currentUser?.email || updatedFormData.email || 'test@example.com',
        billing_phone: currentUser?.phone || updatedFormData.phone || '9999999999',
        shipping_is_billing: true,
        order_items: cartItems.map(item => ({
          name: item.name || '',
          sku: item.product_id || '',
          units: item.quantity || 1,
          selling_price: item.price || 0,
        })),
        payment_method: "Prepaid",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: subTotal || 10,
        length: 10,
        breadth: 15,
        height: 20,
        weight: totalWeight || 0.5,
      };


      console.log("Sending order payload:", orderPayload);

      const createOrderRes = await axios.post(`${baseURL}/api/shippingrate-order`, orderPayload);
      const orderIdFromShiprocket = createOrderRes.data.order_id;

      console.log("Shiprocket Order Created:", orderIdFromShiprocket);

      fetchServiceability(orderIdFromShiprocket);

      setFormData(prev => ({ ...prev, orderId: orderIdFromShiprocket }));
    } catch (error) {
      console.error("Error creating Shiprocket order:", error.response?.data || error.message);
    }
  };

  const fetchServiceability = async (orderId) => {
    try {
      const response = await axios.get(`${baseURL}/api/serviceability/${orderId}`);

      // Extract and format relevant data
      const couriers = response.data.data.available_courier_companies.map(courier => ({
        id: courier.courier_company_id,
        name: courier.courier_name,
        etd: courier.etd,
        estimatedDays: courier.estimated_delivery_days,
        freightCharge: courier.freight_charge,
        codAvailable: courier.cod === 1,
        mode: courier.is_surface ? 'Surface' : 'Air',
        rtoCharges: courier.rto_charges,
        recommended: courier.courier_company_id === response.data.data.recommended_courier_company_id
      }));

      // Find the courier with the least freight charge
      const cheapest = couriers.reduce((prev, current) =>
        (prev.freightCharge < current.freightCharge) ? prev : current
      );

      setCheapestCourier(cheapest);
      return couriers;
    } catch (error) {
      console.error("Error fetching courier serviceability:", error.response?.data || error.message);
      throw error;
    }
  };

  // Total without discount
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

  // Calculate discount based on quantity
  const calculateDiscount = () => {
    const totalQuantity = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
    const total = parseFloat(calculateTotal());

    if (totalQuantity >= 4) {
      return (total * 0.10).toFixed(2); // 10% discount
    } else if (totalQuantity >= 2) {
      return (total * 0.05).toFixed(2); // 5% discount
    }
    return '0.00';
  };

  // Calculate final total including discount and shipping logic
  const calculateFinalTotal = () => {
    const total = parseFloat(calculateTotal());
    const discount = parseFloat(calculateDiscount());
    const totalQuantity = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);

    let shipping = 0;

    if (totalQuantity < 4 && cheapestCourier) {
      // Only charge shipping if not eligible for free shipping
      shipping = parseFloat(cheapestCourier.freightCharge);
    }

    return (total - discount + shipping).toFixed(2);
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
      const amount = calculateFinalTotal();

      // const amount = 1;
      // await createRazorpayOrder(amount, userId, userEmail, userFullName, userPhone);


      await createPhonePeOrder(amount, userId, userEmail, userFullName, userPhone);

    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const createPhonePeOrder = async (amount, userId, userEmail, userFullName, userPhone) => {
    try {
      const requestBody = {
        amount: amount * 100, // Convert to paise
        currency: "INR"
      };

      const response = await axios.post(`${baseURL}/create-order`, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { checkoutPageUrl, merchantOrderId } = response.data;

      if (checkoutPageUrl && merchantOrderId) {
        // ✅ Open payment in new window
        const paymentWindow = window.open(checkoutPageUrl, '_blank');

        // ✅ Poll for payment status every 3 seconds
        const checkInterval = setInterval(async () => {
          try {
            const statusRes = await axios.get(`${baseURL}/check-status`, {
              params: { merchantOrderId }
            });

            const status = statusRes.data.status;
            console.log("Current Payment Status:", status);

            if (status === "COMPLETED") {
              clearInterval(checkInterval);
              paymentWindow?.close();
              await createOrderInDatabase(merchantOrderId, amount, userId, userEmail, userFullName, userPhone);
              // alert("Payment successful!");
            } else if (status === "FAILED") {
              clearInterval(checkInterval);
              paymentWindow?.close();
              alert("Payment failed. Please try again.");
            }
          } catch (err) {
            console.error("Error checking payment status:", err);
          }
        }, 3000);
      } else {
        throw new Error("Missing checkout URL or order ID");
      }
    } catch (err) {
      console.error("Error creating PhonePe order:", err);
    }
  };

  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true)
  //     }
  //     script.onerror = () => {
  //       resolve(false)
  //     }
  //     document.body.appendChild(script);
  //   })
  // }

  // const createRazorpayOrder = async (amount, userId, userEmail, userFullName, userPhone) => {
  //   let data = JSON.stringify({
  //     amount: amount * 100,
  //     currency: "INR",
  //     userId: userId // Include userId in the order creation
  //   });

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: `${baseURL}/orders`,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: data
  //   }

  //   try {
  //     const response = await axios.request(config);
  //     await handleRazorpayScreen(response.data.amount, amount, userId, userEmail, userFullName, userPhone);
  //   } catch (error) {
  //     console.log("error at", error);
  //     throw error;
  //   }
  // }

  // const handleRazorpayScreen = async (amountInPaise, originalAmount, userId, userEmail, userFullName, userPhone) => {
  //   const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  //   if (!res) {
  //     alert("Some error at razorpay screen loading");
  //     return;
  //   }

  //   const options = {
  //     key: 'rzp_test_PhWbtmUxU6a9Vf',
  //     amount: amountInPaise,
  //     currency: 'INR',
  //     name: "INFAB AGRO FOODS PRIVATE LIMITED",
  //     description: "payment to papaya coders",
  //     // image: "https://papayacoders.com/demo.png",
  //     image: Logo,
  //     handler: async function (response) {
  //       await createOrderInDatabase(response.razorpay_payment_id, originalAmount, userId, userEmail, userFullName, userPhone);
  //     },
  //     prefill: {
  //       name: userFullName || "Customer",
  //       email: userEmail || "customer@example.com",
  //       contact: userPhone || ""
  //     },
  //     theme: {
  //       color: "#601f2f"
  //     }
  //   }

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }

  const createOrderInDatabase = async (paymentId, amount, userId, userEmail, userFullName, userPhone) => {
    setIsProcessingOrder(true);
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
      const orderDate = createdAt.toISOString().replace('T', ' ').substring(0, 16);

      // Prepare Shiprocket order data
      const [firstName, ...lastNameParts] = userFullName.split(' ');
      const lastName = lastNameParts.join(' ') || ' '; // In case there's no last name

      const shiprocketOrderData = {
        order_id: orderId,
        order_date: orderDate,
        pickup_location: "Mini_Factory_6363900869", // Replace with your actual pickup location
        comment: "Reseller: M/s " + lastName,
        billing_customer_name: firstName,
        billing_last_name: lastName,
        billing_address: shippingAddress.addressLine1 || '',
        billing_address_2: shippingAddress.addressLine2 || '',
        billing_city: shippingAddress.city || '',
        billing_pincode: shippingAddress.postalCode || '',
        billing_state: shippingAddress.state || '',
        billing_country: shippingAddress.country || 'India',
        billing_email: userEmail || '',
        billing_phone: userPhone || '',
        shipping_is_billing: true,
        order_items: cartItems.map(item => ({
          name: item.name || '',
          sku: item.product_id || '',
          units: item.quantity || 1,
          selling_price: item.price || 0,
        })),
        payment_method: "Prepaid",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: amount,
        length: 10, // Default dimensions
        breadth: 15,
        height: 20,
        weight: 2.5 // Default weight
      };

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
        userId: userId,
        shiprocketData: shiprocketOrderData // Store the Shiprocket data for reference
      };

      // Save order to orders collection
      const ordersRef = doc(db, "orders", userId);
      const ordersDoc = await getDoc(ordersRef);

      if (ordersDoc.exists()) {
        await setDoc(ordersRef, { [orderId]: newOrder }, { merge: true });
      } else {
        await setDoc(ordersRef, { [orderId]: newOrder });
      }

      const totalQuantity = orderItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

      const dashboardOrdersRef = doc(db, 'dashboard', 'orders');
      const dashboardSnap = await getDoc(dashboardOrdersRef);

      if (dashboardSnap.exists()) {
        await updateDoc(dashboardOrdersRef, {
          count: increment(1),
          totalAmount: increment(amount),
          totalQuantity: increment(totalQuantity)
        });
      } else {
        await setDoc(dashboardOrdersRef, {
          count: 1,
          totalAmount: amount,
          totalQuantity: totalQuantity
        });
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

      // Call Shiprocket API to create the order
      try {
        const shiprocketResponse = await axios.post(`${baseURL}/api/create-order`, shiprocketOrderData);
        console.log('Shiprocket order created:', shiprocketResponse.data);

        // Update order with Shiprocket response if needed
        await setDoc(ordersRef, {
          [orderId]: {
            ...newOrder,
            shiprocketResponse: shiprocketResponse.data
          }
        }, { merge: true });
      } catch (shiprocketError) {
        console.error('Shiprocket order creation failed:', shiprocketError);
        // You might want to handle this differently - maybe queue for retry
      }

      // Send order confirmation email
      if (userEmail) {
        const emailSent = await sendOrderConfirmationEmail(
          userEmail,
          orderId,
          amount,
          orderItems
        );

        setIsProcessingOrder(false);

        if (emailSent) {
          await Swal.fire({
            icon: 'success',
            title: 'Order Placed Successfully!',
            text: 'Check your email for confirmation.',
            confirmButtonColor: '#3085d6'
          });
        } else {
          await Swal.fire({
            icon: 'warning',
            title: 'Order Placed Successfully!',
            text: "We couldn't send the confirmation email, but you can view your order in 'My Orders'.",
            confirmButtonColor: '#3085d6'
          });
        }
      } else {
        alert("Order placed successfully!");
      }
      refreshCart();
      navigate("/myorders");

    } catch (error) {
      console.error("Error creating order in database:", error);
      alert('Payment was successful but there was an error saving your order. Please contact support.');
    }
  };

  // const createOrderInDatabase = async (paymentId, amount, userId, userEmail, userFullName, userPhone) => {
  //   setIsProcessingOrder(true);
  //   try {
  //     let shippingAddress;

  //     if (selectedAddress === 'home' && defaultAddress) {
  //       shippingAddress = defaultAddress;
  //     } else if (selectedAddress === 'new') {
  //       shippingAddress = {
  //         ...formData,
  //         country: 'India',
  //         fullName: userFullName || '',
  //         email: userEmail || '',
  //         phone: userPhone || ''
  //       };
  //     } else {
  //       // Handle case where a specific address is selected from allAddresses
  //       const selectedAddr = allAddresses.find(addr => addr.address_id === selectedAddress);
  //       if (selectedAddr) {
  //         shippingAddress = selectedAddr;
  //       } else {
  //         throw new Error("Selected address not found");
  //       }
  //     }



  //     const orderItems = cartItems.map((item) => ({
  //       ...item,
  //       order_item_id: uuidv4(),
  //     }));

  //     const orderId = uuidv4();
  //     const createdAt = new Date();

  //     // Create transaction record
  //     const transactionData = {
  //       orderId,
  //       paymentStatus: "Paid",
  //       paymentId,
  //       paymentAmount: amount,
  //       createdAt,
  //       userId: userId
  //     };

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
  //       paymentStatus: "Paid",
  //       userId: userId // Store userId with the order
  //     };

  //     // Save order to orders collection
  //     const ordersRef = doc(db, "orders", userId);
  //     const ordersDoc = await getDoc(ordersRef);

  //     if (ordersDoc.exists()) {
  //       await setDoc(ordersRef, { [orderId]: newOrder }, { merge: true });
  //     } else {
  //       await setDoc(ordersRef, { [orderId]: newOrder });
  //     }

  //     // Calculate total quantity of items in the order
  //     const totalQuantity = orderItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  //     // Update dashboard/orders document
  //     const dashboardOrdersRef = doc(db, 'dashboard', 'orders');
  //     const dashboardSnap = await getDoc(dashboardOrdersRef);

  //     if (dashboardSnap.exists()) {
  //       await updateDoc(dashboardOrdersRef, {
  //         count: increment(1),
  //         totalAmount: increment(amount),
  //         totalQuantity: increment(totalQuantity)
  //       });
  //     } else {
  //       await setDoc(dashboardOrdersRef, {
  //         count: 1,
  //         totalAmount: amount,
  //         totalQuantity: totalQuantity
  //       });
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

  //     // Save shipping address to user's address book if requested and logged in
  //     if (saveToAccount && selectedAddress === 'new' && userId) {
  //       const addressData = {
  //         ...shippingAddress,
  //         address_id: uuidv4(),
  //         isDefault: true,
  //         createdAt,
  //         label: formData.addressLabel || 'My Address'
  //       };

  //       const userAddressRef = doc(db, "addresses", userId);
  //       const userAddressDoc = await getDoc(userAddressRef);

  //       let updatedAddresses = [];

  //       if (userAddressDoc.exists()) {
  //         updatedAddresses = (userAddressDoc.data().addresses || []).map(addr => ({
  //           ...addr,
  //           isDefault: false
  //         }));
  //       }

  //       updatedAddresses.push(addressData);

  //       await setDoc(userAddressRef, {
  //         addresses: updatedAddresses,
  //       });
  //     }

  //     // Clear the cart if user was logged in
  //     if (userId) {
  //       await setDoc(doc(db, "cart_items", userId), { items: [] });
  //     }

  //     localStorage.removeItem('guest_cart_items');

  //     // Send order confirmation email
  //     if (userEmail) {
  //       const emailSent = await sendOrderConfirmationEmail(
  //         userEmail,
  //         orderId,
  //         amount,
  //         orderItems
  //       );

  //       setIsProcessingOrder(false);

  //       if (emailSent) {
  //         await Swal.fire({
  //           icon: 'success',
  //           title: 'Order Placed Successfully!',
  //           text: 'Check your email for confirmation.',
  //           confirmButtonColor: '#3085d6'
  //         });
  //       } else {
  //         await Swal.fire({
  //           icon: 'warning',
  //           title: 'Order Placed Successfully!',
  //           text: "We couldn't send the confirmation email, but you can view your order in 'My Orders'.",
  //           confirmButtonColor: '#3085d6'
  //         });
  //       }
  //     } else {
  //       alert("Order placed successfully!");
  //     }
  //     refreshCart();
  //     navigate("/myorders");

  //   } catch (error) {
  //     console.error("Error creating order in database:", error);
  //     alert('Payment was successful but there was an error saving your order. Please contact support.');
  //   } finally {
  //     setIsProcessingOrder(false); // Hide processing message
  //   }
  // };

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


  useEffect(() => {
    // Trigger Shiprocket order creation when postalCode is available (6 digits)
    if (formData.postalCode && formData.postalCode.length === 6) {
      createShiprocketOrder();
    }
  }, [formData.postalCode]);

  const createShiprocketOrder = async () => {
    try {
      const orderId = uuidv4();

      const subTotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
      const totalWeight = cartItems.reduce((sum, item) => sum + (parseFloat(item.weight || 0) * item.quantity), 0) / 1000; // grams to kg

      const orderPayload = {
        order_id: orderId,
        order_date: new Date().toISOString().split("T")[0],
        pickup_location: "Mini_Factory_6363900869",
        comment: "Reseller: M/s " + (formData.lastName || 'Customer'),
        billing_customer_name: formData.firstName || 'First Name',
        billing_last_name: formData.lastName || '',
        billing_address: formData.addressLine1 || 'Address Line 1',
        billing_address_2: formData.addressLine2 || '',
        billing_city: formData.city || 'City',
        billing_pincode: formData.postalCode,
        billing_state: formData.state || 'State',
        billing_country: formData.country || 'India',
        billing_email: currentUser?.email || formData.email || 'test@example.com',
        billing_phone: currentUser?.phone || formData.phone || '9999999999',
        shipping_is_billing: true,
        order_items: cartItems.map(item => ({
          name: item.name || '',
          sku: item.product_id || '',
          units: item.quantity || 1,
          selling_price: item.price || 0,
        })),
        payment_method: "Prepaid",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: subTotal || 10,
        length: 10,
        breadth: 15,
        height: 20,
        weight: totalWeight || 0.5,
      };

      console.log("Sending order payload:", orderPayload);

      const createOrderRes = await axios.post(`${baseURL}/api/shippingrate-order`, orderPayload);
      const orderIdFromShiprocket = createOrderRes.data.order_id;

      console.log("Shiprocket Order Created:", orderIdFromShiprocket);

      fetchServiceability(orderIdFromShiprocket);

      setFormData(prev => ({ ...prev, orderId: orderIdFromShiprocket }));
    } catch (error) {
      console.error("Error creating Shiprocket order:", error.response?.data || error.message);
    }
  };

  // Modify the handleAddressSelection function to ensure it updates the formData properly
  const handleAddressSelection = (type, address = null) => {
    if (type === 'address' && address) {
      setSelectedAddress(address.address_id);
      const newFormData = {
        addressLine1: address.addressLine1 || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.postalCode || '',
        addressLabel: address.label || '',
        country: address.country || '',
        fullName: currentUser?.fullName || formData.fullName || '',
        email: currentUser?.email || formData.email || '',
        phone: currentUser?.phone || formData.phone || '',
        orderId: formData.orderId || ''
      };
      setFormData(newFormData);
    } else if (type === 'new') {
      setSelectedAddress('new');
      setFormData({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        addressLabel: '',
        country: '',
        fullName: currentUser?.fullName || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        orderId: ''
      });
      setSaveToAccount(false);
    } else if (type === 'home' && defaultAddress) {
      setSelectedAddress('home');
      const newFormData = {
        addressLine1: defaultAddress.addressLine1 || '',
        addressLine2: defaultAddress.addressLine2 || '',
        city: defaultAddress.city || '',
        state: defaultAddress.state || '',
        postalCode: defaultAddress.postalCode || '',
        addressLabel: defaultAddress.label || '',
        country: defaultAddress.country || '',
        fullName: currentUser?.fullName || formData.fullName || '',
        email: currentUser?.email || formData.email || '',
        phone: currentUser?.phone || formData.phone || '',
        orderId: formData.orderId || ''
      };
      setFormData(newFormData);
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
                  <h5 className="mb-3 fw-bold">Select Shipping Address</h5>

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
                  <div className="shipping-box p-4 rounded shadow-sm bg-white" >
                    <h5 className="mb-4 shipping-heading">
                      {selectedAddress === 'new' ? 'Enter Shipping Information' : 'Confirm Shipping Information'}
                    </h5>

                    {selectedAddress === 'new' ? (
                      <form>
                        <div className="row mb-3">
                          <div className="col-md-4">
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
                          <div className="col-md-4">
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
                          <div className="col-md-4">
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
                          <div className="col-md-4">
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

                          <div className="col-md-4">
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
                          <div className="col-md-4">
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
                          <div className="col-md-4">
                            <label className="form-label shipping-label">State*</label>
                            <input
                              type="text"
                              name="state"
                              className="form-control bg-light border rounded-3"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-4">
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
                          <div className="col-md-4">
                            <label className="form-label shipping-label">Country</label>
                            <div className="form-control bg-light border rounded-3">
                              India
                            </div>
                          </div>
                          {formData.postalCode && (
                            <div className="col-md-4">
                              <label className="form-label shipping-label">Order ID</label>
                              <input
                                type="text"
                                className="form-control bg-light border rounded-3"
                                value={formData.orderId}
                                readOnly
                              />
                            </div>
                          )}
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
                          <div className="col-md-4">
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
                          <div className="col-md-4">
                            <label className="form-label shipping-label">Email</label>
                            <input
                              name="email"
                              className="form-control bg-light border rounded-3"
                              value={formData.email || currentUser?.email || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label shipping-label">Phone</label>
                            <input
                              name="phone"
                              className="form-control bg-light border rounded-3"
                              value={formData.phone || currentUser?.phone || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label shipping-label">Address Line 1</label>
                            <input
                              name="addressLine1"
                              className="form-control bg-light border rounded-3"
                              value={formData.addressLine1 || ''}
                              onChange={handleInputChange}
                            />
                          </div>

                          {formData.addressLine2 && (
                            <div className="col-md-4">
                              <label className="form-label shipping-label">Address Line 2 (Optional)</label>
                              <input
                                name="addressLine2"
                                className="form-control bg-light border rounded-3"
                                value={formData.addressLine2 || ''}
                                onChange={handleInputChange}
                              />
                            </div>
                          )}
                          <div className="col-md-4">
                            <label className="form-label shipping-label">City</label>
                            <input
                              name="city"
                              className="form-control bg-light border rounded-3"
                              value={formData.city || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label shipping-label">State / Province</label>
                            <input
                              name="state"
                              className="form-control bg-light border rounded-3"
                              value={formData.state || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label shipping-label">Postal Code</label>
                            <input
                              name="postalCode"
                              className="form-control bg-light border rounded-3"
                              value={formData.postalCode || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label shipping-label">Country</label>
                            <input
                              name="country"
                              className="form-control bg-light border rounded-3"
                              value={formData.country || 'India'}
                              onChange={handleInputChange}
                            />
                          </div>
                          {formData.postalCode.length === 6 && (
                            <div className="col-md-4">
                              <label className="form-label shipping-label">Order ID</label>
                              <input
                                type="text"
                                className="form-control bg-light border rounded-3"
                                value={formData.orderId || ''}
                                readOnly
                              />
                            </div>
                          )}
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
              <div className="card p-4 shadow-sm">
        <h4 className="fw-bold mb-3 pb-2 border-bottom">Order Summary</h4>
        
        <div className="d-flex justify-content-between mb-1">
          <span className="summary-label">Total Price</span>
          <span className="summary-value"> + ₹{summary?.totalPrice || '0.00'}</span>
        </div>
        
        <div className="d-flex justify-content-between mb-1">
          <span className="summary-label">Total Discount</span>
          <span className="summary-value text-success"> - ₹{summary?.totalDiscount || '0.00'}</span>
        </div>
        
        <div className="d-flex justify-content-between mb-3">
          <span className="summary-label">Shipping</span>
          <span className="summary-value">
            {itemCount >= 4 ? '₹0.00' : `₹${summary?.shippingCost || '0.00'}`}
          </span>
        </div>

        <hr />
        
        <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
          <span>Order Total</span>
          <span>₹{summary?.orderTotal || '0.00'}</span>
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

      {isProcessingOrder && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <div className="spinner" style={{
            width: '60px',
            height: '60px',
            border: '6px solid #f3f3f3',
            borderTop: '6px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }} />
          <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>
            Processing your order...
          </div>
        </div>
      )}

      <Footer />
        </div>
    </>

  );
};

export default CheckoutPage;