import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight, FaPlayCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AnimatedBanner.css';

const AnimatedBanner = () => {
  const [animated, setAnimated] = useState(false);
  const phrases = ["Organic", "Premium", "Handpicked", "Sustainable"];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimated(true);
    
    // Text rotation effect
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="animated-banner">
      <Container>
        <Row className="align-items-center">
          <Col lg={7} className="banner-content"> 
            <div className={`content-wrapper ${animated ? 'animated' : ''}`}>
              <span className="subtitle">Welcome to Nature's Best</span>
              <h1 className="banner-title">
                Discover <span className="rotating-text">{phrases[currentPhrase]}</span> Products
              </h1>
              <p className="banner-text">
                Experience the finest selection of organic goods sourced directly from sustainable farms 
                around the world. Our commitment to quality ensures you get nothing but the best.
              </p>
              <div className="button-group">
                <Link to="/products">
                <Button variant="primary" className="cta-button">
                  Shop Now <FaArrowRight className="ms-2" />
                </Button>
                </Link>
                {/* <Button variant="outline-light" className="video-button">
                  <FaPlayCircle className="me-2" /> Watch Our Story
                </Button> */}
              </div>
            </div>
          </Col>
          <Col lg={5} className="banner-image-col">
            <div className="image-wrapper">
              <div className="main-image"></div>
              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AnimatedBanner;