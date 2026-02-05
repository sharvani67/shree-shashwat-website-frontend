// import React from 'react';
// import './CoreValuesSection.css';
// import authenticityImg from '../../../assets/pic9.webp';
// import innovationImg from '../../../assets/pic8.webp';
// import qualityImg from '../../../assets/pic4.jpeg';
// import sustainabilityImg from '../../../assets/pic2.jpeg';

// const values = [
//   {
//     img: authenticityImg,
//     title: 'Authenticity',
//     text: 'We honor traditions to capture the true flavors of South India.',
//     icon: 'fas fa-seedling',
//   },
//   {
//     img: innovationImg,
//     title: 'Innovation',
//     text: 'We blend creativity with heritage to delight modern palates.',
//     icon: 'fas fa-lightbulb',
//   },
//   {
//     img: qualityImg,
//     title: 'Quality',
//     text: 'Committed to excellence through fine ingredients & process rigor.',
//     icon: 'fas fa-award',
//   },
//   {
//     img: sustainabilityImg,
//     title: 'Sustainability',
//     text: 'Eco-friendly sourcing, responsible packaging, and green practices.',
//     icon: 'fas fa-leaf',
//   },
// ];

// const CoreValuesSection = () => {
//   return (
//     <section className="core-values-section" style={{ padding: '70px 0' }}>
//       <div className="core-header">
//         <span className="core-tag">Our Foundation</span>
//         <h2 className="core-title">Core Values That Guide Us</h2>
//         <div className="core-divider" />
//       </div>

//       <div className="core-grid">
//         {values.map((val, index) => (
//           <div className="core-card" key={index}>
//             <div className="card-image" style={{ backgroundImage: `url(${val.img})`, height: '180px' }}>
//               <div className="icon-badge">
//                 <i className={val.icon}></i>
//               </div>
//             </div>
//             <div className="card-body" style={{ padding: '40px 20px 25px' }}>
//               <h3 className="card-title">{val.title}</h3>
//               <p className="card-text">{val.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CoreValuesSection;

import React from 'react';
import './CoreValuesSection.css';

const values = [
  {
    title: 'Authenticity',
    text: 'We honor the traditions and recipes passed down through generations, ensuring every product captures the true flavors of South India.',
    icon: 'fas fa-seedling',
  },
  {
    title: 'Innovation',
    text: 'While we respect tradition, we also embrace creativity, craftingmodern interpretations of timeless recipes to meet today’s evolving tastes',
    icon: 'fas fa-lightbulb',
  },
  {
    title: 'Quality',
    text: 'From sourcing the finest ingredients to our meticulous preparation, weare committed to delivering excellence in every product through manufacturing and process excellence',
    icon: 'fas fa-award',
  },
  {
    title: 'Sustainability',
    text: ' We care for our planet and future generations by prioritizing eco-friendly practices, sustainable sourcing, and responsible packaging.',
    icon: 'fas fa-leaf',
  },
];

const CoreValuesSection = () => {
  return (
    <section className="core-values-section">
      <div className="core-header">
        <span className="core-tag">Our Foundation</span>
        <h2 className="core-title">Core Values That Guide Us</h2>
        <div className="core-divider" />
      </div>

      <div className="core-grid">
        {values.map((val, index) => (
          <div className="core-card no-image" key={index}>
            <div className="icon-circle">
              <i className={val.icon}></i>
            </div>
            <h3 className="corevalue-card-title">{val.title}</h3>
            <p className="corevalue-card-text">{val.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValuesSection;
