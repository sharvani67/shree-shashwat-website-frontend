// src/components/ProfilePage/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAuth } from '../../AuthContext/AuthContext';
import { FiPlusCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import "./Profile.css";
import Loading from '../../Loading/Loading';
import baseURL from '../../Api/Api';

const ProfilePage = () => {
  const brown = 'rgb(189, 78, 38)';
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [hasAddress, setHasAddress] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const res = await fetch(`${baseURL}/customers/${currentUser.uid}`);
          const data = await res.json();
          setUserData({
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || ''
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (currentUser?.uid) {
        try {
          console.log('Starting to fetch addresses for user:', currentUser.uid);
          setLoadingAddress(true);

          const response = await fetch(`${baseURL}/addresses/${currentUser.uid}`);
          console.log('API Response:', response);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Raw API Data:', data);

          // Handle both array and single object responses
          let fetchedAddresses = [];

          if (Array.isArray(data)) {
            fetchedAddresses = data;
          } else if (data && typeof data === 'object' && data.id) {
            // If single address object is returned, wrap it in an array
            fetchedAddresses = [data];
          }

          const formattedAddresses = fetchedAddresses.map(addr => ({
            id: addr.id,
            addressLabel: addr.addressLabel || addr.label || 'Address',
            fullName: addr.fullName || userData.fullName || 'Customer',
            phone: addr.phone || userData.phone || '',
            email: addr.email || userData.email || '',
            addressLine1: addr.addressLine1 || '',
            addressLine2: addr.addressLine2 || '',
            city: addr.city || '',
            state: addr.state || '',
            postalCode: addr.postalCode || '',
            country: addr.country || '',
            isDefault: addr.isDefault === 1 || addr.isDefault === true,
            label: addr.label || addr.addressLabel || 'Address'
          }));

          console.log('Formatted Addresses:', formattedAddresses);
          setAddresses(formattedAddresses);
          setHasAddress(formattedAddresses.length > 0);

        } catch (error) {
          console.error("Error fetching addresses:", error);
          setAddresses([]);
          setHasAddress(false);
        } finally {
          console.log('Finished address fetch attempt');
          setLoadingAddress(false);
        }
      } else {
        console.log('No current user, resetting address state');
        setLoadingAddress(false);
        setHasAddress(false);
        setAddresses([]);
      }
    };

    if (currentUser?.uid) {
      console.log('Triggering address fetch...');
      fetchAddresses();
    }
  }, [currentUser, userData.fullName, userData.phone, userData.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const res = await fetch(`${baseURL}/customers/${currentUser.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: userData.fullName,
          phone: userData.phone,
          email: userData.email,
        })
      });

      if (!res.ok) throw new Error('Failed to update');

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile updated successfully!',
        confirmButtonColor: brown,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update profile. Please try again.',
        confirmButtonColor: brown,
      });
    }
  };


  const handleDeleteAddress = async (addressId) => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: brown,
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed || !currentUser?.uid) return;

    try {
      const response = await fetch(`${baseURL}/addresses/${addressId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete address');

      // Update local state by removing the deleted address
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      setHasAddress(prev => prev.length > 1);

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Address deleted successfully!',
        confirmButtonColor: brown,
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete address. Please try again.',
        confirmButtonColor: brown,
      });
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    if (!currentUser?.uid) return;

    try {
      // First, set all addresses to non-default
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));

      // Update the default address in the backend
      const response = await fetch(`${baseURL}/addresses/set-default`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: currentUser.uid,
          address_id: addressId
        })
      });

      if (!response.ok) throw new Error('Failed to set default address');

      // Update local state
      setAddresses(updatedAddresses);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Default address updated successfully!',
        confirmButtonColor: brown,
      });
    } catch (error) {
      console.error('Error setting default address:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to set default address. Please try again.',
        confirmButtonColor: brown,
      });
    }
  };

  const handleAddNewAddress = () => {
    navigate('/address-form', {
      state: {
        userData: {
          fullName: userData.fullName,
          phone: userData.phone,
          email: userData.email
        }
      }
    });
  };

  const handleEditAddress = (address) => {
    navigate('/address-form', {
      state: {
        address: address,
        id: address.id, // Pass the address ID for editing
        userData: {
          fullName: userData.fullName,
          phone: userData.phone,
          email: userData.email
        }
      }
    });
  };

  if (loading) {
    return (
      <>
        <Loading isLoading={loading} />
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <Header />
        <div className="container py-5 mt-5">
          <div className="text-center">Please log in to view your profile.</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5 mt-5">
        {/* Profile Card */}
        <div className="card shadow-sm border-0 mb-4 w-100 cprofilecard1">
          <div className="card-body p-4">
            <div className="mb-4 d-flex align-items-center">
              <div
                className="rounded-circle p-3 me-3"
                style={{ backgroundColor: '#f3e8e3' }}
              >
                <i className="bi bi-person-fill-gear fs-4" style={{ color: brown }}></i>
              </div>
              <div>
                <h4 className="fw-bold mb-1">Your Profile</h4>
                <p className="text-muted mb-0">
                  Manage your personal information.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter full name"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control bg-light border-0"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                <input
                  type="tel"
                  className="form-control bg-light border-0"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={userData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  className="btn w-100 text-white fw-bold shadow-sm mb-2"
                  style={{ backgroundColor: brown, borderRadius: '12px' }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="btn w-100 text-white fw-bold shadow-sm mb-2"
                    style={{ backgroundColor: brown, borderRadius: '12px' }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn w-100 fw-bold shadow-sm"
                    style={{ backgroundColor: 'white', border: `1px solid ${brown}`, color: brown, borderRadius: '12px' }}
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form with original data
                      fetch(`${baseURL}/customers/${currentUser.uid}`)
                        .then(res => res.json())
                        .then(data => {
                          setUserData({
                            fullName: data.fullName || '',
                            email: data.email || '',
                            phone: data.phone || ''
                          });
                        });
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Addresses Card */}
        <div className="card shadow-sm border-0 w-100 cprofilecard2">
          <div className="card-body p-4">
            <div className="mb-4 d-flex justify-content-between align-items-center cprofileaddress">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle p-3 me-3"
                  style={{ backgroundColor: '#f3e8e3' }}
                >
                  <i className="bi bi-house-gear fs-4" style={{ color: brown }}></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-1">My Addresses</h4>
                  <p className="text-muted mb-0">
                    Your saved shipping addresses.
                  </p>
                </div>
              </div>
              <button
                className="btn fw-bold d-flex align-items-center gap-2"
                style={{
                  backgroundColor: '#fdf7f3',
                  color: 'brown',
                  border: '1px solid #5c2e00',
                  borderRadius: '12px',
                  padding: '10px 16px'
                }}
                onClick={handleAddNewAddress}
              >
                <FiPlusCircle size={18} />
                Add New Address
              </button>
            </div>

            {loadingAddress ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : hasAddress ? (
              <div className="addresses-container" style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem'
              }}>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="card shadow-sm border-0 p-3"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#fef8f4',
                      borderLeft: address.isDefault ? '4px solid #8B4513' : '4px solid transparent'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="fw-bold">{address.addressLabel}</h5>
                      {address.isDefault && (
                        <span className="badge bg-success">Default</span>
                      )}
                    </div>
                    <p className="mb-1 text-muted">{address.fullName}</p>
                    <p className="mb-1">{address.addressLine1}</p>
                    {address.addressLine2 && <p className="mb-1">{address.addressLine2}</p>}
                    <p className="mb-1">
                      {address.city}, {address.state}
                    </p>
                    <p className="mb-1">
                      {address.country} - {address.postalCode}
                    </p>
                    <p className="mb-0">Phone: {address.phone}</p>
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        style={{ borderRadius: '8px' }}
                        onClick={() => handleEditAddress(address)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        style={{ borderRadius: '8px' }}
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        Delete
                      </button>
                      {!address.isDefault && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          style={{ borderRadius: '8px' }}
                          onClick={() => handleSetDefaultAddress(address.id)}
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p>No addresses found. Please add an address.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;