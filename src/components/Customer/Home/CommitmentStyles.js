import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(39, 174, 96, 0); }
  100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0); }
`;

// export const QualityContainer = styled.section`
//   background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
//               url(${props => props.bgImage}) center/cover no-repeat fixed;
//   padding: 6rem 1rem;
//   position: relative;
//   z-index: 1;
//   overflow: hidden;
// `;
export const QualityContainer = styled.section`
  background: linear-gradient(rgba(65, 65, 65, 0.7), rgba(57, 56, 56, 0.7)),
              url(${props => props.bgImage}) center/cover no-repeat fixed;
  padding: 6rem 1rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

export const FloatingSpice = styled.div`
  position: absolute;
  background: url("https://www.transparentpng.com/thumb/spices/spices-png-clipart-5.png") center/contain no-repeat;
  width: 80px;
  height: 80px;
  opacity: 0.5;
  animation: ${float} 6s ease-in-out infinite;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
  }

  &:nth-child(2) {
    top: 20%;
    right: 8%;
    width: 70px;
    height: 70px;
    animation-delay: 1s;
  }

  &:nth-child(3) {
    bottom: 15%;
    left: 10%;
    width: 90px;
    height: 90px;
    animation-delay: 2s;
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: white;
  margin-bottom: 4rem;
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

export const QualityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const QualityCard = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  height: 330px;
  text-align: center;
  border-top: 5px solid ${props => props.color};
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  transition: all 0.35s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    background: ${props => props.color};
    color: #fff;

    h3, p {
      color: #fff;
    }

    div:first-child {
      animation: ${pulse} 1.5s infinite;
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    div:last-child {
      color: gold;
    }
  }
`;

export const QualityIcon = styled.div`
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: ${props => props.color};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
`;

export const QualityTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #2c3e50;
`;

export const QualityDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
`;

export const RatingStars = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #f1c40f;
  font-size: 1rem;
`;
