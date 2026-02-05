// import React from 'react';
// import { Leaf, Award, Users, Globe } from 'lucide-react';
// import './About.css'; // Import the CSS file

// interface ValueItem {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const About = () => {
//   const values: ValueItem[] = [
//     {
//       icon: <Leaf className="value-icon" />,
//       title: "Traditional Methods",
//       description: "Using time-tested cooking methods like hand-pounding masalas and slow cooking"
//     },
//     {
//       icon: <Award className="value-icon" />,
//       title: "Heritage Quality",
//       description: "Authentic recipes that deliver the same taste as traditional home cooking"
//     },
//     {
//       icon: <Users className="value-icon" />,
//       title: "Family-Centric",
//       description: "Designed with modern Indian families' needs and busy lifestyles in mind"
//     },
//     {
//       icon: <Globe className="value-icon" />,
//       title: "Authentic Legacy",
//       description: "Preserving culinary heritage while making it accessible to modern kitchens"
//     }
//   ];

//   return (
//     <section id="about2" className="about2-section">
//       <div className="about2-container">
//         <div className="about2-wrapper">
//           <div className="about2-content">
//             <div className="about2-text">
//               <h2 className="about2-title">
//                 Who We Are
//               </h2>
              
//               <div className="about2-divider"></div>
              
//               <p className="about2-description">
//                 South Sutra is an authentic South Indian food brand that celebrates the perfect union of 
//                 traditional cooking methods and heritage recipes. Born from a deep appreciation for 
//                 South Indian culinary traditions and family values, we create products that honor 
//                 our ancestors' cooking wisdom while serving modern families.
//               </p>
              
//               <p className="about2-description-secondary">
//                 Our journey began with a simple belief: every family deserves access to 
//                 authentic South Indian flavors that are not only delicious but also prepared 
//                 with the same love and devotion as temple prasadam. From our traditional 
//                 Puliyogare to our aromatic rice gojjus, each product is crafted with care 
//                 and traditional methods.
//               </p>
//             </div>
            
//             <div className="about2-stats">
//               <div className="stat-item">
//                 <div className="stat-value">10K+</div>
//                 <div className="stat-label">Happy Families</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-value">4+</div>
//                 <div className="stat-label">Authentic Varieties</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-value">5.0★</div>
//                 <div className="stat-label">Average Rating</div>
//               </div>
//             </div>
//           </div>
          
//           <div className="about2-values">
//             {values.map((value, index) => (
//               <div key={index} className="value-card">
//                 <div className="value-icon-container">
//                   {value.icon}
//                 </div>
//                 <div className="value-content">
//                   <h3 className="value-title">
//                     {value.title}
//                   </h3>
//                   <p className="value-description">
//                     {value.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;

import React from 'react';
import { Leaf, Award, Users, Globe } from 'lucide-react';
import './About.css'; // Import the CSS file

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const About = () => {
  const values: ValueItem[] = [
    {
      icon: <Leaf size={24} />,
      title: "Traditional Methods",
      description: "Using time-tested cooking methods like hand-pounding masalas and slow cooking"
    },
    {
      icon: <Award size={24} />,
      title: "Heritage Quality",
      description: "Authentic recipes that deliver the same taste as traditional home cooking"
    },
    {
      icon: <Users size={24} />,
      title: "Family-Centric",
      description: "Designed with modern Indian families' needs and busy lifestyles in mind"
    },
    {
      icon: <Globe size={24} />,
      title: "Authentic Legacy",
      description: "Preserving culinary heritage while making it accessible to modern kitchens"
    }
  ];

  return (
    <section id="about2" className="about2-section">
      <div className="about2-container">
        <div className="about2-wrapper">
          <div className="about2-content">
            <div className="about2-text">
              <h2 className="about2-title">
                Who We Are
              </h2>
              
              <div className="about2-divider"></div>
              
              <p className="about2-description">
                South Sutra is an authentic South Indian food brand that celebrates the perfect union of 
                traditional cooking methods and heritage recipes. Born from a deep appreciation for 
                South Indian culinary traditions and family values, we create products that honor 
                our ancestors' cooking wisdom while serving modern families.
              </p>
              
              <p className="about2-description-secondary">
                Our journey began with a simple belief: every family deserves access to 
                authentic South Indian flavors that are not only delicious but also prepared 
                with the same love and devotion as temple prasadam. From our traditional 
                Puliyogare to our aromatic rice gojjus, each product is crafted with care 
                and traditional methods.
              </p>
            </div>
            
            <div className="about2-stats">
              <div className="stat-item">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Happy Families</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">4+</div>
                <div className="stat-label">Authentic Varieties</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">5.0★</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
          
          <div className="about2-values">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-container">
                  {value.icon}
                </div>
                <div className="value-content">
                  <h3 className="value-title">
                    {value.title}
                  </h3>
                  <p className="value-description">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;