
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { db } from '../../Firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Puliyogare from '../../assets/puliyogare.jpeg'
import Tomato from '../../assets/tomato.jpeg'
import Lemon from '../../assets/lemonrice.jpeg'
import Vangibhath from '../../assets/vangibath.jpeg'
import Logo from '../../assets/logo.png'

// Product images data for the slider
const PRODUCTS = [
  { src: Puliyogare, alt: 'Puliyogare' },
  { src: Vangibhath, alt: 'Vangibhath' },
  { src: Lemon, alt: 'Lemon Rice' },
  { src: Tomato, alt: 'Tomato Rice' }
];

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    ageGroup: '',
    gender: '',
    occupation: '',
    city: '',
    howDidYouHear: '',
    overallExperience: 0,
    additionalComments: '',
    receiveUpdates: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      overallExperience: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSave = Object.fromEntries(
        Object.entries(formData).filter(([_, val]) => 
          val !== '' && val !== false && val !== 0
        )
      );

      const now = new Date();
      dataToSave.timestamp = now.toISOString();

      await addDoc(collection(db, "feedback"), dataToSave);
      alert('Thank you for your feedback! Your submission has been saved.');
      
      setFormData({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        ageGroup: '',
        gender: '',
        occupation: '',
        city: '',
        howDidYouHear: '',
        overallExperience: 0,
        additionalComments: '',
        receiveUpdates: false,
      });

    } catch (error) {
      console.error("Error saving feedback: ", error);
      alert('There was an error saving your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-page" style={{ 
      background: 'linear-gradient(to bottom, rgba(141, 77, 43, 0.8), rgba(255, 237, 204, 0.8))',
      minHeight: '100vh',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="form-container" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '900px',
        padding: '2.5rem',
        margin: '1rem'
      }}>
        <div className="text-center mb-4">
          <img 
            src={Logo}
            alt="Company Logo" 
            className="company-logo" 
            style={{
              width: '250px',
              height: 'auto',
              maxHeight: '150px',
              objectFit: 'contain',
              margin: '0 auto 1rem'
            }}
            loading="lazy"
          />
          <h1 className="main-title" style={{
            fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
            fontWeight: '700',
            color: '#333',
            marginBottom: '0.5rem',
            lineHeight: '1.3'
          }}>South Sutra - to make everyday life easy</h1>
          <p className="description" style={{
            fontSize: 'clamp(0.875rem, 3vw, 1rem)',
            color: '#8d4d2b',
            margin: '0 auto',
            maxWidth: '90%'
          }}>Help us understand our visitors better by filling out this quick form.💐</p>
        </div>

        {/* Bootstrap Carousel for Product Images */}
        <div className="mb-4">
          <Carousel indicators={false} interval={3000}>
            {PRODUCTS.map((product, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  <img
                    src={product.src}
                    alt={product.alt}
                    className="d-block img-thumbnail"
                    style={{ 
                      width: '300px', 
                      height: '300px', 
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    loading="lazy"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <form onSubmit={handleSubmit} noValidate className="feedback-form">
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="fullName" className="form-label" style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#333',
                fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
              }}>
                Full Name <span className="required" style={{ color: '#e74c3c', fontWeight: 'bold' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  backgroundColor: '#fff',
                  transition: 'all 0.25s ease'
                }}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phoneNumber" className="form-label" style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#333',
                fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
              }}>
                Phone Number <span className="required" style={{ color: '#e74c3c', fontWeight: 'bold' }}>*</span>
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter 10-digit number"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  backgroundColor: '#fff',
                  transition: 'all 0.25s ease'
                }}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="ageGroup" className="form-label" style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#333',
                fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
              }}>
                Age Group <span className="required" style={{ color: '#e74c3c', fontWeight: 'bold' }}>*</span>
              </label>
              <select
                className="form-select"
                id="ageGroup"
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  backgroundColor: '#fff',
                  transition: 'all 0.25s ease'
                }}
              >
                <option value="">Select age group</option>
                <option value="under_18">Under 18</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-50">36-50</option>
                <option value="over_50">Over 50</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label" style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#333',
                fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
              }}>
                Gender <span className="required" style={{ color: '#e74c3c', fontWeight: 'bold' }}>*</span>
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  backgroundColor: '#fff',
                  transition: 'all 0.25s ease'
                }}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label" style={{
              display: 'block',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
            }}>
              City <span className="required" style={{ color: '#e74c3c', fontWeight: 'bold' }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                backgroundColor: '#fff',
                transition: 'all 0.25s ease'
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label" style={{
              display: 'block',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
            }}>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                backgroundColor: '#fff',
                transition: 'all 0.25s ease'
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{
              display: 'block',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
            }}>
              Rate your experience <span className="required" style={{ color: '#e74c3c', fontWeight: 'bold' }}>*</span>
            </label>
            <div className="star-rating" style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`star ${star <= formData.overallExperience ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStarClick(star)}
                  role="button"
                  tabIndex="0"
                  style={{ 
                    fontSize: 'clamp(1.25rem, 5vw, 1.5rem)',
                    color: star <= formData.overallExperience ? '#ffb700' : '#e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: '0.25rem'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="additionalComments" className="form-label" style={{
              display: 'block',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)'
            }}>
              Additional Comments
            </label>
            <textarea
              className="form-control"
              id="additionalComments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              placeholder="Share your thoughts..."
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                backgroundColor: '#fff',
                transition: 'all 0.25s ease',
                resize: 'vertical',
                minHeight: '6rem'
              }}
            />
          </div>

          <div className="form-check mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              className="form-check-input"
              type="checkbox"
              id="receiveUpdates"
              name="receiveUpdates"
              checked={formData.receiveUpdates}
              onChange={handleChange}
              style={{ opacity: 0, position: 'absolute' }}
            />
            <div className="checkmark" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.25rem',
              height: '1.25rem',
              background: formData.receiveUpdates ? '#8d4d2b' : '#f5f5f5',
              border: `1px solid ${formData.receiveUpdates ? '#8d4d2b' : '#ddd'}`,
              borderRadius: '4px',
              transition: 'all 0.25s ease'
            }}>
              {formData.receiveUpdates && <MdDone style={{ fontSize: '0.875rem', color: 'white' }} />}
            </div>
            <label className="form-check-label" htmlFor="receiveUpdates" style={{
              fontSize: 'clamp(0.8125rem, 3vw, 0.9375rem)',
              color: '#555',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              I'd like to receive updates
            </label>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: 'clamp(0.875rem, 3vw, 1rem)',
              fontSize: 'clamp(0.9375rem, 3vw, 1rem)',
              fontWeight: '600',
              background: '#8d4d2b',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" style={{
                  display: 'inline-block',
                  width: '1.25rem',
                  height: '1.25rem',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  borderTopColor: '#fff',
                  animation: 'spin 1s ease-in-out infinite'
                }}></span>
                Submitting...
              </>
            ) : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;