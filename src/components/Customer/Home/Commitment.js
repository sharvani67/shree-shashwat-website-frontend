// import React from "react";
// import styled, { keyframes } from "styled-components";
// import { FaLeaf, FaHistory, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

// // Animations
// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-15px); }
//   100% { transform: translateY(0px); }
// `;

// const pulse = keyframes`
//   0% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); }
//   70% { box-shadow: 0 0 0 15px rgba(39, 174, 96, 0); }
//   100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0); }
// `;

// const QualityContainer = styled.section`
//   background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
//               url("https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80") center/cover no-repeat fixed;
//   position: relative;
//   padding: 8rem 1rem;
//   z-index: 1;
//   overflow: hidden;
// `;

// const FloatingSpice = styled.div`
//   position: absolute;
//   background: url("https://www.transparentpng.com/thumb/spices/spices-png-clipart-5.png") center/contain no-repeat;
//   width: 100px;
//   height: 100px;
//   opacity: 0.6;
//   animation: ${float} 6s ease-in-out infinite;
  
//   &:nth-child(1) {
//     top: 10%;
//     left: 5%;
//     animation-delay: 0s;
//   }
  
//   &:nth-child(2) {
//     top: 20%;
//     right: 8%;
//     animation-delay: 1s;
//     width: 80px;
//     height: 80px;
//   }
  
//   &:nth-child(3) {
//     bottom: 15%;
//     left: 10%;
//     animation-delay: 2s;
//     width: 120px;
//     height: 120px;
//   }
// `;

// const SectionTitle = styled.h2`
//   text-align: center;
//   font-size: 3.5rem;
//   color: white;
//   margin-bottom: 5rem;
//   position: relative;
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
//   font-weight: 700;
  
//   &::after {
//     content: "";
//     display: block;
//     width: 150px;
//     height: 4px;
//     margin: 1.5rem auto 0;
//     border-radius: 2px;
//     background: linear-gradient(90deg, #f39c12, #e74c3c);
//     box-shadow: 0 2px 10px rgba(243, 156, 18, 0.5);
//   }
// `;

// const QualityGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 3rem;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 2rem;
// `;

// // Define QualityIcon, QualityTitle, and QualityDescription first
// const QualityIcon = styled.div`
//   font-size: 3.5rem;
//   margin-bottom: 2rem;
//   color: ${props => props.color};
//   transition: all 0.3s ease;
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   background: rgba(255, 255, 255, 0.2);
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// `;

// const QualityTitle = styled.h3`
//   font-size: 1.8rem;
//   color: #2c3e50;
//   margin-bottom: 1.5rem;
//   font-weight: 600;
//   transition: color 0.3s ease;
// `;

// const QualityDescription = styled.p`
//   font-size: 1.1rem;
//   color: #7f8c8d;
//   line-height: 1.7;
//   transition: color 0.3s ease;
// `;

// // Now define QualityCard that uses them
// const QualityCard = styled.div`
//   background: rgba(255, 255, 255, 0.95);
//   border-radius: 20px;
//   padding: 2.5rem 2rem;
//   text-align: center;
//   box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
//   border-top: 5px solid ${props => props.color};
//   transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//   position: relative;
//   overflow: hidden;
//   z-index: 1;
  
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: ${props => props.color};
//     opacity: 0;
//     transition: opacity 0.3s ease;
//     z-index: -1;
//   }
  
//   &:hover {
//     transform: translateY(-15px) scale(1.03);
//     box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
//     color: white;
    
//     &::before {
//       opacity: 0.1;
//     }
    
//     ${QualityTitle}, ${QualityDescription} {
//       color: white;
//     }
    
//     ${QualityIcon} {
//       animation: ${pulse} 1.5s infinite;
//       color: white;
//     }
//   }
// `;

// const Commitment = () => {
//   const qualityItems = [
//     {
//       icon: <FaLeaf />,
//       title: "100% Fresh Ingredients",
//       description: "Only the best, locally sourced spices and natural components for authentic flavor.",
//       color: "#27ae60"
//     },
//     {
//       icon: <FaHistory />,
//       title: "Authentic Recipes",
//       description: "Traditional South Indian formulations passed down through generations of master chefs.",
//       color: "#e67e22"
//     },
//     {
//       icon: <FaCheckCircle />,
//       title: "Quality Assured",
//       description: "Rigorous quality checks at every stage to ensure premium taste and safety standards.",
//       color: "#3498db"
//     },
//     {
//       icon: <FaShieldAlt />,
//       title: "Hygienically Packed",
//       description: "Carefully packed in state-of-the-art facilities to preserve freshness and purity.",
//       color: "#9b59b6"
//     }
//   ];

//   return (
//     <QualityContainer>
//       <FloatingSpice />
//       <FloatingSpice />
//       <FloatingSpice />
      
//       <SectionTitle>Our Commitment to Excellence</SectionTitle>
//       <QualityGrid>
//         {qualityItems.map((item, index) => (
//           <QualityCard
//             key={index}
//             color={item.color}
//             data-aos="fade-up"
//             data-aos-delay={index * 150}
//           >
//             <QualityIcon color={item.color}>{item.icon}</QualityIcon>
//             <QualityTitle>{item.title}</QualityTitle>
//             <QualityDescription>{item.description}</QualityDescription>
//           </QualityCard>
//         ))}
//       </QualityGrid>
//     </QualityContainer>
//   );
// };

// export default Commitment;

// import React from "react";
// import { FaLeaf, FaHistory, FaCheckCircle, FaShieldAlt, FaStar, FaSeedling, FaHandsHelping } from "react-icons/fa";
// import {
//   QualityContainer,
//   FloatingSpice,
//   SectionTitle,
//   QualityGrid,
//   QualityCard,
//   QualityIcon,
//   QualityTitle,
//   QualityDescription,
//   RatingStars
// } from "./CommitmentStyles";

// import bgImage from "../../../assets/IMG0261.jpg";

// const Commitment = () => {
//   const qualityItems = [
//     {
//       icon: <FaLeaf />,
//       title: "100% Fresh Ingredients",
//       description: "Only the best, locally sourced spices and natural components for authentic flavor.",
//       color: "#27ae60"
//     },
//     {
//       icon: <FaHistory />,
//       title: "Authentic Recipes",
//       description: "Traditional South Indian formulations passed down through generations of master chefs.",
//       color: "#e67e22"
//     },
//     {
//       icon: <FaCheckCircle />,
//       title: "Quality Assured",
//       description: "Rigorous quality checks at every stage to ensure premium taste and safety standards.",
//       color: "#3498db"
//     },
//     {
//       icon: <FaShieldAlt />,
//       title: "Hygienically Packed",
//       description: "Carefully packed in state-of-the-art facilities to preserve freshness and purity.",
//       color: "#9b59b6"
//     },
//     {
//       icon: <FaSeedling />,
//       title: "Sustainably Sourced",
//       description: "Eco-conscious farming and sourcing methods support both farmers and the planet.",
//       color: "#1abc9c"
//     },
//     {
//       icon: <FaHandsHelping />,
//       title: "Trusted by Families",
//       description: "Loved by thousands of homes for their daily cooking needs.",
//       color: "#f39c12"
//     }
//   ];

//   return (
//      <QualityContainer bgImage={bgImage}>
//       <FloatingSpice />
//       <FloatingSpice />
//       <FloatingSpice />

//       <SectionTitle>Our Commitment to Excellence</SectionTitle>
//       <QualityGrid>
//         {qualityItems.map((item, index) => (
//           <QualityCard key={index} color={item.color} data-aos="fade-up" data-aos-delay={index * 100}>
//             <QualityIcon color={item.color}>{item.icon}</QualityIcon>
//             <QualityTitle>{item.title}</QualityTitle>
//             <QualityDescription>{item.description}</QualityDescription>
//             <RatingStars>
//               {[...Array(5)].map((_, i) => (
//                 <FaStar key={i} />
//               ))}
//             </RatingStars>
//           </QualityCard>
//         ))}
//       </QualityGrid>
//     </QualityContainer>
//   );
// };

// export default Commitment;

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaLeaf,
  FaHistory,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaSeedling,
  FaLightbulb,
  FaHourglassHalf,
  FaHandsHelping, FaBan , FaUtensils
} from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import bgImage from "../../../assets/IMG0261.jpg";

// Animations
// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-15px); }
//   100% { transform: translateY(0px); }
// `;

// const pulse = keyframes`
//   0% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); }
//   70% { box-shadow: 0 0 0 15px rgba(39, 174, 96, 0); }
//   100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0); }
// `;




// const FloatingSpice = styled.div`
//   position: absolute;
//   background: url("https://www.transparentpng.com/thumb/spices/spices-png-clipart-5.png")
//     center/contain no-repeat;
//   width: 80px;
//   height: 80px;
//   opacity: 0.5;
//   animation: ${float} 6s ease-in-out infinite;

//   &:nth-child(1) {
//     top: 10%;
//     left: 5%;
//   }
//   &:nth-child(2) {
//     top: 20%;
//     right: 8%;
//     width: 70px;
//     height: 70px;
//     animation-delay: 1s;
//   }
//   &:nth-child(3) {
//     bottom: 15%;
//     left: 10%;
//     width: 90px;
//     height: 90px;
//     animation-delay: 2s;
//   }
// `;


// Removed float and pulse keyframes completely

const QualityContainer = styled.section`
  background: linear-gradient(rgba(65, 65, 65, 0.7), rgba(57, 56, 56, 0.7)),
    url(${bgImage}) center/cover no-repeat fixed;
  padding: 3.5rem 1rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const FloatingSpice = styled.div`
  display: none; // Removed floating images as animation is not needed
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;

  &::after {
    content: "";
    display: block;
    width: 120px;
    height: 3px;
    margin: 1rem auto 0;
    background: linear-gradient(90deg, #f39c12, #e74c3c);
    box-shadow: 0 2px 8px rgba(243, 156, 18, 0.5);
  }
`;

const QualityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const QualityCard = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border-radius: 12px;
  padding: 1rem 0.8rem;
  height: 235px;
  text-align: center;
  border-top: 3px solid ${props => props.color};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const QualityIcon = styled.div`
  font-size: 2.4rem;
  margin-bottom: 0.8rem;
  color: ${props => props.color};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
`;

const QualityTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color:rgb(65, 17, 17);
`;

const QualityDescription = styled.p`
  font-size: 1rem;
  color: rgb(48, 54, 54);
  line-height: 1.6;
`;




const Commitment = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  // const qualityItems = [
  //   {
  //     icon: <FaLeaf />,
  //     title: "100% Fresh Ingredients",
  //     description: "Only the best, locally sourced spices and natural components for authentic flavor.",
  //     color: "#27ae60"
  //   },
  //   {
  //     icon: <FaHistory />,
  //     title: "Authentic Recipes",
  //     description: "Traditional South Indian formulations passed down through generations of master chefs.",
  //     color: "#e67e22"
  //   },
  //   {
  //     icon: <FaCheckCircle />,
  //     title: "Quality Assured",
  //     description: "Rigorous quality checks at every stage to ensure premium taste and safety standards.",
  //     color: "#3498db"
  //   },
  //   {
  //     icon: <FaShieldAlt />,
  //     title: "Hygienically Packed",
  //     description: "Carefully packed in state-of-the-art facilities to preserve freshness and purity.",
  //     color: "#9b59b6"
  //   },
  //   {
  //     icon: <FaSeedling />,
  //     title: "Sustainably Sourced",
  //     description: "Eco-conscious farming and sourcing methods support both farmers and the planet.",
  //     color: "#1abc9c"
  //   },
  //   {
  //     icon: <FaHandsHelping />,
  //     title: "Trusted by Families",
  //     description: "Loved by thousands of homes for their daily cooking needs.",
  //     color: "#f39c12"
  //   }
  // ];


    const qualityItems = [
    {
      icon: <FaLeaf />,
      title: "100% Natural Products",
      description: "We ensure that every product is free from artificial, additives, preservatives, palm oil, and added colors or flavors.",
      color: "#27ae60"
    },
    {
      icon: <FaBan  />,
      title: "Zero Additive & Zero Adulteration",
      description: "Our products are crafted with uncompromising purity, bringing you the true taste of South India.",
      color: "#e67e22"
    },
    {
      icon: <FaLightbulb  />,
      title: "Innovative Paste Format",
      description: "We are pioneers in introducing paste-based South Indian products for unmatched convenience and authenticity.",
      color: "#3498db"
    },
    {
      icon: <FaSeedling  />,
      title: "Freshly Procured Ingredients",
      description: "We source fresh vegetables and minimally process them to preserve their natural flavors and nutrients.",
      color: "#9b59b6"
    },
    {
      icon: <FaHourglassHalf  />,
      title: "Long Shelf Life",
      description: "Eco-conscious farming and sourcing methods support both farmers and the planet.",
      color: "#1abc9c"
    },
    {
      icon: <FaUtensils  />,
      title: "Ease of Use & Convenience",
      description: "With no heating or cooking required, SouthSutra pastes are ready to use—just mix them with hot rice, and your dish is ready in seconds.",
      color: "#f39c12"
    }
  ];

  return (
    <QualityContainer>
      {/* <FloatingSpice />
      <FloatingSpice />
      <FloatingSpice /> */}

      {/* <SectionTitle>Our Commitment to Excellence</SectionTitle> */}
      <SectionTitle>Our Unique Selling Points</SectionTitle>
      <QualityGrid>
        {qualityItems.map((item, index) => (
          <QualityCard
            key={index}
            color={item.color}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <QualityIcon color={item.color}>{item.icon}</QualityIcon>
            <QualityTitle>{item.title}</QualityTitle>
            <QualityDescription>{item.description}</QualityDescription>
            {/* <RatingStars>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </RatingStars> */}
          </QualityCard>
        ))}
      </QualityGrid>
    </QualityContainer>
  );
};

export default Commitment;
