// import React from 'react';
// import { motion } from 'framer-motion';
// import missionImg from '../../../assets/Business-Growth.jpg';
// import './MissionSection.css'; // We'll create this CSS file

// const MissionSection = () => {
//   return (
//     <section className="mission-section">
//       <div className="container">
//         <motion.div 
//           className="section-header text-center mb-5"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <span className="section-tag">Our Mission</span>
//           <h2 className="section-title">
//             Crafting <span className="highlight">Culinary</span> Experiences
//           </h2>
//           <div className="title-decoration"></div>
//         </motion.div>

//         <div className="mission-card">
//           <div className="row no-gutters align-items-center flex-wrap">
//             <motion.div 
//               className="col-lg-5 mission-img-container"
//               initial={{ opacity: 0, x: -100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="image-wrapper">
//                 <img 
//                   src={missionImg} 
//                   alt="Mission" 
//                   className="mission-img" 
//                 />
//                 <div className="image-frame"></div>
//                 <div className="image-overlay"></div>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="col-lg-7"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//             >
//               <div className="mission-content">
//                 <div className="text-decoration"></div>
//                 <p className="mission-text">
//                   To craft and share high-quality, authentic South Indian foods and experiences that celebrate tradition while embracing the needs of the modern world. From bold spices to comforting snacks and everything in between, we aspire to make every bite a memorable journey.
//                 </p>
//                 <motion.button 
//                   className="mission-button"
//                   whileHover={{ 
//                     y: -5,
//                     boxShadow: "0 10px 20px rgba(212, 175, 55, 0.3)"
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Discover Our Story
//                   <span className="button-shine"></span>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MissionSection;

// import React from 'react';
// import { motion } from 'framer-motion';
// import missionImg from '../../../assets/mission33.jpg';
// import './MissionSection.css';

// const MissionSection = () => {
//   return (
//     <section className="mission-section">
//       <div className="container">
//         <motion.div 
//           className="section-header text-center mb-5"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <span className="section-tag">Our Mission</span>
//           <h2 className="section-title">
//             Crafting <span className="highlight">Culinary</span> Excellence
//           </h2>
//           <div className="title-decoration"></div>
//         </motion.div>

//         <div className="mission-card">
//           <div className="row no-gutters align-items-center flex-wrap">
//             <motion.div 
//               className="col-lg-5 mission-img-container"
//               initial={{ opacity: 0, x: -100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="image-wrapper">
//                 <img 
//                   src={missionImg} 
//                   alt="Mission" 
//                   className="mission-img" 
//                 />
//                 <div className="image-frame"></div>
//                 <div className="image-overlay"></div>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="col-lg-7"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//             >
//               <div className="mission-content">
//                 <div className="text-decoration"></div>
//                 <p className="mission-text">
//                   To craft and share high-quality, authentic South Indian foods and experiences that celebrate tradition while embracing the needs of the modern world. From bold spices to comforting snacks and everything in between, we aspire to make every bite a memorable journey.
//                 </p>
//                 <motion.button 
//                   className="mission-button"
//                   whileHover={{ 
//                     y: -5,
//                     boxShadow: "0 10px 20px rgba(64, 130, 191, 0.3)"
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Discover Our Story
//                   <span className="button-shine"></span>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MissionSection;


// import React from "react";
// import "./MissionSection.css";
// // Reuse the same CSS file for consistency
// import { FaBullseye } from "react-icons/fa"; // Mission-related icon
// import missionImage from "../../../assets/women1.jpg"; // Replace with your image path

// const MissionSection = () => {
//   return (
//     <section className="vision-section reverse-layout">
//       <div className="vision-content">
//         <div className="vision-header">
//           <div className="icon-circle">
//             <FaBullseye color="#2a68ff" size={24} />
//           </div>
//           <h2>Our Mission</h2>
//         </div>
//         <div className="vision-text-card">
//           To craft premium quality Indian pickles using traditional methods and natural ingredients, 
//           while empowering women through skill development and employment opportunities. We're committed 
//           to supporting local farmers, preserving authentic flavors for future generations, and building 
//           a sustainable business that creates positive impact in every community we touch.
//         </div>
//       </div>

//       <div className="vision-image-wrapper">
//         <div className="image-container">
//           <img src={missionImage} alt="Mission" className="vision-image" />
//         </div>
//         <div className="floating-icon">
//           <FaBullseye color="#fff" size={20} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MissionSection;

// import React from "react";
// import "./VisionSection.css"; // Reuse same CSS styles
// import { FaBullseye } from "react-icons/fa";
// import "./MissionSection.css";
// import missionImage from "../../../assets/Business-Growth.jpg"; // Replace with your actual image

// const MissionSection = () => {
//   return (
//     <section className="vision-section mission-reverse">
//       <div className="vision-content">
//         <div className="vision-header">
//           <div className="icon-circle">
//             <FaBullseye color="#2a68ff" size={24} />
//           </div>
//           <h2>Our Mission</h2>
//         </div>
//         <div className="vision-text-card">
//            To craft and share high-quality, authentic South Indian foods and experiences that 
// celebrate tradition while embracing the needs of the modern world. From bold spices to 
// comforting snacks and everything in between, we aspire to make every bite a memorable 
// journey.
//         </div>
//       </div>

//       <div className="vision-image-wrapper">
//         <div className="image-container">
//           <img src={missionImage} alt="Mission" className="vision-image" />
//         </div>
//         <div className="floating-icon">
//           <FaBullseye color="#fff" size={20} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MissionSection;

import React from "react";
import "./MissionSection.css";
import { FaLeaf, FaHeart } from "react-icons/fa";
import missionImage from "../../../assets/Business-Growth.jpg";// Updated image

const MissionSection = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="mission-image-wrapper">
          <div className="mission-image-decorative"></div>
          <img src={missionImage} alt="Authentic South Indian cuisine" className="mission-image" />
          <div className="mission-image-overlay">
            <FaLeaf className="mission-overlay-icon" />
            <span>Traditional Recipes</span>
          </div>
        </div>

        <div className="mission-content">
          <div className="mission-header">
            <span className="mission-subtitle">Our Commitment</span>
            <h2 className="mission-title">Our Mission</h2>
            <div className="mission-divider">
              <FaHeart className="mission-divider-icon" />
            </div>
          </div>
          
          <div className="mission-text-container">
            <p className="mission-text">
              To craft and share high-quality, authentic South Indian foods and experiences that 
              celebrate tradition while embracing the needs of the modern world. From bold spices to 
              comforting snacks and everything in between, we aspire to make every bite a memorable 
              journey.
            </p>
            <div className="mission-highlight">
              <FaLeaf className="mission-highlight-icon" />
              <span>Preserving Culinary Heritage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;