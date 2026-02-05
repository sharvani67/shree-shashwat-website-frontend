// import React, { useState, useEffect } from 'react';
// import { Carousel, Image, Button, Container } from 'react-bootstrap';
// import { FaChevronLeft, FaChevronRight, FaShoppingBag } from 'react-icons/fa';
// import pic1 from "../../../assets/IMG0271.jpg";
// import pic2 from "../../../assets/IMG0299.jpg";
// import pic3 from "../../../assets/IMG0125.jpg";
// import './Carousel.css';

// const EcommerceCarousel = () => {
//   const [index, setIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const carouselItems = [
//     {
//       image: pic1,
//       title: "Premium Quality Products",
//       description: "Discover our handpicked selection of finest ingredients",
//       buttonText: "Shop Now",
//       buttonLink: "#",
//       offerText: "Special Offer!",
//     },
//     {
//       image: pic2,
//       title: "Spice Up Your Dishes",
//       description: "Perfect blend for curries, snacks & more!",
//       buttonText: "Shop Spices",
//       buttonLink: "#",
//       offerText: "New Arrival!",
//     },
//     {
//       image: pic3,
//       title: "Fresh & Organic",
//       description: "Direct from farm to your kitchen",
//       buttonText: "Explore Produce",
//       buttonLink: "#",
//       offerText: "Seasonal Special",
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered) {
//         setIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//       }
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [isHovered, carouselItems.length]);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <div className="hero-carousel-wrapper">
//       <Carousel
//         activeIndex={index}
//         onSelect={handleSelect}
//         controls={false}
//         indicators={false}
//         fade
//         pause={isHovered ? true : false}
//       >
//         {carouselItems.map((item, idx) => (
//           <Carousel.Item key={idx}>
//             <div className="carousel-image-container">
//               <Image src={item.image} alt={item.title} className="carousel-image" />
//               <div className="carousel-overlay"></div>
              
//               <div className="carousel-content">
//                 <div className="content-wrapper">
//                   {item.offerText && (
//                     <span className="offer-tag">{item.offerText}</span>
//                   )}
//                   <h2 className="carousel-title">{item.title}</h2>
//                   <p className="carousel-text">{item.description}</p>
//                   <Button variant="primary" className="shop-button">
//                     <FaShoppingBag className="me-2" />
//                     {item.buttonText}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Carousel.Item>
//         ))}
//       </Carousel>

//       <button 
//         className="carousel-control prev" 
//         onClick={() => setIndex((index - 1 + carouselItems.length) % carouselItems.length)}
//       >
//         <FaChevronLeft />
//       </button>
//       <button 
//         className="carousel-control next" 
//         onClick={() => setIndex((index + 1) % carouselItems.length)}
//       >
//         <FaChevronRight />
//       </button>

//       <div className="carousel-dots">
//         {carouselItems.map((_, idx) => (
//           <button
//             key={idx}
//             className={`dot ${index === idx ? 'active' : ''}`}
//             onClick={() => handleSelect(idx)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EcommerceCarousel;




//----------------working one---------------------//

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
//   const [direction, setDirection] = useState('right');
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
//       reviewCount: 124
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
//       reviewCount: 89
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
//       reviewCount: 156
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered) {
//         navigate('right');
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isHovered]);

//   const navigate = (dir) => {
//     setDirection(dir);
//     if (dir === 'right') {
//       setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
//     } else {
//       setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
//     }
//   };

//   const goToIndex = (index) => {
//     setDirection(index > currentIndex ? 'right' : 'left');
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
//       <div className="carousel-track" style={{
//         transform: `translateX(-${currentIndex * 100}%)`,
//         transition: `transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1)`
//       }}>
//         {carouselItems.map((item, index) => (
//           <div key={index} className="carousel-slide">
//             <div className="slide-image-container">
//               <Image src={item.image} alt={item.title} className="slide-image" />
//               <div className="image-overlay"></div>
//             </div>
            
//            <div className={`slide-content content-${item.position}`}>
//   <div className={`content-inner ${item.position === 'center' ? 'centered-content' : ''}`}>
//     {item.offerText && (
//       <div className={`offer-badge ${item.position === 'center' ? 'centered-badge' : ''}`}>
//         {item.offerText}
//         <div className="badge-tail"></div>
//       </div>
//     )}
    
//     <div className={`content-group ${item.position === 'center' ? 'centered-group' : ''}`}>
//       {/* <h2 className={`slide-title ${item.position === 'center' ? 'centered-title' : ''}`}>
//         {item.title.split(' ').map((word, i) => (
//           <span key={i} className="title-word">{word}</span>
//         ))}
//       </h2> */}
//       <h2 className={`slide-title ${item.position === 'center' ? 'centered-title' : ''}`}>
//   {item.title.split(' ').map((word, i, arr) => (
//     <React.Fragment key={i}>
//       <span className="title-word">{word}</span>
//       {i < arr.length - 1 && ' '} {/* Add space between words */}
//     </React.Fragment>
//   ))}
// </h2>
//       <p className={`slide-description ${item.position === 'center' ? 'centered-description' : ''}`}>
//         {item.description}
//       </p>
      
//       <div className={`rating-container ${item.position === 'center' ? 'centered-rating' : ''}`}>
//         {renderStars(Math.floor(item.rating))}
//         <span className="rating-text">
//           {item.rating} ({item.reviewCount} reviews)
//         </span>
//       </div>
//     </div>
    
//     {/* <Button variant="light" className={`shop-now-btn ${item.position === 'center' ? 'centered-button' : ''}`}>
//       <FaShoppingBag className="btn-icon" />
//       {item.buttonText}
//       <span className="btn-underline"></span>
//     </Button> */}
//     <Button 
//   variant="light" 
//   className={`shop-now-btn ${item.position === 'center' ? 'centered-button' : ''}`}
//   onClick={() => navigateTo('/products')}
// >
//   <FaShoppingBag className="btn-icon" />
//   {item.buttonText}
//   <span className="btn-underline"></span>
// </Button>

//   </div>
// </div>
//           </div>
//         ))}
//       </div>

//       <button 
//         className="carousel-nav-btn prev-btn"
//         onClick={() => navigate('left')}
//       >
//         <FaChevronLeft />
//       </button>
      
//       <button 
//         className="carousel-nav-btn next-btn"
//         onClick={() => navigate('right')}
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



//---------------done with bulk order---------------//

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
//   const [direction, setDirection] = useState('right');
//   const navigateTo = useNavigate();


//  const carouselItems = [
//   {
//     image: pic1,
//     title: "Premium Quality",
//     description: "Discover our handpicked selection of finest ingredients",
//     buttonText: "Shop Now",
//     buttonLink: "#",
//     offerText: "Limited Time Offer",
//     position: "right",
//     rating: 4.8,
//     reviewCount: 124,
//     bulkOrder: false // Add this flag
//   },
//   {
//     image: pic2,
//     title: "Spice Collection",
//     description: "Perfect blend for curries, snacks & more!",
//     buttonText: "Explore Spices",
//     offerText: "New Arrival",
//     position: "center",
//     bulkOrder: true,
//     bulkContent: {
//       title: "Bulk Orders",
//       offer: "20-30% OFF",
//       cta: "Get Quote",
//       minOrder: "Min. 25kg"
//     }
//   },
//   {
//     image: pic3,
//     title: "Organic Produce",
//     description: "Direct from farm to your kitchen",
//     buttonText: "View Selection",
//     buttonLink: "#",
//     offerText: "Seasonal Special",
//     position: "left",
//     rating: 4.7,
//     reviewCount: 156,
//     bulkOrder: false
//   }
// ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered) {
//         navigate('right');
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isHovered]);

//   const navigate = (dir) => {
//     setDirection(dir);
//     if (dir === 'right') {
//       setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
//     } else {
//       setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
//     }
//   };

//   const goToIndex = (index) => {
//     setDirection(index > currentIndex ? 'right' : 'left');
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
//       <div className="carousel-track" style={{
//         transform: `translateX(-${currentIndex * 100}%)`,
//         transition: `transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1)`
//       }}>
//         {carouselItems.map((item, index) => (
//           <div key={index} className="carousel-slide">
//             <div className="slide-image-container">
//               <Image src={item.image} alt={item.title} className="slide-image" />
//               <div className="image-overlay"></div>
//             </div>
            
//            <div className={`slide-content content-${item.position}`}>
//   <div className={`content-inner ${item.position === 'center' ? 'centered-content' : ''}`}>
//     {item.offerText && (
//       <div className={`offer-badge ${item.position === 'center' ? 'centered-badge' : ''}`}>
//         {item.offerText}
//         <div className="badge-tail"></div>
//       </div>
//     )}
    
//     <div className={`content-group ${item.position === 'center' ? 'centered-group' : ''}`}>
//       <h2 className={`slide-title ${item.position === 'center' ? 'centered-title' : ''}`}>
//         {item.title.split(' ').map((word, i) => (
//           <span key={i} className="title-word">{word}</span>
//         ))}
//       </h2>
      
//       <p className={`slide-description ${item.position === 'center' ? 'centered-description' : ''}`}>
//         {item.description}
//       </p>
      
//       <div className={`rating-container ${item.position === 'center' ? 'centered-rating' : ''}`}>
//         {renderStars(Math.floor(item.rating))}
//         <span className="rating-text">
//           {item.rating} ({item.reviewCount} reviews)
//         </span>
//       </div>
//     </div>
    
//     <div className="button-group">
//       <Button 
//         variant="light" 
//         className={`shop-now-btn ${item.position === 'center' ? 'centered-button' : ''}`}
//         onClick={() => navigateTo('/products')}
//       >
//         <FaShoppingBag className="btn-icon" />
//         {item.buttonText}
//         <span className="btn-underline"></span>
//       </Button>
      
//       {item.bulkOrder && (
//         <Button 
//           variant="outline-light" 
//           className={`bulk-order-btn ${item.position === 'center' ? 'centered-button' : ''}`}
//           onClick={() => navigateTo('/bulk-orders')}
//         >
//           {item.bulkButtonText}
//           <span className="btn-underline"></span>
//         </Button>
//       )}
//     </div>
    
//    {item.bulkOrder && (
//   <div className="bulk-order-widget">
//     <div className="bulk-badge">WHOLESALE</div>
//     <div className="bulk-content">
//       <div className="bulk-offer">
//         <span className="bulk-percent">{item.bulkContent.offer}</span>
//         <span className="bulk-minorder">{item.bulkContent.minOrder}</span>
//       </div>
//       <button 
//         className="bulk-cta"
//         onClick={() => navigateTo('/wholesale')}
//       >
//         {item.bulkContent.cta}
//         <FaChevronRight className="cta-icon" />
//       </button>
//     </div>
//   </div>
// )}
// </div>
// </div>
//           </div>
//         ))}
//       </div>

//       <button 
//         className="carousel-nav-btn prev-btn"
//         onClick={() => navigate('left')}
//       >
//         <FaChevronLeft />
//       </button>
      
//       <button 
//         className="carousel-nav-btn next-btn"
//         onClick={() => navigate('right')}
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

//----------------updated one ----------------//

import React, { useState, useEffect } from 'react';
import { Image, Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaStar } from 'react-icons/fa';
import pic1 from "../../../assets/IMG0271.jpg";
import pic2 from "../../../assets/IMG0299.jpg";
import pic3 from "../../../assets/IMG0125.jpg";
import './Carousel.css';
import { useNavigate } from 'react-router-dom';

const EcommerceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigateTo = useNavigate();

  const carouselItems = [
    {
      image: pic1,
      title: "Premium Quality",
      description: "Discover our handpicked selection of finest ingredients",
      buttonText: "Shop Now",
      buttonLink: "#",
      offerText: "Limited Time Offer",
      position: "right",
      rating: 4.8,
      reviewCount: 124
    },
    {
      image: pic2,
      title: "Spice Collection",
      description: "Perfect blend for curries, snacks & more!",
      buttonText: "Explore Spices",
      buttonLink: "#",
      offerText: "New Arrival",
      position: "center",
      rating: 4.9,
      reviewCount: 89
    },
    {
      image: pic3,
      title: "Organic Produce",
      description: "Direct from farm to your kitchen",
      buttonText: "View Selection",
      buttonLink: "#",
      offerText: "Seasonal Special",
      position: "left",
      rating: 4.7,
      reviewCount: 156
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

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar 
            key={star} 
            className={star <= rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="modern-carousel-container p-0 position-relative mt-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-track">
        {carouselItems.map((item, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${currentIndex === index ? 'active' : ''}`}
          >
            <div className="slide-image-container">
              <Image src={item.image} alt={item.title} className="slide-image" />
              <div className="image-overlay"></div>
            </div>
            
            <div className={`slide-content content-${item.position}`}>
              <div className={`content-inner ${item.position === 'center' ? 'centered-content' : ''}`}>
                {item.offerText && (
                  <div className={`offer-badge ${item.position === 'center' ? 'centered-badge' : ''}`}>
                    {item.offerText}
                    <div className="badge-tail"></div>
                  </div>
                )}
                
                <div className={`content-group ${item.position === 'center' ? 'centered-group' : ''}`}>
                  <h2 className={`slide-title ${item.position === 'center' ? 'centered-title' : ''}`}>
                    {item.title}
                  </h2>
                  
                  <p className={`slide-description ${item.position === 'center' ? 'centered-description' : ''}`}>
                    {item.description}
                  </p>
                  
                  <div className={`rating-container ${item.position === 'center' ? 'centered-rating' : ''}`}>
                    {renderStars(Math.floor(item.rating))}
                    <span className="rating-text">
                      {item.rating} ({item.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="light" 
                  className={`shop-now-btn ${item.position === 'center' ? 'centered-button' : ''}`}
                  onClick={() => navigateTo('/products')}
                >
                  <FaShoppingBag className="btn-icon" />
                  {item.buttonText}
                  <span className="btn-underline"></span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="carousel-nav-btn prev-btn"
        onClick={() => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
      >
        <FaChevronLeft />
      </button>
      
      <button 
        className="carousel-nav-btn next-btn"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselItems.length)}
      >
        <FaChevronRight />
      </button>

      <div className="carousel-pagination">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToIndex(index)}
          >
            <span className="dot-fill"></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EcommerceCarousel;