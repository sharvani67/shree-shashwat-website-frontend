// import React from "react";
// import "./Founder.css";
// import founderimage from "../../../assets/NiranjanN.jpg";

// const Founder = () => {
//   return (
//     <section className="founder-section" aria-labelledby="founder-title" tabIndex={-1}>
//       <div className="founder-image-top-container" aria-hidden="true">
//         <img
//           src={founderimage}
//           alt="Inspirational hero image representing Karthikeya Shashikumar and INFAB AgroFoods"
//           className="founder-image-top"
//         />
//       </div>
//       <div className="founder-wrapper">
//         <div className="founder-content">
//           <span className="founder-tag" aria-label="Section tag">ABOUT THE FOUNDER</span>
//           <h2 className="founder-name" id="founder-title">
//             Karthikeya Shashikumar
//           </h2>
//           <div className="founder-divider" aria-hidden="true"></div>
//           <h4 className="founder-subtitle">
//             Transforming the Food Industry with Purity and Innovation
//           </h4>
//           <div className="founder-text-container">
//             <p className="founder-text">
//               Karthikeya Shashikumar, the visionary founder of INFAB AgroFoods Pvt. Ltd., embarked
//               on a mission in 2022 to redefine the food industry with products that are 100% natural,
//               preservative-free, gluten-free, and additive-free. With a commitment to authenticity and
//               consumer well-being, INFAB AgroFoods has become synonymous with uncompromised quality
//               and transparency.
//             </p>
//             <p className="founder-text">
//               Karthikeya&apos;s entrepreneurial journey began in a humble home-based manufacturing unit
//               in Bangalore, where he single-handedly managed production, operations, sales, and even
//               deliveries. From carrying products on his two-wheeler to supplying specialty stores,
//               his hands-on experience laid the foundation for a brand that now sets new benchmarks
//               in the industry.
//             </p>
//             <p className="founder-text">
//               Driven by a passion for change, Karthikeya was inspired to act after witnessing how
//               many leading brands used deceptive marketing tactics to sell products that fell short
//               on quality. This fueled his determination to educate consumers and create products
//               that truly deliver on their promises.
//             </p>
//             <p className="founder-text">
//               Today, INFAB AgroFoods Pvt. Ltd. is a thriving company, powered by Karthikeya&apos;s
//               expertise in food technology and food sciences. The products, proudly bearing the green
//               label, stand as a testament to the brand&apos;s dedication to purity and health. Backed by
//               investor trust and guided by a powerful vision, INFAB AgroFoods is revolutionizing the
//               food industry, one natural, honest product at a time.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Founder;


import React from "react";
import "./Founder.css";
import founderimage from "../../assets/profilepic.jpg";

const Founder = () => {
  return (
    <section className="founder-section" aria-labelledby="founder-title" tabIndex={-1}>
      <div className="founder-wrapper">
        {/* <div className="founder-image-container">
          <img
            src={founderimage}
            alt="Karthikeya Shashikumar, founder of INFAB AgroFoods"
            className="founder-image"
          />
        </div> */}
        <div className="founder-content">
          <span className="founder-tag" aria-label="Section tag">ABOUT THE FOUNDER</span>
          <h2 className="founder-name" id="founder-title">
            Karthikeya Shashikumar
          </h2>
          <div className="founder-divider" aria-hidden="true"></div>
          <h4 className="founder-subtitle">
            Transforming the Food Industry with Purity and Innovation
          </h4>
          <div className="founder-text-container">
            <p className="founder-text">
              Karthikeya Shashikumar, the visionary founder of INFAB AgroFoods Pvt. Ltd., embarked
              on a mission in 2022 to redefine the food industry with products that are 100% natural,
              preservative-free, gluten-free, and additive-free. With a commitment to authenticity and
              consumer well-being, INFAB AgroFoods has become synonymous with uncompromised quality
              and transparency.
            </p>
            <p className="founder-text">
              Karthikeya&apos;s entrepreneurial journey began in a humble home-based manufacturing unit
              in Bangalore, where he single-handedly managed production, operations, sales, and even
              deliveries. From carrying products on his two-wheeler to supplying specialty stores,
              his hands-on experience laid the foundation for a brand that now sets new benchmarks
              in the industry.
            </p>
            <p className="founder-text">
              Driven by a passion for change, Karthikeya was inspired to act after witnessing how
              many leading brands used deceptive marketing tactics to sell products that fell short
              on quality. This fueled his determination to educate consumers and create products
              that truly deliver on their promises.
            </p>
            <p className="founder-text">
              Today, INFAB AgroFoods Pvt. Ltd. is a thriving company, powered by Karthikeya&apos;s
              expertise in food technology and food sciences. The products, proudly bearing the green
              label, stand as a testament to the brand&apos;s dedication to purity and health. Backed by
              investor trust and guided by a powerful vision, INFAB AgroFoods is revolutionizing the
              food industry, one natural, honest product at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;