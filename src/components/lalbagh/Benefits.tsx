import React from 'react';
import { Shield, Sparkles, Leaf, Heart, Clock, Award } from 'lucide-react';
import './Benefits.css'; // Import the CSS file

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefits: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      icon: <Sparkles className="benefit-icon" />,
      title: "Authentic Taste",
      description: "Experience the true flavors of South Indian cuisine with our traditional recipes"
    },
    {
      icon: <Leaf className="benefit-icon" />,
      title: "Pure Ingredients",
      description: "Made with fresh, natural ingredients and traditional spices for authentic flavor"
    },
    {
      icon: <Heart className="benefit-icon" />,
      title: "Made with Love",
      description: "Each product is prepared with the same devotion and care, just like your own kitchen"
    },
    {
      icon: <Clock className="benefit-icon" />,
      title: "Quick & Easy",
      description: "Ready-to-use gojjus that make authentic South Indian meals in minutes"
    },
    {
      icon: <Shield className="benefit-icon" />,
      title: "Quality Assured",
      description: "Hygienic preparation and packaging ensuring freshness and quality"
    },
    {
      icon: <Award className="benefit-icon" />,
      title: "Heritage Recipe",
      description: "Traditional family recipes passed down through generations with authentic methods"
    }
  ];

  return (
    <section id="benefits" className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">
            Why Choose South Sutra?
          </h2>
          <p className="benefits-subtitle">
            Experience the perfect harmony of tradition and taste with our authentic South Indian food products, 
            crafted for families who value heritage recipes and genuine flavors.
          </p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-content">
                <div className="benefit-icon-container">
                  {benefit.icon}
                </div>
                <h3 className="benefit-title">
                  {benefit.title}
                </h3>
                <p className="benefit-description">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="benefits-cta">
          <button className="cta-button">
            Taste the Tradition
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;