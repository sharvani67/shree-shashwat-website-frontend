import React from 'react';
import { Gift, Clock, Percent, ArrowRight } from 'lucide-react';
import './SpecialOffer.css';

const SpecialOffer: React.FC = () => {
  return (
    <section id="offers" className="special-offer-section">
      <div className="special-offer-background">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="decorative-circle circle-3"></div>
      </div>
      
      <div className="special-offer-container">
        <div className="special-offer-header">
          <div className="offer-badge">
            <Gift className="badge-icon" />
            <span className="badge-text">Independence Day Special</span>
          </div>
          
          <h2 className="offer-title">
            Special Show Offers!
          </h2>
          
          <p className="offer-subtitle">
            Celebrate freedom and flavors with exclusive discounts and bundles 
            available only at our Lalbagh Flower Show stall.
          </p>
        </div>
        
        <div className="offer-cards-container">
          <div className="offer-card">
            <Percent className="card-icon" />
            <h3 className="card-title">Up to 30% Off</h3>
            <p className="card-description">
              Exclusive discounts on all authentic South Indian food products and gojju varieties
            </p>
          </div>
          
          <div className="offer-card">
            <Gift className="card-icon" />
            <h3 className="card-title">Free Gift Bundle</h3>
            <p className="card-description">
              Complimentary recipe booklet and samples with every purchase above ₹500
            </p>
          </div>
          
          <div className="offer-card">
            <Clock className="card-icon" />
            <h3 className="card-title">Limited Time</h3>
            <p className="card-description">
              Special pricing valid only during the Lalbagh Flower Show event days
            </p>
          </div>
        </div>
        
        <div className="offer-cta-container">
          <button className="cta-button">
            <span>Claim Your Offer</span>
            <ArrowRight className="cta-icon" />
          </button>
          
          <p className="offer-disclaimer">
            *Offers valid from August 15-31, 2025 | Terms and conditions apply
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;