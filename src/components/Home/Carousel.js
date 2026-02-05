// import React, { useState, useEffect } from 'react';
// import { Carousel, Image } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import './Carousel.css'; // We'll create this CSS file next
// import pic1 from "../../assets/pic5.webp"
// import pic2 from "../../assets/pic6.webp"
// import pic3 from "../../assets/pic7.webp"

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

// import React, { useState, useEffect } from 'react';
// import { Carousel, Image, Container, Button } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import pic1 from "../../assets/pic5.webp";
// import pic2 from "../../assets/pic6.webp";
// import pic3 from "../../assets/pic7.webp";

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
//       buttonLink: '#'
//     },
//     {
//       id: 2,
//       image: pic2,
//       title: 'Spice Up Your Dishes',
//       description: 'Perfect blend for curries, snacks & more!',
//       buttonText: 'Shop Spices',
//       buttonLink: '#'
//     },
//     {
//       id: 3,
//       image: pic3,
//       title: 'Special Combo Offer',
//       description: 'Get up to 30% off on masala spice bundles',
//       buttonText: 'Grab the Deal',
//       buttonLink: '#'
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered) {
//         setIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//       }
//     }, 3000);

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
//     <Container fluid className="p-0 position-relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Carousel
//         activeIndex={index}
//         onSelect={handleSelect}
//         controls={false}
//         indicators={false}
//         fade
//         className="shadow-lg"
//       >
//         {carouselItems.map((item) => (
//           <Carousel.Item key={item.id} className="position-relative">
//             <Image
//               className="d-block w-100"
//               src={item.image}
//               alt={item.title}
//               style={{ height: '80vh', objectFit: 'cover' }}
//               fluid
//             />
//             <Carousel.Caption className="d-flex flex-column justify-content-center h-100 py-5" style={{ top: 0 }}>
//               <div className="bg-dark bg-opacity-50 p-4 rounded">
//                 <h3 className="display-5 fw-bold text-white mb-3">{item.title}</h3>
//                 <p className="lead text-white mb-4">{item.description}</p>
//                 <Button variant="warning" size="lg" className="text-dark fw-bold">
//                   {item.buttonText}
//                 </Button>
//               </div>
//             </Carousel.Caption>
//           </Carousel.Item>
//         ))}
//       </Carousel>

//       {/* Custom Controls */}
//       <Button 
//         variant="light" 
//         className="position-absolute top-50 start-0 translate-middle-y rounded-circle p-3 d-none d-md-block" 
//         onClick={handlePrev}
//         style={{ left: '2rem', zIndex: 1 }}
//       >
//         <FaChevronLeft className="fs-4 text-dark" />
//       </Button>
//       <Button 
//         variant="light" 
//         className="position-absolute top-50 end-0 translate-middle-y rounded-circle p-3 d-none d-md-block" 
//         onClick={handleNext}
//         style={{ right: '2rem', zIndex: 1 }}
//       >
//         <FaChevronRight className="fs-4 text-dark" />
//       </Button>

//       {/* Custom Indicators */}
//       <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex">
//         {carouselItems.map((_, idx) => (
//           <Button
//             key={idx}
//             variant="light"
//             className={`rounded-circle mx-1 p-2 ${index === idx ? 'bg-warning' : 'bg-light bg-opacity-50'}`}
//             onClick={() => handleSelect(idx)}
//             aria-label={`Slide ${idx + 1}`}
//             style={{ width: '12px', height: '12px', padding: 0 }}
//           />
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default EcommerceCarousel;