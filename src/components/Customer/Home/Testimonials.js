import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import FloatingSpice from './FloatingSpice';
import Image from '../../../assets/image6.png';
import Image1 from '../../../assets/image7.png';
import Image2 from '../../../assets/chennai.jpeg';
import Image3 from '../../../assets/blogger.jpeg';
import Image4 from '../../../assets/Vinutha.jpeg';
import Image5 from '../../../assets/isha.jpeg';
import Image6 from '../../../assets/gayatri.jpeg';

const testimonials = [
  // {
  //   id: 1,
  //   name: "Vinutha Deepak Kumar ",
  //   title: "Event Planner ",
  //   message: "I recently tried South Sutra’s ready-to-use puliyogare masala, and I must say I’m really impressed! The taste is so authentic — it reminds me of the traditional puliyogare we enjoy at home and at temple. I also appreciate that it has no preservatives, which makes it healthier. It’s super convenient and perfect for busy days. Looking forward to trying more products from South Sutra!",
  //   avatar: Image4,
  // },
  // {
  //   id: 2,
  //   name: "Gayathri Gurumurthy ",
  //   title: "Zenaray compliance  advisor",
  //   message: "South Sutra Pre Mix has become a staple in our home. It’s super easy to whip up and tastes just like something made from scratch—fresh, flavorful, and not overly salty, which we really appreciate. The whole family loves it, and it's a real lifesaver on busy days when we want something quick but still delicious. It’s comforting to know we can rely on it for a homemade taste without all the effort. Definitely something we’ll keep coming back to!",
  //   avatar: Image6,
  // },
  {
    id: 3,
    name: "Sowmya",
    title: "Food Blogger, Bengaluru",
    message: "Their masala blends are true game-changers. Consistent quality, outstanding freshness, and great customer demand. A highly recommended brand for retailers.",
    avatar: Image3,
  },
  {
    id: 4,
    name: "Anirudh Rao",
    title: "Chef, Chennai",
    message: "From a retailer’s perspective, SHREE SHASHWATRAJ stands out for its authentic taste and pure ingredients. It’s a brand customers trust and return to.",
    avatar: Image2,
  },
  {
    id: 5,
    name: "Aisha",
    title: "Working Mom, Hyderabad",
    message: "Customers trust SHREE SHASHWATRAJ for their family meals. The rich flavors and women-led values make it a feel-good, fast-moving product for retailers.",
    avatar: Image5,
  },
  {
    id: 6,
    name: "Kaveri",
    title: "IT Consultant, Warangal",
    message: "Retailer-approved for fast delivery, quality packaging, and exceptional taste—SHREE SHASHWAT RAJ is a trusted spice brand.",
    avatar: "https://i.pinimg.com/1200x/a5/2c/44/a52c4459940205d17c98ab5c254689f5.jpg",
  }
];

// const TestimonialsSlider = () => {
//   const [startIndex, setStartIndex] = useState(0);
//   const [cardsToShow, setCardsToShow] = useState(3);

//   useEffect(() => {
//     const updateCardsToShow = () => {
//       const width = window.innerWidth;
//       if (width < 768) setCardsToShow(1);
//       else if (width >= 768 && width <= 1024) setCardsToShow(2);
//       else setCardsToShow(3);
//     };

//     updateCardsToShow();
//     window.addEventListener('resize', updateCardsToShow);
//     return () => window.removeEventListener('resize', updateCardsToShow);
//   }, []);

//   const visibleTestimonials = testimonials.slice(startIndex, startIndex + cardsToShow);

//   const handleNext = () => {
//     const nextIndex = startIndex + 1;
//     if (nextIndex + cardsToShow <= testimonials.length) {
//       setStartIndex(nextIndex);
//     } else {
//       setStartIndex(0);
//     }
//   };

//   const handlePrev = () => {
//     const prevIndex = startIndex - 1;
//     if (prevIndex >= 0) {
//       setStartIndex(prevIndex);
//     } else {
//       setStartIndex(testimonials.length - cardsToShow);
//     }
//   };

//   return (
//     <div className="testimonial-slider-container">
//       <FloatingSpice image={Image} />
//       <FloatingSpice image={Image1} />
//       <h2 className="testimonial-title">What Our Customers Say</h2>

//       <div className="testimonial-scroll-wrapper fixed-mode">
//         {visibleTestimonials.map(({ id, name, title, message, avatar }) => (
//           <div key={id} className="testimonial-card">
//             <img src={avatar} alt={name} className="testimonial-avatar" />
//             <p className="testimonial-message">"{message}"</p>
//             <h4 className="testimonial-name">{name}</h4>
//             <p className="testimonial-role">{title}</p>
//           </div>
//         ))}
//       </div>

//       <div className="testimonial-buttons">
//         <button onClick={handlePrev}>&larr; Prev</button>
//         <button onClick={handleNext}>Next &rarr;</button>
//       </div>
//     </div>
//   );
// };

const TestimonialsSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [expandedCard, setExpandedCard] = useState(null); // new state

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 768) setCardsToShow(1);
      else if (width >= 768 && width <= 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + cardsToShow);

  const handleNext = () => {
    const nextIndex = startIndex + 1;
    if (nextIndex + cardsToShow <= testimonials.length) {
      setStartIndex(nextIndex);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    const prevIndex = startIndex - 1;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    } else {
      setStartIndex(testimonials.length - cardsToShow);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };

  return (
    <div className="testimonial-slider-container">
      <FloatingSpice image={Image} />
      <FloatingSpice image={Image1} />
      <h2 className="testimonial-title">What Our Customers Say</h2>

      <div className="testimonial-scroll-wrapper fixed-mode">
        {visibleTestimonials.map(({ id, name, title, message, avatar }) => {
          const isExpanded = expandedCard === id;
          return (
            <div key={id} className="testimonial-card">
              <img src={avatar} alt={name} className="testimonial-avatar" />
              <p className={`testimonial-message ${isExpanded ? 'expanded' : 'clamped'}`}>
                "{message}"
              </p>
              {message.split(" ").length > 30 && (
                <span className="read-more" onClick={() => toggleExpand(id)}>
                  {isExpanded ? 'Read less' : 'Read more'}
                </span>
              )}
              <h4 className="testimonial-name">{name}</h4>
              <p className="testimonial-role">{title}</p>
            </div>
          );
        })}
      </div>

      <div className="testimonial-buttons">
        <button onClick={handlePrev}>&larr; Prev</button>
        <button onClick={handleNext}>Next &rarr;</button>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
