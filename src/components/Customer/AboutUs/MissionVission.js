import React from "react";
import "./MissionVission.css";
import { FaLeaf, FaGlobeAsia } from "react-icons/fa";

const MissionVision = () => {
  return (
    <section className="mv-section mt-5">
      <div className="mv-container">
        <div className="mv-card mission" data-aos="fade-up">
          <div className="mv-icon">
            <FaLeaf />
          </div>
          <h2 className="mv-title">Our Mission</h2>
          <h4 className="mv-tagline">Supplying Quality Groceries with Trust</h4>
          <p className="mv-text">
           We aim to provide reliable, high-quality grocery products to retailers and customers at competitive prices. Our focus is on consistent supply, product freshness, and building long-term partnerships that help businesses grow smoothly.
          </p>
        </div>

        <div className="mv-card vision" data-aos="fade-up" data-aos-delay="200">
          <div className="mv-icon">
            <FaGlobeAsia />
          </div>
          <h2 className="mv-title">Our Vision</h2>
          <h4 className="mv-tagline">Empowering Retailers, Serving Every Household</h4>
          <p className="mv-text">
            Our vision is to become a trusted grocery distribution partner by connecting manufacturers, retailers, and customers through efficient service, dependable delivery, and a wide range of everyday essential products.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
