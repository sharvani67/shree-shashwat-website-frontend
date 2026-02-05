import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useCart } from '../../AuthContext/CartContext';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import baseURL from "../../Api/Api";
import '../CheckOut/CheckOut.css';
import Swal from 'sweetalert2';


const CheckoutPage = () => {
    const { currentUser } = useAuth();
    const { refreshCart } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [product, setProduct] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(true);
    const [hasAddresses, setHasAddresses] = useState(false);
    const location = useLocation();
    const { product: locationProduct, selectedWeightOption } = location.state || {};
    // const selectedWeightOption = location.state?.selectedWeightOption;
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);
    const [formData, setFormData] = useState({
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

    const [selectedAddress, setSelectedAddress] = useState('home'); // 'home' or 'new'
    const [saveToAccount, setSaveToAccount] = useState(false);
    const [allAddresses, setAllAddresses] = useState([]);
    const [cheapestCourier, setCheapestCourier] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

 useEffect(() => {
    const fetchUserDetails = async () => {
        if (currentUser?.uid) {
            try {
                // Fetch user details from your backend API
                const response = await fetch(`${baseURL}/customers/${currentUser.uid}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const userData = await response.json();
                
                // Transform the data to match your expected format if needed
                const formattedUserData = {
                    uid: userData.customer_id.toString(),
                    fullName: userData.fullName,
                    email: userData.email,
                    phone: userData.phone,
                    createdAt: userData.createdAt
                    // Add any other fields you need
                };
                
                setUserDetails(formattedUserData);
            } catch (error) {
                console.error("Error fetching user details:", error);
                // Optionally handle the error (e.g., show a message to the user)
            }
        }
    };
    
    fetchUserDetails();
}, [currentUser]);

    useEffect(() => {
        //     const fetchAddresses = async () => {
        //       console.log('Starting address fetch...'); // Log 1: Process started

        //       if (currentUser?.uid) {
        //         console.log('Current user UID:', currentUser.uid); // Log 2: User ID verification

        //         try {
        //           console.log('Making API request...'); // Log 3: Before API call
        //           const response = await fetch(`${baseURL}/addresses/${currentUser.uid}`);
        const fetchAddresses = async () => {
            if (currentUser?.uid) {
                try {
                    const userId = String(currentUser.uid).trim();
                    if (!userId) {
                        setLoadingAddress(false);
                        return;
                    }

                    const response = await fetch(`${baseURL}/addresses/${userId}`);

                    console.log('API response status:', response.status); // Log 4: Response status
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const addressData = await response.json();
                    console.log('Raw API response data:', addressData); // Log 5: Raw data

                    const addresses = Array.isArray(addressData) ? addressData : [addressData];
                    console.log('Processed addresses array:', addresses); // Log 6: After array conversion

                    const formattedAddresses = addresses.map(addr => ({
                        address_id: addr.address_id || addr.id.toString(),
                        addressLine1: addr.addressLine1,
                        addressLine2: addr.addressLine2,
                        city: addr.city,
                        state: addr.state,
                        postalCode: addr.postalCode,
                        label: addr.addressLabel || addr.label,
                        isDefault: addr.isDefault === 1,
                        country: addr.country,
                        fullName: addr.fullName,
                        email: addr.email,
                        phone: addr.phone
                    }));

                    console.log('Formatted addresses:', formattedAddresses); // Log 7: Final formatted data

                    setAllAddresses(formattedAddresses);
                    setHasAddresses(formattedAddresses.length > 0);

                    const defaultAddr = formattedAddresses.find(addr => addr.isDefault);
                    console.log('Default address found:', defaultAddr); // Log 8: Default address check

                    setDefaultAddress(defaultAddr || null);

                    if (!defaultAddr && formattedAddresses.length > 0) {
                        console.log('Setting first address as default'); // Log 9: Fallback default
                        setDefaultAddress(formattedAddresses[0]);
                    }

                    if (formattedAddresses.length > 0) {
                        const addressToSelect = defaultAddr || formattedAddresses[0];
                        console.log('Address to select:', addressToSelect); // Log 10: Selection info

                        setSelectedAddress(addressToSelect.address_id);
                        setFormData({
                            addressLine1: addressToSelect.addressLine1 || '',
                            addressLine2: addressToSelect.addressLine2 || '',
                            city: addressToSelect.city || '',
                            state: addressToSelect.state || '',
                            postalCode: addressToSelect.postalCode || '',
                            addressLabel: addressToSelect.label || '',
                        });
                    }

                } catch (error) {
                    console.error("Error fetching addresses:", error);
                } finally {
                    console.log('Finished address fetch attempt'); // Log 11: Final state
                    setLoadingAddress(false);
                }
            } else {
                console.log('No current user UID available'); // Log 12: No user case
                setLoadingAddress(false);
                setHasAddresses(false);
                setAllAddresses([]);
                setSelectedAddress('new');
            }
        };

        fetchAddresses();
    }, [currentUser]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (locationProduct) {
                    setProduct({
                        ...locationProduct,
                        ...(selectedWeightOption && {
                            price: selectedWeightOption.price.toString(),
                            weight: selectedWeightOption.weight,
                            originalPrice: selectedWeightOption.originalPrice?.toString()
                        })
                    });
                    return;
                }

                const response = await axios.get(`${baseURL}/getbyId/products/${id}`);

                if (response.data.success && response.data.data) {
                    const productData = response.data.data;
                    setProduct({
                        ...productData,
                        id: productData.id.toString(),
                        price: productData.price.toString(),
                        originalPrice: productData.originalPrice?.toString() || productData.price.toString(),
                        ...(selectedWeightOption && {
                            price: selectedWeightOption.price.toString(),
                            weight: selectedWeightOption.weight,
                            originalPrice: selectedWeightOption.originalPrice?.toString()
                        })
                    });
                } else {
                    console.error('Product not found in API response');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };

        fetchProduct();
    }, [id, selectedWeightOption, locationProduct]);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === "postalCode" && (!/^\d{0,6}$/.test(value))) return;

        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Trigger Shiprocket order creation only when postalCode is 6 digits
        const postalCodeToUse = name === "postalCode" ? value : updatedFormData.postalCode;
        if (postalCodeToUse.length !== 6) return;

        try {
            const {
                weightOptions, // exclude
                images,        // use only images[0]
                ...restProduct
            } = product;

            const orderItem = {
                ...restProduct,
                image: images?.[0] || '',
                order_item_id: uuidv4(),
                quantity: 1,
                price: product.price || '0.00',
                weight: parseFloat(product.weight) || 500, // default in grams
                originalPrice: product.originalPrice || product.price || '0.00',
                name: product.name || 'Product Name',
                product_id: product.id || uuidv4()
            };

            const orderId = uuidv4();

            // const orderPayload = {
            //     order_id: orderId,
            //     order_date: new Date().toISOString().split("T")[0],
            //     pickup_location: "Mini_Factory_6363900869",
            //     comment: "Reseller: M/s " + (updatedFormData.lastName || 'Customer'),
            //     billing_customer_name: updatedFormData.firstName || 'First Name',
            //     billing_last_name: updatedFormData.lastName || '',
            //     billing_address: updatedFormData.addressLine1 || 'Address Line 1',
            //     billing_address_2: updatedFormData.addressLine2 || '',
            //     billing_city: updatedFormData.city || 'City',
            //     billing_pincode: postalCodeToUse,
            //     billing_state: updatedFormData.state || 'State',
            //     billing_country: updatedFormData.country || 'India',
            //     billing_email: currentUser?.email || updatedFormData.email || 'test@example.com',
            //     billing_phone: currentUser?.phone || updatedFormData.phone || '9999999999',
            //     shipping_is_billing: true,
            //     order_items: [
            //         {
            //             name: orderItem.name,
            //             sku: orderItem.product_id || 'SKU001',
            //             units: 1,
            //             selling_price: parseFloat(orderItem.price) || 10,
            //         }
            //     ],
            //     payment_method: "COD",
            //     shipping_charges: 0,
            //     giftwrap_charges: 0,
            //     transaction_charges: 0,
            //     total_discount: 0,
            //     sub_total: parseFloat(orderItem.price) || 10,
            //     length: 10,
            //     breadth: 15,
            //     height: 20,
            //     weight: (parseFloat(orderItem.weight) / 1000) || 0.5 // Convert grams to kg
            // };

            // console.log("Sending order payload:", orderPayload);

            // const createOrderRes = await axios.post(`${baseURL}/api/shippingrate-order`, orderPayload);
            // const orderIdFromShiprocket = createOrderRes.data.order_id;

            // console.log("Shiprocket Order Created:", orderIdFromShiprocket);

            // fetchServiceability(orderIdFromShiprocket);

            // setFormData(prev => ({ ...prev, orderId: orderIdFromShiprocket }));
        } catch (error) {
            console.error("Error creating Shiprocket order:", error.response?.data || error.message);
        }
    };

    // const fetchServiceability = async (orderId) => {
    //     try {
    //         const response = await axios.get(`${baseURL}/api/serviceability/${orderId}`);


    //         console.log("Shiprocket api response", response.data)

    //         // Extract and format relevant data
    //         const couriers = response.data.data.available_courier_companies.map(courier => ({
    //             id: courier.courier_company_id,
    //             name: courier.courier_name,
    //             etd: courier.etd,
    //             estimatedDays: courier.estimated_delivery_days,
    //             freightCharge: courier.freight_charge,
    //             codAvailable: courier.cod === 1,
    //             mode: courier.is_surface ? 'Surface' : 'Air',
    //             rtoCharges: courier.rto_charges,
    //             recommended: courier.courier_company_id === response.data.data.recommended_courier_company_id,
    //             cod_charges: courier.cod_charges,
    //         }));

    //         // Find the courier with the least freight charge
    //         const cheapest = couriers.reduce((prev, current) =>
    //             (prev.freightCharge < current.freightCharge) ? prev : current
    //         );

    //         setCheapestCourier(cheapest);
    //         return couriers;
    //     } catch (error) {
    //         console.error("Error fetching courier serviceability:", error.response?.data || error.message);
    //         throw error;
    //     }
    // };

    // const calculateTotal = () => {
    //     if (!product || !product.price) return '0.00';
    //     const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
    //     const quantity = Number(product.quantity || 1);
    //     return (price * quantity).toFixed(2);
    // };
    const calculateTotal = () => {
        if (!product || product.price === undefined) return '0.00';

        // Convert price to number if it's a string
        const price = typeof product.price === 'string'
            ? parseFloat(product.price.replace(/[^\d.]/g, ''))
            : product.price;

        const quantity = Number(product.quantity || 1);
        return (price * quantity).toFixed(2);
    };

    const calculateOrderTotal = () => {
        const total = parseFloat(calculateTotal());
        const shipping = cheapestCourier ? parseFloat(cheapestCourier.freightCharge) : 0;
        const codCharges = cheapestCourier ? parseFloat(cheapestCourier.cod_charges) : 0;
        return (total + shipping + codCharges).toFixed(2);
    };

    // const handlePlaceOrder = async () => {
    //     if (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
    //         alert('Please fill in all required address fields');
    //         return;
    //     }

    //     // Additional required fields for guest checkout
    //     if (!currentUser && (!formData.fullName || !formData.email || !formData.phone)) {
    //         alert('Please fill in all required personal information fields');
    //         return;
    //     }

    //     setIsPlacingOrder(true);

    //     try {
    //         // const amount = calculateOrderTotal();
    //         const amount = 1;

    //         // If user is not logged in, create a new account first
    //         let userId = currentUser?.uid;
    //         let userEmail = currentUser?.email;
    //         let userFullName = currentUser?.fullName;
    //         let userPhone = currentUser?.phone;
    //         if (!currentUser) {
    //             const password = `${formData.fullName.replace(/\s+/g, '')}@123`; // Generate password
    //             const userCredential = await createUserWithEmailAndPassword(auth, formData.email, password);
    //             userId = userCredential.user.uid;
    //             userEmail = formData.email;
    //             userFullName = formData.fullName;
    //             userPhone = formData.phone;

    //             // Create customer document
    //             await setDoc(doc(db, 'customers', userId), {
    //                 uid: userId,
    //                 fullName: formData.fullName,
    //                 email: formData.email,
    //                 phone: formData.phone,
    //                 password: password,
    //                 createdAt: new Date()
    //             });

    //             await fetch(`${baseURL}/send-welcome-email`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     email: formData.email,
    //                     fullName: formData.fullName,
    //                     password: formData.password
    //                 })
    //             });
    //         }

    //         // Proceed with PhonePe order creation
    //         await createPhonePeOrder(amount, userId, userEmail, userFullName, userPhone);

    //     } catch (error) {
    //         console.error("Error placing order:", error);
    //         alert('Failed to place order. Please try again.');
    //     } finally {
    //         setIsPlacingOrder(false);
    //     }
    // };

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

    const handlePlaceOrder = async () => {
        if (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
            alert('Please fill in all required address fields');
            return;
        }

        // Additional required fields for guest checkout
        if (!currentUser && (!formData.fullName || !formData.email || !formData.phone)) {
            alert('Please fill in all required personal information fields');
            return;
        }

        setIsPlacingOrder(true);

        try {
            const amount = calculateOrderTotal();
            const paymentMethod = "COD"; // Set payment method to COD

            // If user is not logged in, create a new account first
            let userId = currentUser?.uid;
            let userEmail = currentUser?.email;
            let userFullName = currentUser?.fullName;
            let userPhone = currentUser?.phone;

            if (!currentUser) {
                const password = `${formData.fullName.replace(/\s+/g, '')}@123`; // Generate password
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, password);
                userId = userCredential.user.uid;
                userEmail = formData.email;
                userFullName = formData.fullName;
                userPhone = formData.phone;

                // Create customer document
                await setDoc(doc(db, 'customers', userId), {
                    uid: userId,
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    password: password,
                    createdAt: new Date()
                });

                await fetch(`${baseURL}/send-welcome-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        fullName: formData.fullName,
                        password: formData.password
                    })
                });
            }

            // For COD orders, directly create order in database
            if (paymentMethod === "COD") {
                const orderId = `COD-${uuidv4()}`; // Prefix with COD for identification
                await createOrderInDatabase(orderId, amount, userId, userEmail, userFullName, userPhone, paymentMethod);
            } else {
                // For non-COD orders, proceed with PhonePe payment
                await createPhonePeOrder(amount, userId, userEmail, userFullName, userPhone);
            }

        } catch (error) {
            console.error("Error placing order:", error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    const createOrderInDatabase = async (paymentId, amount, userId, userEmail, userFullName, userPhone, paymentMethod = "Paid") => {
        setIsProcessingOrder(true);
        try {
            // Prepare shipping address with all required fields
            const shippingAddress = {
                addressLine1: formData.addressLine1 || '',
                addressLine2: formData.addressLine2 || '',
                city: formData.city || '',
                state: formData.state || '',
                postalCode: formData.postalCode || '',
                country: 'India',
                fullName: currentUser?.fullName || formData.fullName || '',
                email: currentUser?.email || formData.email || '',
                phone: currentUser?.phone || formData.phone || '',
                addressLabel: formData.addressLabel || 'Home'
            };

            const {
                weightOptions, // exclude this
                images, // use only images[0]
                ...restProduct
            } = product;

            // Prepare order item with fallback values
            const orderItem = {
                ...restProduct,
                image: images?.[0] || '',
                order_item_id: uuidv4(),
                quantity: 1,
                price: product.price || '0.00',
                weight: product.weight || '',
                originalPrice: product.originalPrice || product.price || '0.00',
                name: product.name || '',
                product_id: product.id || uuidv4()
            };

            const orderId = uuidv4();
            const createdAt = new Date();
            const orderDate = createdAt.toISOString().replace('T', ' ').substring(0, 16);

            // Prepare Shiprocket order data
            const [firstName, ...lastNameParts] = (currentUser?.fullName || formData.fullName || '').split(' ');
            const lastName = lastNameParts.join(' ') || ' '; // In case there's no last name

            // const shiprocketOrderData = {
            //     order_id: orderId,
            //     order_date: orderDate,
            //     pickup_location: "Mini_Factory_6363900869",
            //     comment: "Reseller: M/s " + lastName,
            //     billing_customer_name: firstName,
            //     billing_last_name: lastName,
            //     billing_address: shippingAddress.addressLine1,
            //     billing_address_2: shippingAddress.addressLine2,
            //     billing_city: shippingAddress.city,
            //     billing_pincode: shippingAddress.postalCode,
            //     billing_state: shippingAddress.state,
            //     billing_country: shippingAddress.country,
            //     billing_email: currentUser?.email || formData.email || '',
            //     billing_phone: currentUser?.phone || formData.phone || '',
            //     shipping_is_billing: true,
            //     order_items: [{
            //         name: orderItem.name || '',
            //         sku: orderItem.id || '',
            //         units: 1,
            //         selling_price: orderItem.price || 0,
            //     }],
            //     payment_method: paymentMethod === "COD" ? "COD" : "Prepaid",
            //     shipping_charges: 0,
            //     giftwrap_charges: 0,
            //     transaction_charges: 0,
            //     total_discount: 0,
            //     sub_total: amount,
            //     length: 10, // Default dimensions
            //     breadth: 15,
            //     height: 20,
            //     weight: 2.5 // Default weight
            // };

            // Create transaction record
            const transactionData = {
                orderId,
                paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
                paymentId,
                paymentAmount: amount,
                paymentMethod,
                createdAt,
                userId
            };

            const transactionsRef = collection(db, "transactions");
            await addDoc(transactionsRef, transactionData);

            // Create order document
            const newOrder = {
                orderId,
                items: [orderItem],
                shippingAddress,
                status: "Pending",
                createdAt,
                paymentId,
                paymentAmount: amount,
                paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
                paymentMethod,
                userId,
                // shiprocketData: shiprocketOrderData
            };

            // Save order to user's orders
            const userOrdersRef = doc(db, "orders", userId);
            const userOrdersDoc = await getDoc(userOrdersRef);

            if (userOrdersDoc.exists()) {
                await setDoc(userOrdersRef, { [orderId]: newOrder }, { merge: true });
            } else {
                await setDoc(userOrdersRef, { [orderId]: newOrder });
            }

            const dashboardOrdersRef = doc(db, 'dashboard', 'orders');
            const dashboardSnap = await getDoc(dashboardOrdersRef);

            const totalQuantity = orderItem.quantity || 1;

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

            // Save shipping address to user's address book if requested
            if (saveToAccount && userId) {
                const addressData = {
                    ...shippingAddress,
                    address_id: uuidv4(),
                    isDefault: true,
                    createdAt,
                    label: formData.addressLabel || 'Home'
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
                    addresses: updatedAddresses
                }, { merge: true });
            }

            // Call Shiprocket API to create the order
            // try {
            //     const shiprocketResponse = await axios.post(`${baseURL}/api/create-order`, shiprocketOrderData);
            //     console.log('Shiprocket order created:', shiprocketResponse.data);

            //     // Update order with Shiprocket response if needed
            //     await setDoc(userOrdersRef, {
            //         [orderId]: {
            //             ...newOrder,
            //             shiprocketResponse: shiprocketResponse.data,
            //             trackingInfo: shiprocketResponse.data.tracking_data || null
            //         }
            //     }, { merge: true });
            // } catch (shiprocketError) {
            //     console.error('Shiprocket order creation failed:', shiprocketError);
            //     // Store the error information with the order
            //     await setDoc(userOrdersRef, {
            //         [orderId]: {
            //             ...newOrder,
            //             shiprocketError: shiprocketError.response?.data || shiprocketError.message
            //         }
            //     }, { merge: true });
            // }

            // Send order confirmation email
            const emailSent = await sendOrderConfirmationEmail(
                currentUser?.email || formData.email,
                orderId,
                amount,
                orderItem
            );

            setIsProcessingOrder(false);

            if (emailSent) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                    text: paymentMethod === "COD" ?
                        'You will pay when your order is delivered.' :
                        'Check your email for confirmation.',
                    confirmButtonColor: '#3085d6'
                });
            } else {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Order Placed Successfully!',
                    text: paymentMethod === "COD" ?
                        "You will pay when your order is delivered. You can view your order in 'My Orders'." :
                        "We couldn't send the confirmation email, but you can view your order in 'My Orders'.",
                    confirmButtonColor: '#3085d6'
                });
            }
            navigate("/myorders");

        } catch (error) {
            console.error("Error creating order in database:", error);
            alert('There was an error saving your order. Please contact support.');
        } finally {
            setIsProcessingOrder(false);
        }
    };

    

    const sendOrderConfirmationEmail = async (email, orderId, amount, orderItem) => {
        console.log('[Email] Starting email sending process...');

        // Validate input data
        if (!email || !orderId || !amount || !orderItem) {
            console.error('[Email] Invalid input data:', { email, orderId, amount, orderItem });
            return false;
        }

        const emailData = {
            email,
            orderId,
            amount: parseFloat(amount).toFixed(2),
            items: [{
                name: orderItem.name || 'Unknown Item',
                quantity: orderItem.quantity || 1,
                price: parseFloat(String(orderItem.price).replace(/[^\d.]/g, '')).toFixed(2),
                weight: orderItem.weight || '',
                image: orderItem.imageUrl || '' // Add image if available
            }],
            customerName: currentUser?.fullName || formData.fullName || 'Customer',
            shippingAddress: {
                fullName: currentUser?.fullName || formData.fullName || '',
                addressLine1: formData.addressLine1 || '',
                addressLine2: formData.addressLine2 || '',
                city: formData.city || '',
                state: formData.state || '',
                postalCode: formData.postalCode || '',
                country: 'India'
            }
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

    // useEffect(() => {
    //     // Trigger Shiprocket order creation when postalCode is available (6 digits)
    //     if (formData.postalCode && formData.postalCode.length === 6) {
    //         createShiprocketOrder();
    //     }
    // }, [formData.postalCode]);

    // const createShiprocketOrder = async () => {
    //     try {
    //         if (!product) return;

    //         const {
    //             weightOptions, // exclude
    //             images,        // use only images[0]
    //             ...restProduct
    //         } = product;

    //         const orderItem = {
    //             ...restProduct,
    //             image: images?.[0] || '',
    //             order_item_id: uuidv4(),
    //             quantity: 1,
    //             price: product.price || '0.00',
    //             weight: parseFloat(product.weight) || 500, // default in grams
    //             originalPrice: product.originalPrice || product.price || '0.00',
    //             name: product.name || 'Product Name',
    //             product_id: product.id || uuidv4()
    //         };

    //         const orderId = uuidv4();

    //         const orderPayload = {
    //             order_id: orderId,
    //             order_date: new Date().toISOString().split("T")[0],
    //             pickup_location: "Mini_Factory_6363900869",
    //             comment: "Reseller: M/s " + (formData.lastName || 'Customer'),
    //             billing_customer_name: formData.firstName || 'First Name',
    //             billing_last_name: formData.lastName || '',
    //             billing_address: formData.addressLine1 || 'Address Line 1',
    //             billing_address_2: formData.addressLine2 || '',
    //             billing_city: formData.city || 'City',
    //             billing_pincode: formData.postalCode,
    //             billing_state: formData.state || 'State',
    //             billing_country: formData.country || 'India',
    //             billing_email: currentUser?.email || formData.email || 'test@example.com',
    //             billing_phone: currentUser?.phone || formData.phone || '9999999999',
    //             shipping_is_billing: true,
    //             order_items: [
    //                 {
    //                     name: orderItem.name,
    //                     sku: orderItem.product_id || 'SKU001',
    //                     units: 1,
    //                     selling_price: parseFloat(orderItem.price) || 10,
    //                 }
    //             ],
    //             payment_method: "COD",
    //             shipping_charges: 0,
    //             giftwrap_charges: 0,
    //             transaction_charges: 0,
    //             total_discount: 0,
    //             sub_total: parseFloat(orderItem.price) || 10,
    //             length: 10,
    //             breadth: 15,
    //             height: 20,
    //             weight: (parseFloat(orderItem.weight) / 1000) || 0.5 // Convert grams to kg
    //         };

    //         // console.log("Sending order payload:", orderPayload);

    //         const createOrderRes = await axios.post(`${baseURL}/api/shippingrate-order`, orderPayload);
    //         const orderIdFromShiprocket = createOrderRes.data.order_id;

    //         // console.log("Shiprocket Order Created:", orderIdFromShiprocket);

    //         fetchServiceability(orderIdFromShiprocket);

    //         setFormData(prev => ({ ...prev, orderId: orderIdFromShiprocket }));
    //     } catch (error) {
    //         console.error("Error creating Shiprocket order:", error.response?.data || error.message);
    //     }
    // };

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
                    {/* Shipping Form */}
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
                                    <div className="shipping-box p-4 rounded shadow-sm bg-white">
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

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="order-summary-box p-4 rounded shadow-sm bg-white">
                            <h5 className="order-summary-title mb-4">Order Summary</h5>

                            {product && (
                                <div key={product.product_id} className="d-flex align-items-center justify-content-between mb-2">
                                    <div>
                                        <div className="summary-item-name">
                                            {product.name} (x1)
                                        </div>
                                        <div className="summary-item-weight">
                                            {product.weight || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="summary-item-price">
                                        ₹{product.price || '0.00'}
                                    </div>
                                </div>
                            )}

                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span className="summary-label">Total Price</span>
                                <span className="summary-value">₹{calculateTotal()}</span>
                            </div>
                            {/* <div className="d-flex justify-content-between mb-3">
                                <span className="summary-label">Shipping</span>
                                <span className="summary-value">
                                    {cheapestCourier ? `₹${cheapestCourier.freightCharge}` : '...'}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="summary-label">COD Charges</span>
                                <span className="summary-value">
                                    {cheapestCourier ? `₹${cheapestCourier.cod_charges}` : '...'}
                                </span>
                            </div> */}

                            <div className="d-flex justify-content-between mb-1">
                                <span className="summary-label">Shipping</span>
                                <span className="summary-value"> ₹ 0.00</span>
                            </div>

                            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                                <span>Order Total</span>
                                <span>₹{calculateOrderTotal()}</span>
                            </div>
                            <hr />

                            <button
                                className="btn btn-place-order w-100"
                                onClick={handlePlaceOrder}
                                disabled={isPlacingOrder}
                            >
                                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                            </button>

                            {!currentUser && (
                                <div className="mt-3 text-center">
                                    <small className="text-muted">
                                        By placing your order, you agree to create an account with us
                                    </small>
                                </div>
                            )}
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
        </>
    );
};

export default CheckoutPage;