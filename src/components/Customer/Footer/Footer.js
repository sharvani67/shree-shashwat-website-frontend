// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInfoCircle, FaAddressBook   } from 'react-icons/fa';
// import { GrContact, GrLocation  } from "react-icons/gr";
// import { MdOutlineEmail, MdInfoOutline  } from "react-icons/md";
// import { BsTelephone } from "react-icons/bs";
// import './Footer.css'

// function Footer() {
//     return (
//         <>
        
//         <footer className="text-dark">
//             <Container fluid>
//                 <Row>
//                     <Col md={3} className="mb-3">
//                         <h5>SutraCart</h5>
//                         <p>Authentic South Indian masala pastes, handcrafted with love and tradition. Bringing the taste of South India to your kitchen, one delicious meal at a time.</p>
//                     </Col>
//                     <Col md={3} className="mb-3">
//                         <h5>Quick Links</h5>
//                         <p><a href="/products">All Products</a></p>
//                         <p><MdInfoOutline  className="footer-icon" /> About Us</p>
//                         <p><GrContact  className="footer-icon" /> Contact Us</p>
//                         <p><a href="/contact">Your Cart</a></p>
//                         <p><a href="/contact">Order History</a></p>
//                         <p><a href="/login">Login / Sign Up</a></p>
//                     </Col>

//                     <Col md={3} className="mb-3">
//                         <h5>Contact Us</h5>
//                         <p><MdOutlineEmail className="footer-icon" /> support@sutracart.com</p>
//                         <p><BsTelephone className="footer-icon" /> +91 12345 67890</p>
//                         <p><GrLocation className="footer-icon" /> 123 Masala Lane, Spice Nagar,<br />
//                             Bangalore, Karnataka 560001,<br />
//                             India</p>
//                     </Col>
//                     <Col md={3} className="mb-3">
//                         <h5>Legal</h5>
//                         <p>Terms & Conditions</p>
//                         <h5>Follow Us</h5>
//                         <p>Stay updated with our latest products and offers.</p>
//                     </Col>
//                 </Row>
//                 <hr />
//                 <p className="text-center mb-0">&copy; {new Date().getFullYear()}  2025 SutraCart. All rights reserved by iiiQBets..</p>
//                 <p className="text-center mb-0">A venture by South Sutra culinary artisans. Made with ❤️ in India.</p>
//             </Container>
//         </footer>
//         </>
        
//     );
// }

// export default Footer;

// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { MdOutlineEmail, MdInfoOutline, MdOutlineStore } from "react-icons/md";
// import { FaShoppingCart, FaClipboardList, FaUserCircle, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import { GrContact, GrLocation } from "react-icons/gr";
// import { BsTelephone } from "react-icons/bs";
// import './Footer.css';
// import logo from '../../../assets/SSLogo7-removebg.png'; // Adjust path as needed

// function Footer() {
//   return (
//     <footer className="custom-footer">
//       <Container>
//         <Row className="footer-top">
//           <Col xs={12} md={6} lg={3} className="footer-col">
//             <img src={logo} alt="SutraCart Logo" className="footer-logo" />
//             <p className="footer-desc">
//               Authentic South Indian masala pastes, handcrafted with love and tradition. Bringing the taste of South India to your kitchen.
//             </p>
//           </Col>

//           <Col xs={6} md={6} lg={3} className="footer-col">
//             <h5 className="mb-3 text-uppercase">Quick Links</h5>
//             <ul className="footer-links">
//               <li><a href="/products"><MdOutlineStore className="footer-icon" /> All Products</a></li>
//               <li><a href="/about"><MdInfoOutline className="footer-icon" /> About Us</a></li>
//               <li><a href="/contact"><GrContact className="footer-icon" /> Contact Us</a></li>
//               <li><a href="/Shoppingcart"><FaShoppingCart className="footer-icon" /> Your Cart</a></li>
//               <li><a href="/myorders"><FaClipboardList className="footer-icon" /> Order History</a></li>
//               <li><a href="/login"><FaUserCircle className="footer-icon" /> Login / Sign Up</a></li>
//             </ul>
//           </Col>

//           <Col xs={6} md={6} lg={3} className="footer-col">
//             <h5 className="mb-3 text-uppercase">Contact Us</h5>
//             <ul className="footer-contact">
//               <li><MdOutlineEmail className="footer-icon" /> contact@southsutra.com </li>
//               <li><BsTelephone className="footer-icon" /> 8971607888/6363900869</li>
              
//               <li>
//                 <GrLocation className="footer-icon" />
//                 INFAB AGRO FOODS pvt ltd,#125/3<br />
//                  Kanminike Village Hejjala Circle South Taluk Bangalore-562109
//               </li>
//             </ul>
//           </Col>

//           <Col xs={12} md={6} lg={3} className="footer-col">
//             <h5 className="mb-3 text-uppercase">Legal</h5>
//             <ul className="footer-links">
//               <li><a href="/Termsandconditions">Terms & Conditions</a></li>
//               <li><a href="/privacy">Privacy Policy</a></li>
//               <li><a href="/faq">FAQ's</a></li>
//             </ul>
//             <h5 className="mt-4 text-uppercase">Follow Us</h5>
//             <div className="social-icons">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//               <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
//             </div>
//             <p className="footer-desc">Stay updated with our latest products and offers.</p>
//           </Col>
//         </Row>

//         <hr className="footer-divider" />

//         <Row>
//           <Col className="text-center">
//             <p className="footer-copy mb-1">&copy; {new Date().getFullYear()} SutraCart. All rights reserved by iiiQBets..</p>
//             <p className="footer-made">A venture by South Sutra culinary artisans. Made with ❤️ in India.</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;




// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import {
//   MdOutlineEmail, MdInfoOutline, MdOutlineStore
// } from "react-icons/md";
// import {
//   FaShoppingCart, FaClipboardList, FaUserCircle,
//   FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTags 
// } from "react-icons/fa";
// import { GrContact, GrLocation } from "react-icons/gr";
// import { BsTelephone } from "react-icons/bs";
// import './Footer.css';
// import logo from '../../../assets/tagline2.png';

// function Footer() {
//   return (
//     <footer className="custom-footer fade-in">
//       <Container>
//         <Row className="footer-top">
//           <Col xs={12} lg={3} className="footer-col fade-in-up">
//             <div className="footer-logo-container">
//               <img src={logo} alt="SutraCart Logo" className="footer-logo" />
//             </div>
//             <p className="footer-desc">
//               Authentic South Indian masala pastes, handcrafted with love and tradition. Bringing the taste of South India to your kitchen.
//             </p>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-1">
//             <h5 className="footer-heading">Quick Links</h5>
//             <ul className="footer-links">
//               <li><a href="/products"><MdOutlineStore className="footer-icon" /> All Products</a></li>
//               <li><a href="/about"><MdInfoOutline className="footer-icon" /> About Us</a></li>
//               <li><a href="/contact"><GrContact className="footer-icon" /> Contact Us</a></li>
//               <li><a href="/Shoppingcart"><FaShoppingCart className="footer-icon" /> Your Cart</a></li>
//               <li><a href="/myorders"><FaClipboardList className="footer-icon" /> Order History</a></li>
//               <li><a href="/login"><FaUserCircle className="footer-icon" /> Login / Sign Up</a></li>
//               <li><a href="/bulk-order-form"><FaTags className="footer-icon" /> Bulk Orders</a></li>
//             </ul>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-2">
//             <h5 className="footer-heading">Contact Us</h5>
//             <ul className="footer-contact">
//               <li><MdOutlineEmail className="footer-icon" /> contact@southsutra.com</li>
//               <li><BsTelephone className="footer-icon" /> 8971607888 / 6363900869</li>
//               <li>
//                 <GrLocation className="footer-icon" />
//                 INFAB AGRO FOODS Pvt Ltd,<br />
//                 #125/3 Kanminike Village,<br />
//                 Hejjala Circle South Taluk,<br />
//                 Bangalore - 562109
//               </li>
//             </ul>

//             <div className="whatsapp-join fade-in-up delay-3">
//               <h6 className="whatsapp-heading">Get Fresh Updates</h6>
//               <p className="whatsapp-text">Join our WhatsApp group to receive the latest offers, products, and updates.</p>
//               <a
//                 href="https://chat.whatsapp.com/IEn431tS9Rl21yL5KzwtnS"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="whatsapp-button"
//               >
//                 📲 Join Now on WhatsApp
//               </a>
//             </div>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-4">
//             <h5 className="footer-heading">Legal</h5>
//             <ul className="footer-links">
//               <li><a href="/Termsandconditions">Terms & Conditions</a></li>
//               <li><a href="/privacypolicy">Privacy Policy</a></li>
//               <li><a href="/refundpolicy">Refund Policy</a></li>
//               <li><a href="/shippingpolicy">Shipping Policy</a></li>
//               <li><a href="/faq">FAQ's</a></li>
//             </ul>
            
//             <h5 className="footer-heading follow-us">Follow Us</h5>
//             <div className="social-icons">
//               <a href="https://www.facebook.com/profile.php?id=61576200795479" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
//               <a href="https://www.instagram.com/southsutra_/?next=%2F" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//               {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> */}
//               <a href="https://youtube.com/@southsutra?si=Ygg6_WZEjIAsfQBO" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
//             </div>
//             <p className="footer-desc social-desc">Stay updated with our latest products and offers.</p>
//           </Col>
//         </Row>

//         <hr className="footer-divider" />

//         <Row>
//           <Col className="text-center">
//             <p className="footer-copy">&copy; {new Date().getFullYear()} SutraCart. All rights reserved by iiiQBets..</p>
//             <p className="footer-made">A venture by South Sutra culinary artisans. Made with ❤️ in India.</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;





// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import {
//   MdOutlineEmail, MdInfoOutline, MdOutlineStore
// } from "react-icons/md";
// import {
//   FaShoppingCart, FaClipboardList, FaUserCircle,
//   FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTags 
// } from "react-icons/fa";
// import { GrContact, GrLocation } from "react-icons/gr";
// import { BsTelephone } from "react-icons/bs";
// import './Footer.css';
// import logo from '../../../assets/tagline2.png';

// function Footer() {
//   return (
//     <footer className="custom-footer fade-in">
//       <Container>
//         <Row className="footer-top">
//           <Col xs={12} lg={3} className="footer-col fade-in-up">
//             <div className="footer-logo-container">
//               <img src={logo} alt="SutraCart Logo" className="footer-logo" />
//             </div>
//             <h2>SHREE SHASHWATHRAJ AGRO PVT.LTD.</h2>
//             <p className="footer-desc">
//             PATNA ROAD, 0, SHREE SHASHWATHRAJ AGRO PVT LTD, BHAKHARUA MORE, DAUDNAGAR, Aurangabad, Bihar 824113 Email:spmathur56@gmail.com  | Phone: 9801049700 | GSTIN: 10AAOCS1541B1ZZ
//             </p>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-1">
//             <h5 className="footer-heading">Quick Links</h5>
//             <ul className="footer-links">
//               <li><a href="/products"><MdOutlineStore className="footer-icon" /> All Products</a></li>
//               <li><a href="/about"><MdInfoOutline className="footer-icon" /> About Us</a></li>
//               <li><a href="/contact"><GrContact className="footer-icon" /> Contact Us</a></li>
//               <li><a href="/Shoppingcart"><FaShoppingCart className="footer-icon" /> Your Cart</a></li>
//               <li><a href="/myorders"><FaClipboardList className="footer-icon" /> Order History</a></li>
//               <li><a href="/login"><FaUserCircle className="footer-icon" /> Login / Sign Up</a></li>
//               <li><a href="/bulk-order-form"><FaTags className="footer-icon" /> Bulk Orders</a></li>
//             </ul>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-2">
//             <h5 className="footer-heading">Contact Us</h5>
//             <ul className="footer-contact">
//               <li><MdOutlineEmail className="footer-icon" /> contact@southsutra.com</li>
//               <li><BsTelephone className="footer-icon" /> 8971607888 / 6363900869</li>
//               <li>
//                 <GrLocation className="footer-icon" />
//                 INFAB AGRO FOODS Pvt Ltd,<br />
//                 #125/3 Kanminike Village,<br />
//                 Hejjala Circle South Taluk,<br />
//                 Bangalore - 562109
//               </li>
//             </ul>

//             <div className="whatsapp-join fade-in-up delay-3">
//               <h6 className="whatsapp-heading">Get Fresh Updates</h6>
//               <p className="whatsapp-text">Join our WhatsApp group to receive the latest offers, products, and updates.</p>
//               <a
//                 href="https://chat.whatsapp.com/IEn431tS9Rl21yL5KzwtnS"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="whatsapp-button"
//               >
//                 📲 Join Now on WhatsApp
//               </a>
//             </div>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-4">
//             <h5 className="footer-heading">Legal</h5>
//             <ul className="footer-links">
//               <li><a href="/Termsandconditions">Terms & Conditions</a></li>
//               <li><a href="/privacypolicy">Privacy Policy</a></li>
//               <li><a href="/refundpolicy">Refund Policy</a></li>
//               <li><a href="/shippingpolicy">Shipping Policy</a></li>
//               <li><a href="/faq">FAQ's</a></li>
//             </ul>
            
//             <h5 className="footer-heading follow-us">Follow Us</h5>
//             <div className="social-icons">
//               <a href="https://www.facebook.com/profile.php?id=61576200795479" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
//               <a href="https://www.instagram.com/southsutra_/?next=%2F" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//               {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> */}
//               <a href="https://youtube.com/@southsutra?si=Ygg6_WZEjIAsfQBO" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
//             </div>
//             <p className="footer-desc social-desc">Stay updated with our latest products and offers.</p>
//           </Col>
//         </Row>

//         <hr className="footer-divider" />

//         <Row>
//           <Col className="text-center">
//             <p className="footer-copy">&copy; {new Date().getFullYear()} SutraCart. All rights reserved by iiiQBets..</p>
//             <p className="footer-made">A venture by South Sutra culinary artisans. Made with ❤️ in India.</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;





// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import {
//   MdOutlineEmail, MdInfoOutline, MdOutlineStore
// } from "react-icons/md";
// import {
//   FaShoppingCart, FaClipboardList, FaUserCircle,
//   FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTags 
// } from "react-icons/fa";
// import { GrContact, GrLocation } from "react-icons/gr";
// import { BsTelephone } from "react-icons/bs";
// import './Footer.css';

// function Footer() {
//   return (
//     <footer className="custom-footer fade-in">
//       <Container>
//         <Row className="footer-top align-items-start">
//           <Col xs={12} lg={3} className="footer-col fade-in-up">
//             <h5 className="footer-heading">SHREE SHASHWATHRAJ </h5>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-1">
//             <h5 className="footer-heading">Quick Links</h5>
//             <ul className="footer-links">
//               <li><a href="/products"><MdOutlineStore className="footer-icon" /> All Products</a></li>
//               <li><a href="/about"><MdInfoOutline className="footer-icon" /> About Us</a></li>
//               <li><a href="/contact"><GrContact className="footer-icon" /> Contact Us</a></li>
//               <li><a href="/Shoppingcart"><FaShoppingCart className="footer-icon" /> Your Cart</a></li>
//               <li><a href="/myorders"><FaClipboardList className="footer-icon" /> Order History</a></li>
//               <li><a href="/login"><FaUserCircle className="footer-icon" /> Login / Sign Up</a></li>
        
//             </ul>
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-2">
//             <h5 className="footer-heading">Contact Us</h5>
//             <ul className="footer-contact">
//               <li><MdOutlineEmail className="footer-icon" /> spmathur56@gmail.com</li>
//               <li><BsTelephone className="footer-icon" /> 9801049700</li>
//               <li>
//           <GrLocation className="footer-icon" />
//           SHREE SHASHWATHRAJ AGRO PVT. LTD,<br />
//           Patna Road,<br />
//           Bhakharua More, Daudnagar,<br />
//           Aurangabad, Bihar - 824113<br />
//           GSTIN: 10AAOCS1541B1ZZ
//             </li>

//             </ul>

            
//           </Col>

//           <Col xs={12} lg={3} className="footer-col fade-in-up delay-4">
//             <h5 className="footer-heading">Legal</h5>
//             <ul className="footer-links">
//               <li><a href="/Termsandconditions">Terms & Conditions</a></li>
//               <li><a href="/privacypolicy">Privacy Policy</a></li>
//               <li><a href="/refundpolicy">Refund Policy</a></li>
//               <li><a href="/shippingpolicy">Shipping Policy</a></li>
//               <li><a href="/faq">FAQ's</a></li>
//             </ul>
            
//             <h5 className="footer-heading follow-us">Follow Us</h5>
//             <div className="social-icons">
//               <a href="https://www.facebook.com/profile.php?id=61576200795479" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
//               <a href="https://www.instagram.com/southsutra_/?next=%2F" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//               {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> */}
//               <a href="https://youtube.com/@southsutra?si=Ygg6_WZEjIAsfQBO" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
//             </div>
//             <p className="footer-desc social-desc">Stay updated with our latest products and offers.</p>
//           </Col>
//         </Row>

//         <hr className="footer-divider" />

//         <Row>
//           <Col className="text-center">
//             <p className="footer-copy">&copy; {new Date().getFullYear()} Shree Shaswat Raj. All rights reserved by iiiQBets..</p>
        
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  MdOutlineEmail, MdInfoOutline, MdOutlineStore
} from "react-icons/md";
import {
  FaShoppingCart, FaClipboardList, FaUserCircle,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTags 
} from "react-icons/fa";
import { GrContact, GrLocation } from "react-icons/gr";
import { BsTelephone } from "react-icons/bs";
import './Footer.css';

function Footer() {
  return (
    <footer className="custom-footer fade-in">
      <Container>
        <Row className="footer-top align-items-start">
          <Col xs={12} lg={3} className="footer-col fade-in-up">
            <div className="brand-section">
              <h5 className="footer-brand">SHREE SHASHWATRAJ</h5>
              <p className="footer-desc">
                <strong>SHREE SHASHWATRAJ AGRO PVT. LTD</strong><br />
              
              </p>
            </div>
          </Col>

          <Col xs={12} lg={3} className="footer-col fade-in-up delay-1">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/products"><MdOutlineStore className="footer-icon" /> All Products</a></li>
              <li><a href="/about"><MdInfoOutline className="footer-icon" /> About Us</a></li>
              <li><a href="/contact"><GrContact className="footer-icon" /> Contact Us</a></li>
              <li><a href="/Shoppingcart"><FaShoppingCart className="footer-icon" /> Your Cart</a></li>
              <li><a href="/myorders"><FaClipboardList className="footer-icon" /> Order History</a></li>
              <li><a href="/login"><FaUserCircle className="footer-icon" /> Login / Sign Up</a></li>
            </ul>
          </Col>

          <Col xs={12} lg={3} className="footer-col fade-in-up delay-2">
            <h5 className="footer-heading">Contact Info</h5>
            <ul className="footer-contact">
              <li><MdOutlineEmail className="footer-icon" /> spmathur56@gmail.com</li>
              <li><BsTelephone className="footer-icon" /> 9801049700</li>
              <li>
                <GrLocation className="footer-icon" />
                <span>
                  Patna Road, Bhakharua More,<br />
                  Daudnagar, Aurangabad,<br />
                  Bihar - 824113<br />
                  GSTIN: 10AAOCS1541B1ZZ
                </span>
              </li>
            </ul>
          </Col>

          <Col xs={12} lg={3} className="footer-col fade-in-up delay-3">
            <h5 className="footer-heading">Legal</h5>
            <ul className="footer-links">
              <li><a href="/Termsandconditions">Terms & Conditions</a></li>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
              <li><a href="/refundpolicy">Refund Policy</a></li>
              <li><a href="/shippingpolicy">Shipping Policy</a></li>
              {/* <li><a href="/faq">FAQ's</a></li> */}
            </ul>
            
            {/* <h5 className="footer-heading follow-us">Follow Us</h5>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61576200795479" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com/southsutra_/?next=%2F" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://youtube.com/@southsutra?si=Ygg6_WZEjIAsfQBO" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
            <p className="footer-desc social-desc">Stay updated with our latest products and offers.</p> */}
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row>
          <Col className="text-center">
            <p className="footer-copy">&copy; {new Date().getFullYear()} Shree Shaswat Raj. All rights reserved by iiiQBets.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;