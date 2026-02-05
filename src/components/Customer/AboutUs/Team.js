// import React from "react";
// import "./Team.css";
// import member2 from "../../../assets/NiranjanN.jpg";
// import member1 from "../../../assets/chennai.jpeg";

// const Team = () => {
//   return (
//     <section className="team-section">
//       <h2 className="team-heading">Meet Our Team</h2>
//       <div className="team-container">
//         <div className="team-card" data-aos="fade-up">
//           <div className="team-image">
//             <img src={member1} alt="Team Member 1" />
//           </div>
//           <h3 className="team-name">Karthikeya Shashikumar</h3>
//           <p className="team-role">Founder & CEO</p>
//           <p className="team-desc">
//             A visionary behind the brand, Karthikeya combines tradition with innovation to deliver authentic South Indian experiences globally.
//           </p>
//         </div>

//         <div className="team-card" data-aos="fade-up" data-aos-delay="150">
//           <div className="team-image">
//             <img src={member2} alt="Niranjan Naik" />
//           </div>
//           <h3 className="team-name">Niranjan Naik</h3>
//           <p className="team-role">Marketing Director & Business Consultant</p>
//           <p className="team-desc">
//             Niranjan is a dynamic leader with over 28 years of experience in P&L management, marketing, sales, product launches, and team building across various industries. 
//             With a background in Mechanical Engineering and a PGDBM in Marketing and Sales, he has worked in steel, automotive, consumer goods, construction, and energy sectors. 
//             He has played a key role in launching new products across APAC and EMEA, and is an experienced motivator in B2B, B2C, and Project Sales.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Team;
import React from "react";
import "./Team.css";
import member1 from "../../assets/profilepic.jpg"; // Replace with actual image path
import member2 from "../../../assets/NiranjanN.jpg"; // Replace with actual image path
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Team = () => {
  return (
    <section className="team-section">
      <div className="team-header">
        <h3 className="team-subtitle">Our Leadership</h3>
        <h2 className="team-heading">Meet Our Team</h2>
        <div className="divider"></div>
        <p className="team-intro">
          The passionate individuals behind our brand's success, bringing
          innovation and tradition together.
        </p>
      </div>

      <div className="team-container">
        {/* Member 1 */}
        <div className="team-card" data-aos="zoom-in">
          <div className="card-inner">
            <div className="card-front">
              <div className="circle-image">
                <img src={member1} alt="Karthikeya Shashikumar" />
              </div>
              <h3 className="team-name">Karthikeya Shashikumar</h3>
              <p className="team-role">Founder & CEO</p>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <FaLinkedin />
                </a>
                <a href="#" className="social-icon">
                  <FaTwitter />
                </a>
                <a href="#" className="social-icon">
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div className="card-back">
              <p className="team-desc">
                A visionary behind the brand, Karthikeya combines tradition with
                innovation to deliver authentic South Indian experiences
                globally.
              </p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>
        </div>

        {/* Member 2 */}
        <div className="team-card" data-aos="zoom-in" data-aos-delay="100">
          <div className="card-inner">
            <div className="card-front">
              <div className="circle-image">
                <img src={member2} alt="Niranjan Naik" />
              </div>
              <h3 className="team-name">Niranjan Naik</h3>
              <p className="team-role">Marketing Director & Business Consultant</p>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <FaLinkedin />
                </a>
                {/* <a href="#" className="social-icon">
                  <FaTwitter />
                </a> */}
                <a href="#" className="social-icon">
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div className="card-back">
              <p className="team-desc">
                Niranjan is a dynamic leader with over 28 years of experience in
                P&L management, marketing, sales, product launches, and team
                building across various industries.
              </p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
