// import React from 'react';
// import './JoinWhatsApp.css';

// const WhatsApp = () => {
//   return (
//     <div className="wa-ad-banner">
//       <div className="wa-ad-glass">
//         <h2 className="wa-title">💬 Join Our WhatsApp Group!</h2>
//         <p className="wa-desc">
//           Be the first to get updates, announcements, and insider info. No spam — just value!
//         </p>
//         <a
//           href="https://wa.me/YOURGROUPINVITELINK"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="wa-button"
//         >
//           🔗 Join Now
//         </a>
//       </div>
//     </div>
//   );
// };

// export default WhatsApp;

// import React from 'react';
// import './JoinWhatsApp.css';
// import { FaWhatsapp, FaArrowRight, FaComments, FaBell } from 'react-icons/fa';

// const WhatsApp = () => {
//   return (
//     <div className="wa-ad-banner">
//       <div className="wa-ad-glass">
//         {/* Floating WhatsApp bubbles */}
//         <div className="wa-bubble wa-bubble-1"></div>
//         <div className="wa-bubble wa-bubble-2"></div>
//         <div className="wa-bubble wa-bubble-3"></div>
        
//         <div className="wa-header">
//           <FaWhatsapp className="wa-main-icon" />
//           <h2 className="wa-title">Join Our Exclusive WhatsApp Community!</h2>
//         </div>
        
//         <div className="wa-benefits">
//           <div className="wa-benefit-item">
//             <FaComments className="wa-benefit-icon" />
//             <span>Real-time updates</span>
//           </div>
//           <div className="wa-benefit-item">
//             <FaBell className="wa-benefit-icon" />
//             <span>Special announcements</span>
//           </div>
//         </div>
        
//         <p className="wa-desc">
//           Be the first to get updates, exclusive offers, and insider info. 
//           <br />No spam — just valuable content straight to your phone!
//         </p>
        
//         <a
//           href="https://wa.me/YOURGROUPINVITELINK"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="wa-button"
//         >
//           <span>Join Now</span>
//           <FaArrowRight className="wa-button-icon" />
//         </a>
        
//         <div className="wa-footer">
//           <span className="wa-member-count">🌟 500+ members and counting!</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhatsApp;

import React from 'react';
import './JoinWhatsApp.css';
import { FaWhatsapp, FaArrowRight, FaStar, FaGem } from 'react-icons/fa';
import { motion } from 'framer-motion';
import whatsappGroupImage from '../../../assets/wtspimg.jpg'; // Replace with your actual image path

const WhatsApp = () => {
  return (
    <div className="wa-ad-banner">
      {/* Premium decorative elements */}
      <div className="wa-corner-gem"></div>
      <div className="wa-glow-pulse"></div>
      <div className="wa-floating-dots">
        {[...Array(6)].map((_, i) => <div key={i} className="wa-dot"></div>)}
      </div>
      
      <motion.div 
        className="wa-ad-container split-layout"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <div className="wa-image-section">
          <motion.img 
            src={whatsappGroupImage} 
            alt="WhatsApp Group Benefits"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="wa-feature-image"
          />
          <div className="wa-image-badge">
            <FaWhatsapp className="wa-badge-icon" />
            <span>Active Community</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="wa-content">
          <div className="wa-text-group">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -3, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaWhatsapp className="wa-icon" />
            </motion.div>
            <div>
              <h3 className="wa-title">
  <span className="wa-title-highlight">Join Our WhatsApp Group <FaStar className="wa-star-icon" /></span>
  
  
</h3>

              <p className="wa-subtitle">
                Exclusive <span className="wa-subtitle-highlight">deals</span> • Early access • Premium content
              </p>
              <ul className="wa-benefits-list">
                <li>Daily flash sales</li>
                <li>Member-only discounts</li>
                <li>24/7 support</li>
                <li>First access to new products</li>
              </ul>
            </div>
          </div>
          
          <motion.a
            href="https://chat.whatsapp.com/IEn431tS9Rl21yL5KzwtnS"
            className="wa-cta-button"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(37, 211, 102, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Join Now</span>
            <motion.span
              animate={{
                x: [0, 4, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <FaArrowRight className="wa-arrow" />
            </motion.span>
          </motion.a>
        </div>
        
        <div className="wa-footer">
            <div className="wa-active-group">
              <div className="wa-active-indicator">
                <div className="wa-pulse-dots">
                  <div className="wa-pulse-dot"></div>
                  <div className="wa-pulse-dot"></div>
                  <div className="wa-pulse-dot"></div>
                </div>
                <span className="wa-online-text">300+ VIP Members Online</span>
              </div>
              <div className="wa-guarantee-below">
                <FaGem className="wa-guarantee-icon" />
                <span>Verified Community</span>
              </div>
            </div>
          </div>
        
      </motion.div>
    </div>
  );
};

export default WhatsApp;