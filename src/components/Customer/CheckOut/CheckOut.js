import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './CheckOut.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useCart } from '../../AuthContext/CartContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import baseURL from "../../Api/Api";
import Swal from 'sweetalert2';

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
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    addressLabel: '',
  });
  const [selectedAddress, setSelectedAddress] = useState('new');
  const [saveToAccount, setSaveToAccount] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [codeCharge, setCodChargePrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Prepaid');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser?.uid) {
        try {
          const response = await fetch(`${baseURL}/customers/${currentUser.uid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const userData = await response.json();
          const formattedUserData = {
            uid: userData.customer_id.toString(),
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            createdAt: userData.createdAt
          };
          setUserDetails(formattedUserData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUserDetails();
  }, [currentUser]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (currentUser?.uid) {
        try {
          const response = await fetch(`${baseURL}/cart-items/customer/${currentUser.uid}`);
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          const data = await response.json();

          const processedItems = data.map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            originalPrice: parseFloat(item.original_price) || null,
            id: item.product_id.toString(),
            weight: item.weight,
            quantity: item.quantity,
            image: item.image,
          }));

          setCartItems(processedItems);
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
            originalPrice: parseFloat(item.originalPrice) || null,
            id: item.product_id.toString(),
            weight: item.weight,
            quantity: item.quantity,
            image: item.image,
          }));
          setCartItems(processedItems);
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
          const response = await fetch(`${baseURL}/addresses/${currentUser.uid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const addressData = await response.json();
          const addresses = Array.isArray(addressData) ? addressData : [addressData];
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

          setAllAddresses(formattedAddresses);
          setHasAddresses(formattedAddresses.length > 0);

          const defaultAddr = formattedAddresses.find(addr => addr.isDefault);
          setDefaultAddress(defaultAddr || null);

          if (!defaultAddr && formattedAddresses.length > 0) {
            setDefaultAddress(formattedAddresses[0]);
          }

          if (formattedAddresses.length > 0) {
            const addressToSelect = defaultAddr || formattedAddresses[0];
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
          setLoadingAddress(false);
        }
      } else {
        setLoadingAddress(false);
        setHasAddresses(false);
        setAllAddresses([]);
        setSelectedAddress('new');
      }
    };

    fetchAddresses();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "postalCode" && !/^\d{0,6}$/.test(value)) return;
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  // Simplified shipping calculation - you can adjust this logic as needed
  useEffect(() => {
    if (formData.postalCode && formData.postalCode.length === 6) {
      // Simple shipping calculation based on total quantity
      const totalQuantity = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
      
      if (totalQuantity >= 4) {
        setShippingPrice(0); // Free shipping for 4+ items
      } else {
        // You can implement your own shipping logic here
        setShippingPrice(99); // Fixed shipping price for less than 4 items
      }
      
      // Fixed COD charges (adjust as needed)
      setCodChargePrice(selectedPaymentMethod === 'COD' ? 29 : 0);
    }
  }, [formData.postalCode, cartItems, selectedPaymentMethod]);

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

  const calculateFinalTotal = () => {
    const total = parseFloat(calculateTotal());
    const discount = parseFloat(calculateDiscount());
    const shipping = parseFloat(shippingPrice) || 0;
    const codCharges = selectedPaymentMethod === 'COD' ? parseFloat(codeCharge) || 0 : 0;
    
    return (total - discount + shipping + codCharges).toFixed(2);
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
    if (
      selectedAddress === 'new' &&
      (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode)
    ) {
      alert('Please fill in all required address fields');
      return;
    }

    const phoneToValidate = formData.phone || currentUser?.phone || '';
    if (!/^\d{10}$/.test(phoneToValidate)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }
    
    setIsPlacingOrder(true);

    try {
      const amount = calculateFinalTotal();

      if (selectedPaymentMethod === "COD") {
        const orderId = `COD-${uuidv4()}`;
        await createOrderInDatabase(
          orderId,
          amount,
          'Pending',
          formData,
          cartItems,
          currentUser,
          saveToAccount,
          navigate,
          refreshCart,
          calculateTotal,
          calculateDiscount,
          shippingPrice,
          codeCharge
        );
      } else {
        // For Prepaid orders
        const orderId = `PREPAID-${uuidv4()}`;
        await createOrderInDatabase(
          orderId,
          amount,
          'Paid',
          formData,
          cartItems,
          currentUser,
          saveToAccount,
          navigate,
          refreshCart,
          calculateTotal,
          calculateDiscount,
          shippingPrice,
          codeCharge
        );
      }

    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const createOrderInDatabase = async (
    orderId,
    amount,
    paymentStatus,
    formData,
    cartItems,
    currentUser,
    saveToAccount,
    navigate,
    refreshCart,
    calculateTotal,
    calculateDiscount,
    shippingPrice,
    codeCharge
  ) => {
    setIsProcessingOrder(true);

    try {
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

      const orderItems = cartItems.map(item => ({
        order_item_id: uuidv4(),
        product_id: item.id,
        name: item.name,
        quantity: item.quantity || 1,
        weight: item.weight || '',
        price: item.price || '0.00',
        originalPrice: item.originalPrice || item.price || '0.00',
        image: item.image || '',
      }));

      const total_price = calculateTotal();
      const discount_amt = calculateDiscount();
      const total_quantity = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
      const finalShippingPrice = total_quantity >= 4 ? 0 : shippingPrice;

      // If user is not logged in, create a new account first
      let userId = currentUser?.uid;
      let userEmail = currentUser?.email;
      let userFullName = currentUser?.fullName;
      let userPhone = currentUser?.phone;

      if (!currentUser) {
        const password = `${formData.fullName.replace(/\s+/g, '')}@123`;
        const customerPayload = {
          fullName: formData.fullName,
          email: formData.email,
          password,
          phone: formData.phone,
        };

        const response = await fetch(`${baseURL}/customers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerPayload)
        });

        if (response.status === 409) {
          alert("Email already exists. Try logging in instead.");
          return;
        }

        const result = await response.json();
        userId = result.customer_id;
        userEmail = formData.email;
        userFullName = formData.fullName;
        userPhone = formData.phone;

        const userData = {
          uid: userId,
          fullName: userFullName,
          email: userEmail,
          phone: userPhone
        };
        localStorage.setItem('customer', JSON.stringify(userData));

        await fetch(`${baseURL}/send-welcome-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            fullName: formData.fullName,
            password: password
          })
        });
      }

      const orderPayload = {
        orderId,
        orderItems,
        shippingAddress,
        paymentAmount: amount,
        paymentStatus,
        paymentMethod: selectedPaymentMethod,
        userId,
        userEmail,
        userFullName,
        userPhone,
        saveToAccount,
        total_price,
        discount_amt,
        cod_charges: selectedPaymentMethod === "COD" ? codeCharge : null,
        shipping_price: finalShippingPrice,
      };

      console.log("orderPayload=", orderPayload);

      const finalResponse = await axios.post(`${baseURL}/api/orders`, orderPayload);

      if (finalResponse.data.success) {
        // Send confirmation email
        const emailSent = await sendOrderConfirmationEmail(
          shippingAddress.email,
          orderId,
          amount,
          orderItems
        );

        if (!emailSent) {
          console.warn("⚠️ Order placed, but failed to send confirmation email.");
        }

        setIsProcessingOrder(false);

        await Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully!',
          text: selectedPaymentMethod === 'COD'
            ? 'You will pay when your order is delivered.'
            : 'Check your email for confirmation.',
          confirmButtonColor: '#3085d6'
        });

        // Clear cart after successful order
        if (currentUser?.uid) {
          // Clear cart from database for logged-in user
          try {
            await fetch(`${baseURL}/cart-items/customer/${currentUser.uid}`, {
              method: 'DELETE'
            });
          } catch (error) {
            console.error('Error clearing cart:', error);
          }
        } else {
          // Clear cart from localStorage for guest user
          localStorage.removeItem('guest_cart_items');
        }

        navigate('/myorders');
        refreshCart();
      } else {
        throw new Error('Failed to place order.');
      }
    } catch (error) {
      console.error("Order creation error:", error);
      alert("There was an error saving your order. Please contact support.");
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const sendOrderConfirmationEmail = async (email, orderId, amount, items) => {
    console.log('[Email] Starting email sending process...');

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

    try {
      const response = await fetch(`${baseURL}/send-order-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData),
      });

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
    let newFormData = {};

    if (type === 'address' && address) {
      setSelectedAddress(address.address_id);
      newFormData = {
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
      });
      setSaveToAccount(false);

    } else if (type === 'home' && defaultAddress) {
      setSelectedAddress('home');
      newFormData = {
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

  const totalQuantity = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);

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

                  {allAddresses
                    .filter(addr => !addr.isDefault)
                    .map(address => renderAddressCard(address))}

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
                              maxLength={10}
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
                              maxLength={10}
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

              <div className="mb-4">
                <h5 className="mb-2">Select Payment Method</h5>
                <div className="d-flex gap-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="prepaid"
                      value="Prepaid"
                      checked={selectedPaymentMethod === 'Prepaid'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="prepaid">
                      Prepaid
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="COD"
                      checked={selectedPaymentMethod === 'COD'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Cash on Delivery (COD)
                    </label>
                  </div>
                </div>
              </div>

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
              <div className="d-flex justify-content-between mb-2">
                <span className="summary-label">Total Price</span>
                <span className="summary-value">₹{calculateTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="summary-label">Total Discount</span>
                <span className="summary-value text-success"> - ₹{calculateDiscount()}</span>
              </div>
              {totalQuantity < 4 && (
                <div className="d-flex justify-content-between mb-1">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">₹{shippingPrice}</span>
                </div>
              )}

              {selectedPaymentMethod === 'COD' && (
                <div className="d-flex justify-content-between mb-2">
                  <span className="summary-label">COD Charges</span>
                  <span className="summary-value">₹{codeCharge}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Order Total</span>
                <span>₹{calculateFinalTotal()}</span>
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