import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import './AboutUs.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import WhatApp from '../../Customer/WhatsApp/WhatApp';
import { motion } from "framer-motion";
import LeafSVG from '../../../assets/leaf.svg';
import Product1 from '../../../assets/IMG0261.jpg';
import Product2 from '../../../assets/IMG0271.jpg';
import Product3 from '../../../assets/Vangibath.png';
import Product4 from '../../../assets/IMG0292.jpg';
import MissionSection from './MissionSection';
import CoreValuesSection from './CoreValuesSection';
import VisionSection from './VisionSection';
import AboutSouthSutra from './AboutSouthSutra';
import WomenEmpowermentSection from './EmpowermentSection';
import MeetTheTeam from './MeetTheTeam';
import Founder from './Founder';
import Journey from './Journey';
import MissionVission from './MissionVission';
import Team from './Team';

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [Product1, Product2, Product3, Product4];

  useEffect(() => {
    AOS.init({ duration: 1000 });
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <>
      <Header />
      <WhatApp />
      {/* <AboutSouthSutra /> */}
      {/* <WomenEmpowermentSection /> */}

      {/* Our Story Section */}
      {/* <section className="story-section position-relative">
        <img src={LeafSVG} alt="Decorative Leaf" className="svg-decor top-left" />

        <div className="container">
          <div className="row align-items-center">
            
            <motion.div
              className="col-lg-6 mb-5 mb-lg-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <div className="image-slider-wrapper" style={{ height: "400px", position: "relative", overflow: "hidden" }}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`SouthSutra Product ${index + 1}`}
                    className={`img-fluid rounded shadow ${index === activeIndex ? 'active' : ''}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: index === activeIndex ? 1 : 0,
                      transition: 'opacity 1s ease-in-out',
                    }}
                  />
                ))}
                <div className="slider-dots" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                  {images.map((_, dot) => (
                    <button
                      key={dot}
                      onClick={() => setActiveIndex(dot)}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: dot === activeIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                      aria-label={`Go to slide ${dot + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            
            <motion.div
              className="col-lg-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0.3}
            >
              <div className="section-header">
                <span className="section-tag">Our Belief</span>
                <h2 className="section-title">Rooted in Tradition, Inspired by Innovation</h2>
              </div>

              <div className="section-content">
                <p>
                  At <b>SouthSutra</b>, we believe that food is more than just sustenance; it
                  is the moment of the journey that you need to cherish and enjoy
                  every bite, that leaves a craving for more, a story, and a celebration
                  of culture. Rooted in the rich culinary traditions of South India,
                  SouthSutra is an ode to the vibrant flavors, timeless recipes, and
                  the heartfelt joy of sharing meals.
                </p>
              </div>

              <div className="promo-banner mt-4 p-3 bg-light rounded">
                <p className="mb-3">Discover the authentic flavors of South India — handcrafted just for you.</p>
                <Link to="/products" className="btn btn-success">
                  Buy Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* <VisionSection />
      <MissionSection /> */}
      <MissionVission/>
      {/* <MeetTheTeam /> */}
      {/* <Team/>
      <Founder/>
      <Journey/> */}
      <CoreValuesSection />
      
      {/* Footer */}
      <section className="cta-section text-center">
        <div className="container">
          <h2>Ready to Experience Authentic South Indian Flavors?</h2>
          <p>Join our community of food lovers and bring tradition to your table.</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;