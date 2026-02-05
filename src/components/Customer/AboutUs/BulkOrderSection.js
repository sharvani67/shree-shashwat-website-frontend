
// import React from "react";
// import "./BulkOrderSection.css";
// import { FaShoppingCart } from "react-icons/fa";
// import bulkImage from "../../../assets/shopping-5200288_1280.webp"; // Replace with your image path

// const BulkOrderSection = () => {
//   return (
//     <section className="bulk-order-section">
//       <div className="bulk-order-container">
//         <div className="bulk-order-text">
//           <div className="bulk-icon">
//             <FaShoppingCart size={32} />
//           </div>
//           <h2>Bulk Ordering Available</h2>
//           <p>
//             Ideal for corporate gifts, events, or resellers. Customize your order with personalized labels and packaging. Let’s bring tradition to your business!
//           </p>
//           <button className="bulk-order-button">Request a Quote</button>
//         </div>

//         <div className="bulk-order-image">
//           <img src={bulkImage} alt="Bulk Order" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BulkOrderSection;

// import React from "react";
// import "./BulkOrderSection.css";
// import { FaBoxes } from "react-icons/fa";
// import bulkImage from "../../../assets/shopping-5200288_1280.webp"; // Replace with your image path

// const BulkOrderSection = () => {
//   return (
//     <section className="bulk-order-3d-section">
//       <div className="bulk-3d-card">
//         <div className="bulk-3d-content">
//           <h2 className="bulk-title">
//             <FaBoxes className="bulk-icon" /> Exclusive Bulk Ordering
//           </h2>
//           <p>
//             Unlock special rates, custom packaging, and priority delivery. Perfect for weddings, corporate gifting, or resale.
//           </p>
//           <button className="bulk-cta">Get Your Deal</button>
//         </div>

//         <div className="bulk-3d-image-wrapper">
//           <img src={bulkImage} alt="Bulk Order" className="bulk-3d-image" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BulkOrderSection;

// import React from "react";
// import "./BulkOrderSection.css";
// import { FaBoxes } from "react-icons/fa";
// import bulkImage from "../../../assets/shopping-5200288_1280.webp"; // Your image path here

// const BulkOrderSection = () => {
//   return (
//     <section className="bulk-order-section">
//       <div className="bulk-order-card">
//         <div className="bulk-text-content">
//           <h2 className="bulk-title">
//             <FaBoxes className="bulk-icon" /> Bulk Ordering Made Easy
//           </h2>
//           <p className="bulk-description">
//             Enjoy exclusive discounts and priority delivery on bulk orders. Perfect for businesses, events, and resellers.
//           </p>
//           <button className="bulk-button" aria-label="Place Bulk Order">
//             Place Bulk Order
//           </button>
//         </div>
//         <div className="bulk-image-wrapper">
//           <img src={bulkImage} alt="Bulk Ordering" className="bulk-image" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BulkOrderSection;

//----working one
// import React from "react";
// import "./BulkOrderSection.css";
// import { FaCubes, FaArrowRight } from "react-icons/fa";
// import bulkImage from "../../../assets/shopping-5200288_1280.webp";

// const BulkOrderSection = () => {
//   return (
//     <section className="bulk-compact-section">
//       <div className="bulk-compact-card">
//         <div className="bulk-compact-content">
//           <div className="compact-badge">
//             <FaCubes className="badge-icon" />
//             <span>BULK DEAL</span>
//           </div>
          
//           <h3>
//             <span className="highlight">Big Order?</span> Get <span className="discount">30% OFF</span>
//           </h3>
          
//           <button className="compact-cta">
//             Order Now <FaArrowRight className="arrow" />
//           </button>
//         </div>
        
//         <div className="bulk-compact-image">
//           <img src={bulkImage} alt="Bulk Orders" />
//           <div className="price-tag">BEST VALUE</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BulkOrderSection;

// import React from "react";
// import "./BulkOrderSection.css";
// import { FaCubes, FaArrowRight, FaCheck, FaShippingFast, FaHeadset } from "react-icons/fa";
// import bulkImage from "../../../assets/shopping-5200288_1280.webp";

// const BulkOrderSection = () => {
//   return (
//     <section className="bulk-premium-section">
//       <div className="bulk-premium-card">
//         <div className="bulk-premium-content">
//           <div className="premium-badge">
//             <FaCubes className="badge-icon" />
//             <span>WHOLESALE OFFER</span>
//             <div className="pulse-dot"></div>
//           </div>
          
//           <h3>
//             Order <span className="highlight">50+ Jars</span> & Get<br/>
//             <span className="discount">30% OFF</span> + <span className="benefit">Free Shipping</span>
//           </h3>
          
//           <div className="premium-features">
//             <div className="feature">
//               <FaCheck className="feature-icon" />
//               <span>Custom branding available</span>
//             </div>
//             <div className="feature">
//               <FaShippingFast className="feature-icon" />
//               <span>Priority delivery</span>
//             </div>
//             <div className="feature">
//               <FaHeadset className="feature-icon" />
//               <span>Dedicated account manager</span>
//             </div>
//           </div>
          
//           <button className="premium-cta">
//             Get Wholesale Pricing <FaArrowRight className="arrow" />
//           </button>
//         </div>
        
//         <div className="bulk-premium-image">
//           <img src={bulkImage} alt="Bulk Orders" />
//           <div className="offer-tag">
//             <div className="offer-percent">30%</div>
//             <div className="offer-text">OFF</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BulkOrderSection;


import React from "react";
import "./BulkOrderSection.css";
import { FaCubes, FaArrowRight, FaWhatsapp, FaPhoneAlt, FaCheck, FaShippingFast, FaHeadset, FaPercentage } from "react-icons/fa";
import bulkImage from "../../../assets/bulk1.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BulkOrderSection = () => {
  const navigate = useNavigate(); // ✅ Initialize the navigate function

  const handleOrderNow = () => {
    navigate("/bulk-order-form"); // ✅ Navigate to the form page
  };

  return (
    <section className="bulk-ultimate-section">
      <div className="bulk-ultimate-card">
        {/* Glow effects */}
        <div className="glow-purple"></div>
        <div className="glow-blue"></div>
        <div className="glow-green"></div>
        
        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        
        <div className="bulk-ultimate-content">
          <div className="ultimate-badge">
            <FaCubes className="badge-icon" />
            <span>WHOLESALE DEAL</span>
            <div className="pulse-dot"></div>
          </div>
          
          <h3>
            Order <span className="highlight">50+ Jars</span> & Get<br/>
            <span className="discount"><FaPercentage className="inline-icon" />30 OFF</span> + <span className="benefit">Free Shipping</span>
          </h3>
          
          <div className="ultimate-features">
            <div className="feature-with-buttons">
              <div className="feature">
                <div className="feature-icon-container">
                  <FaCheck className="feature-icon" />
                </div>
                <span>Custom branding options</span>
                <div className="feature">
              <div className="feature-icon-container">
                <FaShippingFast className="feature-icon" />
              </div>
              <span>Priority nationwide delivery</span>
              
            </div>
            
            
              </div>
              <div className="feature-buttons">
  <button className="primary-cta compact">
    <FaWhatsapp className="cta-icon" />
    WhatsApp
  </button>
   <button className="secondary-cta compact" onClick={handleOrderNow}>
                  <FaShoppingCart className="cta-icon" />
                  Order Now
                </button>
</div>
            </div>
            
            
            
            
          </div>
        </div>
        
        <div className="bulk-ultimate-image">
          <img src={bulkImage} alt="Bulk Orders" />
          <div className="offer-ribbon">
            <div className="ribbon-text">LIMITED TIME OFFER</div>
            <div className="ribbon-tail"></div>
          </div>
          <div className="floating-price">
            <span className="from">From</span>
            <span className="price">₹1,299<span className="unit">/jar</span></span>
          </div>
          <div className="image-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrderSection;