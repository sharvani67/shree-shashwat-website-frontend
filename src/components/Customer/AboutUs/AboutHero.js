// import React from 'react';
// import './AboutHero.css'; // Create this CSS file for styling
// import image2 from '../../../assets/trustedimage1.jpg';
// import image3 from '../../../assets/trustedimage1.jpg';
// import image4 from '../../../assets/IMG0125.jpg';
// import image5 from '../../../assets/vission4.jpg';

// const AboutHero = () => {
//   return (
//     <div className="about-hero-container">
//       {/* Navigation Bar */}
//       {/* Hero Content */}
//       <div className="about-hero-content">
//         <h1>Our Story</h1>
//         <h2>Farm-Fresh Goodness Delivered to Your Doorstep</h2>
//         <p className="hero-description">
//           At FreshMarket, we're passionate about connecting you with the freshest,
//           highest-quality ingredients from local farms and artisans. Our mission is
//           to make healthy, sustainable eating convenient and accessible for everyone.
//         </p>
//         <div className="hero-buttons">
//           <button className="primary-btn">Meet Our Farmers</button>
//           <button className="secondary-btn">Watch Our Story</button>
//         </div>
//       </div>

//       {/* Trust Badges */}
//       <div className="trust-badges">
//         <div className="badge">
//           <img src={image2} alt="Local Farm Certified" />
//           <span>Local Farm Certified</span>
//         </div>
//         <div className="badge">
//           <img src={image3} alt="100% Organic" />
//           <span>100% Organic</span>
//         </div>
//         <div className="badge">
//           <img src={image4} alt="Sustainable Practices" />
//           <span>Sustainable Practices</span>
//         </div>
//         <div className="badge">
//           <img src={image5} alt="Next-Day Delivery" />
//           <span>Next-Day Delivery</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutHero;

import React from 'react';
import './AboutHero.css';

const AboutHero = () => {
  return (
    <div className="about-hero-container">
      {/* Navigation Bar with semi-transparent background */}
      
      {/* Hero Content with text overlay */}
      <div className="about-hero-content">
        <div className="text-overlay">
          <h1>Our Story</h1>
          <h2>Farm-Fresh Goodness Delivered to Your Doorstep</h2>
          <p className="hero-description">
            At FreshMarket, we're passionate about connecting you with the freshest,
            highest-quality ingredients from local farms and artisans. Our mission is
            to make healthy, sustainable eating convenient and accessible for everyone.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Meet Our Farmers</button>
            <button className="secondary-btn">Watch Our Story</button>
          </div>
        </div>
      </div>

      {/* Trust Badges with dark background */}
      <div className="trust-badges">
        <div className="badge">
          <img src="/local-farm-icon.svg" alt="Local Farm Certified" />
          <span>Local Farm Certified</span>
        </div>
        <div className="badge">
          <img src="/organic-icon.svg" alt="100% Organic" />
          <span>100% Organic</span>
        </div>
        <div className="badge">
          <img src="/sustainable-icon.svg" alt="Sustainable Practices" />
          <span>Sustainable Practices</span>
        </div>
        <div className="badge">
          <img src="/delivery-icon.svg" alt="Next-Day Delivery" />
          <span>Next-Day Delivery</span>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;