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
          <h4 className="mv-tagline">Preserving Culinary Heritage</h4>
          <p className="mv-text">
            We craft and share high-quality, authentic South Indian foods that honor age-old traditions while meeting modern needs. From bold spices to nostalgic snacks, each bite is a celebration of culture and care.
          </p>
        </div>

        <div className="mv-card vision" data-aos="fade-up" data-aos-delay="200">
          <div className="mv-icon">
            <FaGlobeAsia />
          </div>
          <h2 className="mv-title">Our Vision</h2>
          <h4 className="mv-tagline">Bringing South Indian Flavors to the World</h4>
          <p className="mv-text">
            As global ambassadors of South Indian culinary heritage, we strive to delight every plate with innovation, authenticity, and joy — building a bridge between rich tradition and modern palates across the world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
