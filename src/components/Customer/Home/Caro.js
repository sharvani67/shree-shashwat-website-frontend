// import React, { useState, useEffect } from 'react';
// import { Carousel, Image, Container, Button } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight, FaShoppingBag } from 'react-icons/fa';
// import pic1 from "../../../assets/IMG0271.jpg";
// import pic2 from "../../../assets/IMG0299.jpg";
// import pic3 from "../../../assets/IMG0125.jpg";
// import "./Carousel.css";

// const EcommerceCarousel = () => {
//   const [index, setIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const carouselItems = [
//     {
//       id: 1,
//       image: pic1,
//       title: 'Authentic Masala Chilli Powder',
//       description: 'Hand-ground spices for that traditional fiery taste',
//       buttonText: 'Buy Now',
//       buttonLink: '#',
//       offerText: 'Limited Stock!'
//     },
//     {
//       id: 2,
//       image: pic2,
//       title: 'Spice Up Your Dishes',
//       description: 'Perfect blend for curries, snacks & more!',
//       buttonText: 'Shop Spices',
//       buttonLink: '#',
//       offerText: 'New Arrival!'
//     },
//     {
//       id: 3,
//       image: pic3,
//       title: 'Special Combo Offer',
//       description: 'Get up to 30% off on masala spice bundles',
//       buttonText: 'Grab the Deal',
//       buttonLink: '#',
//       offerText: '30% OFF!'
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered) {
//         setIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isHovered, carouselItems.length]);

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
  
   
//     <Container fluid className="carousel-container p-0 position-relative mt-5"
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
//           <Carousel.Item key={item.id} className="carousel-item-wrapper">
//             <div className="carousel-image-overlay"></div>
//             <Image
//               className="d-block w-100 carousel-image"
//               src={item.image}
//               alt={item.title}
//               fluid
//             />
//             <Carousel.Caption className="carousel-caption">
//               <div className="caption-content">
//                 {item.offerText && (
//                   <span className="offer-badge">
//                     {item.offerText}
//                   </span>
//                 )}
//                 <h3 className="carousel-title">{item.title}</h3>
//                 <p className="carousel-description">{item.description}</p>
//                 <Button 
//                   variant="primary" 
//                   className="carousel-button mt-3"
//                   size="lg"
//                   href={item.buttonLink}
//                 >
//                   <FaShoppingBag className="me-2" />
//                   {item.buttonText}
//                 </Button>
//               </div>
//             </Carousel.Caption>
//           </Carousel.Item>
//         ))}
//       </Carousel>

//       {/* Custom Controls */}
//       <Button 
//         variant="outline-light" 
//         className="carousel-control-prev"
//         onClick={handlePrev}
//         aria-label="Previous slide"
//       >
//         <FaChevronLeft className="control-icon" />
//       </Button>
//       <Button 
//         variant="outline-light" 
//         className="carousel-control-next"
//         onClick={handleNext}
//         aria-label="Next slide"
//       >
//         <FaChevronRight className="control-icon" />
//       </Button>

//       {/* Custom Indicators */}
//       <div className="carousel-indicators">
//         {carouselItems.map((_, idx) => (
//           <button
//             key={idx}
//             className={`carousel-indicator ${index === idx ? 'active' : ''}`}
//             onClick={() => handleSelect(idx)}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default EcommerceCarousel;