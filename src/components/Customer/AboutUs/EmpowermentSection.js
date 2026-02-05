// WomenEmpowermentSection.js
import React from 'react';
import womenEmpowermentImg from '../../../assets/woman.jpg'; // Update with your image path
import './EmpowermentSection.css';

const WomenEmpowermentSection = () => {
  return (
    <section className="empowerment-section">
      <div className="empowerment-container">
        <div className="empowerment-row">
          <div className="empowerment-left">
            <div className="empowerment-img-container">
              <img
                src={womenEmpowermentImg}
                alt="Women working in our spice production facility"
                className="empowerment-img"
              />
              {/* <div className="empowerment-badge">
                <i className="fas fa-female"></i>
                <span>Women-Led</span>
              </div> */}
            </div>
          </div>
          <div className="empowerment-right">
            <div className="empowerment-header">
              <span className="empowerment-tag">Our Commitment</span>
              <h2>Empowering Women Through Culinary Arts</h2>
            </div>

            <p className="empowerment-text">
  We believe women in the workforce bring in diversity of ideas, thoughts and bring balance to life. It often falls on the 
  mother, sister and wife to discern how to best support and nurture relationships within the family . They bring in these 
  skills that add tremendous value to our workplace as well.
</p>

<p className="empowerment-text">
  Recognising this value we have ensured workforce at our factory
  are completely women, recruited from Rural backgrounds. We train them regularly , enrich their experience required for 
  various roles. This has helped them gain financial independence , decision making , opportunities for personal and 
  financial growth.
</p>

<p className="empowerment-text">
  We intend to pursue this endeavour as we grow in size and scale . They bring love and affection 
  to cooking that makes us crave for more and puts smiles on our faces.
</p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenEmpowermentSection;
