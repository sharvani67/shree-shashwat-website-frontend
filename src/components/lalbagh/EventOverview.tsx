import React from 'react';
import { Calendar, Heart, Flower2 } from 'lucide-react';
import './EventOverview.css';

const EventOverview = () => {
  return (
    <>
    <section className="event-section">
      <div className="event-gradient-overlay">
        <div className="event-circle-emerald"></div>
        <div className="event-circle-orange"></div>
      </div>
      
      <div className="event-container">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="event-badge">
              <Calendar size={20} />
              <span>August 2025</span>
            </div>
            
            <h2 className="event-title">
              Lalbagh Flower Show 2025
            </h2>
            
            <div className="event-divider"></div>
          </div>
          
          <div className="event-grid">
            <div className="space-y-6">
              <div className="event-feature">
                <Heart size={24} color="#f97316" />
                <div>
                  <h3 className="event-feature-title">
                    Honoring Kittur Chennamma - Sangolli Rayanna
                  </h3>
                  <p className="event-feature-text">
                    This Independence Day, we pay tribute to the brave warriors Kittur Chennamma and Sangolli Rayanna, 
                    celebrating their spirit of freedom that resonates through Karnataka's rich heritage.
                  </p>
                </div>
              </div>
              
              <div className="event-feature">
                <Flower2 size={24} color="#10b981" />
                <div>
                  <h3 className="event-feature-title">
                    Culinary Heritage Celebration
                  </h3>
                  <p className="event-feature-text">
                    Join us at Lalbagh's iconic flower show where nature's beauty meets authentic South Indian cuisine, 
                    creating the perfect harmony of flora and traditional flavors.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="event-card">
              <div className="text-6xl">🌺</div>
              <h4>Experience Authentic Flavors</h4>
              <p>
                Discover how South Sutra brings together the essence of traditional South Indian cooking 
                with authentic family recipes passed down through generations.
              </p>
              <div className="event-button">Taste Our Heritage Recipes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default EventOverview;
