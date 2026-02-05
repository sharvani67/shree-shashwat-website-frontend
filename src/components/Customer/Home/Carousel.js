// import React, { useState, useEffect } from 'react';
// import { Image, Button } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaStar } from 'react-icons/fa';
// import pic1 from "../../../assets/IMG0271.jpg";
// import pic2 from "../../../assets/IMG0299.jpg";
// import pic3 from "../../../assets/IMG0125.jpg";
// import './Carousel.css';
// import { useNavigate } from 'react-router-dom';

// const EcommerceCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigateTo = useNavigate();

//   const carouselItems = [
//     {
//       image: pic1,
//       title: "Premium Quality",
//       description: "Discover our handpicked selection of finest ingredients",
//       buttonText: "Shop Now",
//       buttonLink: "#",
//       offerText: "Limited Time Offer",
//       position: "right",
//       rating: 4.8,
//       reviewCount: 124,
//       reviewPosition: "right" // New property for review position
//     },
//     {
//       image: pic2,
//       title: "Spice Collection",
//       description: "Perfect blend for curries, snacks & more!",
//       buttonText: "Explore Spices",
//       buttonLink: "#",
//       offerText: "New Arrival",
//       position: "center",
//       rating: 4.9,
//       reviewCount: 89,
//       reviewPosition: "center" // New property for review position
//     },
//     {
//       image: pic3,
//       title: "Organic Produce",
//       description: "Direct from farm to your kitchen",
//       buttonText: "View Selection",
//       buttonLink: "#",
//       offerText: "Seasonal Special",
//       position: "left",
//       rating: 4.7,
//       reviewCount: 156,
//       reviewPosition: "left" // New property for review position
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered) {
//         setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isHovered, carouselItems.length]);

//   const goToIndex = (index) => {
//     setCurrentIndex(index);
//   };

//   const renderStars = (rating) => {
//     return (
//       <div className="stars">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <FaStar 
//             key={star} 
//             className={star <= rating ? 'star-filled' : 'star-empty'}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div 
//       className="modern-carousel-container p-0 position-relative mt-5"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="carousel-track">
//         {carouselItems.map((item, index) => (
//           <div 
//             key={index} 
//             className={`carousel-slide ${currentIndex === index ? 'active' : ''}`}
//           >
//             <div className="slide-image-container">
//               <Image src={item.image} alt={item.title} className="slide-image" />
//               <div className="image-overlay"></div>
//             </div>
            
//             <div className={`slide-content content-${item.position}`}>
//               <div className={`content-inner ${item.position === 'center' ? 'centered-content' : ''}`}>
//                 {item.offerText && (
//                   <div className={`offer-badge ${item.position === 'center' ? 'centered-badge' : ''}`}>
//                     {item.offerText}
//                     <div className="badge-tail"></div>
//                   </div>
//                 )}
                
//                 <div className={`content-group ${item.position === 'center' ? 'centered-group' : ''}`}>
//                   <h2 className={`slide-title ${item.position === 'center' ? 'centered-title' : ''}`}>
//                     {item.title}
//                   </h2>
                  
//                   <p className={`slide-description ${item.position === 'center' ? 'centered-description' : ''}`}>
//                     {item.description}
//                   </p>
                  
//                   <div className={`rating-container rating-${item.reviewPosition} ${item.position === 'center' ? 'centered-rating' : ''}`}>
//                     {renderStars(Math.floor(item.rating))}
//                     <span className="rating-text">
//                       {item.rating} ({item.reviewCount} reviews)
//                     </span>
//                   </div>
//                 </div>
                
//                 <Button 
//                   variant="light" 
//                   className={`shop-now-btn ${item.position === 'center' ? 'centered-button' : ''}`}
//                   onClick={() => navigateTo('/products')}
//                 >
//                   <FaShoppingBag className="btn-icon" />
//                   {item.buttonText}
//                   <span className="btn-underline"></span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button 
//         className="carousel-nav-btn prev-btn"
//         onClick={() => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
//       >
//         <FaChevronLeft />
//       </button>
      
//       <button 
//         className="carousel-nav-btn next-btn"
//         onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselItems.length)}
//       >
//         <FaChevronRight />
//       </button>

//       <div className="carousel-pagination">
//         {carouselItems.map((_, index) => (
//           <button
//             key={index}
//             className={`pagination-dot ${currentIndex === index ? 'active' : ''}`}
//             onClick={() => goToIndex(index)}
//           >
//             <span className="dot-fill"></span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EcommerceCarousel;

//---best one--//

// import React, { useState, useEffect } from 'react';
// import { Image, Button } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaStar } from 'react-icons/fa';
// import pic1 from "../../../assets/Correct size1.png";
// import pic2 from "../../../assets/Correct size 7 without textbbb.png";
// import pic3 from "../../../assets/Correct size 4 with textbb.png";
// import pic4 from "../../../assets/Correct sizebanner3.png";
// import pic5 from "../../../assets/Correct size 555.png";
// import pic6 from "../../../assets/Correct size 666.png";
// import pic7 from "../../../assets/Correct size222.png";
// import './Carousel.css';
// import { useNavigate } from 'react-router-dom';

// const EcommerceCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigateTo = useNavigate();

//   const carouselItems = [
//     {
//       image: pic1,
//       // title: "Premium Quality",
//       // description: "Discover our handpicked selection of finest ingredients",
//       // buttonText: "Shop Now",
//       // buttonLink: "#",
//       // offerText: "Limited Time Offer",
//       // position: "right",
//       // rating: 4.8,
//       // reviewCount: 124,
//       // reviewPosition: "right"
//     },
//     {
//       image: pic2,
//       // title: "Gojju Collection",
//       // description: "Perfect blend for curries, snacks & more!",
//       // buttonText: "Explore Spices",
//       // buttonLink: "#",
//       // offerText: "New Arrival",
//       // position: "center",
//       // rating: 4.9,
//       // reviewCount: 89,
//       // reviewPosition: "center"
//     },
//     {
//       image: pic3,
//       // title: "Organic Produce",
//       // description: "Direct from farm to your kitchen",
//       // buttonText: "View Selection",
//       // buttonLink: "#",
//       // offerText: "Seasonal Special",
//       // position: "left",
//       // rating: 4.7,
//       // reviewCount: 156,
//       // reviewPosition: "left"
//     },
//      {
//       image: pic4,
//     },
//     {
//       image: pic5,
//     },
//     {
//       image: pic6,
//     },
//     {
//       image: pic7,
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered) {
//         setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isHovered, carouselItems.length]);

//   const goToIndex = (index) => {
//     setCurrentIndex(index);
//   };

//   const renderStars = (rating) => {
//     return (
//       <div className="carousel-stars">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <FaStar 
//             key={star} 
//             className={star <= rating ? 'carousel-star-filled' : 'carousel-star-empty'}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div 
//       className="carousel-container p-0 position-relative mt-5"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="carousel-track">
//         {carouselItems.map((item, index) => (
//           <div 
//             key={index} 
//             className={`carousel-slide ${currentIndex === index ? 'carousel-active' : ''}`}
//           >
//             <div className="carousel-image-container">
//               <Image src={item.image} alt={item.title} className="carousel-image" />
//               <div className="carousel-image-overlay"></div>
//             </div>
            
//             <div className={`carousel-content carousel-content-${item.position}`}>
//               <div className={`carousel-content-inner ${item.position === 'center' ? 'carousel-centered-content' : ''}`}>
//                 {/* {item.offerText && (
//                   <div className={`carousel-offer-badge ${item.position === 'center' ? 'carousel-centered-badge' : ''}`}>
//                     {item.offerText}
//                     <div className="carousel-badge-tail"></div>
//                   </div>
//                 )} */}
                
//                 <div className={`carousel-content-group ${item.position === 'center' ? 'carousel-centered-group' : ''}`}>
//                   <h2 className={`carousel-slide-title ${item.position === 'center' ? 'carousel-centered-title' : ''}`}>
//                     {item.title}
//                   </h2>
                  
//                   <p className={`carousel-slide-description ${item.position === 'center' ? 'carousel-centered-description' : ''}`}>
//                     {item.description}
//                   </p>
                  
//                   {/* <div className={`carousel-rating-container carousel-rating-${item.reviewPosition} ${item.position === 'center' ? 'carousel-centered-rating' : ''}`}>
//                     {renderStars(Math.floor(item.rating))}
//                     <span className="carousel-rating-text">
//                       {item.rating} ({item.reviewCount} reviews)
//                     </span>
//                   </div> */}
//                 </div>
                
//                 {/* <Button 
//                   variant="light" 
//                   className={`carousel-shop-now-btn ${item.position === 'center' ? 'carousel-centered-button' : ''}`}
//                   onClick={() => navigateTo('/products')}
//                 >
//                   <FaShoppingBag className="carousel-btn-icon" />
//                   {item.buttonText}
//                   <span className="carousel-btn-underline"></span>
//                 </Button> */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button 
//         className="carousel-nav-btn carousel-prev-btn"
//         onClick={() => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
//       >
//         <FaChevronLeft />
//       </button>
      
//       <button 
//         className="carousel-nav-btn carousel-next-btn"
//         onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselItems.length)}
//       >
//         <FaChevronRight />
//       </button>

//       <div className="carousel-pagination">
//         {carouselItems.map((_, index) => (
//           <button
//             key={index}
//             className={`carousel-pagination-dot ${currentIndex === index ? 'carousel-active' : ''}`}
//             onClick={() => goToIndex(index)}
//           >
//             <span className="carousel-dot-fill"></span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EcommerceCarousel;


import React, { useState, useEffect } from 'react';
import { Image, Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaStar } from 'react-icons/fa';
import pic1 from "../../../assets/Banner/DR1.png";
import pic2 from "../../../assets/Banner/DR2.png";
import pic3 from "../../../assets/Banner/DR3.png";
import pic4 from "../../../assets/Banner/DR4.png";
import pic5 from "../../../assets/Banner/DR5.jpg";
import pic6 from "../../../assets/Banner/DR6.png";
import pic7 from "../../../assets/Banner/DR7.png";
// Mobile images
import mobilePic1 from "../../../assets/Banner/MR1.jpg";
import mobilePic2 from "../../../assets/Banner/MR2.jpg";
import mobilePic3 from "../../../assets/Banner/MR3.jpg";
import mobilePic4 from "../../../assets/Banner/MR44.png";
import mobilePic5 from "../../../assets/Banner/MR555.png";
import mobilePic6 from "../../../assets/Banner/MR66.png";
import mobilePic7 from "../../../assets/Banner/MR777.jpg";
// Ipad images
import ipad1 from "../../../assets/Banner/I1.png";
import ipad2 from "../../../assets/Banner/I2.png";
import ipad3 from "../../../assets/Banner/I3.png";
import ipad4 from "../../../assets/Banner/I4.png";
import ipad5 from "../../../assets/Banner/I5.png";
import ipad6 from "../../../assets/Banner/I6.png";
import ipad7 from "../../../assets/Banner/I7.png";
import './Carousel.css';
import { useNavigate } from 'react-router-dom';

const useIsIpad = () => {
  const [isIpad, setIsIpad] = useState(false);

  useEffect(() => {
    const checkIsIpad = () => {
      const width = window.innerWidth;
      setIsIpad(width >= 768 && width <= 1025);
    };

    checkIsIpad();
    window.addEventListener('resize', checkIsIpad);

    return () => window.removeEventListener('resize', checkIsIpad);
  }, []);

  return isIpad;
};


const EcommerceCarousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isIpad = useIsIpad();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const carouselItems = [
    {
      desktopImage: pic1,
      mobileImage: mobilePic1,
      ipadImage: ipad1,
    },
    {
      desktopImage: pic2,
      mobileImage: mobilePic2,
      ipadImage: ipad2,
    },
    {
      desktopImage: pic3,
      mobileImage: mobilePic3,
      ipadImage: ipad3,
    },
    {
      desktopImage: pic4,
      mobileImage: mobilePic4,
      ipadImage: ipad4,
    },
    {
      desktopImage: pic5,
      mobileImage: mobilePic5,
      ipadImage: ipad5,
    },
    {
      desktopImage: pic6,
      mobileImage: mobilePic6,
      ipadImage: ipad6,
    },
    {
      desktopImage: pic7,
      mobileImage: mobilePic7,
      ipadImage: ipad7,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, carouselItems.length]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const getImageForDevice = (item) => {
    if (isMobile) return item.mobileImage;
    if (isIpad && item.ipadImage) return item.ipadImage;
    return item.desktopImage;
  };

  return (
    <div 
      className="carousel-container p-0 position-relative mt-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-track">
        {carouselItems.map((item, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${currentIndex === index ? 'carousel-active' : ''}`}
          >
            <div className="carousel-image-container">
              <Image 
                src={getImageForDevice(item)} 
                alt="Carousel item" 
                className="carousel-image" 
              />
              <div className="carousel-image-overlay" onClick={() => navigate(`/products`)}></div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="carousel-nav-btn carousel-prev-btn"
        onClick={() => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
      >
        <FaChevronLeft />
      </button>
      
      <button 
        className="carousel-nav-btn carousel-next-btn"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselItems.length)}
      >
        <FaChevronRight />
      </button>

      <div className="carousel-pagination">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-pagination-dot ${currentIndex === index ? 'carousel-active' : ''}`}
            onClick={() => goToIndex(index)}
          >
            <span className="carousel-dot-fill"></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EcommerceCarousel;