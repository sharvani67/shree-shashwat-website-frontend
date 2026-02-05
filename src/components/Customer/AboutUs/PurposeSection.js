// import React, { useState } from "react";

// const SnakeLayoutPurposeVision = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [hoveredButton, setHoveredButton] = useState(null);

//   // Color palette
//   const colors = {
//     primary: "#FF6B35", // Vibrant orange
//     secondary: "#004E89", // Deep blue
//     accent: "#FFBE0B", // Bright yellow
//     lightBg: "#FFF9F2", // Cream background
//     darkText: "#2C3E50",
//     lightText: "#4A4A4A"
//   };

//   const styles = {
//     section: {
//       position: "relative",
//       padding: "120px 20px",
//       background: colors.lightBg,
//       fontFamily: "'Poppins', sans-serif",
//       color: colors.darkText,
//       overflow: "hidden",
//       zIndex: 1,
//     },
//     container: {
//       width: "100%",
//       maxWidth: 1200,
//       margin: "0 auto",
//       position: "relative",
//       zIndex: 10,
//       display: "flex",
//       flexDirection: "column",
//       gap: 100,
//     },
//     segment: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: 60,
//       flexWrap: "wrap",
//       position: "relative",
//     },
//     segmentReverse: {
//       flexDirection: "row-reverse",
//     },
//     imageWrapper: {
//       flex: "1 1 45%",
//       borderRadius: 30,
//       padding: 8,
//       background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent}, ${colors.primary})`,
//       backgroundSize: "300% 300%",
//       animation: "gradientShift 8s ease infinite",
//       boxShadow: `0 20px 40px rgba(255, 107, 53, 0.3)`,
//       transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
//       cursor: "pointer",
//       overflow: "hidden",
//       position: "relative",
//       zIndex: 2,
//       transform: "perspective(1000px)",
//     },
//     imageWrapperHover: {
//       transform: "scale(1.03) perspective(1000px) rotateY(2deg) rotateX(1deg)",
//       boxShadow: `0 30px 60px rgba(255, 107, 53, 0.5)`,
//     },
//     img: {
//       width: "100%",
//       borderRadius: 24,
//       objectFit: "cover",
//       height: 500,
//       transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
//       filter: "brightness(0.98) contrast(1.05)",
//     },
//     imgHover: {
//       transform: "scale(1.05)",
//       filter: "brightness(1) contrast(1.1)",
//     },
//     contentWrapper: {
//       flex: "1 1 48%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       position: "relative",
//     },
//     sectionTag: {
//       fontWeight: 900,
//       fontSize: 16,
//       letterSpacing: 4,
//       textTransform: "uppercase",
//       background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       marginBottom: 20,
//       userSelect: "none",
//       position: "relative",
//       display: "inline-block",
//     },
//     sectionTagDecoration: {
//       position: "absolute",
//       bottom: -8,
//       left: 0,
//       width: 40,
//       height: 4,
//       background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
//       borderRadius: 4,
//     },
//     sectionTitle: {
//       fontSize: 48,
//       lineHeight: 1.2,
//       fontWeight: 900,
//       marginBottom: 30,
//       color: colors.darkText,
//       position: "relative",
//     },
//     sectionTitleHighlight: {
//       background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       display: "inline-block",
//       position: "relative",
//     },
//     titleUnderline: {
//       position: "absolute",
//       bottom: 8,
//       left: 0,
//       width: "100%",
//       height: 12,
//       background: `linear-gradient(90deg, ${colors.accent}40, ${colors.primary}40)`,
//       zIndex: -1,
//       borderRadius: 4,
//     },
//     paragraph: {
//       fontSize: 18,
//       lineHeight: 1.8,
//       color: colors.lightText,
//       marginBottom: 40,
//       userSelect: "text",
//       position: "relative",
//       paddingLeft: 20,
//       borderLeft: `3px solid ${colors.primary}30`,
//     },
//     button: {
//       alignSelf: "flex-start",
//       cursor: "pointer",
//       userSelect: "none",
//       padding: "18px 42px",
//       background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
//       border: "none",
//       borderRadius: 50,
//       fontWeight: 700,
//       fontSize: 16,
//       color: "white",
//       boxShadow: `0 8px 24px ${colors.primary}60`,
//       transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
//       outline: "none",
//       position: "relative",
//       overflow: "hidden",
//       zIndex: 1,
//     },
//     buttonHover: {
//       boxShadow: `0 12px 32px ${colors.primary}80`,
//       transform: "translateY(-5px)",
//     },
//     buttonAfter: {
//       content: '""',
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
//       opacity: 0,
//       transition: "opacity 0.4s ease",
//       zIndex: -1,
//     },
//     buttonHoverAfter: {
//       opacity: 1,
//     },
//     dividerLine: {
//       width: 200,
//       height: 6,
//       background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${colors.secondary})`,
//       borderRadius: 6,
//       margin: "80px auto 20px",
//       position: "relative",
//       opacity: 0.8,
//     },
//     dividerIcon: {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       backgroundColor: "white",
//       borderRadius: "50%",
//       width: 60,
//       height: 60,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 28,
//       color: colors.primary,
//       fontWeight: 900,
//       boxShadow: `0 0 0 8px ${colors.lightBg}`,
//       userSelect: "none",
//     },
//     decorativeElement: {
//       position: "absolute",
//       borderRadius: "50%",
//       filter: "blur(60px)",
//       opacity: 0.15,
//       zIndex: 1,
//     },
//     decorative1: {
//       width: 400,
//       height: 400,
//       background: colors.primary,
//       top: "-10%",
//       left: "-10%",
//     },
//     decorative2: {
//       width: 300,
//       height: 300,
//       background: colors.secondary,
//       bottom: "-10%",
//       right: "-10%",
//     },
//   };

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800;900&display=swap');
          
//           @keyframes gradientShift {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }
          
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-15px); }
//             100% { transform: translateY(0px); }
//           }
          
//           .snake-image-wrapper:hover {
//             animation: float 4s ease infinite;
//           }
          
//           @media (max-width: 992px) {
//             .snake-segment {
//               flex-direction: column !important;
//               gap: 40px !important;
//             }
//             .snake-image-wrapper {
//               flex: 1 1 100% !important;
//               margin-bottom: 40px !important;
//               height: 400px !important;
//             }
//             .snake-img {
//               height: 400px !important;
//             }
//             .snake-content {
//               flex: 1 1 100% !important;
//               text-align: center !important;
//             }
//             .snake-section-title {
//               font-size: 36px !important;
//             }
//             .snake-button {
//               align-self: center !important;
//             }
//             .snake-paragraph {
//               padding-left: 0 !important;
//               border-left: none !important;
//               border-bottom: 3px solid rgba(255, 107, 53, 0.2) !important;
//               padding-bottom: 20px !important;
//             }
//           }
          
//           @media (max-width: 576px) {
//             .snake-section-title {
//               font-size: 28px !important;
//             }
//             .snake-image-wrapper {
//               height: 300px !important;
//             }
//             .snake-img {
//               height: 300px !important;
//             }
//           }
//         `}
//       </style>

//       <section style={styles.section} aria-label="Purpose and Vision section">
//         {/* Decorative background elements */}
//         <div style={{...styles.decorativeElement, ...styles.decorative1}} aria-hidden="true"></div>
//         <div style={{...styles.decorativeElement, ...styles.decorative2}} aria-hidden="true"></div>
        
//         <div style={styles.container}>
//           {/* First Segment: Image Left, Content Right */}
//           <div
//             className="snake-segment"
//             style={styles.segment}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div
//               className="snake-image-wrapper"
//               style={{
//                 ...styles.imageWrapper,
//                 ...(hoveredCard === "purpose" ? styles.imageWrapperHover : {}),
//               }}
//               onMouseEnter={() => setHoveredCard("purpose")}
//               tabIndex={0}
//               onFocus={() => setHoveredCard("purpose")}
//               onBlur={() => setHoveredCard(null)}
//               aria-hidden="true"
//             >
//               <img
//                 className="snake-img"
//                 style={{
//                   ...styles.img,
//                   ...(hoveredCard === "purpose" ? styles.imgHover : {}),
//                 }}
//                 alt="Woman packing traditional South Indian spices"
//                 src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80"
//                 width="100%"
//                 height="auto"
//                 loading="lazy"
//               />
//             </div>
//             <div className="snake-content" style={styles.contentWrapper}>
//               <div style={{position: 'relative'}}>
//                 <span style={styles.sectionTag} aria-label="Section tag">
//                   Our Purpose
//                   <span style={styles.sectionTagDecoration}></span>
//                 </span>
//               </div>
//               <h2 style={styles.sectionTitle} className="snake-section-title">
//                 Preserving Heritage <br />
//                 <span style={styles.sectionTitleHighlight}>
//                   Through Flavor
//                   <span style={styles.titleUnderline}></span>
//                 </span>
//               </h2>
//               <p style={{...styles.paragraph, className: "snake-paragraph"}}>
//                 To deliver authentic South Indian flavors with love, while
//                 maintaining traditional aroma, taste, and texture in a
//                 convenient, modern format. We bridge generations through the
//                 art of spice.
//               </p>
//               <button
//                 type="button"
//                 className="snake-button"
//                 style={{
//                   ...styles.button,
//                   ...(hoveredButton === "purpose" ? styles.buttonHover : {}),
//                 }}
//                 onMouseEnter={() => setHoveredButton("purpose")}
//                 onMouseLeave={() => setHoveredButton(null)}
//                 onFocus={() => setHoveredButton("purpose")}
//                 onBlur={() => setHoveredButton(null)}
//                 aria-label="Learn more about our purpose"
//               >
//                 <span style={{position: 'relative', zIndex: 2}}>Learn More</span>
//                 <span style={{
//                   ...styles.buttonAfter,
//                   ...(hoveredButton === "purpose" ? styles.buttonHoverAfter : {})
//                 }}></span>
//               </button>
//             </div>
//           </div>

//           {/* Divider */}
//           <div style={styles.dividerLine} aria-hidden="true">
//             <span style={styles.dividerIcon} aria-hidden="true">
//               ✨
//             </span>
//           </div>

//           {/* Second Segment: Image Right, Content Left */}
//           <div
//             className="snake-segment"
//             style={{ ...styles.segment, ...styles.segmentReverse }}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div
//               className="snake-image-wrapper"
//               style={{
//                 ...styles.imageWrapper,
//                 ...(hoveredCard === "vision" ? styles.imageWrapperHover : {}),
//               }}
//               onMouseEnter={() => setHoveredCard("vision")}
//               tabIndex={0}
//               onFocus={() => setHoveredCard("vision")}
//               onBlur={() => setHoveredCard(null)}
//               aria-hidden="true"
//             >
//               <img
//                 className="snake-img"
//                 style={{
//                   ...styles.img,
//                   ...(hoveredCard === "vision" ? styles.imgHover : {}),
//                 }}
//                 alt="Team packing traditional South Indian spices"
//                 src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80"
//                 width="100%"
//                 height="auto"
//                 loading="lazy"
//               />
//             </div>
//             <div className="snake-content" style={styles.contentWrapper}>
//               <div style={{position: 'relative'}}>
//                 <span style={styles.sectionTag} aria-label="Section tag">
//                   Our Vision
//                   <span style={styles.sectionTagDecoration}></span>
//                 </span>
//               </div>
//               <h2 style={styles.sectionTitle} className="snake-section-title">
//                 The Global Face <br />
//                 <span style={styles.sectionTitleHighlight}>
//                   of South Indian Cuisine
//                   <span style={styles.titleUnderline}></span>
//                 </span>
//               </h2>
//               <p style={{...styles.paragraph, className: "snake-paragraph"}}>
//                 To be the global ambassador of South Indian cuisine, known for
//                 authenticity, innovation, and the delight we bring to every
//                 meal. We envision a world where our flavors tell the story of
//                 our rich heritage.
//               </p>
//               <button
//                 type="button"
//                 className="snake-button"
//                 style={{
//                   ...styles.button,
//                   ...(hoveredButton === "vision" ? styles.buttonHover : {}),
//                 }}
//                 onMouseEnter={() => setHoveredButton("vision")}
//                 onMouseLeave={() => setHoveredButton(null)}
//                 onFocus={() => setHoveredButton("vision")}
//                 onBlur={() => setHoveredButton(null)}
//                 aria-label="Discover more about our vision"
//               >
//                 <span style={{position: 'relative', zIndex: 2}}>Discover More</span>
//                 <span style={{
//                   ...styles.buttonAfter,
//                   ...(hoveredButton === "vision" ? styles.buttonHoverAfter : {})
//                 }}></span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SnakeLayoutPurposeVision;

// SnakeLayoutPurposeVision.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const SnakeLayoutPurposeVision = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [hoveredButton, setHoveredButton] = useState(null);

//   // Premium color palette
//   const colors = {
//     goldGradient: "linear-gradient(135deg, #D4AF37 0%, #F9D423 100%)",
//     platinumGradient: "linear-gradient(135deg, #E0E0E0 0%, #B8B8B8 100%)",
//     darkBg: "#0A0A0A",
//     lightText: "#F5F5F5",
//     accent: "#D4AF37"
//   };

//   // Image positioning system
//   const imagePositions = {
//     purpose: {
//       objectPosition: "center 30%",
//       transformOrigin: "center top"
//     },
//     vision: {
//       objectPosition: "center 65%",
//       transformOrigin: "center bottom"
//     }
//   };

//   const styles = {
//     section: {
//       position: "relative",
//       padding: "180px 40px",
//       background: colors.darkBg,
//       color: colors.lightText,
//       overflow: "hidden",
//       fontFamily: "'Playfair Display', serif",
//     },
//     container: {
//       width: "100%",
//       maxWidth: 1600,
//       margin: "0 auto",
//       position: "relative",
//     },
//     goldenPath: {
//       position: "absolute",
//       top: 0,
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "2px",
//       height: "100%",
//       background: colors.goldGradient,
//       zIndex: 1,
//     },
//     diamondNode: {
//       position: "absolute",
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "24px",
//       height: "24px",
//       background: colors.goldGradient,
//       clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
//       zIndex: 2,
//       boxShadow: `0 0 20px ${colors.accent}`,
//     },
//     segment: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: "100px",
//       marginBottom: "220px",
//       position: "relative",
//       zIndex: 3,
//     },
//     segmentReverse: {
//       flexDirection: "row-reverse",
//     },
//     imageContainer: {
//       flex: "0 1 55%",
//       position: "relative",
//       perspective: "1200px",
//     },
//     imageWrapper: {
//       borderRadius: "8px",
//       overflow: "hidden",
//       boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
//       transformStyle: "preserve-3d",
//       position: "relative",
//       height: "600px",
//     },
//     imageWrapperHover: {
//       transform: "translateY(-20px)",
//     },
//     imageFrame: {
//       position: "absolute",
//       top: "-20px",
//       left: "-20px",
//       right: "-20px",
//       bottom: "-20px",
//       border: `2px solid transparent`,
//       borderRadius: "16px",
//       background: colors.goldGradient,
//       backgroundClip: "padding-box",
//       zIndex: -1,
//       opacity: 0,
//       transition: "all 0.6s ease",
//     },
//     imageFrameHover: {
//       opacity: 1,
//       transform: "scale(1.02)",
//     },
//     img: {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//       transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
//     },
//     imgHover: {
//       transform: "scale(1.08)",
//     },
//     contentWrapper: {
//       flex: "0 1 40%",
//       padding: "60px 40px",
//       position: "relative",
//     },
//     sectionTag: {
//       display: "inline-block",
//       fontWeight: 500,
//       fontSize: "16px",
//       letterSpacing: "4px",
//       textTransform: "uppercase",
//       marginBottom: "30px",
//       color: colors.accent,
//       position: "relative",
//       fontFamily: "'Montserrat', sans-serif",
//     },
//     sectionTagDecoration: {
//       position: "absolute",
//       bottom: "-12px",
//       left: 0,
//       width: "60px",
//       height: "1px",
//       background: colors.accent,
//     },
//     sectionTitle: {
//       fontSize: "64px",
//       lineHeight: "1.1",
//       fontWeight: 700,
//       marginBottom: "40px",
//       color: colors.lightText,
//       fontStyle: "italic",
//       position: "relative",
//     },
//     sectionTitleHighlight: {
//       color: "transparent",
//       backgroundImage: colors.goldGradient,
//       WebkitBackgroundClip: "text",
//       backgroundClip: "text",
//       fontStyle: "italic",
//     },
//     paragraph: {
//       fontSize: "20px",
//       lineHeight: "1.8",
//       color: "#CCCCCC",
//       marginBottom: "50px",
//       position: "relative",
//       paddingLeft: "40px",
//       fontFamily: "'Montserrat', sans-serif",
//       fontWeight: 300,
//     },
//     paragraphDecor: {
//       position: "absolute",
//       left: 0,
//       top: 0,
//       height: "100%",
//       width: "1px",
//       background: colors.goldGradient,
//     },
//     button: {
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "22px 52px",
//       borderRadius: "0",
//       fontWeight: 500,
//       fontSize: "16px",
//       textTransform: "uppercase",
//       letterSpacing: "2px",
//       color: colors.darkBg,
//       background: colors.goldGradient,
//       border: "none",
//       cursor: "pointer",
//       transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
//       position: "relative",
//       overflow: "hidden",
//       fontFamily: "'Montserrat', sans-serif",
//     },
//     buttonHover: {
//       transform: "translateY(-8px)",
//       boxShadow: `0 20px 40px rgba(212, 175, 55, 0.5)`,
//     },
//     buttonAfter: {
//       content: '""',
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       background: "rgba(255,255,255,0.3)",
//       transform: "translateX(-100%) skewX(-30deg)",
//       transition: "transform 0.8s ease",
//     },
//     buttonHoverAfter: {
//       transform: "translateX(200%) skewX(-30deg)",
//     },
//     floatingFlourish: {
//       position: "absolute",
//       fontFamily: "'Playfair Display', serif",
//       fontSize: "240px",
//       fontWeight: 700,
//       color: "rgba(212, 175, 55, 0.05)",
//       zIndex: 0,
//       userSelect: "none",
//     },
//   };

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=Montserrat:wght@300;400;500;600&display=swap');
          
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-30px); }
//             100% { transform: translateY(0px); }
//           }
          
//           @keyframes shimmer {
//             0% { background-position: -1000px 0; }
//             100% { background-position: 1000px 0; }
//           }
          
//           .snake-image-container:hover .snake-image-wrapper {
//             animation: float 8s ease-in-out infinite;
//           }
          
//           .golden-shimmer {
//             background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
//             background-size: 200% 100%;
//             animation: shimmer 3s infinite;
//           }
          
//           @media (max-width: 1400px) {
//             .snake-section-title {
//               font-size: 54px !important;
//             }
            
//             .snake-image-wrapper {
//               height: 500px !important;
//             }
//           }
          
//           @media (max-width: 1200px) {
//             .snake-segment {
//               flex-direction: column !important;
//               gap: 80px !important;
//               margin-bottom: 180px !important;
//             }
            
//             .snake-image-container, .snake-content {
//               flex: 1 1 100% !important;
//               width: 100% !important;
//             }
            
//             .snake-section-title {
//               font-size: 48px !important;
//             }
            
//             .snake-image-wrapper {
//               height: 450px !important;
//             }
//           }
          
//           @media (max-width: 768px) {
//             .snake-section-title {
//               font-size: 36px !important;
//             }
            
//             .snake-image-wrapper {
//               height: 380px !important;
//             }
            
//             .snake-paragraph {
//               font-size: 18px !important;
//               padding-left: 20px !important;
//             }
//           }
//         `}
//       </style>

//       <section style={styles.section}>
//         {/* Golden path */}
//         <div style={styles.goldenPath} className="golden-shimmer" aria-hidden="true"></div>
        
//         {/* Diamond nodes */}
//         <div style={{ ...styles.diamondNode, top: "25%" }} aria-hidden="true"></div>
//         <div style={{ ...styles.diamondNode, top: "75%" }} aria-hidden="true"></div>
        
//         {/* Decorative flourishes */}
//         <div style={{ ...styles.floatingFlourish, top: "10%", left: "5%" }} aria-hidden="true">“</div>
//         <div style={{ ...styles.floatingFlourish, bottom: "10%", right: "5%" }} aria-hidden="true">”</div>

//         <div style={styles.container}>
//           {/* First Segment - Purpose */}
//           <div className="snake-segment" style={styles.segment}>
//             <motion.div 
//               className="snake-image-container"
//               style={styles.imageContainer}
//               initial={{ opacity: 0, x: -100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-200px" }}
//               transition={{ duration: 1 }}
//             >
//               <div 
//                 className="snake-image-wrapper"
//                 style={{
//                   ...styles.imageWrapper,
//                   ...(hoveredCard === "purpose" ? styles.imageWrapperHover : {}),
//                 }}
//                 onMouseEnter={() => setHoveredCard("purpose")}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <motion.img
//                   className="snake-img"
//                   style={{
//                     ...styles.img,
//                     objectPosition: imagePositions.purpose.objectPosition,
//                     ...(hoveredCard === "purpose" ? styles.imgHover : {}),
//                   }}
//                   animate={hoveredCard === "purpose" ? {
//                     transform: "scale(1.08)",
//                     transformOrigin: imagePositions.purpose.transformOrigin
//                   } : {}}
//                   src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1600&q=80"
//                   alt="Artisan preparing traditional South Indian spices"
//                   loading="lazy"
//                 />
//               </div>
//               <div 
//                 style={{
//                   ...styles.imageFrame,
//                   ...(hoveredCard === "purpose" ? styles.imageFrameHover : {}),
//                 }}
//                 aria-hidden="true"
//               ></div>
//             </motion.div>
            
//             <motion.div 
//               className="snake-content"
//               style={styles.contentWrapper}
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-200px" }}
//               transition={{ duration: 1, delay: 0.3 }}
//             >
//               <div style={{ position: 'relative' }}>
//                 <span style={styles.sectionTag}>
//                   Our Essence
//                   <span style={styles.sectionTagDecoration}></span>
//                 </span>
//               </div>
              
//               <h2 style={styles.sectionTitle} className="snake-section-title">
//                 Timeless <span style={styles.sectionTitleHighlight}>Tradition</span>
//               </h2>
              
//               <div style={styles.paragraph} className="snake-paragraph">
//                 <span style={styles.paragraphDecor}></span>
//                 We honor centuries-old South Indian culinary arts through meticulous 
//                 craftsmanship. Each spice blend tells a story of heritage, perfected 
//                 over generations and now presented with contemporary elegance.
//               </div>
              
//               <motion.button
//                 style={styles.button}
//                 whileHover="hover"
//                 onHoverStart={() => setHoveredButton("purpose")}
//                 onHoverEnd={() => setHoveredButton(null)}
//               >
//                 <span>Discover Craftsmanship</span>
//                 <motion.span
//                   style={styles.buttonAfter}
//                   animate={hoveredButton === "purpose" ? "hover" : ""}
//                   variants={{
//                     hover: { transform: "translateX(200%) skewX(-30deg)" }
//                   }}
//                 ></motion.span>
//               </motion.button>
//             </motion.div>
//           </div>

//           {/* Second Segment - Vision */}
//           <div className="snake-segment" style={{ ...styles.segment, ...styles.segmentReverse }}>
//             <motion.div 
//               className="snake-image-container"
//               style={styles.imageContainer}
//               initial={{ opacity: 0, x: 100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-200px" }}
//               transition={{ duration: 1 }}
//             >
//               <div 
//                 className="snake-image-wrapper"
//                 style={{
//                   ...styles.imageWrapper,
//                   ...(hoveredCard === "vision" ? styles.imageWrapperHover : {}),
//                 }}
//                 onMouseEnter={() => setHoveredCard("vision")}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <motion.img
//                   className="snake-img"
//                   style={{
//                     ...styles.img,
//                     objectPosition: imagePositions.vision.objectPosition,
//                     ...(hoveredCard === "vision" ? styles.imgHover : {}),
//                   }}
//                   animate={hoveredCard === "vision" ? {
//                     transform: "scale(1.08)",
//                     transformOrigin: imagePositions.vision.transformOrigin
//                   } : {}}
//                   src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
//                   alt="Modern presentation of South Indian cuisine"
//                   loading="lazy"
//                 />
//               </div>
//               <div 
//                 style={{
//                   ...styles.imageFrame,
//                   ...(hoveredCard === "vision" ? styles.imageFrameHover : {}),
//                 }}
//                 aria-hidden="true"
//               ></div>
//             </motion.div>
            
//             <motion.div 
//               className="snake-content"
//               style={styles.contentWrapper}
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-200px" }}
//               transition={{ duration: 1, delay: 0.3 }}
//             >
//               <div style={{ position: 'relative' }}>
//                 <span style={styles.sectionTag}>
//                   Our Aspiration
//                   <span style={styles.sectionTagDecoration}></span>
//                 </span>
//               </div>
              
//               <h2 style={styles.sectionTitle} className="snake-section-title">
//                 Visionary <span style={styles.sectionTitleHighlight}>Innovation</span>
//               </h2>
              
//               <div style={styles.paragraph} className="snake-paragraph">
//                 <span style={styles.paragraphDecor}></span>
//                 We're redefining global gastronomy by fusing South Indian 
//                 authenticity with modern culinary artistry. Our vision transcends 
//                 borders while remaining rooted in the sacred traditions of spice.
//               </div>
              
//               <motion.button
//                 style={styles.button}
//                 whileHover="hover"
//                 onHoverStart={() => setHoveredButton("vision")}
//                 onHoverEnd={() => setHoveredButton(null)}
//               >
//                 <span>Explore Innovation</span>
//                 <motion.span
//                   style={styles.buttonAfter}
//                   animate={hoveredButton === "vision" ? "hover" : ""}
//                   variants={{
//                     hover: { transform: "translateX(200%) skewX(-30deg)" }
//                   }}
//                 ></motion.span>
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SnakeLayoutPurposeVision;

//----------working code----//

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const SnakeLayoutPurposeVision = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [hoveredButton, setHoveredButton] = useState(null);

//   // Premium color palette
//   const colors = {
//     goldGradient: "linear-gradient(135deg, #D4AF37 0%, #F9D423 100%)",
//     platinumGradient: "linear-gradient(135deg, #E0E0E0 0%, #B8B8B8 100%)",
//     darkBg: "#0A0A0A",
//     lightText: "#F5F5F5",
//     accent: "#D4AF37"
//   };

//   // Image positioning system
//   const imagePositions = {
//     purpose: {
//       objectPosition: "center 30%",
//       transformOrigin: "center top"
//     },
//     vision: {
//       objectPosition: "center 65%",
//       transformOrigin: "center bottom"
//     }
//   };

//   const styles = {
//     section: {
//       position: "relative",
//       padding: "80px 40px", // Reduced from 180px
//       background: colors.darkBg,
//       color: colors.lightText,
//       overflow: "hidden",
//       fontFamily: "'Playfair Display', serif",
//     },
//     container: {
//       width: "100%",
//       maxWidth: 1600,
//       margin: "0 auto",
//       position: "relative",
//     },
//     goldenPath: {
//       position: "absolute",
//       top: 0,
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "2px",
//       height: "100%",
//       background: colors.goldGradient,
//       zIndex: 1,
//     },
//     diamondNode: {
//       position: "absolute",
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "20px", // Reduced from 24px
//       height: "20px", // Reduced from 24px
//       background: colors.goldGradient,
//       clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
//       zIndex: 2,
//       boxShadow: `0 0 15px ${colors.accent}`, // Reduced from 20px
//     },
//     segment: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: "60px", // Reduced from 100px
//       marginBottom: "120px", // Reduced from 220px
//       position: "relative",
//       zIndex: 3,
//     },
//     segmentReverse: {
//       flexDirection: "row-reverse",
//     },
//     imageContainer: {
//       flex: "0 1 55%",
//       position: "relative",
//       perspective: "1200px",
//     },
//     imageWrapper: {
//       borderRadius: "8px",
//       overflow: "hidden",
//       boxShadow: "0 20px 50px rgba(0,0,0,0.5)", // Reduced from 40px 80px
//       transformStyle: "preserve-3d",
//       position: "relative",
//       height: "450px", // Reduced from 600px
//     },
//     imageWrapperHover: {
//       transform: "translateY(-15px)", // Reduced from 20px
//     },
//     imageFrame: {
//       position: "absolute",
//       top: "-15px", // Reduced from 20px
//       left: "-15px", // Reduced from 20px
//       right: "-15px", // Reduced from 20px
//       bottom: "-15px", // Reduced from 20px
//       border: `2px solid transparent`,
//       borderRadius: "16px",
//       background: colors.goldGradient,
//       backgroundClip: "padding-box",
//       zIndex: -1,
//       opacity: 0,
//       transition: "all 0.6s ease",
//     },
//     imageFrameHover: {
//       opacity: 1,
//       transform: "scale(1.02)",
//     },
//     img: {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//       transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
//     },
//     imgHover: {
//       transform: "scale(1.05)", // Reduced from 1.08
//     },
//     contentWrapper: {
//       flex: "0 1 40%",
//       padding: "40px 30px", // Reduced from 60px 40px
//       position: "relative",
//     },
//     sectionTag: {
//       display: "inline-block",
//       fontWeight: 500,
//       fontSize: "14px", // Reduced from 16px
//       letterSpacing: "3px", // Reduced from 4px
//       textTransform: "uppercase",
//       marginBottom: "20px", // Reduced from 30px
//       color: colors.accent,
//       position: "relative",
//       fontFamily: "'Montserrat', sans-serif",
//     },
//     sectionTagDecoration: {
//       position: "absolute",
//       bottom: "-8px", // Reduced from 12px
//       left: 0,
//       width: "50px", // Reduced from 60px
//       height: "1px",
//       background: colors.accent,
//     },
//     sectionTitle: {
//       fontSize: "48px", // Reduced from 64px
//       lineHeight: "1.1",
//       fontWeight: 700,
//       marginBottom: "30px", // Reduced from 40px
//       color: colors.lightText,
//       fontStyle: "italic",
//       position: "relative",
//     },
//     sectionTitleHighlight: {
//       color: "transparent",
//       backgroundImage: colors.goldGradient,
//       WebkitBackgroundClip: "text",
//       backgroundClip: "text",
//       fontStyle: "italic",
//     },
//     paragraph: {
//       fontSize: "18px", // Reduced from 20px
//       lineHeight: "1.7", // Reduced from 1.8
//       color: "#CCCCCC",
//       marginBottom: "40px", // Reduced from 50px
//       position: "relative",
//       paddingLeft: "30px", // Reduced from 40px
//       fontFamily: "'Montserrat', sans-serif",
//       fontWeight: 300,
//     },
//     paragraphDecor: {
//       position: "absolute",
//       left: 0,
//       top: 0,
//       height: "100%",
//       width: "1px",
//       background: colors.goldGradient,
//     },
//     button: {
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "18px 40px", // Reduced from 22px 52px
//       borderRadius: "0",
//       fontWeight: 500,
//       fontSize: "14px", // Reduced from 16px
//       textTransform: "uppercase",
//       letterSpacing: "1.5px", // Reduced from 2px
//       color: colors.darkBg,
//       background: colors.goldGradient,
//       border: "none",
//       cursor: "pointer",
//       transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
//       position: "relative",
//       overflow: "hidden",
//       fontFamily: "'Montserrat', sans-serif",
//     },
//     buttonHover: {
//       transform: "translateY(-5px)", // Reduced from 8px
//       boxShadow: `0 15px 30px rgba(212, 175, 55, 0.4)`, // Reduced from 20px 40px
//     },
//     buttonAfter: {
//       content: '""',
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       background: "rgba(255,255,255,0.3)",
//       transform: "translateX(-100%) skewX(-30deg)",
//       transition: "transform 0.8s ease",
//     },
//     buttonHoverAfter: {
//       transform: "translateX(200%) skewX(-30deg)",
//     },
//     floatingFlourish: {
//       position: "absolute",
//       fontFamily: "'Playfair Display', serif",
//       fontSize: "180px", // Reduced from 240px
//       fontWeight: 700,
//       color: "rgba(212, 175, 55, 0.05)",
//       zIndex: 0,
//       userSelect: "none",
//     },
//   };

//   return (
//     <>
//       <style>
//          {`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=Montserrat:wght@300;400;500;600&display=swap');
    
//     @keyframes float {
//       0% { transform: translateY(0px); }
//       50% { transform: translateY(-20px); }
//       100% { transform: translateY(0px); }
//     }
    
//     @keyframes shimmer {
//       0% { background-position: -1000px 0; }
//       100% { background-position: 1000px 0; }
//     }
    
//     .snake-image-container:hover .snake-image-wrapper {
//       animation: float 8s ease-in-out infinite;
//     }
    
//     .golden-shimmer {
//       background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
//       background-size: 200% 100%;
//       animation: shimmer 3s infinite;
//     }

//     /* Add this new rule to hide golden path in mobile */
//     @media (max-width: 768px) {
//       .golden-path {
//         display: none !important;
//       }
      
//       .snake-section-title {
//         font-size: 28px !important;
//       }
      
//       .snake-image-wrapper {
//         height: 280px !important;
//       }
      
//       .snake-paragraph {
//         font-size: 16px !important;
//         padding-left: 20px !important;
//       }
//     }
    
//     @media (max-width: 1400px) {
//       .snake-section-title {
//         font-size: 42px !important;
//       }
      
//       .snake-image-wrapper {
//         height: 400px !important;
//       }
//     }
    
//     @media (max-width: 1200px) {
//       .snake-segment {
//         flex-direction: column !important;
//         gap: 60px !important;
//         margin-bottom: 120px !important;
//       }
      
//       .snake-image-container, .snake-content {
//         flex: 1 1 100% !important;
//         width: 100% !important;
//       }
      
//       .snake-section-title {
//         font-size: 36px !important;
//       }
      
//       .snake-image-wrapper {
//         height: 350px !important;
//       }
//     }
//   `}
//       </style>

//       <section style={styles.section}>
//         {/* Golden path */}
//         <div style={styles.goldenPath} className="golden-path golden-shimmer" aria-hidden="true"></div>
        
//         {/* Diamond nodes */}
//         <div style={{ ...styles.diamondNode, top: "25%" }} aria-hidden="true"></div>
//         <div style={{ ...styles.diamondNode, top: "75%" }} aria-hidden="true"></div>
        
//         {/* Decorative flourishes */}
//         <div style={{ ...styles.floatingFlourish, top: "10%", left: "5%" }} aria-hidden="true">"</div>
//         <div style={{ ...styles.floatingFlourish, bottom: "10%", right: "5%" }} aria-hidden="true">"</div>

//         <div style={styles.container}>
//           {/* First Segment - Purpose */}
//           <div className="snake-segment" style={styles.segment}>
//             <motion.div 
//               className="snake-image-container"
//               style={styles.imageContainer}
//               initial={{ opacity: 0, x: -100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }} // Reduced from -200px
//               transition={{ duration: 0.8 }} // Reduced from 1s
//             >
//               <div 
//                 className="snake-image-wrapper"
//                 style={{
//                   ...styles.imageWrapper,
//                   ...(hoveredCard === "purpose" ? styles.imageWrapperHover : {}),
//                 }}
//                 onMouseEnter={() => setHoveredCard("purpose")}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <motion.img
//                   className="snake-img"
//                   style={{
//                     ...styles.img,
//                     objectPosition: imagePositions.purpose.objectPosition,
//                     ...(hoveredCard === "purpose" ? styles.imgHover : {}),
//                   }}
//                   animate={hoveredCard === "purpose" ? {
//                     transform: "scale(1.05)", // Reduced from 1.08
//                     transformOrigin: imagePositions.purpose.transformOrigin
//                   } : {}}
//                   src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1600&q=80"
//                   alt="Artisan preparing traditional South Indian spices"
//                   loading="lazy"
//                 />
//               </div>
//               <div 
//                 style={{
//                   ...styles.imageFrame,
//                   ...(hoveredCard === "purpose" ? styles.imageFrameHover : {}),
//                 }}
//                 aria-hidden="true"
//               ></div>
//             </motion.div>
            
//             <motion.div 
//               className="snake-content"
//               style={styles.contentWrapper}
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }} // Reduced from -200px
//               transition={{ duration: 0.8, delay: 0.2 }} // Reduced from 1s and 0.3s
//             >
//               <div style={{ position: 'relative' }}>
//                 <span style={styles.sectionTag}>
//                   Our Essence
//                   <span style={styles.sectionTagDecoration}></span>
//                 </span>
//               </div>
              
//               <h2 style={styles.sectionTitle} className="snake-section-title">
//                 Timeless <span style={styles.sectionTitleHighlight}>Tradition</span>
//               </h2>
              
//               <div style={styles.paragraph} className="snake-paragraph">
//                 <span style={styles.paragraphDecor}></span>
//                 We honor centuries-old South Indian culinary arts through meticulous 
//                 craftsmanship. Each spice blend tells a story of heritage, perfected 
//                 over generations and now presented with contemporary elegance.
//               </div>
              
//               <motion.button
//                 style={styles.button}
//                 whileHover="hover"
//                 onHoverStart={() => setHoveredButton("purpose")}
//                 onHoverEnd={() => setHoveredButton(null)}
//               >
//                 <span>Discover Craftsmanship</span>
//                 <motion.span
//                   style={styles.buttonAfter}
//                   animate={hoveredButton === "purpose" ? "hover" : ""}
//                   variants={{
//                     hover: { transform: "translateX(200%) skewX(-30deg)" }
//                   }}
//                 ></motion.span>
//               </motion.button>
//             </motion.div>
//           </div>

//           {/* Second Segment - Vision */}
//           <div className="snake-segment" style={{ ...styles.segment, ...styles.segmentReverse }}>
//             <motion.div 
//               className="snake-image-container"
//               style={styles.imageContainer}
//               initial={{ opacity: 0, x: 100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }} // Reduced from -200px
//               transition={{ duration: 0.8 }} // Reduced from 1s
//             >
//               <div 
//                 className="snake-image-wrapper"
//                 style={{
//                   ...styles.imageWrapper,
//                   ...(hoveredCard === "vision" ? styles.imageWrapperHover : {}),
//                 }}
//                 onMouseEnter={() => setHoveredCard("vision")}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <motion.img
//                   className="snake-img"
//                   style={{
//                     ...styles.img,
//                     objectPosition: imagePositions.vision.objectPosition,
//                     ...(hoveredCard === "vision" ? styles.imgHover : {}),
//                   }}
//                   animate={hoveredCard === "vision" ? {
//                     transform: "scale(1.05)", // Reduced from 1.08
//                     transformOrigin: imagePositions.vision.transformOrigin
//                   } : {}}
//                   src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
//                   alt="Modern presentation of South Indian cuisine"
//                   loading="lazy"
//                 />
//               </div>
//               <div 
//                 style={{
//                   ...styles.imageFrame,
//                   ...(hoveredCard === "vision" ? styles.imageFrameHover : {}),
//                 }}
//                 aria-hidden="true"
//               ></div>
//             </motion.div>
            
//             <motion.div 
//               className="snake-content"
//               style={styles.contentWrapper}
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }} // Reduced from -200px
//               transition={{ duration: 0.8, delay: 0.2 }} // Reduced from 1s and 0.3s
//             >
//               <div style={{ position: 'relative' }}>
//                 <span style={styles.sectionTag}>
//                   Our Aspiration
//                   <span style={styles.sectionTagDecoration}></span>
//                 </span>
//               </div>
              
//               <h2 style={styles.sectionTitle} className="snake-section-title">
//                 Visionary <span style={styles.sectionTitleHighlight}>Innovation</span>
//               </h2>
              
//               <div style={styles.paragraph} className="snake-paragraph">
//                 <span style={styles.paragraphDecor}></span>
//                 We're redefining global gastronomy by fusing South Indian 
//                 authenticity with modern culinary artistry. Our vision transcends 
//                 borders while remaining rooted in the sacred traditions of spice.
//               </div>
              
//               <motion.button
//                 style={styles.button}
//                 whileHover="hover"
//                 onHoverStart={() => setHoveredButton("vision")}
//                 onHoverEnd={() => setHoveredButton(null)}
//               >
//                 <span>Explore Innovation</span>
//                 <motion.span
//                   style={styles.buttonAfter}
//                   animate={hoveredButton === "vision" ? "hover" : ""}
//                   variants={{
//                     hover: { transform: "translateX(200%) skewX(-30deg)" }
//                   }}
//                 ></motion.span>
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SnakeLayoutPurposeVision;



import React, { useState } from "react";
import { motion } from "framer-motion";
import "./SnakeLayoutPurposeVision.css";
import vision from '../../../assets/mission1.webp';
import purpose from '../../../assets/ouressence.jpg';

const SnakeLayoutPurposeVision = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Premium color palette
  const colors = {
    goldGradient: "linear-gradient(135deg, #D4AF37 0%, #F9D423 100%)",
    platinumGradient: "linear-gradient(135deg, #E0E0E0 0%, #B8B8B8 100%)",
    darkBg: "#0A0A0A",
    lightText: "#F5F5F5",
    accent: "#D4AF37"
  };

  // Image positioning system
  const imagePositions = {
    purpose: {
      objectPosition: "center 30%",
      transformOrigin: "center top"
    },
    vision: {
      objectPosition: "center 65%",
      transformOrigin: "center bottom"
    }
  };

  const styles = {
    section: {
      position: "relative",
      padding: "80px 40px",
      background: colors.darkBg,
      color: colors.lightText,
      overflow: "hidden",
      fontFamily: "'Playfair Display', serif",
    },
    container: {
      width: "100%",
      maxWidth: 1600,
      margin: "0 auto",
      position: "relative",
    },
    goldenPath: {
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "2px",
      height: "100%",
      background: colors.goldGradient,
      zIndex: 1,
    },
    diamondNode: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      width: "20px",
      height: "20px",
      background: colors.goldGradient,
      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      zIndex: 2,
      boxShadow: `0 0 15px ${colors.accent}`,
    },
    segment: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "60px",
      marginBottom: "120px",
      position: "relative",
      zIndex: 3,
    },
    segmentReverse: {
      flexDirection: "row-reverse",
    },
    imageContainer: {
      flex: "0 1 55%",
      position: "relative",
      perspective: "1200px",
    },
    imageWrapper: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
      transformStyle: "preserve-3d",
      position: "relative",
      height: "450px",
    },
    imageWrapperHover: {
      transform: "translateY(-15px)",
    },
    imageFrame: {
      position: "absolute",
      top: "-15px",
      left: "-15px",
      right: "-15px",
      bottom: "-15px",
      border: `2px solid transparent`,
      borderRadius: "16px",
      background: colors.goldGradient,
      backgroundClip: "padding-box",
      zIndex: -1,
      opacity: 0,
      transition: "all 0.6s ease",
    },
    imageFrameHover: {
      opacity: 1,
      transform: "scale(1.02)",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
    },
    imgHover: {
      transform: "scale(1.05)",
    },
    contentWrapper: {
      flex: "0 1 40%",
      padding: "40px 30px",
      position: "relative",
    },
    sectionTag: {
      display: "inline-block",
      fontWeight: 500,
      fontSize: "14px",
      letterSpacing: "3px",
      textTransform: "uppercase",
      marginBottom: "20px",
      color: colors.accent,
      position: "relative",
      fontFamily: "'Montserrat', sans-serif",
    },
    sectionTagDecoration: {
      position: "absolute",
      bottom: "-8px",
      left: 0,
      width: "50px",
      height: "1px",
      background: colors.accent,
    },
    sectionTitle: {
      fontSize: "48px",
      lineHeight: "1.1",
      fontWeight: 700,
      marginBottom: "30px",
      color: colors.lightText,
      fontStyle: "italic",
      position: "relative",
    },
    sectionTitleHighlight: {
      color: "transparent",
      backgroundImage: colors.goldGradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      fontStyle: "italic",
    },
    paragraph: {
      fontSize: "18px",
      lineHeight: "1.7",
      color: "#CCCCCC",
      marginBottom: "40px",
      position: "relative",
      paddingLeft: "30px",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 300,
    },
    paragraphDecor: {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100%",
      width: "1px",
      background: colors.goldGradient,
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "18px 40px",
      borderRadius: "0",
      fontWeight: 500,
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      color: colors.darkBg,
      background: colors.goldGradient,
      border: "none",
      cursor: "pointer",
      transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Montserrat', sans-serif",
    },
    buttonAfter: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255,255,255,0.3)",
      transform: "translateX(-100%) skewX(-30deg)",
      transition: "transform 0.8s ease",
    },
    floatingFlourish: {
      position: "absolute",
      fontFamily: "'Playfair Display', serif",
      fontSize: "180px",
      fontWeight: 700,
      color: "rgba(212, 175, 55, 0.05)",
      zIndex: 0,
      userSelect: "none",
    },
  };

  return (
    <section style={styles.section}>
      {/* Golden path - will be hidden in mobile via CSS */}
      <div style={styles.goldenPath} className="golden-path golden-shimmer" aria-hidden="true"></div>
      
      {/* Diamond nodes */}
      <div style={{ ...styles.diamondNode, top: "25%" }} aria-hidden="true"></div>
      <div style={{ ...styles.diamondNode, top: "75%" }} aria-hidden="true"></div>
      
      {/* Decorative flourishes */}
      <div style={{ ...styles.floatingFlourish, top: "10%", left: "5%" }} aria-hidden="true">"</div>
      <div style={{ ...styles.floatingFlourish, bottom: "10%", right: "5%" }} aria-hidden="true">"</div>

      <div style={styles.container}>
        {/* First Segment - Purpose */}
        <div className="snake-segment" style={styles.segment}>
          <motion.div 
            className="snake-image-container"
            style={styles.imageContainer}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="snake-image-wrapper"
              style={{
                ...styles.imageWrapper,
                ...(hoveredCard === "purpose" ? styles.imageWrapperHover : {}),
              }}
              onMouseEnter={() => setHoveredCard("purpose")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.img
                className="snake-img"
                style={{
                  ...styles.img,
                  objectPosition: imagePositions.purpose.objectPosition,
                  ...(hoveredCard === "purpose" ? styles.imgHover : {}),
                }}
                animate={hoveredCard === "purpose" ? {
                  transform: "scale(1.05)",
                  transformOrigin: imagePositions.purpose.transformOrigin
                } : {}}
                // src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1600&q=80"
                src={purpose}
                alt="Artisan preparing traditional South Indian spices"
                loading="lazy"
              />
            </div>
            <div 
              style={{
                ...styles.imageFrame,
                ...(hoveredCard === "purpose" ? styles.imageFrameHover : {}),
              }}
              aria-hidden="true"
            ></div>
          </motion.div>
          
          <motion.div 
            className="snake-content"
            style={styles.contentWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ position: 'relative' }}>
              <span style={styles.sectionTag}>
                Our Essence
                <span style={styles.sectionTagDecoration}></span>
              </span>
            </div>
            
            <h2 style={styles.sectionTitle} className="snake-section-title">
              Living <span style={styles.sectionTitleHighlight}>Tradition</span>
            </h2>
            
            <div style={styles.paragraph} className="snake-paragraph">
              <span style={styles.paragraphDecor}></span>
             To deliver authentic South Indian flavors with love, while maintaining traditional aroma,
              taste, and texture in a convenient, modern format.
              We aim to preserve heritage, connect generations, and spark culinary inspiration.
            </div>
            
            <motion.button
              style={styles.button}
              whileHover="hover"
              onHoverStart={() => setHoveredButton("purpose")}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <span>Discover Craftsmanship</span>
              <motion.span
                style={styles.buttonAfter}
                animate={hoveredButton === "purpose" ? "hover" : ""}
                variants={{
                  hover: { transform: "translateX(200%) skewX(-30deg)" }
                }}
              ></motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Second Segment - Vision */}
        <div className="snake-segment" style={{ ...styles.segment, ...styles.segmentReverse }}>
          <motion.div 
            className="snake-image-container"
            style={styles.imageContainer}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="snake-image-wrapper"
              style={{
                ...styles.imageWrapper,
                ...(hoveredCard === "vision" ? styles.imageWrapperHover : {}),
              }}
              onMouseEnter={() => setHoveredCard("vision")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.img
                className="snake-img"
                style={{
                  ...styles.img,
                  objectPosition: imagePositions.vision.objectPosition,
                  ...(hoveredCard === "vision" ? styles.imgHover : {}),
                }}
                animate={hoveredCard === "vision" ? {
                  transform: "scale(1.05)",
                  transformOrigin: imagePositions.vision.transformOrigin
                } : {}}
                // src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
                src={vision}
                alt="Modern presentation of South Indian cuisine"
                loading="lazy"
              />
            </div>
            <div 
              style={{
                ...styles.imageFrame,
                ...(hoveredCard === "vision" ? styles.imageFrameHover : {}),
              }}
              aria-hidden="true"
            ></div>
          </motion.div>
          
          <motion.div 
            className="snake-content"
            style={styles.contentWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ position: 'relative' }}>
              <span style={styles.sectionTag}>
                Our Aspiration
                <span style={styles.sectionTagDecoration}></span>
              </span>
            </div>
            
            <h2 style={styles.sectionTitle} className="snake-section-title">
              Visionary <span style={styles.sectionTitleHighlight}>Innovation</span>
            </h2>
            
            <div style={styles.paragraph} className="snake-paragraph">
              <span style={styles.paragraphDecor}></span>
              To be the global face of South Indian cuisine, known for authenticity, innovation,
               and the delight we bring to every meal. We aspire to be the most trusted name in the food industry.
            </div>
            
            <motion.button
              style={styles.button}
              whileHover="hover"
              onHoverStart={() => setHoveredButton("vision")}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <span>Explore Innovation</span>
              <motion.span
                style={styles.buttonAfter}
                animate={hoveredButton === "vision" ? "hover" : ""}
                variants={{
                  hover: { transform: "translateX(200%) skewX(-30deg)" }
                }}
              ></motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SnakeLayoutPurposeVision;