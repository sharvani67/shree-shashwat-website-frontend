import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import Logo from '../assets/logobigger.c72b1fcc9c97b792343b.png';
import './Footer.css';

const Footer = () => {
  // Social media URLs
  const socialLinks = {
    instagram: 'https://www.instagram.com/southsutra_/?next=%2F',
    facebook: 'https://www.facebook.com/people/Karthikeya-Nalina/pfbid02bPTUR3mL41nexS8HvcFFwamDEYmZQowRRHTeHYy3ZQZhfooViMd33UUqMd5R4WECl/',
    youtube: 'https://www.youtube.com/@southsutra'
  };

  return (
    <footer className="footer1-container">
      <div className="footer1-content">
        <div className="footer1-grid">
          {/* Logo and Info */}
          <div className="footer1-brand">
            <div className="logo-container">
              <img src={Logo} alt="South Sutra Logo" className="logo-image" />
            </div>
            <p className="brand-description">
              Authentic South Indian food products inspired by heritage recipes and designed for 
              modern Indian families. Experience the perfect harmony of tradition and taste.
            </p>
            <div className="social-linkss">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Instagram className="social-icon" />
              </a>
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Facebook className="social-icon" />
              </a>
              <a 
                href={socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Youtube className="social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer1-section">
            <h3 className="section-titles">Quick Links</h3>
            <ul className="link-list">
              <li><a href="#products" className="footer1-link">Products</a></li>
              <li><a href="#benefits" className="footer1-link">Benefits</a></li>
              <li><a href="#offers" className="footer1-link">Special Offers</a></li>
              <li><a href="#about" className="footer1-link">About Us</a></li>
            </ul>
          </div>

          {/* Event Info */}
          <div className="footer1-section">
            <h3 className="section-titles">Event Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <p className="contact-text">Lalbagh Botanical Garden</p>
                  <p className="contact-subtext">Bangalore, Karnataka</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <p className="contact-text">+91 8971607888</p>
                  <p className="contact-subtext">Event Stall Enquiries</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <a href="mailto:info@southsutra.com" className="footer1-link">
                    contact@southsutra.com
                  </a>
                  <p className="contact-subtext">General Enquiries</p>
                </div>
              </div>
            </div>
            <a 
              href="https://maps.google.com/?q=Lalbagh+Botanical+Garden" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              Visit Our Stall at Lalbagh
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="footer1-section">
            <h3 className="section-titles">Newsletter</h3>
            <p className="newsletter-description">
              Stay updated with our latest products, offers, and traditional recipes.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer1-bottom">
          <div className="footer1-bottom-content">
            <p className="copyright">
              © 2025 South Sutra. All rights reserved by iiiQBets.. | Celebrating Independence Day 2025 with Authentic Flavors
            </p>
            <div className="footer1-links">
              <a href="#" className="footer1-link">Privacy Policy</a>
              <a href="#" className="footer1-link">Terms of Service</a>
              <a href="#" className="footer1-link">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;