// import React, { useEffect, useState } from "react";
// import "./OfferPopup.css";

// const OfferPopup = () => {
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPopup(true);
//     }, 30000); // 30 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   const handleClose = () => {
//     setShowPopup(false);
//   };

//   return (
//     showPopup && (
//       <div className="popup-overlay">
//         <div className="popup-content">
//           <button className="close-btn" onClick={handleClose}>×</button>
//           <h2>🎉 Limited Time Offer!</h2>
//           <p>
//             Get <strong>25% OFF</strong> on all salon services! 💇‍♀️✨ <br />
//             Book your appointment now and enjoy the savings!
//           </p>
//           <a href="/book-now" className="popup-btn">Book Now</a>
//         </div>
//       </div>
//     )
//   );
// };

// export default OfferPopup;


import React, { useEffect, useState } from "react";
import "./OfferPopup.css";

import img1 from "./../../assets/IMG0261.jpg";
import img2 from "./../../assets/IMG0271.jpg";
import img3 from "./../../assets/Vangibath.png";
import img4 from "./../../assets/IMG0292.jpg";

const foodImages = [img1, img2, img3, img4];

const FoodOfferPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showPopup) return;

    const slider = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % foodImages.length);
    }, 3000);

    return () => clearInterval(slider);
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="popup-overlay mt-5">
        <div className="popup-content">
          <button className="close-btn" onClick={handleClose}>×</button>
          <h2>Tasty Offers Just for You!</h2>
          <p>
            <strong>Deals You Can't Miss:</strong><br />
            🍴 Buy any <strong>4 packs</strong> – Get <strong>10% OFF</strong> + <strong>Free Delivery</strong><br />
            🥗 Buy any <strong>2 packs</strong> – Get <strong>5% OFF</strong> (Shipping charges apply)
          </p>
          <img
            src={foodImages[currentImage]}
            alt="Delicious Food"
            className="popup-image"
          />
          <a href="/products" className="popup-btn">Order Now</a>
        </div>
      </div>
    )
  );
};

export default FoodOfferPopup;

