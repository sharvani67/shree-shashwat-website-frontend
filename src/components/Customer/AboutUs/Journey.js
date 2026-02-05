// import React, { useState } from "react";
// import "./Journey.css";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// const timelineData = [
//   {
//     date: "2020 – 2021",
//     title: "The Ideation Phase",
//     description:
//       "The concept of INFAB AgroFoods Pvt. Ltd. was born during this period, existing as a powerful idea in the mind of our founder, Karthikeya Shashikumar—a vision to create a company offering 100% natural, zero additives, zero adulteration products.",
//   },
//   {
//     date: "December 2022",
//     title: "Research and Initial Steps",
//     description:
//       "In December 2022, we took the first concrete step toward making this vision a reality. Our founder began to research the food industry and competition extensively, focusing on R&D, industry standards, and compliance requirements to prepare for the company’s formal establishment.",
//   },
//   {
//     date: "May 2023",
//     title: "Official Company Registration",
//     description:
//       "By May 2023, INFAB AgroFoods Pvt. Ltd. was officially registered with all legal compliances in place, establishing a solid foundation and transforming the idea into a structured business entity.",
//   },
//   {
//     date: "September – October 2023",
//     title: "Manufacturing Plant Setup",
//     description:
//       "In September and October 2023, INFAB reached a major milestone with the successful establishment of its first manufacturing plant in Bangalore, fully equipped to deliver 100% natural products.",
//   },
//   {
//     date: "February 2024",
//     title: "Product Launch",
//     description:
//       "By February 2024, INFAB successfully launched its first four products in the market across 25 specialty stores in Bangalore, marking its official entry into the food industry.",
//   },
//   {
//     date: "May 2024",
//     title: "Building the Core Team",
//     description:
//       "By May 2024, INFAB began building a strong core team. Two experienced and intelligent professionals with expertise in marketing and compliance joined the company, playing a key role in strengthening marketing and finance while driving business growth.",
//   },
//   {
//     date: "July 2024",
//     title: "Startup Pitch & Recognition",
//     description:
//       "In July 2024, INFAB earned the prestigious opportunity to pitch for investment at a startup meetup in Bangalore. Competing against numerous startups, INFAB stood out with its unique vision and commitment to purity, becoming the only company to successfully secure funding during the event.",
//   },
//   {
//     date: "November 2024",
//     title: "First Investment Secured",
//     description:
//       "By November 2024, INFAB received its first investment check, marking a significant turning point in the company’s journey towards expansion and market influence.",
//   },
//   {
//     date: "December 2024",
//     title: "Team Expansion and Strengthening",
//     description:
//       "As of December 2024, INFAB AgroFoods Pvt. Ltd. has expanded to a team of five, strengthening key departments including R&D, Operations, Finance, Marketing, and Sales, empowering the company to scale its vision further.",
//   },
// ];

// const Journey = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const cardsToShow = 3; // Number of cards to show at once

//   const nextSlide = () => {
//     setActiveIndex((prev) => 
//       prev >= timelineData.length - cardsToShow ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setActiveIndex((prev) => 
//       prev === 0 ? timelineData.length - cardsToShow : prev - 1
//     );
//   };

//   return (
//     <div className="journey-section">
//       <div className="journey-header">
//         <h2 className="journey-heading">Our <span className="j-highlight">Journey</span></h2>
//         <p className="journey-subheading">Milestones that shaped our story</p>
//       </div>
      
//       <div className="timeline-container">
//         <button onClick={prevSlide} className="nav-button left">
//           <FaChevronLeft />
//         </button>
        
//         <div className="horizontal-timeline">
//           <div 
//             className="timeline-track"
//             style={{ transform: `translateX(-${activeIndex * (100/cardsToShow)}%)` }}
//           >
//             {timelineData.map((item, index) => (
//               <div key={index} className={`timeline-card ${index >= activeIndex && index < activeIndex + cardsToShow ? 'visible' : ''}`}>
//                 <div className="card-date">{item.date}</div>
//                 <h3 className="card-title">{item.title}</h3>
//                 <p className="card-description">{item.description}</p>
//                 <div className="card-highlight"></div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <button onClick={nextSlide} className="nav-button right">
//           <FaChevronRight />
//         </button>
//       </div>
      
//       <div className="timeline-dots">
//         {Array.from({ length: Math.ceil(timelineData.length / cardsToShow) }).map((_, i) => (
//           <button
//             key={i}
//             className={`dot ${i === Math.floor(activeIndex/cardsToShow) ? 'active' : ''}`}
//             onClick={() => setActiveIndex(i * cardsToShow)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Journey;


import React, { useEffect, useRef, useState } from "react";
import "./Journey.css";

const timelineData = [
  {
    date: "2020 – 2021",
    title: "The Ideation Phase",
    description:
      "The concept of INFAB AgroFoods Pvt. Ltd. was born during this period, existing as a powerful idea in the mind of our founder, Karthikeya Shashikumar—a vision to create a company offering 100% natural, zero additives, zero adulteration products.",
  },
  {
    date: "December 2022",
    title: "Research and Initial Steps",
    description:
      "In December 2022, we took the first concrete step toward making this vision a reality. Our founder began to research the food industry and competition extensively, focusing on R&D, industry standards, and compliance requirements to prepare for the company’s formal establishment.",
  },
  {
    date: "May 2023",
    title: "Official Company Registration",
    description:
      "By May 2023, INFAB AgroFoods Pvt. Ltd. was officially registered with all legal compliances in place, establishing a solid foundation and transforming the idea into a structured business entity.",
  },
  {
    date: "September – October 2023",
    title: "Manufacturing Plant Setup",
    description:
      "In September and October 2023, INFAB reached a major milestone with the successful establishment of its first manufacturing plant in Bangalore, fully equipped to deliver 100% natural products.",
  },
  {
    date: "February 2024",
    title: "Product Launch",
    description:
      "By February 2024, INFAB successfully launched its first four products in the market across 25 specialty stores in Bangalore, marking its official entry into the food industry.",
  },
  {
    date: "May 2024",
    title: "Building the Core Team",
    description:
      "By May 2024, INFAB began building a strong core team. Two experienced and intelligent professionals with expertise in marketing and compliance joined the company, playing a key role in strengthening marketing and finance while driving business growth.",
  },
  {
    date: "July 2024",
    title: "Startup Pitch & Recognition",
    description:
      "In July 2024, INFAB earned the prestigious opportunity to pitch for investment at a startup meetup in Bangalore. Competing against numerous startups, INFAB stood out with its unique vision and commitment to purity, becoming the only company to successfully secure funding during the event.",
  },
  {
    date: "November 2024",
    title: "First Investment Secured",
    description:
      "By November 2024, INFAB received its first investment check, marking a significant turning point in the company’s journey towards expansion and market influence.",
  },
  {
    date: "December 2024",
    title: "Team Expansion and Strengthening",
    description:
      "As of December 2024, INFAB AgroFoods Pvt. Ltd. has expanded to a team of five, strengthening key departments including R&D, Operations, Finance, Marketing, and Sales, empowering the company to scale its vision further.",
  },
];

const Journey = () => {
  const containerRef = useRef(null);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".timeline-item");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const index = Number(target.getAttribute("data-index"));
        if (isIntersecting) {
          setVisibleIndexes((prev) => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="journey-section">
      <div className="journey-header">
        <h2 className="journey-heading">
          Our <span className="j-highlight">Journey</span>
        </h2>
        <p className="journey-subheading">Milestones that shaped our story</p>
      </div>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-line" aria-hidden="true"></div>
        {timelineData.map((item, index) => (
          <div
            key={index}
            data-index={index}
            className={`timeline-item ${
              visibleIndexes.includes(index) ? "visible" : ""
            }`}
            tabIndex={0}
            aria-label={`${item.date}: ${item.title}. ${item.description}`}
          >
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-content">
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;

