// import React from "react";
// import {
//   QualityContainer,
//   QualityGrid,
//   QualityCard,
//   QualityIcon,
//   QualityTitle,
//   QualityDescription,
//   RatingStars,
//   SectionTitle,
// } from "./QualityStyles";

// import card1 from "../../../assets/IMG0144.jpg";
// import card2 from "../../../assets/IMG0144.jpg";
// import card3 from "../../../assets/IMG0144.jpg";

// const qualities = [
//   {
//     icon: card1,
//     title: "Organic Ingredients",
//     description: "We use only the highest quality organic spices.",
//     color: "#27ae60",
//   },
//   {
//     icon: card2,
//     title: "Handpicked Selection",
//     description: "Our spices are handpicked from the best farms.",
//     color: "#e67e22",
//   },
//   {
//     icon: card3,
//     title: "Eco-Friendly Packaging",
//     description: "Packed with sustainability in mind.",
//     color: "#2980b9",
//   },
// ];

// const QualitySection = () => {
//   return (
//     <QualityContainer>
//       <SectionTitle>Our Quality Standards</SectionTitle>
//       <QualityGrid>
//         {qualities.map((item, index) => (
//           <QualityCard key={index} color={item.color}>
//             <QualityIcon color={item.color}>
//               <img
//                 src={item.icon}
//                 alt={item.title}
//                 style={{ width: "40px", height: "40px" }}
//               />
//             </QualityIcon>
//             <QualityTitle>{item.title}</QualityTitle>
//             <QualityDescription>{item.description}</QualityDescription>
//             <RatingStars>★★★★★</RatingStars>
//           </QualityCard>
//         ))}
//       </QualityGrid>
//     </QualityContainer>
//   );
// };

// export default QualitySection;

import React from "react";
import {
  QualityContainer,
  QualityGrid,
  QualityCard,
  QualityIcon,
  QualityTitle,
  QualityDescription,
  RatingStars,
  SectionTitle,
} from "./QualityStyles";

import card1 from "../../../assets/IMG0144.jpg";
import card2 from "../../../assets/IMG0144.jpg";
import card3 from "../../../assets/IMG0144.jpg";
import bgImage from "../../../assets/IMG0261.jpg"; // ✅ Import your background image

const qualities = [
  {
    icon: card1,
    title: "Organic Ingredients",
    description: "We use only the highest quality organic spices.",
    color: "#27ae60",
  },
  {
    icon: card2,
    title: "Handpicked Selection",
    description: "Our spices are handpicked from the best farms.",
    color: "#e67e22",
  },
  {
    icon: card3,
    title: "Eco-Friendly Packaging",
    description: "Packed with sustainability in mind.",
    color: "#2980b9",
  },
];

const QualitySection = () => {
  return (
    <QualityContainer bgImage={bgImage}> {/* ✅ Pass bgImage as prop */}
      <SectionTitle>Our Quality Standards</SectionTitle>
      <QualityGrid>
        {qualities.map((item, index) => (
          <QualityCard key={index} color={item.color}>
            <QualityIcon color={item.color}>
              <img
                src={item.icon}
                alt={item.title}
                style={{ width: "40px", height: "40px" }}
              />
            </QualityIcon>
            <QualityTitle>{item.title}</QualityTitle>
            <QualityDescription>{item.description}</QualityDescription>
            <RatingStars>★★★★★</RatingStars>
          </QualityCard>
        ))}
      </QualityGrid>
    </QualityContainer>
  );
};

export default QualitySection;
