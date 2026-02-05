
// import React, { useState, useEffect } from 'react';
// import { Image, Button } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaStar } from 'react-icons/fa';
// import pic1 from "../../../assets/Banner/DR1.png";
// import pic2 from "../../../assets/Banner/DR2.png";
// import pic3 from "../../../assets/Banner/DR3.png";
// import pic4 from "../../../assets/Banner/DR4.png";
// import pic5 from "../../../assets/Banner/DR5.jpg";
// import pic6 from "../../../assets/Banner/DR6.png";
// import pic7 from "../../../assets/Banner/DR7.png";
// // Mobile images
// import mobilePic1 from "../../../assets/Banner/MR1.jpg";
// import mobilePic2 from "../../../assets/Banner/MR2.jpg";
// import mobilePic3 from "../../../assets/Banner/MR3.jpg";
// import mobilePic4 from "../../../assets/Banner/MR44.png";
// import mobilePic5 from "../../../assets/Banner/MR555.png";
// import mobilePic6 from "../../../assets/Banner/MR66.png";
// import mobilePic7 from "../../../assets/Banner/MR777.jpg";
// // Ipad images
// import ipad1 from "../../../assets/Banner/I1.png";
// import ipad2 from "../../../assets/Banner/I2.png";
// import ipad3 from "../../../assets/Banner/I3.png";
// import ipad4 from "../../../assets/Banner/I4.png";
// import ipad5 from "../../../assets/Banner/I5.png";
// import ipad6 from "../../../assets/Banner/I6.png";
// import ipad7 from "../../../assets/Banner/I7.png";
// import './Carousel.css';
// import { useNavigate } from 'react-router-dom';

// const useIsIpad = () => {
//   const [isIpad, setIsIpad] = useState(false);

//   useEffect(() => {
//     const checkIsIpad = () => {
//       const width = window.innerWidth;
//       setIsIpad(width >= 768 && width <= 1025);
//     };

//     checkIsIpad();
//     window.addEventListener('resize', checkIsIpad);

//     return () => window.removeEventListener('resize', checkIsIpad);
//   }, []);

//   return isIpad;
// };


// const EcommerceCarousel = () => {
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const isIpad = useIsIpad();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const carouselItems = [
//     {
//       desktopImage: pic1,
//       mobileImage: mobilePic1,
//       ipadImage: ipad1,
//     },
//     {
//       desktopImage: pic2,
//       mobileImage: mobilePic2,
//       ipadImage: ipad2,
//     },
//     {
//       desktopImage: pic3,
//       mobileImage: mobilePic3,
//       ipadImage: ipad3,
//     },
//     {
//       desktopImage: pic4,
//       mobileImage: mobilePic4,
//       ipadImage: ipad4,
//     },
//     {
//       desktopImage: pic5,
//       mobileImage: mobilePic5,
//       ipadImage: ipad5,
//     },
//     {
//       desktopImage: pic6,
//       mobileImage: mobilePic6,
//       ipadImage: ipad6,
//     },
//     {
//       desktopImage: pic7,
//       mobileImage: mobilePic7,
//       ipadImage: ipad7,
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

//   const getImageForDevice = (item) => {
//     if (isMobile) return item.mobileImage;
//     if (isIpad && item.ipadImage) return item.ipadImage;
//     return item.desktopImage;
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
//               <Image 
//                 src={getImageForDevice(item)} 
//                 alt="Carousel item" 
//                 className="carousel-image" 
//               />
//               <div className="carousel-image-overlay" onClick={() => navigate(`/products`)}></div>
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