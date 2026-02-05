// // import React, { useState } from "react";

// // const styles = {
// //   section: {
// //     position: "relative",
// //     padding: "100px 20px 140px",
// //     fontFamily: "'Poppins', sans-serif",
// //     color: "#2c3e50",
// //     background: "linear-gradient(135deg, #fff9f2 25%, #f2e9dc 90%)",
// //     overflowX: "hidden",
// //   },
// //   container: {
// //     maxWidth: 1140,
// //     margin: "0 auto",
// //     position: "relative",
// //     zIndex: 10,
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 96,
// //   },
// //   segment: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     gap: 48,
// //     flexWrap: "wrap",
// //   },
// //   segmentReverse: {
// //     flexDirection: "row-reverse",
// //   },
// //   imageWrapper: {
// //     flex: "1 1 45%",
// //     borderRadius: 26,
// //     padding: 6,
// //     background:
// //       "linear-gradient(270deg, #e67e22, #d35400, #e67e22, #d35400)",
// //     backgroundSize: "600% 600%",
// //     animation: "gradientShift 14s ease infinite",
// //     boxShadow:
// //       "0 14px 36px rgba(230, 126, 34, 0.33)",
// //     transition: "transform 0.5s ease, box-shadow 0.5s ease",
// //     cursor: "pointer",
// //     overflow: "hidden",
// //     position: "relative",
// //     zIndex: 5,
// //   },
// //   imageWrapperHover: {
// //     transform: "scale(1.07)",
// //     boxShadow:
// //       "0 28px 60px rgba(230, 126, 34, 0.6)",
// //   },
// //   img: {
// //     width: "100%",
// //     height: 400,
// //     borderRadius: 24,
// //     objectFit: "cover",
// //     filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.12))",
// //     transition: "transform 0.75s ease",
// //   },
// //   imgHover: {
// //     transform: "scale(1.12)",
// //   },
// //   contentWrapper: {
// //     flex: "1 1 50%",
// //     display: "flex",
// //     flexDirection: "column",
// //     justifyContent: "center",
// //     backgroundColor: "rgba(255,255,255,0.8)",
// //     backdropFilter: "blur(8px)",
// //     borderRadius: 24,
// //     padding: 40,
// //     boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
// //     transition: "box-shadow 0.3s ease",
// //     position: "relative",
// //   },
// //   contentWrapperHover: {
// //     boxShadow:
// //       "0 15px 50px rgba(214, 102, 10, 0.4), 0 10px 20px rgba(214, 102, 10, 0.25)",
// //   },
// //   sectionTag: {
// //     fontVariant: "small-caps",
// //     fontWeight: 900,
// //     fontSize: 14,
// //     letterSpacing: 4,
// //     textTransform: "none",
// //     background: "linear-gradient(90deg, #e67e22, #d35400)",
// //     WebkitBackgroundClip: "text",
// //     WebkitTextFillColor: "transparent",
// //     marginBottom: 16,
// //     textShadow: "0 3px 5px rgba(255 126 34 / 0.5)",
// //     userSelect: "none",
// //   },
// //   sectionTitle: {
// //     fontSize: 36,
// //     lineHeight: 1.1,
// //     fontWeight: 900,
// //     marginBottom: 28,
// //     color: "#2c3e50",
// //     textShadow: "2px 2px 12px rgba(230, 126, 34, 0.25)",
// //   },
// //   sectionTitleHighlight: {
// //     background: "linear-gradient(90deg, #d35400, #e67e22)",
// //     WebkitBackgroundClip: "text",
// //     WebkitTextFillColor: "transparent",
// //     display: "inline-block",
// //   },
// //   paragraph: {
// //     fontSize: 18,
// //     lineHeight: 1.7,
// //     color: "#343a40cc",
// //     userSelect: "text",
// //     marginBottom: 30,
// //   },
// //   button: {
// //     alignSelf: "start",
// //     cursor: "pointer",
// //     userSelect: "none",
// //     padding: "14px 38px",
// //     backgroundImage: "linear-gradient(135deg, #e67e22, #d35400)",
// //     border: "none",
// //     borderRadius: 36,
// //     fontWeight: 700,
// //     fontSize: 16,
// //     color: "white",
// //     boxShadow: "0 6px 24px rgba(230, 126, 34, 0.66)",
// //     transition: "transform 0.3s ease, box-shadow 0.3s ease",
// //     position: "relative",
// //     overflow: "hidden",
// //     textShadow: "0 1px 6px rgba(0, 0, 0, 0.15)",
// //     userSelect: "none",
// //   },
// //   buttonHover: {
// //     boxShadow: "0 12px 40px rgba(230, 126, 34, 0.85)",
// //     transform: "translateY(-4px)",
// //   },
// //   dividerLine: {
// //     width: 160,
// //     height: 6,
// //     margin: "80px auto 20px",
// //     background: "linear-gradient(90deg, #e67e22, #d35400)",
// //     borderRadius: 6,
// //     boxShadow: "0 0 30px #d35400bb",
// //     position: "relative",
// //   },
// //   dividerIcon: {
// //     position: "absolute",
// //     top: "50%",
// //     left: "50%",
// //     transform: "translate(-50%, -50%)",
// //     backgroundColor: "#fff8f0cc",
// //     borderRadius: "50%",
// //     width: 50,
// //     height: 50,
// //     color: "#d35400",
// //     fontWeight: 900,
// //     fontSize: 26,
// //     boxShadow: "0 0 0 6px #f6f0e8cc",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     userSelect: "none",
// //     zIndex: 10,
// //   },
// // };

// // const SnakeLayoutPurposeVision = () => {
// //   const [hoveredCard, setHoveredCard] = useState(null);
// //   const [hoveredButton, setHoveredButton] = useState(null);
// //   const [hoveredContent, setHoveredContent] = useState(null);

// //   const handleCardEnter = (card) => {
// //     setHoveredCard(card);
// //   };
// //   const handleCardLeave = () => {
// //     setHoveredCard(null);
// //   };
// //   const handleButtonEnter = (btn) => {
// //     setHoveredButton(btn);
// //   };
// //   const handleButtonLeave = () => {
// //     setHoveredButton(null);
// //   };
// //   const handleContentEnter = (content) => {
// //     setHoveredContent(content);
// //   };
// //   const handleContentLeave = () => {
// //     setHoveredContent(null);
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');

// //         @keyframes gradientShift {
// //           0% {background-position: 0% 50%;}
// //           50% {background-position: 100% 50%;}
// //           100% {background-position: 0% 50%;}
// //         }

// //         @media (max-width: 900px) {
// //           .snake-segment {
// //             flex-direction: column !important;
// //           }
// //           .snake-image-wrapper {
// //             flex: 1 1 100% !important;
// //             margin-bottom: 32px !important;
// //             height: 320px !important;
// //           }
// //           .snake-img {
// //             height: 320px !important;
// //           }
// //           .snake-content {
// //             flex: 1 1 100% !important;
// //             text-align: center !important;
// //             background: rgba(255,255,255,0.95) !important;
// //             box-shadow: 0 6px 12px rgba(0,0,0,0.12) !important;
// //           }
// //           .section-title {
// //             font-size: 28px !important;
// //           }
// //           .btn-gradient {
// //             width: 100% !important;
// //             align-self: center !important;
// //           }
// //         }
// //       `}</style>
// //       <section style={styles.section} aria-label="Snake Layout Purpose and Vision Section">
// //         <div style={styles.container}>
// //           {/* Segment 1 */}
// //           <div
// //             className="snake-segment"
// //             style={styles.segment}
// //             onMouseLeave={() => {
// //               handleCardLeave();
// //               handleContentLeave();
// //             }}
// //           >
// //             <div
// //               className="snake-image-wrapper"
// //               style={{
// //                 ...styles.imageWrapper,
// //                 ...(hoveredCard === "purpose" ? styles.imageWrapperHover : {}),
// //               }}
// //               onMouseEnter={() => handleCardEnter("purpose")}
// //               tabIndex={-1}
// //               aria-hidden="true"
// //             >
// //               <img
// //                 src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
// //                 alt="Woman packing traditional South Indian spices"
// //                 style={{
// //                   ...styles.img,
// //                   ...(hoveredCard === "purpose" ? styles.imgHover : {}),
// //                 }}
// //                 className="snake-img"
// //                 loading="lazy"
// //               />
// //             </div>
// //             <div
// //               className="snake-content"
// //               style={{
// //                 ...styles.contentWrapper,
// //                 ...(hoveredContent === "purpose"
// //                   ? styles.contentWrapperHover
// //                   : {}),
// //               }}
// //               onMouseEnter={() => handleContentEnter("purpose")}
// //               onMouseLeave={() => handleContentLeave()}
// //               tabIndex={0}
// //               aria-labelledby="purpose-title"
// //             >
// //               <span style={styles.sectionTag} className="section-tag">
// //                 Our Purpose
// //               </span>
// //               <h2 id="purpose-title" style={styles.sectionTitle}>
// //                 Preserving Heritage <br />
// //                 <span style={styles.sectionTitleHighlight}>Through Flavor</span>
// //               </h2>
// //               <p style={styles.paragraph}>
// //                 To deliver authentic South Indian flavors with love, while
// //                 maintaining traditional aroma, taste, and texture in a
// //                 convenient, modern format.
// //               </p>
// //               <button
// //                 style={{
// //                   ...styles.button,
// //                   ...(hoveredButton === "purpose" ? styles.buttonHover : {}),
// //                 }}
// //                 onMouseEnter={() => handleButtonEnter("purpose")}
// //                 onMouseLeave={handleButtonLeave}
// //                 onFocus={() => handleButtonEnter("purpose")}
// //                 onBlur={handleButtonLeave}
// //                 aria-label="Learn more about our purpose"
// //                 className="btn-gradient"
// //               >
// //                 Learn More
// //               </button>
// //             </div>
// //           </div>

// //           {/* Divider */}
// //           <div style={styles.dividerLine} aria-hidden="true">
// //             <span style={styles.dividerIcon} aria-hidden="true">
// //               ★
// //             </span>
// //           </div>

// //           {/* Segment 2 */}
// //           <div
// //             className="snake-segment"
// //             style={{ ...styles.segment, ...styles.segmentReverse }}
// //             onMouseLeave={() => {
// //               handleCardLeave();
// //               handleContentLeave();
// //             }}
// //           >
// //             <div
// //               className="snake-image-wrapper"
// //               style={{
// //                 ...styles.imageWrapper,
// //                 ...(hoveredCard === "vision" ? styles.imageWrapperHover : {}),
// //               }}
// //               onMouseEnter={() => handleCardEnter("vision")}
// //               tabIndex={-1}
// //               aria-hidden="true"
// //             >
// //               <img
// //                 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
// //                 alt="Team packing traditional South Indian spices"
// //                 style={{
// //                   ...styles.img,
// //                   ...(hoveredCard === "vision" ? styles.imgHover : {}),
// //                 }}
// //                 className="snake-img"
// //                 loading="lazy"
// //               />
// //             </div>
// //             <div
// //               className="snake-content"
// //               style={{
// //                 ...styles.contentWrapper,
// //                 ...(hoveredContent === "vision" ? styles.contentWrapperHover : {}),
// //               }}
// //               onMouseEnter={() => handleContentEnter("vision")}
// //               onMouseLeave={handleContentLeave}
// //               tabIndex={0}
// //               aria-labelledby="vision-title"
// //             >
// //               <span style={styles.sectionTag} className="section-tag">
// //                 Our Vision
// //               </span>
// //               <h2 id="vision-title" style={styles.sectionTitle}>
// //                 The Global Face <br />
// //                 <span style={styles.sectionTitleHighlight}>
// //                   of South Indian Cuisine
// //                 </span>
// //               </h2>
// //               <p style={styles.paragraph}>
// //                 To be the global face of South Indian cuisine, known for
// //                 authenticity, innovation, and the delight we bring to every
// //                 meal.
// //               </p>
// //               <button
// //                 style={{
// //                   ...styles.button,
// //                   ...(hoveredButton === "vision" ? styles.buttonHover : {}),
// //                 }}
// //                 onMouseEnter={() => handleButtonEnter("vision")}
// //                 onMouseLeave={handleButtonLeave}
// //                 onFocus={() => handleButtonEnter("vision")}
// //                 onBlur={handleButtonLeave}
// //                 aria-label="Discover more about our vision"
// //                 className="btn-gradient"
// //               >
// //                 Discover More
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default SnakeLayoutPurposeVision;

// import React, { useState, useRef, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const SnakeLayoutPurposeVision = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [hoveredButton, setHoveredButton] = useState(null);
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });
  
//   // Parallax effects
//   const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
//   const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

//   // Color scheme with vibrant gradients
//   const colors = {
//     gradient1: "linear-gradient(135deg, #FF4D4D 0%, #F9CB28 100%)",
//     gradient2: "linear-gradient(135deg, #6E45E2 0%, #89D4CF 100%)",
//     gradient3: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
//     dark: "#1A1A2E",
//     light: "#F5F5F5",
//     accent: "#FFD166"
//   };

//   // Dynamic styles
//   const styles = {
//     section: {
//       position: "relative",
//       padding: "150px 20px",
//       background: colors.dark,
//       color: colors.light,
//       overflow: "hidden",
//       fontFamily: "'Poppins', sans-serif",
//     },
//     container: {
//       width: "100%",
//       maxWidth: 1400,
//       margin: "0 auto",
//       position: "relative",
//     },
//     snakePath: {
//       position: "absolute",
//       top: 0,
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "4px",
//       height: "100%",
//       background: colors.gradient3,
//       zIndex: 1,
//     },
//     snakeNode: {
//       position: "absolute",
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "30px",
//       height: "30px",
//       borderRadius: "50%",
//       background: colors.accent,
//       zIndex: 2,
//       boxShadow: `0 0 20px ${colors.accent}`,
//     },
//     segment: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: "80px",
//       marginBottom: "200px",
//       position: "relative",
//       zIndex: 3,
//     },
//     segmentReverse: {
//       flexDirection: "row-reverse",
//     },
//     imageWrapper: {
//       flex: "1 1 50%",
//       borderRadius: "30px",
//       overflow: "hidden",
//       transformStyle: "preserve-3d",
//       perspective: "1000px",
//       boxShadow: "0 30px 50px rgba(0,0,0,0.3)",
//       position: "relative",
//     },
//     imageWrapperHover: {
//       transform: "translateY(-10px)",
//     },
//     img: {
//       width: "100%",
//       height: "500px",
//       objectFit: "cover",
//       transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
//       filter: "brightness(0.95) contrast(1.05)",
//     },
//     imgHover: {
//       transform: "scale(1.05)",
//       filter: "brightness(1) contrast(1.1)",
//     },
//     contentWrapper: {
//       flex: "1 1 45%",
//       padding: "40px",
//       position: "relative",
//     },
//     sectionTag: {
//       display: "inline-block",
//       fontWeight: 800,
//       fontSize: "14px",
//       letterSpacing: "3px",
//       textTransform: "uppercase",
//       marginBottom: "20px",
//       background: colors.gradient1,
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       position: "relative",
//     },
//     sectionTagUnderline: {
//       position: "absolute",
//       bottom: "-8px",
//       left: 0,
//       width: "50px",
//       height: "3px",
//       background: colors.gradient1,
//       borderRadius: "3px",
//     },
//     sectionTitle: {
//       fontSize: "48px",
//       lineHeight: "1.2",
//       fontWeight: 900,
//       marginBottom: "30px",
//       background: "linear-gradient(90deg, #FFF, #AAA)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//     },
//     sectionTitleHighlight: {
//       background: colors.gradient2,
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//     },
//     paragraph: {
//       fontSize: "18px",
//       lineHeight: "1.8",
//       color: "#CCC",
//       marginBottom: "40px",
//       position: "relative",
//       paddingLeft: "30px",
//     },
//     paragraphDecor: {
//       position: "absolute",
//       left: 0,
//       top: 0,
//       height: "100%",
//       width: "3px",
//       background: colors.gradient3,
//       borderRadius: "3px",
//     },
//     button: {
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "18px 45px",
//       borderRadius: "50px",
//       fontWeight: 700,
//       fontSize: "16px",
//       textTransform: "uppercase",
//       letterSpacing: "1px",
//       color: colors.dark,
//       background: colors.accent,
//       border: "none",
//       cursor: "pointer",
//       transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
//       boxShadow: `0 5px 15px rgba(255, 209, 102, 0.4)`,
//       position: "relative",
//       overflow: "hidden",
//     },
//     buttonHover: {
//       transform: "translateY(-5px)",
//       boxShadow: `0 15px 30px rgba(255, 209, 102, 0.6)`,
//     },
//     buttonAfter: {
//       content: '""',
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       background: "rgba(255,255,255,0.2)",
//       transform: "translateX(-100%) rotate(45deg)",
//       transition: "transform 0.6s ease",
//     },
//     buttonHoverAfter: {
//       transform: "translateX(100%) rotate(45deg)",
//     },
//     floatingOrbs: {
//       position: "absolute",
//       borderRadius: "50%",
//       filter: "blur(40px)",
//       opacity: "0.15",
//       zIndex: 0,
//     },
//   };

//   // Floating orb positions
//   const orbs = [
//     { size: 300, color: "#FF4D4D", top: "10%", left: "5%" },
//     { size: 400, color: "#6E45E2", bottom: "15%", right: "5%" },
//     { size: 200, color: "#4ECDC4", top: "60%", left: "20%" }
//   ];

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap');
          
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-20px); }
//             100% { transform: translateY(0px); }
//           }
          
//           @keyframes pulse {
//             0% { box-shadow: 0 0 0 0 rgba(255, 209, 102, 0.7); }
//             70% { box-shadow: 0 0 0 15px rgba(255, 209, 102, 0); }
//             100% { box-shadow: 0 0 0 0 rgba(255, 209, 102, 0); }
//           }
          
//           .snake-image-wrapper:hover {
//             animation: float 6s ease-in-out infinite;
//           }
          
//           .snake-node {
//             animation: pulse 2s infinite;
//           }
          
//           @media (max-width: 1200px) {
//             .snake-segment {
//               flex-direction: column !important;
//               gap: 50px !important;
//               margin-bottom: 150px !important;
//             }
            
//             .snake-image-wrapper, .snake-content {
//               flex: 1 1 100% !important;
//               width: 100% !important;
//             }
            
//             .snake-section-title {
//               font-size: 36px !important;
//             }
//           }
          
//           @media (max-width: 768px) {
//             .snake-section-title {
//               font-size: 28px !important;
//             }
            
//             .snake-img {
//               height: 350px !important;
//             }
//           }
//         `}
//       </style>

//       <motion.section 
//         style={styles.section}
//         ref={containerRef}
//       >
//         {/* Floating orbs background */}
//         {orbs.map((orb, index) => (
//           <div 
//             key={index}
//             style={{
//               ...styles.floatingOrbs,
//               width: `${orb.size}px`,
//               height: `${orb.size}px`,
//               background: orb.color,
//               top: orb.top,
//               bottom: orb.bottom,
//               left: orb.left,
//               right: orb.right,
//             }}
//             aria-hidden="true"
//           />
//         ))}
        
//         {/* Snake path line */}
//         <div style={styles.snakePath} aria-hidden="true"></div>
        
//         {/* Snake nodes */}
//         <div 
//           style={{ 
//             ...styles.snakeNode, 
//             top: "25%",
//             animationDelay: "0.5s"
//           }} 
//           className="snake-node"
//           aria-hidden="true"
//         ></div>
//         <div 
//           style={{ 
//             ...styles.snakeNode, 
//             top: "75%",
//             animationDelay: "1s"
//           }} 
//           className="snake-node"
//           aria-hidden="true"
//         ></div>

//         <div style={styles.container}>
//           {/* First Segment - Purpose */}
//           <motion.div 
//             className="snake-segment"
//             style={{
//               ...styles.segment,
//               y: y1,
//               rotate: rotate
//             }}
//           >
//             <motion.div
//               className="snake-image-wrapper"
//               style={styles.imageWrapper}
//               whileHover={{ scale: 1.03 }}
//               onHoverStart={() => setHoveredCard("purpose")}
//               onHoverEnd={() => setHoveredCard(null)}
//             >
//               <motion.img
//                 className="snake-img"
//                 style={styles.img}
//                 animate={hoveredCard === "purpose" ? {
//                   scale: 1.05,
//                   filter: "brightness(1.05) contrast(1.1)"
//                 } : {}}
//                 src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=80"
//                 alt="Traditional South Indian spices being prepared"
//                 loading="lazy"
//               />
//             </motion.div>
            
//             <motion.div 
//               className="snake-content"
//               style={styles.contentWrapper}
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8 }}
//             >
//               <div style={{ position: 'relative' }}>
//                 <span style={styles.sectionTag}>
//                   Our Purpose
//                   <span style={styles.sectionTagUnderline}></span>
//                 </span>
//               </div>
              
//               <h2 style={styles.sectionTitle}>
//                 Cultural Alchemy <br />
//                 <span style={styles.sectionTitleHighlight}>Through Spices</span>
//               </h2>
              
//               <div style={styles.paragraph}>
//                 <span style={styles.paragraphDecor}></span>
//                 We transform centuries-old South Indian culinary traditions into 
//                 modern gastronomic experiences. Each product is a love letter to 
//                 the vibrant flavors that have shaped our heritage, now reimagined 
//                 for contemporary kitchens worldwide.
//               </div>
              
//               <motion.button
//                 style={styles.button}
//                 whileHover="hover"
//                 onHoverStart={() => setHoveredButton("purpose")}
//                 onHoverEnd={() => setHoveredButton(null)}
//               >
//                 <span>Explore Heritage</span>
//                 <motion.span
//                   style={styles.buttonAfter}
//                   animate={hoveredButton === "purpose" ? "hover" : ""}
//                   variants={{
//                     hover: { transform: "translateX(100%) rotate(45deg)" }
//                   }}
//                 ></motion.span>
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* Second Segment - Vision */}
//           <motion.div 
//             className="snake-segment"
//             style={{
//               ...styles.segment,
//               ...styles.segmentReverse,
//               y: y2,
//               rotate: rotate
//             }}
//           >
//             <motion.div
//               className="snake-image-wrapper"
//               style={styles.imageWrapper}
//               whileHover={{ scale: 1.03 }}
//               onHoverStart={() => setHoveredCard("vision")}
//               onHoverEnd={() => setHoveredCard(null)}
//             >
//               <motion.img
//                 className="snake-img"
//                 style={styles.img}
//                 animate={hoveredCard === "vision" ? {
//                   scale: 1.05,
//                   filter: "brightness(1.05) contrast(1.1)"
//                 } : {}}
//                 src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80"
//                 alt="Global cuisine incorporating South Indian flavors"
//                 loading="lazy"
//               />
//             </motion.div>
            
//             <motion.div 
//               className="snake-content"
//               style={styles.contentWrapper}
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8 }}
//             >
//               <div style={{ position: 'relative' }}>
//                 <span style={styles.sectionTag}>
//                   Our Vision
//                   <span style={styles.sectionTagUnderline}></span>
//                 </span>
//               </div>
              
//               <h2 style={styles.sectionTitle}>
//                 The Future <br />
//                 <span style={styles.sectionTitleHighlight}>Of Flavor</span>
//               </h2>
              
//               <div style={styles.paragraph}>
//                 <span style={styles.paragraphDecor}></span>
//                 We're building a world where South Indian spices aren't just 
//                 ingredients, but storytellers. Through innovation and respect 
//                 for tradition, we're creating a global language of flavor that 
//                 transcends borders while staying rooted in authenticity.
//               </div>
              
//               <motion.button
//                 style={styles.button}
//                 whileHover="hover"
//                 onHoverStart={() => setHoveredButton("vision")}
//                 onHoverEnd={() => setHoveredButton(null)}
//               >
//                 <span>See The Vision</span>
//                 <motion.span
//                   style={styles.buttonAfter}
//                   animate={hoveredButton === "vision" ? "hover" : ""}
//                   variants={{
//                     hover: { transform: "translateX(100%) rotate(45deg)" }
//                   }}
//                 ></motion.span>
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.section>
//     </>
//   );
// };

// export default SnakeLayoutPurposeVision;