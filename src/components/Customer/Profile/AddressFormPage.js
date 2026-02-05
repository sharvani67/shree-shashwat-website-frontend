// src/components/AddressFormPage/AddressFormPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';
import baseURL from '../../Api/Api';

const AddressFormPage = () => {
  const brown = 'rgb(189, 78, 38)';
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [addressData, setAddressData] = useState({
    id: null,
    addressLabel: '',
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
    label: '',
    customer_id: currentUser?.uid || ''
  });

  useEffect(() => {
    if (currentUser) {
      // Check if we're editing an existing address
      if (location.state?.address) {
        const { address, id } = location.state;
        setAddressData({
          id: id || address.id,
          addressLabel: address.addressLabel || address.label || '',
          fullName: address.fullName || '',
          phone: address.phone || '',
          email: address.email || '',
          addressLine1: address.addressLine1 || '',
          addressLine2: address.addressLine2 || '',
          city: address.city || '',
          state: address.state || '',
          postalCode: address.postalCode || '',
          country: address.country || 'India',
          isDefault: address.isDefault || false,
          label: address.label || address.addressLabel || '',
          customer_id: currentUser.uid
        });
        setIsEditing(true);
      } else if (location.state?.userData) {
        // Pre-fill with user data for new address
        const { fullName, phone, email } = location.state.userData;
        setAddressData(prev => ({
          ...prev,
          fullName: fullName || '',
          phone: phone || '',
          email: email || '',
          customer_id: currentUser.uid
        }));
      }
      setLoading(false);
    }
  }, [currentUser, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;

    try {
      const payload = {
        addressLabel: addressData.addressLabel,
        fullName: addressData.fullName,
        phone: addressData.phone,
        email: addressData.email,
        addressLine1: addressData.addressLine1,
        addressLine2: addressData.addressLine2,
        city: addressData.city,
        state: addressData.state,
        postalCode: addressData.postalCode,
        country: addressData.country,
        isDefault: addressData.isDefault,
        label: addressData.addressLabel, // Using addressLabel as label
        customer_id: currentUser.uid
      };

      let response;
      let successMessage;

      if (isEditing && addressData.id) {
        // Update existing address
        response = await fetch(`${baseURL}/addresses/${addressData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        successMessage = 'Address updated successfully!';
      } else {
        // Create new address
        response = await fetch(`${baseURL}/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        successMessage = 'Address added successfully!';
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save address');
      }

      await Swal.fire({
        title: 'Success!',
        text: successMessage,
        icon: 'success',
        confirmButtonColor: brown,
        confirmButtonText: 'OK'
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error saving address:', error);
      await Swal.fire({
        title: 'Error!',
        text: error.message || `Failed to ${isEditing ? 'update' : 'add'} address. Please try again.`,
        icon: 'error',
        confirmButtonColor: brown,
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <>
      <Header />
      <div className="container py-5 mt-5">
        <div className="card shadow-sm border-0 mb-4 w-100" style={{
          borderRadius: '12px', 
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div className="card-body p-4">
            <div className="mb-4 d-flex align-items-center">
              <button
                className="btn btn-link p-0 me-3"
                onClick={() => navigate('/profile')}
                style={{ color: brown }}
              >
                <FiArrowLeft size={24} />
              </button>
              <div>
                <h4 className="fw-bold mb-1">
                  {isEditing ? 'Edit Address' : 'Add New Address'}
                </h4>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="addressLabel" className="form-label fw-semibold">Address Label (e.g., Home, Work)</label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLabel"
                  name="addressLabel"
                  placeholder="My Home Base"
                  value={addressData.addressLabel}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  placeholder="Your Name"
                  value={addressData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={addressData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={addressData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="addressLine1" className="form-label fw-semibold">Address Line 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine1"
                  name="addressLine1"
                  placeholder="Street address, P.O. box"
                  value={addressData.addressLine1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="addressLine2" className="form-label fw-semibold">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine2"
                  name="addressLine2"
                  placeholder="Apartment, suite, etc."
                  value={addressData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={addressData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="state" className="form-label fw-semibold">State / Province</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    placeholder="State"
                    value={addressData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="postalCode" className="form-label fw-semibold">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={addressData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="country" className="form-label fw-semibold">Country</label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    value={addressData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isDefault"
                  name="isDefault"
                  checked={addressData.isDefault}
                  onChange={(e) => setAddressData(prev => ({
                    ...prev,
                    isDefault: e.target.checked
                  }))}
                />
                <label className="form-check-label" htmlFor="isDefault">
                  Set as default address
                </label>
              </div>

              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-grow-1"
                  style={{ borderRadius: '12px' }}
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white fw-bold flex-grow-1"
                  style={{ 
                    backgroundColor: brown, 
                    borderRadius: '12px' 
                  }}
                >
                  {isEditing ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressFormPage;