import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MdOutlineEmail, MdInfoOutline, MdOutlineStore } from "react-icons/md";
import { FaShoppingCart, FaClipboardList, FaUserCircle, FaFacebookF, FaInstagram, FaTwitter, FaYoutube,FaThLarge,FaUsers } from "react-icons/fa";
import { GrContact, GrLocation } from "react-icons/gr";
import { BsTelephone } from "react-icons/bs";
import './Footer.css';
import logo from '../../../assets/tagline2.png'; // Adjust path as needed

function Footer() {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="footer-top">
          <Col xs={12} md={6} lg={3} className="footer-col">
            <img src={logo} alt="SutraCart Logo" className="footer-logo" />
            <p className="footer-desc">
              Authentic South Indian masala pastes, handcrafted with love and tradition. Bringing the taste of South India to your kitchen.
            </p>
          </Col>

          <Col xs={6} md={6} lg={3} className="footer-col">
            <h5 className="mb-3 text-uppercase">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/a-dashboard"><FaThLarge className="footer-icon" /> Dashboard</a></li>
              <li><a href="/a-products"><MdOutlineStore className="footer-icon" /> All Products</a></li>
              <li><a href="/a-customers"><FaUsers className="footer-icon" /> Customers</a></li>
              {/* <li><a href="/about"><MdInfoOutline className="footer-icon" /> About Us</a></li> */}
              {/* <li><a href="/contact"><GrContact className="footer-icon" /> Contact Us</a></li> */}
              {/* <li><a href="/Shoppingcart"><FaShoppingCart className="footer-icon" /> Your Cart</a></li> */}
              <li><a href="/a-orders"><FaClipboardList className="footer-icon" /> Order History</a></li>
              
              {/* <li><a href="/login"><FaUserCircle className="footer-icon" /> Login / Sign Up</a></li> */}
            </ul>
          </Col>

          <Col xs={6} md={6} lg={3} className="footer-col">
            <h5 className="mb-3 text-uppercase">Contact Us</h5>
            <ul className="footer-contact">
              <li><MdOutlineEmail className="footer-icon" /> contact@southsutra.com </li>
              <li><BsTelephone className="footer-icon" /> 8971607888/6363900869</li>
              <li>
                <GrLocation className="footer-icon" />
                INFAB AGRO FOODS pvt ltd,#125/3<br />
                Kanminike Village Hejjala Circle South Taluk Bangalore-562109
              </li>
            </ul>
          </Col>

          <Col xs={12} md={6} lg={3} className="footer-col">
            <h5 className="mb-3 text-uppercase">Legal</h5>
            <ul className="footer-links">
              <li><a href="/a-Termsandconditions">Terms & Conditions</a></li>
              <li><a href="/a-privacypolicy">Privacy Policy</a></li>
              <li><a href="/a-refundpolicy">Refund Policy</a></li>
              <li><a href="/a-shippingpolicy">Shipping Policy</a></li>
            </ul>
            <h5 className="mt-4 text-uppercase">Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
            <p className="footer-desc">Stay updated with our latest products and offers.</p>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row>
          <Col className="text-center">
            <p className="footer-copy mb-1">&copy; {new Date().getFullYear()} SutraCart. All  All rights reserved by iiiQBets. by iiiQBets. reserved.</p>
            <p className="footer-made">A venture by South Sutra culinary artisans. Made with ❤️ in India.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
