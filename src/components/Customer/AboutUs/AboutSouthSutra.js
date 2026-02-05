// import React, { useEffect } from "react";
// import "./AboutSouthSutra.css";

// const AboutSouthSutra = () => {
//   useEffect(() => {
//     const handleScroll = () => {
//       const section = document.querySelector(".about-container");
//       if (section) {
//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight - 100) {
//           section.classList.add("fade-in");
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="about-section">
//   <div className="about-wrapper">
//     {/* <img
//       src="https://i.ibb.co/nDZG1kz/banana-leaf-left.png"
//       alt="Banana Leaf Left"
//       className="banana-leaf left"
//     /> */}
//     <div className="about-container">
//       <h4 className="about-subheading">About SouthSutra</h4>
//       <h2 className="about-heading">INFAB AgroFoods Pvt. Ltd.</h2>
//       <div className="about-content">
//           <p>
//             <strong>SouthSutra</strong> Brand is Owned By INFAB AGRO FOODS. <strong>SouthSutra</strong> was founded with a singular vision:
//             to create food products that are 100% natural, free from additives and adulteration,
//             and packed with nutrients. Guided by the passion and determination of our dynamic
//             founder, <strong className="highlight">Karthikeya Shashikumar</strong>, SouthSutra AgroFoods is on a mission to redefine the
//             food industry with unmatched purity and quality.
//           </p>
//           <p>
//             At SouthSutra, we are dedicated to crafting products that cater to diverse consumer
//             needs while staying true to our core values of authenticity and transparency. Every
//             product we deliver reflects our promise: <span className="highlight">100% natural, zero additives, and zero adulteration</span>.
//           </p>
//           <p>
//             Our portfolio includes branded Ready-to-Cook (RTC) and Ready-to-Eat (RTE) products,
//             celebrating the authentic flavours of traditional Indian cuisine. Beyond our own
//             offerings, we empower other startup founders with food technology services, contract
//             manufacturing, and drop-shipping solutions to bring their ideas to life.
//           </p>
//           <p>
//             SouthSutra AgroFoods uses <strong>B2B, B2C, B2B2C, D2C,</strong> and <strong>HORECA</strong> channels to reach diverse
//             customer segments. We're expanding globally with an omnichannel presence to become
//             a leader in the food industry.
//           </p>
//           <p>
//             This relentless commitment to innovation and excellence — paired with our founder’s
//             hands-on approach — has laid the foundation for SouthSutra’s success. Today, we’re
//             proud to be India’s pioneering <span className="highlight">Zero Additives, Zero Adulteration</span> company,
//             setting new standards in the food industry and driving growth across the ecosystem.
//           </p>
//         </div>
//     </div>
//     {/* <img
//       src="https://i.ibb.co/WGnq7Wh/banana-leaf-right.png"
//       alt="Banana Leaf Right"
//       className="banana-leaf right"
//     /> */}
//   </div>
// </section>

//   );
// };

// export default AboutSouthSutra;


import React, { useEffect } from "react";
import "./AboutSouthSutra.css";

const AboutSouthSutra = () => {
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".about-container");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          section.classList.add("fade-in");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="about-section">
      <div className="overlay"></div>
      <div className="about-wrapper">
        <div className="about-container">
          <div className="header-decoration">
            <div className="leaf-decoration left"></div>
            <div className="title-container">
              <h4 className="about-subheading">About SouthSutra</h4>
              <h2 className="about-heading">INFAB AgroFoods Pvt. Ltd.</h2>
            </div>
            <div className="leaf-decoration right"></div>
          </div>
          
          <div className="about-content">
            <p>
              <strong>SouthSutra</strong> Brand is Owned By INFAB AGRO FOODS. <strong>SouthSutra</strong> was founded with a singular vision:
              to create food products that are 100% natural, free from additives and adulteration,
              and packed with nutrients. Guided by the passion and determination of our dynamic
              founder, <strong className="highlight">Karthikeya Shashikumar</strong>, SouthSutra AgroFoods is on a mission to redefine the
              food industry with unmatched purity and quality.
            </p>
            <p>
              At SouthSutra, we are dedicated to crafting products that cater to diverse consumer
              needs while staying true to our core values of authenticity and transparency. Every
              product we deliver reflects our promise: <span className="highlight">100% natural, zero additives, and zero adulteration</span>.
            </p>
            <p>
              Our portfolio includes branded Ready-to-Cook (RTC) and Ready-to-Eat (RTE) products,
              celebrating the authentic flavours of traditional Indian cuisine. Beyond our own
              offerings, we empower other startup founders with food technology services, contract
              manufacturing, and drop-shipping solutions to bring their ideas to life.
            </p>
            <p>
              SouthSutra AgroFoods uses <strong>B2B, B2C, B2B2C, D2C,</strong> and <strong>HORECA</strong> channels to reach diverse
              customer segments. We're expanding globally with an omnichannel presence to become
              a leader in the food industry.
            </p>
            <p>
              This relentless commitment to innovation and excellence — paired with our founder's
              hands-on approach — has laid the foundation for SouthSutra's success. Today, we're
              proud to be India's pioneering <span className="highlight">Zero Additives, Zero Adulteration</span> company,
              setting new standards in the food industry and driving growth across the ecosystem.
            </p>
          </div>
          
          <div className="signature">
            <div className="signature-line"></div>
            <div className="signature-text">SouthSutra Team</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSouthSutra;