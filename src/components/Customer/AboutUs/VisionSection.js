// import React from "react";
// import "./VisionSection.css"; // Import the CSS file
// import { FaEye } from "react-icons/fa"; // You can use any icon library
// import visionImage from "../../../assets/Setting-business-development-goals.png"; // Replace with your image path

// const VisionSection = () => {
//   return (
//     <section className="vision-section">
//       <div className="vision-image-wrapper">
//         <div className="image-container">
//           <img src={visionImage} alt="Vision" className="vision-image" />
//         </div>
//         <div className="floating-icon">
//           <FaEye color="#fff" size={20} />
//         </div>
//       </div>

//       <div className="vision-content">
//         <div className="vision-header">
//           <div className="icon-circle">
//             <FaEye color="#2a68ff" size={24} />
//           </div>
//           <h2>Our Vision</h2>
//         </div>
//         <div className="vision-text-card">
//            To be the global ambassador of South Indian culinary heritage, celebrated for our 
// authenticity, innovation, and the joy we bring to every plate. We aim to be the most 
// trusted brand in the Food segment
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VisionSection;

import React from "react";
import "./VisionSection.css";
import { FaGlobe, FaLightbulb } from "react-icons/fa";
import visionImage from "../../../assets/Setting-business-development-goals.png";

const VisionSection = () => {
  return (
    <section className="vision-section">
      <div className="vision-container">
        <div className="vision-content">
          <div className="vision-header">
            <span className="vision-subtitle">Our Ambition</span>
            <h2 className="vision-title">Our Vision</h2>
            <div className="vision-divider">
              <FaLightbulb className="vision-divider-icon" />
            </div>
          </div>
          
          <div className="vision-text-container">
            <p className="vision-text">
              To be the global ambassador of South Indian culinary heritage,
              celebrated for our authenticity, innovation, and the joy we bring to every plate.
              We aim to be the most trusted brand that bridges tradition with modern tastes worldwide.
            </p>
            <div className="vision-highlight">
              <FaGlobe className="vision-highlight-icon" />
              <span>Bringing South Indian Flavors to the World</span>
            </div>
          </div>
        </div>

        <div className="vision-image-wrapper">
          <div className="vision-image-decorative"></div>
          <img src={visionImage} alt="Global South Indian cuisine vision" className="vision-image" />
          <div className="vision-image-overlay">
            <FaLightbulb className="vision-overlay-icon" />
            <span>Innovating Tradition</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;