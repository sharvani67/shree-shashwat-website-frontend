import React from "react";
import styled, { keyframes } from "styled-components";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TestimonialsContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  background: #ffffff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: #2c3e50;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #e74c3c, #e67e22);
    margin: 0.8rem auto 0;
    border-radius: 3px;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-left: 3px solid #e74c3c;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 1.5rem;
  color: rgba(231, 76, 60, 0.1);
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #e67e22);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CustomerDetails = styled.div`
  flex: 1;
`;

const CustomerName = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
`;

const CustomerTitle = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: normal;
  margin-top: 0.2rem;
`;

const TestimonialText = styled.p`
  color: #34495e;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 1rem 0;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: """;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 2rem;
    color: rgba(231, 76, 60, 0.2);
    font-family: serif;
    line-height: 1;
  }
`;

const Rating = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-top: 0.5rem;
`;

const Star = styled(FaStar)`
  color: ${props => props.filled ? '#f1c40f' : '#ecf0f1'};
  font-size: 0.9rem;
`;

const DateText = styled.p`
  color: #95a5a6;
  font-size: 0.8rem;
  margin-top: 1rem;
  text-align: right;
`;

const Testimonials = () => {
  const testimonials = [
    {
      initials: "RM",
      name: "Rohan M.",
      title: "Food Blogger",
      text: "The Kerala Coconut Curry Paste is fantastic. So creamy and aromatic. Makes cooking a breeze.",
      date: "July 28, 2024",
      rating: 5
    },
    {
      initials: "AK",
      name: "Anjali K.",
      title: "Home Chef",
      text: "I'm impressed with these masala pastes. The Tamilian Tamarind Paste is perfectly tangy.",
      date: "July 15, 2024",
      rating: 4
    },
    {
      initials: "PS",
      name: "Priya S.",
      title: "Restaurant Owner",
      text: "Absolutely authentic flavors! The Andhra Chilli Paste is a game-changer for my curries.",
      date: "August 02, 2024",
      rating: 5
    }
  ];

  return (
    <TestimonialsContainer>
      <SectionTitle>Customer Testimonials</SectionTitle>
      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <QuoteIcon />
            <CustomerInfo>
              <Avatar>{testimonial.initials}</Avatar>
              <CustomerDetails>
                <CustomerName>
                  {testimonial.name}
                  <CustomerTitle>{testimonial.title}</CustomerTitle>
                </CustomerName>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} filled={i < testimonial.rating} />
                  ))}
                </Rating>
              </CustomerDetails>
            </CustomerInfo>
            <TestimonialText>{testimonial.text}</TestimonialText>
            <DateText>{testimonial.date}</DateText>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  );
};

export default Testimonials;