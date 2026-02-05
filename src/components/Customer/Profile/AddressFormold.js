// src/components/AddressFormPage/AddressFormPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';

const AddressFormPage = () => {
  const brown = 'rgb(189, 78, 38)';
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [newAddress, setNewAddress] = useState({
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
    isDefault: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'customers', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const userInfo = {
              fullName: data.fullName || '',
              phone: data.phone || '',
              email: data.email || currentUser.email || ''
            };
            setUserData(userInfo);
            
            // Pre-fill the form with user data if not editing
            if (!location.state?.address) {
              setNewAddress(prev => ({
                ...prev,
                fullName: userInfo.fullName,
                phone: userInfo.phone,
                email: userInfo.email
              }));
            }
          } else {
            // If customer doc doesn't exist, use auth email
            setUserData(prev => ({
              ...prev,
              email: currentUser.email || ''
            }));
            if (!location.state?.address) {
              setNewAddress(prev => ({
                ...prev,
                email: currentUser.email || ''
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();

    // Check if we're editing an existing address
    if (location.state?.address) {
      setNewAddress(location.state.address);
      setIsEditing(true);
    }
  }, [currentUser, location.state]);

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;

    try {
      const addressRef = doc(db, 'addresses', currentUser.uid);
      const addressDoc = await getDoc(addressRef);

      let updatedAddresses = [];
      if (addressDoc.exists()) {
        updatedAddresses = addressDoc.data().addresses || [];
      }

      // If this is a new default address, remove default from others
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: false
        }));
      }

      if (isEditing && location.state?.index !== undefined) {
        // Update existing address
        updatedAddresses[location.state.index] = newAddress;
      } else {
        // Add new address
        updatedAddresses.push(newAddress);
      }

      await updateDoc(addressRef, {
        addresses: updatedAddresses
      }, { merge: true });

      await Swal.fire({
        title: 'Success!',
        text: isEditing ? 'Address updated successfully!' : 'Address added successfully!',
        icon: 'success',
        confirmButtonColor: brown,
        confirmButtonText: 'OK'
      });
      
      navigate('/profile');
    } catch (error) {
      console.error('Error saving address:', error);
      await Swal.fire({
        title: 'Error!',
        text: `Failed to ${isEditing ? 'update' : 'add'} address. Please try again.`, 
        icon: 'error',
        confirmButtonColor: brown,
        confirmButtonText: 'OK'
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

  return (
    <>
      <Header />
      <div className="container py-5 mt-5">
        <div className="card shadow-sm border-0 mb-4 w-100" style={{
          borderRadius: '12px', maxWidth: '600px',
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
                  value={newAddress.addressLabel}
                  onChange={handleAddressInputChange}
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
                  value={newAddress.fullName}
                  onChange={handleAddressInputChange}
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
                  value={newAddress.phone}
                  onChange={handleAddressInputChange}
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
                  value={newAddress.email}
                  onChange={handleAddressInputChange}
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
                  value={newAddress.addressLine1}
                  onChange={handleAddressInputChange}
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
                  value={newAddress.addressLine2}
                  onChange={handleAddressInputChange}
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
                    value={newAddress.city}
                    onChange={handleAddressInputChange}
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
                    value={newAddress.state}
                    onChange={handleAddressInputChange}
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
                    value={newAddress.postalCode}
                    onChange={handleAddressInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="country" className="form-label fw-semibold">Country</label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    value={newAddress.country}
                    onChange={handleAddressInputChange}
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
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress(prev => ({
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