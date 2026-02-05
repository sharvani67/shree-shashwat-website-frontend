import React from 'react';
import { FaInfoCircle, FaShoppingCart, FaTruck, FaUndo, FaUtensils, FaCopyright, FaShieldAlt, FaEdit, FaEnvelope } from 'react-icons/fa';
import './TermsAndConditions.css'; // Import the CSS file
import Header from '../Customer/Header/Header';

const TermsAndConditions = () => {
  return (
    
    <div className="container my-5" style={{ maxWidth: '900px', marginTop: '80px' }}>
      <div className="card shadow-lg rounded-4 border-0">
        <div className="card-header bg-danger text-white rounded-top p-4">
          <h1 className="mb-0">Terms and Conditions</h1>
          <small className="fst-italic">South Sutra - Authentic Masala & Chili Powders</small>
        </div>
        <div className="card-body p-4" style={{ backgroundColor: '#f8f9fa', backgroundImage: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)' }}>
          <p className="lead">
            Welcome to <strong>South Sutra</strong>, your trusted online store for authentic masala and chili powders. By accessing or placing an order through our website, you agree to the following terms and conditions:
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaInfoCircle className="me-2" />1. Product Information</h4>
          <p>
            We strive to provide accurate descriptions and images of our products. However, slight variations in color, texture, and aroma may occur due to natural ingredients and packaging differences.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaShoppingCart className="me-2" />2. Order Acceptance and Cancellation</h4>
          <p>
            All orders are subject to availability and confirmation of the order price. We reserve the right to cancel or refuse orders if products are out of stock or if we suspect fraudulent activity.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaTruck className="me-2" />3. Shipping and Delivery</h4>
          <p>
            Delivery times may vary depending on location and shipping method selected. We are not responsible for delays caused by the courier or unforeseen circumstances such as natural disasters.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaUndo className="me-2" />4. Returns and Refunds</h4>
          <p>
            Due to the perishable nature of our spices, returns are accepted only if the product is damaged or defective upon arrival. Please contact customer support within 48 hours with photo evidence for a refund or replacement.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaUtensils className="me-2" />5. Use of Products</h4>
          <p>
            Our masala and chili powders are intended for culinary use only. Please keep out of reach of children and consult your healthcare provider if you have allergies or sensitivities.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaCopyright className="me-2" />6. Intellectual Property</h4>
          <p>
            All content on this website, including brand names, logos, and product descriptions, is the property of SpiceBazaar and protected by intellectual property laws.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaShieldAlt className="me-2" />7. Limitation of Liability</h4>
          <p>
            SpiceBazaar shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or website.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaEdit className="me-2" />8. Changes to Terms</h4>
          <p>
            We reserve the right to update these terms at any time. Updated terms will be posted on this page and your continued use of our website constitutes acceptance.
          </p>

          <h4 className="mt-4 mb-3 text-danger"><FaEnvelope className="me-2" />9. Contact Us</h4>
          <p>
            For any questions regarding these terms, please email us at <a href="mailto:support@southsutra.com" className="text-danger text-decoration-underline">support@southsutra.com</a>.
          </p>
        </div>
        <div className="card-footer text-center bg-light rounded-bottom py-3">
          <a href="/" className="btn btn-danger btn-sm px-4">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  
  );
};

export default TermsAndConditions;
