// import React, { useEffect, useState } from 'react';
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import './CheckOut.css';
// import { useAuth } from '../../AuthContext/AuthContext';
// import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

// const CheckoutPage = () => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [isPlacingOrder, setIsPlacingOrder] = useState(false);
//   const [defaultAddress, setDefaultAddress] = useState(null);
//   const [loadingAddress, setLoadingAddress] = useState(true);
//   const [hasAddresses, setHasAddresses] = useState(false);

//   const [formData, setFormData] = useState({
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     addressLabel: '',
//   });

//   const [selectedAddress, setSelectedAddress] = useState('home'); // 'home' or 'new'
//   const [saveToAccount, setSaveToAccount] = useState(false);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (currentUser?.uid) {
//         const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
//         if (userDoc.exists()) {
//           setUserDetails(userDoc.data());
//         }
//       }
//     };
//     fetchUserDetails();
//   }, [currentUser]);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       if (currentUser?.uid) {
//         try {
//           const cartDoc = await getDoc(doc(db, 'cart_items', currentUser.uid));
//           if (cartDoc.exists()) {
//             const data = cartDoc.data();
//             const combinedItems = combineCartItems(data.items || []);
//             setCartItems(combinedItems);
//           }
//         } catch (error) {
//           console.error("Error fetching cart items:", error);
//         }
//       }
//     };
//     fetchCartItems();
//   }, [currentUser]);

// useEffect(() => {
//   const fetchDefaultAddress = async () => {
//     if (currentUser?.uid) {
//       try {
//         const addressDoc = await getDoc(doc(db, 'addresses', currentUser.uid));
//         if (addressDoc.exists()) {
//           const addresses = addressDoc.data().addresses || [];
//           setHasAddresses(addresses.length > 0);
//           const defaultAddr = addresses.find(addr => addr.isDefault);
//           setDefaultAddress(defaultAddr || null);

//           // If no default address but addresses exist, select the first one
//           if (!defaultAddr && addresses.length > 0) {
//             setDefaultAddress(addresses[0]);
//           }

//           // Only set formData if we're using the default address
//           if (selectedAddress === 'home' && (defaultAddr || addresses.length > 0)) {
//             const addressToUse = defaultAddr || addresses[0];
//             setFormData({
//               addressLine1: addressToUse.addressLine1 || '',
//               addressLine2: addressToUse.addressLine2 || '',
//               city: addressToUse.city || '',
//               state: addressToUse.state || '',
//               postalCode: addressToUse.postalCode || '',
//               addressLabel: addressToUse.label || '',
//             });
//           }
//         } else {
//           setHasAddresses(false);
//         }
//       } catch (error) {
//         console.error("Error fetching default address:", error);
//       } finally {
//         setLoadingAddress(false);
//       }
//     } else {
//       setLoadingAddress(false);
//       setHasAddresses(false);
//     }
//   };
//   fetchDefaultAddress();
// }, [currentUser, selectedAddress]); // Add selectedAddress to dependencies

//   const combineCartItems = (items) => {
//     const map = new Map();
//     items.forEach((item) => {
//       const id = item.product_id;
//       const existing = map.get(id);
//       if (existing) {
//         existing.quantity += Number(item.quantity);
//       } else {
//         map.set(id, { ...item, quantity: Number(item.quantity) });
//       }
//     });
//     return Array.from(map.values());
//   };

//   const calculateTotal = () => {
//     return cartItems
//       .reduce((acc, item) => {
//         const price = typeof item.price === 'string'
//           ? parseFloat(item.price.replace(/[^\d.]/g, ''))
//           : Number(item.price);
//         const quantity = Number(item.quantity);
//         return acc + price * quantity;
//       }, 0)
//       .toFixed(2);
//   };

//   const getPriceDisplay = (price) => {
//     if (typeof price === 'string') {
//       return price;
//     }
//     return `₹${price.toFixed(2)}`;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // const handlePlaceOrder = async () => {
//   //   if (!currentUser?.uid) {
//   //     alert('Please login to place an order');
//   //     return;
//   //   }

//   //   if (cartItems.length === 0) {
//   //     alert('Your cart is empty');
//   //     return;
//   //   }

//   //   if (selectedAddress === 'new' && 
//   //       (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode)) {
//   //     alert('Please fill in all required address fields');
//   //     return;
//   //   }

//   //   setIsPlacingOrder(true);

//   //   try {
//   //     let shippingAddress;
//   //     if (selectedAddress === 'home' && defaultAddress) {
//   //       shippingAddress = defaultAddress;
//   //     } else if (selectedAddress === 'home' && !defaultAddress) {
//   //       shippingAddress = {
//   //         addressLine1: currentUser.addressLine1 || '',
//   //         addressLine2: currentUser.addressLine2 || '',
//   //         city: currentUser.city || '',
//   //         state: currentUser.state || '',
//   //         postalCode: currentUser.postalCode || '',
//   //         country: currentUser.country || 'India',
//   //         fullName: currentUser.fullName || '',
//   //         email: currentUser.email || '',
//   //         phone: currentUser.phone || ''
//   //       };
//   //     } else {
//   //       shippingAddress = {
//   //         ...formData,
//   //         country: 'India',
//   //         fullName: currentUser.fullName || '',
//   //         email: currentUser.email || '',
//   //         phone: currentUser.phone || ''
//   //       };
//   //     }

//   //     const orderItems = cartItems.map((item) => ({
//   //       ...item,
//   //       order_item_id: uuidv4(),
//   //     }));

//   //     const orderId = uuidv4();

//   //     const newOrder = {
//   //       orderId,
//   //       items: orderItems,
//   //       shippingAddress,
//   //       status: "Pending",
//   //       createdAt: new Date(),
//   //     };

//   //     const userOrdersRef = doc(db, "orders", currentUser.uid);
//   //     const userOrdersDoc = await getDoc(userOrdersRef);

//   //     if (userOrdersDoc.exists()) {
//   //       await setDoc(userOrdersRef, { [orderId]: newOrder }, { merge: true });
//   //     } else {
//   //       await setDoc(userOrdersRef, { [orderId]: newOrder });
//   //     }

//   //     const orderStatusEntry = {
//   //       status: "Pending",
//   //       timestamp: new Date(),
//   //     };

//   //     const orderStatusRef = doc(db, "order_status", orderId);
//   //     await setDoc(orderStatusRef, {
//   //       statusHistory: [orderStatusEntry],
//   //     });

//   //     if (selectedAddress === 'new' && saveToAccount) {
//   //       const addressData = {
//   //         ...shippingAddress,
//   //         address_id: uuidv4(),
//   //         isDefault: true,
//   //         label: formData.addressLabel || 'Home',
//   //         createdAt: new Date(),
//   //       };

//   //       const userAddressRef = doc(db, "addresses", currentUser.uid);
//   //       const userAddressDoc = await getDoc(userAddressRef);

//   //       let updatedAddresses = [];

//   //       if (userAddressDoc.exists()) {
//   //         const existingAddresses = userAddressDoc.data().addresses || [];
//   //         updatedAddresses = existingAddresses.map(addr => ({
//   //           ...addr,
//   //           isDefault: false
//   //         }));
//   //       }

//   //       updatedAddresses.push(addressData);

//   //       await setDoc(userAddressRef, {
//   //         addresses: updatedAddresses,
//   //       });
//   //     }

//   //     await setDoc(doc(db, "cart_items", currentUser.uid), { items: [] });

//   //     alert("Order placed successfully!");
//   //     navigate("/myorders");

//   //   } catch (error) {
//   //     console.error("Error placing order:", error);
//   //     alert('Failed to place order. Please try again.');
//   //   } finally {
//   //     setIsPlacingOrder(false);
//   //   }
//   // };


//  const handlePlaceOrder = async () => {
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
//     const amount = calculateTotal();
//     await createRazorpayOrder(amount);
//   } catch (error) {
//     console.error("Error placing order:", error);
//     alert('Failed to place order. Please try again.');
//   } finally {
//     setIsPlacingOrder(false);
//   }
// };

//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true)
//       }
//       script.onerror = () => {
//         resolve(false)
//       }
//       document.body.appendChild(script);
//     })
//   }

//   const createRazorpayOrder = async (amount) => {
//     let data = JSON.stringify({
//       amount: amount * 100,
//       currency: "INR"
//     })

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:5000/orders",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: data
//     }

//     try {
//       const response = await axios.request(config);
//       console.log(JSON.stringify(response.data));
//       await handleRazorpayScreen(response.data.amount, amount);
//     } catch (error) {
//       console.log("error at", error);
//       throw error;
//     }
//   }

//   const handleRazorpayScreen = async (amountInPaise, originalAmount) => {
//     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//     if (!res) {
//       alert("Some error at razorpay screen loading");
//       return;
//     }

//     const options = {
//       key: 'rzp_test_PhWbtmUxU6a9Vf',
//       amount: amountInPaise,
//       currency: 'INR',
//       name: "papaya coders",
//       description: "payment to papaya coders",
//       image: "https://papayacoders.com/demo.png",
//       handler: async function (response) {
//         // Payment successful - now create the order in your database
//         await createOrderInDatabase(response.razorpay_payment_id, originalAmount);
//       },
//       prefill: {
//         name: currentUser?.fullName || "Customer",
//         email: currentUser?.email || "customer@example.com",
//         contact: currentUser?.phone || ""
//       },
//       theme: {
//         color: "#F4C430"
//       }
//     }

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   }

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

//     const orderId = uuidv4();
//     const createdAt = new Date();

//     // Create transaction record
//     const transactionData = {
//       orderId,
//       paymentStatus: "Paid",
//       paymentId,
//       paymentAmount: amount,
//       createdAt,
//       userId: currentUser.uid
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
//         isDefault: true, // Always set as default when saving new address
//         createdAt,
//         label: formData.addressLabel || 'My Address'
//       };

//       const userAddressRef = doc(db, "addresses", currentUser.uid);
//       const userAddressDoc = await getDoc(userAddressRef);

//       let updatedAddresses = [];
      
//       if (userAddressDoc.exists()) {
//         // Mark all existing addresses as not default
//         updatedAddresses = (userAddressDoc.data().addresses || []).map(addr => ({
//           ...addr,
//           isDefault: false
//         }));
//       }
      
//       // Add new address as default
//       updatedAddresses.push(addressData);

//       await setDoc(userAddressRef, {
//         addresses: updatedAddresses,
//       });

//       // Update local state to reflect the new default address
//       setDefaultAddress(addressData);
//       setHasAddresses(true);
//       setSelectedAddress('home'); // Switch to home address view
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
//     }

//     alert("Order placed successfully!");
//     navigate("/myorders");

//   } catch (error) {
//     console.error("Error creating order in database:", error);
//     alert('Payment was successful but there was an error saving your order. Please contact support.');
//   }
// };
  
//   const handleCheckboxChange = () => {
//     setSaveToAccount((prev) => {
//       const newState = !prev;
//       if (newState && !formData.addressLabel) {
//         setFormData((prevData) => ({
//           ...prevData,
//           addressLabel: '',
//         }));
//       }
//       return newState;
//     });
//   };

//   // Update the address selection to clear form when selecting new address
// const handleAddressSelection = (type) => {
//   setSelectedAddress(type);
//   if (type === 'new') {
//     setFormData({
//       addressLine1: '',
//       addressLine2: '',
//       city: '',
//       state: '',
//       postalCode: '',
//       addressLabel: '',
//     });
//     setSaveToAccount(false);
//   } else if (type === 'home' && defaultAddress) {
//     setFormData({
//       addressLine1: defaultAddress.addressLine1 || '',
//       addressLine2: defaultAddress.addressLine2 || '',
//       city: defaultAddress.city || '',
//       state: defaultAddress.state || '',
//       postalCode: defaultAddress.postalCode || '',
//       addressLabel: defaultAddress.label || '',
//     });
//   }
// };

//   return (
//     <>
//       <Header />
//       <div className="checkout-page">
//         <h2 className="checkout-title mb-4">Checkout</h2>
//         <div className="row">
//           <div className="col-lg-8 mb-4">
//             {loadingAddress ? (
//               <div className="text-center py-4">
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : hasAddresses ? (
//               <>
//                 <div className="shipping-address-selection mb-4">
//                   <h5 className="mb-3">Select Shipping Address</h5>

//                   <div className={`address-card mb-3 p-3 rounded ${selectedAddress === 'home' ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white border'}`}
//                     onClick={() => handleAddressSelection('home')}
//                     style={{ cursor: 'pointer', border: '1px solid #dee2e6' }}>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="addressSelection"
//                         id="homeAddress"
//                         checked={selectedAddress === 'home'}
//                         onChange={() => setSelectedAddress('home')}
//                       />
//                       <label className="form-check-label w-100" htmlFor="homeAddress">
//                         <h6 className="mb-2 fw-bold">Home - {defaultAddress?.label || 'Default'}</h6>
//                         <div className="address-details ps-4">
//                           {defaultAddress ? (
//                             <>
//                               <p className="mb-1">{defaultAddress.addressLine1}</p>
//                               {defaultAddress.addressLine2 && <p className="mb-1">{defaultAddress.addressLine2}</p>}
//                               <p className="mb-0">{defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}</p>
//                             </>
//                           ) : (
//                             <p>No default address found</p>
//                           )}
//                         </div>
//                       </label>
//                     </div>
//                   </div>

//                   <div className={`address-card p-3 rounded ${selectedAddress === 'new' ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white border'}`}
//                     onClick={() => handleAddressSelection('new')}
//                     style={{ cursor: 'pointer', border: '1px solid #dee2e6' }}>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="addressSelection"
//                         id="newAddress"
//                         checked={selectedAddress === 'new'}
//                         onChange={() => setSelectedAddress('new')}
//                       />
//                       <label className="form-check-label w-100" htmlFor="newAddress">
//                         <h6 className="mb-1 fw-bold">Use a new address</h6>
//                         <p className="text-muted mb-0 ps-4">Enter shipping details below.</p>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {selectedAddress === 'home' && defaultAddress && (
//                   <div className="shipping-box p-4 rounded shadow-sm bg-white" style={{ marginBottom: "100px" }}>
//                     <h5 className="mb-4 shipping-heading">Confirm Shipping Information</h5>
//                     <div className="row mb-3">
//                       <div className="col-md-6">
//                         <label className="form-label shipping-label">Full Name</label>
//                         <input
//                           type="text"
//                           className="form-control bg-light border rounded-3"
//                           value={defaultAddress.fullName || currentUser?.fullName || ''}
//                           readOnly
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label shipping-label">Email</label>
//                         <input
//                           type="email"
//                           className="form-control bg-light border rounded-3"
//                           value={defaultAddress.email || currentUser?.email || ''}
//                           readOnly
//                         />
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label shipping-label">Phone</label>
//                       <div className="form-control bg-light border rounded-3">
//                         {defaultAddress.phone || currentUser?.phone || ''}
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label shipping-label">Address Line 1</label>
//                       <div className="form-control bg-light border rounded-3">
//                         {defaultAddress.addressLine1 || ''}
//                       </div>
//                     </div>

//                     {defaultAddress.addressLine2 && (
//                       <div className="mb-3">
//                         <label className="form-label shipping-label">Address Line 2 (Optional)</label>
//                         <div className="form-control bg-light border rounded-3">
//                           {defaultAddress.addressLine2}
//                         </div>
//                       </div>
//                     )}

//                     <div className="row mb-3">
//                       <div className="col-md-6">
//                         <label className="form-label shipping-label">City</label>
//                         <div className="form-control bg-light border rounded-3">
//                           {defaultAddress.city || ''}
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label shipping-label">State / Province</label>
//                         <div className="form-control bg-light border rounded-3">
//                           {defaultAddress.state || ''}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="row mb-3">
//                       <div className="col-md-6">
//                         <label className="form-label shipping-label">Postal Code</label>
//                         <div className="form-control bg-light border rounded-3">
//                           {defaultAddress.postalCode || ''}
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label shipping-label">Country</label>
//                         <div className="form-control bg-light border rounded-3">
//                           {defaultAddress.country || 'India'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="shipping-box p-4 rounded shadow-sm bg-white">
//                 <h5 className="mb-4 shipping-heading">Enter Shipping Information</h5>
//                 <form>
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Full Name</label>
//                       <input
//                         type="text"
//                         className="form-control bg-light border rounded-3"
//                         value={currentUser?.fullName || ''}
//                         readOnly
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Email</label>
//                       <input
//                         type="email"
//                         className="form-control bg-light border rounded-3"
//                         value={currentUser?.email || ''}
//                         readOnly
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label shipping-label">Phone</label>
//                     <input
//                       type="tel"
//                       className="form-control bg-light border rounded-3"
//                       value={currentUser?.phone || ''}
//                       readOnly
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label shipping-label">Address Line 1*</label>
//                     <input
//                       type="text"
//                       name="addressLine1"
//                       className="form-control bg-light border rounded-3"
//                       placeholder="Street address, P.O. box"
//                       value={formData.addressLine1}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label shipping-label">Address Line 2 (Optional)</label>
//                     <input
//                       type="text"
//                       name="addressLine2"
//                       className="form-control bg-light border rounded-3"
//                       placeholder="Apartment, suite, unit"
//                       value={formData.addressLine2}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">City*</label>
//                       <input
//                         type="text"
//                         name="city"
//                         className="form-control bg-light border rounded-3"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">State / Province*</label>
//                       <input
//                         type="text"
//                         name="state"
//                         className="form-control bg-light border rounded-3"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Postal Code*</label>
//                       <input
//                         type="text"
//                         name="postalCode"
//                         className="form-control bg-light border rounded-3"
//                         value={formData.postalCode}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Country</label>
//                       <div className="form-control bg-light border rounded-3">
//                         India
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-check mb-3">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="saveToAccount"
//                       checked={saveToAccount}
//                       onChange={handleCheckboxChange}
//                     />
//                     <label className="form-check-label text-muted" htmlFor="saveToAccount">
//                       <strong>Save this address to my account</strong><br />
//                       <small>For faster checkout next time.</small>
//                     </label>
//                   </div>

//                   {saveToAccount && (
//                     <div className="mb-3">
//                       <label className="form-label shipping-label">
//                         Label for this address (e.g., Home, Work)
//                       </label>
//                       <input
//                         type="text"
//                         name="addressLabel"
//                         className="form-control bg-light border rounded-3"
//                         placeholder="e.g., Home, Work"
//                         value={formData.addressLabel}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   )}
//                 </form>
//               </div>
//             )}

//             {selectedAddress === 'new' && hasAddresses && (
//               <div className="shipping-box p-4 rounded shadow-sm bg-white">
//                 <h5 className="mb-4 shipping-heading">Enter Shipping Information</h5>
//                 <form>
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Full Name</label>
//                       <input
//                         type="text"
//                         className="form-control bg-light border rounded-3"
//                         value={currentUser?.fullName || ''}
//                         readOnly
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Email</label>
//                       <input
//                         type="email"
//                         className="form-control bg-light border rounded-3"
//                         value={currentUser?.email || ''}
//                         readOnly
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label shipping-label">Phone</label>
//                     <input
//                       type="tel"
//                       className="form-control bg-light border rounded-3"
//                       value={currentUser?.phone || ''}
//                       readOnly
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label shipping-label">Address Line 1*</label>
//                     <input
//                       type="text"
//                       name="addressLine1"
//                       className="form-control bg-light border rounded-3"
//                       placeholder="Street address, P.O. box"
//                       value={formData.addressLine1}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label shipping-label">Address Line 2 (Optional)</label>
//                     <input
//                       type="text"
//                       name="addressLine2"
//                       className="form-control bg-light border rounded-3"
//                       placeholder="Apartment, suite, unit"
//                       value={formData.addressLine2}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">City*</label>
//                       <input
//                         type="text"
//                         name="city"
//                         className="form-control bg-light border rounded-3"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">State / Province*</label>
//                       <input
//                         type="text"
//                         name="state"
//                         className="form-control bg-light border rounded-3"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Postal Code*</label>
//                       <input
//                         type="text"
//                         name="postalCode"
//                         className="form-control bg-light border rounded-3"
//                         value={formData.postalCode}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label shipping-label">Country</label>
//                       <div className="form-control bg-light border rounded-3">
//                         India
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-check mb-3">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="saveToAccount"
//                       checked={saveToAccount}
//                       onChange={handleCheckboxChange}
//                     />
//                     <label className="form-check-label text-muted" htmlFor="saveToAccount">
//                       <strong>Save this address to my account</strong><br />
//                       <small>For faster checkout next time.</small>
//                     </label>
//                   </div>

//                   {saveToAccount && (
//                     <div className="mb-3">
//                       <label className="form-label shipping-label">
//                         Label for this address (e.g., Home, Work)
//                       </label>
//                       <input
//                         type="text"
//                         name="addressLabel"
//                         className="form-control bg-light border rounded-3"
//                         placeholder="e.g., Home, Work"
//                         value={formData.addressLabel}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   )}
//                 </form>
//               </div>
//             )}
//           </div>

//           <div className="col-lg-4">
//             <div className="order-summary-box p-4 rounded shadow-sm bg-white">
//               <h5 className="order-summary-title mb-4">Order Summary</h5>

//               {cartItems.map((item) => {
//                 const price = typeof item.price === 'string'
//                   ? parseFloat(item.price.replace(/[^\d.]/g, ''))
//                   : Number(item.price);
//                 const totalPrice = price * item.quantity;

//                 return (
//                   <div key={item.product_id} className="d-flex align-items-center justify-content-between mb-2">
//                     <div>
//                       <div className="summary-item-name">
//                         {item.name} (x{item.quantity})
//                       </div>
//                       <div className="summary-item-weight">
//                         {item.weight || 'N/A'}
//                       </div>
//                     </div>
//                     <div className="summary-item-price">
//                       ₹{totalPrice.toFixed(2)}
//                     </div>
//                   </div>
//                 );
//               })}

//               <hr />
//               <div className="d-flex justify-content-between mb-1">
//                 <span className="summary-label">Subtotal</span>
//                 <span className="summary-value">₹{calculateTotal()}</span>
//               </div>
//               <div className="d-flex justify-content-between mb-3">
//                 <span className="summary-label">Shipping</span>
//                 <span className="summary-value">Free</span>
//               </div>
//               <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
//                 <span>Total</span>
//                 <span>₹{calculateTotal()}</span>
//               </div>
//               <hr />

//               <button
//                 className="btn btn-place-order w-100"
//                 onClick={handlePlaceOrder}
//                 disabled={isPlacingOrder}
//               >
//                 {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default CheckoutPage;







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

            // Only set formData if we're using the default address
            if (selectedAddress === 'home' && (defaultAddr || addresses.length > 0)) {
              const addressToUse = defaultAddr || addresses[0];
              setFormData({
                addressLine1: addressToUse.addressLine1 || '',
                addressLine2: addressToUse.addressLine2 || '',
                city: addressToUse.city || '',
                state: addressToUse.state || '',
                postalCode: addressToUse.postalCode || '',
                addressLabel: addressToUse.label || '',
              });
            }
          } else {
            setHasAddresses(false);
            setAllAddresses([]);
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
      }
    };
    fetchAddresses();
  }, [currentUser, selectedAddress]);

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
    if (!currentUser?.uid) {
      alert('Please login to place an order');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (selectedAddress !== 'new' && !defaultAddress) {
      alert('Please select a shipping address');
      return;
    }

    if (selectedAddress === 'new' &&
      (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode)) {
      alert('Please fill in all required address fields');
      return;
    }

    setIsPlacingOrder(true);

    try {
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

  const createOrderInDatabase = async (paymentId, amount) => {
    try {
      let shippingAddress;

      if (selectedAddress === 'home' && defaultAddress) {
        shippingAddress = defaultAddress;
      } else if (selectedAddress === 'new') {
        shippingAddress = {
          ...formData,
          country: 'India',
          fullName: currentUser.fullName || '',
          email: currentUser.email || '',
          phone: currentUser.phone || ''
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
        userId: currentUser.uid
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
      if (saveToAccount && selectedAddress === 'new') {
        const addressData = {
          ...shippingAddress,
          address_id: uuidv4(),
          isDefault: true,
          createdAt,
          label: formData.addressLabel || 'My Address'
        };

        const userAddressRef = doc(db, "addresses", currentUser.uid);
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

        setDefaultAddress(addressData);
        setHasAddresses(true);
        setSelectedAddress('home');
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
      }

      alert("Order placed successfully!");
      navigate("/myorders");

    } catch (error) {
      console.error("Error creating order in database:", error);
      alert('Payment was successful but there was an error saving your order. Please contact support.');
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
                      className={`address-card mb-3 p-3 rounded ${selectedAddress === 'home' ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white border'}`}
                      onClick={() => handleAddressSelection('home')}
                      style={{ cursor: 'pointer', border: '1px solid #dee2e6' }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="addressSelection"
                          id="homeAddress"
                          checked={selectedAddress === 'home'}
                          onChange={() => handleAddressSelection('home')}
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
                    ) : (
                      <>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control bg-light border rounded-3"
                              value={formData.fullName || currentUser?.fullName || ''}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label shipping-label">Email</label>
                            <input
                              type="email"
                              className="form-control bg-light border rounded-3"
                              value={formData.email || currentUser?.email || ''}
                              readOnly
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