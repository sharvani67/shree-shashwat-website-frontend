// import React from "react";
// import "./EventOrderSection.css";
// import { FaCalendarAlt, FaGlassCheers, FaGift, FaArrowRight, FaWhatsapp, FaPhoneAlt,FaShippingFast} from "react-icons/fa";
// import eventImage from "../../../assets/image4.png";
// import { useNavigate } from "react-router-dom";

// const EventOrderSection = () => {
//   const navigate = useNavigate();

//   const handleEventInquiry = () => {
//     navigate("/event-order-form");
//   };

//   return (
//     <section className="event-order-section">
//       <div className="event-order-card">
//         {/* Glow effects */}
//         <div className="event-glow-gold"></div>
//         <div className="event-glow-red"></div>
        
//         {/* Floating elements */}
//         <div className="event-particle event-particle-1"></div>
//         <div className="event-particle event-particle-2"></div>
//         <div className="event-confetti"></div>
        
//         <div className="event-order-content">
//           <div className="event-badge">
//             <FaCalendarAlt className="event-badge-icon" />
//             <span>SPECIAL EVENTS</span>
//             <div className="event-pulse-dot"></div>
//           </div>
          
//           <h3>
//             Planning an <span className="event-highlight">Event?</span><br/>
//             Get <span className="event-discount">20% OFF</span> + <span className="event-benefit">Custom Packaging</span>
//           </h3>
          
//           <div className="event-features">
//             <div className="event-feature">
//               <div className="event-feature-icon-container">
//                 <FaGlassCheers className="event-feature-icon" />
//               </div>
//               <span>Weddings & Corporate Gifts</span>
//             </div>
            
//             <div className="event-feature">
//               <div className="event-feature-icon-container">
//                 <FaGift className="event-feature-icon" />
//               </div>
//               <span>Custom Branding & Packaging</span>
//             </div>
            
//             <div className="event-feature">
//               <div className="event-feature-icon-container">
//                 <FaShippingFast className="event-feature-icon" />
//               </div>
//               <span>Nationwide Bulk Delivery</span>
//             </div>
//           </div>
          
//           <div className="event-cta-group">
//             <button className="event-primary-cta" onClick={handleEventInquiry}>
//               <span>Get Event Quote</span>
//               <FaArrowRight className="arrow" />
//             </button>
            
//             <button className="event-secondary-cta">
//               <FaWhatsapp className="cta-icon" />
//               WhatsApp Inquiry
//             </button>
//           </div>
//         </div>
        
//         <div className="event-order-image">
//           <img src={eventImage} alt="Event Orders" />
//           <div className="event-min-order">
//             <span className="event-min-text">Minimum Order</span>
//             <span className="event-min-quantity">100+ Units</span>
//           </div>
//           <div className="event-image-overlay"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventOrderSection;

import React from "react";
import "./EventOrderSection.css";
import { FaBoxes, FaArrowRight, FaCheck, FaShippingFast,FaShoppingBag } from "react-icons/fa";
import bulkImage from "../../../assets/IMG0292.jpg";
import { useNavigate } from "react-router-dom";

const EventOrderSection = () => {
  const navigate = useNavigate();

  const handleBulkOrder = () => {
    navigate("/bulk-order-form");
  };

  return (
    <section className="bulk-order-section">
      <div className="bulk-order-card">
        {/* Glow effects */}
        <div className="bulk-glow-blue"></div>
        <div className="bulk-glow-green"></div>
        
        {/* Floating elements */}
        <div className="bulk-particle bulk-particle-1"></div>
        <div className="bulk-particle bulk-particle-2"></div>
        
        <div className="bulk-order-content">
          <div className="bulk-badge">
            <FaBoxes className="bulk-badge-icon" />
            <span>WHOLESALE ORDERS</span>
            <div className="bulk-pulse-dot"></div>
          </div>
          
          <h3>
            <span className="bulk-highlight">Bulk Discounts</span> Available<br/>
            Order <span className="bulk-discount">50+ Units</span> & Save <span className="bulk-percent">30%</span>
          </h3>
          
          <div className="bulk-features">
            <div className="bulk-feature">
              <div className="bulk-feature-icon-container">
                <FaCheck className="bulk-feature-icon" />
              </div>
              <span>Wholesale pricing</span>
            </div>
            
            <div className="bulk-feature">
              <div className="bulk-feature-icon-container">
                <FaShippingFast className="bulk-feature-icon" />
              </div>
              <span>Free shipping & Nationwide Bulk Delivery</span>
              <div className="bulk-cta-group">
            <button className="bulk-primary-cta" onClick={handleBulkOrder}>
              <span>Request Quote</span>
              <FaArrowRight className="arrow" />
            </button>
            
            <button className="bulk-secondary-cta" onClick={handleBulkOrder}>
              <FaShoppingBag className="cta-icon" />
              Bulk Order Now
            </button>
          </div>
            </div>
            
          </div>
          
          
        </div>
        
        <div className="bulk-order-image">
          <img src={bulkImage} alt="Bulk Orders" />
          
        </div>
      </div>
    </section>
  );
};

export default EventOrderSection;