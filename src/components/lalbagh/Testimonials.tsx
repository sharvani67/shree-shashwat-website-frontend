import React from 'react';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css'; // Import the CSS file

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const Testimonials = () => {
  const clienttestimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "South Sutra's Puliyogare Gojju tastes exactly like my grandmother's recipe! The authentic flavors and quality ingredients make it perfect for our family meals.",
      avatar: "PS"
    },
    {
      name: "Meera Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "The Tomato Rice Gojju is absolutely delicious! It's so convenient for busy weekdays and tastes just like homemade. My kids love it!",
      avatar: "MR"
    },
    {
      name: "Kavya Nair",
      location: "Chennai",
      rating: 5,
      text: "I've been ordering from South Sutra for months now. The quality is exceptional and the traditional preparation methods make such a difference in taste.",
      avatar: "KN"
    },
    {
      name: "Anjali Patel",
      location: "Mumbai",
      rating: 5,
      text: "Love how convenient these gojjus are! Perfect for when I'm missing authentic South Indian food. The Lemon Rice Gojju is my absolute favorite!",
      avatar: "AP"
    }
  ];

  return (
    <section className="clienttestimonials-section">
      <div className="clienttestimonials-container">
        <div className="clienttestimonials-header">
          <h2 className="clienttestimonials-title">
            Loved by Families Across India
          </h2>
          
          <p className="clienttestimonials-subtitle">
            Don't just take our word for it. Here's what our customers have to say 
            about their South Sutra food experience.
          </p>
        </div>
        
        <div className="clienttestimonials-grid">
          {clienttestimonials.map((clienttestimonial, index) => (
            <div key={index} className="clienttestimonial-card">
              <Quote className="clienttestimonial-quote-icon" />
              
              <div className="clienttestimonial-content">
                <div className="clienttestimonial-rating">
                  {[...Array(clienttestimonial.rating)].map((_, i) => (
                    <Star key={i} className="clienttestimonial-star" />
                  ))}
                </div>
                
                <p className="clienttestimonial-text">
                  "{clienttestimonial.text}"
                </p>
                
                <div className="clienttestimonial-author">
                  <div className="clienttestimonial-avatar">
                    {clienttestimonial.avatar}
                  </div>
                  <div>
                    <div className="clienttestimonial-name">
                      {clienttestimonial.name}
                    </div>
                    <div className="clienttestimonial-location">
                      {clienttestimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;