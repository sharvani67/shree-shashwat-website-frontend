// import React, { useState, useEffect } from 'react';
// import { Carousel, Image } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import './Carousel.css'; // We'll create this CSS file next
// import pic1 from "../../../assets/pic5.webp"
// import pic2 from "../../../assets/pic6.webp"
// import pic3 from "../../../assets/pic7.webp"

// const EcommerceCarousel = () => {
//   const [index, setIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   // Carousel items data
//   const carouselItems = [
//   {
//     id: 1,
//     image: pic1, // Replace with an image of masala chili powder packaging
//     title: 'Authentic Masala Chilli Powder',
//     description: 'Hand-ground spices for that traditional fiery taste',
//     buttonText: 'Buy Now',
//     buttonLink: '#'
//   },
//   {
//     id: 2,
//     image: pic2, // Replace with a kitchen cooking scene or food image
//     title: 'Spice Up Your Dishes',
//     description: 'Perfect blend for curries, snacks & more!',
//     buttonText: 'Shop Spices',
//     buttonLink: '#'
//   },
//   {
//     id: 3,
//     image: pic3, // Replace with an offer banner or bundle pack
//     title: 'Special Combo Offer',
//     description: 'Get up to 30% off on masala spice bundles',
//     buttonText: 'Grab the Deal',
//     buttonLink: '#'
//   }
// ];


//   // Auto slide functionality
//  // Auto slide functionality with 3 seconds interval
// useEffect(() => {
//   const interval = setInterval(() => {
//     if (!isHovered) {
//       setIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//     }
//   }, 3000); // Changed to 3000 ms for 3 seconds

//   return () => clearInterval(interval);
// }, [isHovered, carouselItems.length]);


//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   const handlePrev = () => {
//     setIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
//   };

//   const handleNext = () => {
//     setIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//   };

//   return (
//     <div 
//       className="ecommerce-carousel-container"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Carousel
//         activeIndex={index}
//         onSelect={handleSelect}
//         controls={false}
//         indicators={false}
//         fade
//         className="ecommerce-carousel"
//       >
//         {carouselItems.map((item) => (
//           <Carousel.Item key={item.id} className="carousel-item">
//             <Image
//               className="d-block w-100 carousel-image"
//               src={item.image}
//               alt={item.title}
//               fluid
//             />
//             <Carousel.Caption className="carousel-caption">
//               <div className="caption-content">
//                 <h3 className="carousel-title">{item.title}</h3>
//                 <p className="carousel-description">{item.description}</p>
//                 <a href={item.buttonLink} className="carousel-button">
//                   {item.buttonText}
//                 </a>
//               </div>
//             </Carousel.Caption>
//           </Carousel.Item>
//         ))}
//       </Carousel>

//       {/* Custom arrows */}
//       <button className="carousel-control-prev" onClick={handlePrev}>
//         <FaChevronLeft className="carousel-control-icon" />
//       </button>
//       <button className="carousel-control-next" onClick={handleNext}>
//         <FaChevronRight className="carousel-control-icon" />
//       </button>

//       {/* Custom indicators */}
//       <div className="custom-indicators">
//         {carouselItems.map((_, idx) => (
//           <button
//             key={idx}
//             className={`indicator ${index === idx ? 'active' : ''}`}
//             onClick={() => handleSelect(idx)}
//             aria-label={`Slide ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EcommerceCarousel;