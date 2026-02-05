import React from "react";
import styled from "styled-components";
import { FaLeaf, FaHistory, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

const QualityContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
  background: linear-gradient(to bottom, #f9f9f9 0%, #ffffff 100%);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
  
  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #e67e22);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

const QualityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const QualityCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  border-top: 4px solid ${props => props.color};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const QualityIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.color};
  margin-bottom: 1.5rem;
`;

const QualityTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const QualityDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1rem;
`;

const Commitment = () => {
  const qualityItems = [
    {
      icon: <FaLeaf />,
      title: "100% Fresh Ingredients",
      description: "Only the best, locally sourced spices and natural components.",
      color: "#27ae60"
    },
    {
      icon: <FaHistory />,
      title: "Authentic Recipes",
      description: "Traditional South Indian formulations passed down through generations.",
      color: "#e67e22"
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality Assured",
      description: "Rigorous quality checks to ensure premium taste and safety.",
      color: "#3498db"
    },
    {
      icon: <FaShieldAlt />,
      title: "Hygienically Packed",
      description: "Carefully packed to preserve freshness and ensure product safety.",
      color: "#9b59b6"
    }
  ];

  return (
    <QualityContainer>
      <SectionTitle>Our Commitment to Quality</SectionTitle>
      <QualityGrid>
        {qualityItems.map((item, index) => (
          <QualityCard key={index} color={item.color}>
            <QualityIcon color={item.color}>{item.icon}</QualityIcon>
            <QualityTitle>{item.title}</QualityTitle>
            <QualityDescription>{item.description}</QualityDescription>
          </QualityCard>
        ))}
      </QualityGrid>
    </QualityContainer>
  );
};

export default Commitment;