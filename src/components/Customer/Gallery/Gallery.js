// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "lightbox2/dist/css/lightbox.min.css";
// import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
// import "./Gallery.css";

// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import WhatApp from "../WhatsApp/WhatApp";

// const Gallery = () => {
//   const [activeTab, setActiveTab] = useState("photo");

//   useEffect(() => {
//     AOS.init({
//       offset: 120,
//       delay: 0,
//       duration: 3000,
//       easing: "ease",
//       once: false,
//       mirror: false,
//       anchorPlacement: "top-bottom",
//     });
//   }, []);

//   const galleryImages = [
//     {
//       large: require("../../../assets/Large/1.png"),
//       thumb: require("../../../assets/small/1.png"),
//     },
//     {
//       large: require("../../../assets/Large/2.png"),
//       thumb: require("../../../assets/small/2.png"),
//     },
//     {
//       large: require("../../../assets/Large/17.png"),
//       thumb: require("../../../assets/small/17.png"),
//     },
//     {
//       large: require("../../../assets/Large/4.png"),
//       thumb: require("../../../assets/small/4.png"),
//     },
//     {
//       large: require("../../../assets/Large/5.png"),
//       thumb: require("../../../assets/small/5.png"),
//     },
//     {
//       large: require("../../../assets/Large/6.png"),
//       thumb: require("../../../assets/small/6.png"),
//     },
//     {
//       large: require("../../../assets/Large/7.png"),
//       thumb: require("../../../assets/small/7.png"),
//     },
//     {
//       large: require("../../../assets/Large/9.png"),
//       thumb: require("../../../assets/small/9.png"),
//     },
//     {
//       large: require("../../../assets/Large/10.png"),
//       thumb: require("../../../assets/small/10.png"),
//     },
//     {
//       large: require("../../../assets/Large/11.png"),
//       thumb: require("../../../assets/small/11.png"),
//     },
//     {
//       large: require("../../../assets/Large/12.png"),
//       thumb: require("../../../assets/small/12.png"),
//     },
//     {
//       large: require("../../../assets/Large/13.png"),
//       thumb: require("../../../assets/small/13.png"),
//     },
//     {
//       large: require("../../../assets/Large/14.png"),
//       thumb: require("../../../assets/small/14.png"),
//     },
//     {
//       large: require("../../../assets/Large/15.png"),
//       thumb: require("../../../assets/small/15.png"),
//     },
//     {
//       large: require("../../../assets/Large/16.png"),
//       thumb: require("../../../assets/small/16.png"),
//     },
//   ];

//   const galleryVideos = [
//     {
//       url: "https://www.youtube.com/embed/2CluFZKclto",
//       title: "Sample Video 1",
//     },
//     {
//       url: "https://www.youtube.com/embed/2CluFZKclto",
//       title: "Sample Video 2",
//     },
//     {
//       url: "https://www.youtube.com/embed/2CluFZKclto",
//       title: "Sample Video 3",
//     },
//     {
//       url: "https://www.youtube.com/embed/2CluFZKclto",
//       title: "Sample Video 4",
//     },
//   ];

//   return (
//     <>
//       <Header />
//       <WhatApp />
//       <div className="gallery-intro text-center mb-5 position-relative">
//         <h1 className="main-heading">Gallery</h1>
//         <p className="main-heading-para lead">
//           Explore moments captured in our gallery showcasing events, experiences, and more.
//         </p>

//      {/* Toggle Buttons */}
// <div style={{ position: "absolute", top: "10px", right: "10px" }}>
//   <button
//     className="btn btn-sm me-2"
//     style={{
//       backgroundColor: activeTab === "photo" ? "#601f2f" : "transparent",
//       color: activeTab === "photo" ? "#fff" : "#601f2f",
//       border: `1px solid #601f2f`,
//     }}
//     onClick={() => setActiveTab("photo")}
//   >
//     Photos
//   </button>
//   <button
//     className="btn btn-sm"
//     style={{
//       backgroundColor: activeTab === "video" ? "#601f2f" : "transparent",
//       color: activeTab === "video" ? "#fff" : "#601f2f",
//       border: `1px solid #601f2f`,
//     }}
//     onClick={() => setActiveTab("video")}
//   >
//     Videos
//   </button>
// </div>

//       </div>

//       {activeTab === "photo" ? (
//         <div className="gallery" style={{ paddingTop: "10px" }}>
//           {galleryImages.map((img, index) => (
//             <div className="gallery-item" key={index}>
//               <a href={img.large} data-lightbox="gallery">
//                 <img src={img.thumb} alt={`Image ${index + 1}`} />
//               </a>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="gallery video-gallery" style={{ padding: "10px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
//           {galleryVideos.map((video, index) => (
//             <div key={index} className="video-item" style={{ maxWidth: "400px" }}>
//               <iframe
//                 width="100%"
//                 height="225"
//                 src={video.url}
//                 title={video.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//               <p className="text-center mt-2">{video.title}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default Gallery;

// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "lightbox2/dist/css/lightbox.min.css";
// import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
// import "./Gallery.css";

// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import WhatApp from "../WhatsApp/WhatApp";

// const GalleryHeader = () => {
//   return (
//     <div className="gallery-hero">
//   {/* Particle animation background */}
//   <div className="particles">
//     {[...Array(30)].map((_, i) => (
//       <div 
//         key={i}
//         className="particle"
//         style={{
//           '--size': `${Math.random() * 8 + 2}px`,
//           '--delay': `${Math.random() * 5}s`,
//           '--duration': `${Math.random() * 20 + 10}s`,
//           '--x': `${Math.random() * 100}%`,
//           '--y': `${Math.random() * 100}%`,
//           '--opacity': `${Math.random() * 0.6 + 0.2}`,
//           '--blur': `${Math.random() * 3 + 1}px`
//         }}
//       />
//     ))}
//   </div>

//   {/* Geometric pattern overlay */}
//   <div className="geometric-pattern">
//     <div className="triangle-1"></div>
//     <div className="triangle-2"></div>
//     <div className="circle-1"></div>
//     <div className="circle-2"></div>
//   </div>

//   {/* Main content with layered text effect */}
//   <div className="hero-content" data-aos="fade-up">
//     <div className="text-layers">
//       <h1 className="layer-1">GALLERY</h1>
//       <h1 className="layer-2">GALLERY</h1>
//       <h1 className="layer-3">GALLERY</h1>
//     </div>
    
//     <div className="animated-divider">
//       <div className="line"></div>
//       <div className="dot"></div>
//       <div className="line"></div>
//     </div>
    
//     <p className="hero-subtitle">
//       <span className="subtitle-word">Capturing</span>
//       <span className="subtitle-word">Life's</span>
//       <span className="subtitle-word">Beautiful</span>
//       <span className="subtitle-word">Moments</span>
//     </p>
    
//     {/* Animated CTA button */}
//     <div className="cta-container">
//       <button className="cta-button">
//         <span>Explore Gallery</span>
//         <div className="arrow-circle">
//           <svg viewBox="0 0 24 24">
//             <path d="M5 12h14M12 5l7 7-7 7"/>
//           </svg>
//         </div>
//       </button>
//     </div>
//   </div>
// </div>
//   );
// };

// const Gallery = () => {
//   const [activeTab, setActiveTab] = useState("photo");
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     AOS.init({
//       offset: 100,
//       delay: 100,
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//       mirror: false,
//       anchorPlacement: "top-bottom",
//     });
//   }, []);

//   const galleryImages = [
//     { id: 1, large: require("../../../assets/Large/1.png"), thumb: require("../../../assets/small/1.png"), category: "event" },
//     { id: 2, large: require("../../../assets/Large/2.png"), thumb: require("../../../assets/small/2.png"), category: "event" },
//     { id: 17, large: require("../../../assets/Large/17.png"), thumb: require("../../../assets/small/17.png"), category: "people" },
//     { id: 4, large: require("../../../assets/Large/4.png"), thumb: require("../../../assets/small/4.png"), category: "venue" },
//     { id: 5, large: require("../../../assets/Large/5.png"), thumb: require("../../../assets/small/5.png"), category: "venue" },
//     { id: 6, large: require("../../../assets/Large/6.png"), thumb: require("../../../assets/small/6.png"), category: "event" },
//     { id: 7, large: require("../../../assets/Large/7.png"), thumb: require("../../../assets/small/7.png"), category: "people" },
//     { id: 9, large: require("../../../assets/Large/9.png"), thumb: require("../../../assets/small/9.png"), category: "event" },
//     { id: 10, large: require("../../../assets/Large/10.png"), thumb: require("../../../assets/small/10.png"), category: "venue" },
//     { id: 11, large: require("../../../assets/Large/11.png"), thumb: require("../../../assets/small/11.png"), category: "people" },
//     { id: 12, large: require("../../../assets/Large/12.png"), thumb: require("../../../assets/small/12.png"), category: "event" },
//     { id: 13, large: require("../../../assets/Large/13.png"), thumb: require("../../../assets/small/13.png"), category: "venue" },
//     { id: 14, large: require("../../../assets/Large/14.png"), thumb: require("../../../assets/small/14.png"), category: "people" },
//     { id: 15, large: require("../../../assets/Large/15.png"), thumb: require("../../../assets/small/15.png"), category: "event" },
//     { id: 16, large: require("../../../assets/Large/16.png"), thumb: require("../../../assets/small/16.png"), category: "venue" },
//   ];

//   const galleryVideos = [
//     { id: 1, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Wedding Highlights", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//     { id: 2, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Birthday Celebration", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//     { id: 3, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Corporate Event", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//     { id: 4, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Anniversary Party", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//   ];

//   const categories = ["all", ...new Set(galleryImages.map(img => img.category))];
//   const filteredImages = filter === "all" ? galleryImages : galleryImages.filter(img => img.category === filter);

//   return (
//     <>
//       <Header />
//       <WhatApp />
      
//       <GalleryHeader />
      
//       <div className="gallery-container">
//         {/* Tab Navigation */}
//         <div className="tab-navigation" data-aos="fade-up">
//           <div className="container">
//             <div className="d-flex justify-content-center gap-3">
//               <button
//                 className={`tab-btn ${activeTab === "photo" ? "active" : ""}`}
//                 onClick={() => setActiveTab("photo")}
//               >
//                 <i className="bi bi-images me-2"></i>Photo Gallery
//               </button>
//               <button
//                 className={`tab-btn ${activeTab === "video" ? "active" : ""}`}
//                 onClick={() => setActiveTab("video")}
//               >
//                 <i className="bi bi-camera-reels me-2"></i>Video Gallery
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="container py-5">
//           {activeTab === "photo" ? (
//             <>
//               {/* Filter Buttons */}
//               <div className="d-flex flex-wrap justify-content-center gap-2 mb-5" data-aos="fade-up">
//                 {categories.map(category => (
//                   <button
//                     key={category}
//                     className={`filter-btn ${filter === category ? 'active' : ''} text-capitalize`}
//                     onClick={() => setFilter(category)}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Photo Gallery */}
//               <div className="row g-4">
//                 {filteredImages.map((img) => (
//                   <div 
//                     className="col-md-4 col-lg-3" 
//                     key={img.id}
//                     data-aos="fade-up"
//                     data-aos-delay={img.id % 5 * 100}
//                   >
//                     <div className="gallery-card">
//                       <a href={img.large} data-lightbox="gallery" data-title={`Image ${img.id}`}>
//                         <img 
//                           src={img.thumb} 
//                           alt={`Image ${img.id}`} 
//                           className="img-fluid"
//                         />
//                         <div className="gallery-overlay">
//                           <div className="gallery-icon">
//                             <i className="bi bi-zoom-in"></i>
//                           </div>
//                         </div>
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Video Gallery */}
//               <h3 className="text-center mb-5" data-aos="fade-up">Event Videos</h3>
//               <div className="row g-4">
//                 {galleryVideos.map((video) => (
//                   <div 
//                     className="col-md-6" 
//                     key={video.id}
//                     data-aos="fade-up"
//                     data-aos-delay={video.id % 3 * 100}
//                   >
//                     <div className="video-card">
//                       <div className="video-thumbnail">
//                         <img src={video.thumb} alt={video.title} className="img-fluid" />
//                         <div className="play-button" onClick={() => window.open(video.url, '_blank')}>
//                           <i className="bi bi-play-fill"></i>
//                         </div>
//                       </div>
//                       <div className="video-info">
//                         <h5>{video.title}</h5>
//                         <button 
//                           className="watch-btn"
//                           onClick={() => window.open(video.url, '_blank')}
//                         >
//                           Watch Video <i className="bi bi-arrow-right"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Gallery;

// import React, { useEffect, useState, useRef } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "lightbox2/dist/css/lightbox.min.css";
// import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
// import "./Gallery.css";

// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import WhatApp from "../WhatsApp/WhatApp";

// const GalleryHeader = ({ scrollToGallery }) => {
//   return (
//     <div className="gallery-hero">
//       {/* Particle animation background */}
//       <div className="gallery-particles">
//         {[...Array(30)].map((_, i) => (
//           <div 
//             key={i}
//             className="gallery-particle"
//             style={{
//               '--size': `${Math.random() * 8 + 2}px`,
//               '--delay': `${Math.random() * 5}s`,
//               '--duration': `${Math.random() * 20 + 10}s`,
//               '--x': `${Math.random() * 100}%`,
//               '--y': `${Math.random() * 100}%`,
//               '--opacity': `${Math.random() * 0.6 + 0.2}`,
//               '--blur': `${Math.random() * 3 + 1}px`,
//               '--color': `hsl(${Math.random() * 60 + 330}, 80%, 60%)`
//             }}
//           />
//         ))}
//       </div>

//       {/* Gradient overlay */}
//       <div className="gallery-gradient-overlay"></div>

//       {/* Floating shapes */}
//       <div className="gallery-floating-shapes">
//         <div className="gallery-shape gallery-shape-1"></div>
//         <div className="gallery-shape gallery-shape-2"></div>
//         <div className="gallery-shape gallery-shape-3"></div>
//       </div>

//       {/* Main content with layered text effect */}
//       <div className="gallery-hero-content" data-aos="fade-up">
//         <div className="gallery-text-layers">
//           <h1 className="gallery-layer-1">GALLERY</h1>
//           <h1 className="gallery-layer-2">GALLERY</h1>
//           <h1 className="gallery-layer-3">GALLERY</h1>
//         </div>
        
//         <div className="gallery-animated-divider">
//           <div className="gallery-line"></div>
//           <div className="gallery-dot"></div>
//           <div className="gallery-line"></div>
//         </div>
        
//         <p className="gallery-hero-subtitle">
//           <span className="gallery-subtitle-word">Tempting</span>
//           <span className="gallery-subtitle-word">Tastebuds</span>
//           <span className="gallery-subtitle-word">One</span>
//           <span className="gallery-subtitle-word">Bite</span>
//           <span className="gallery-subtitle-word">at a Time</span>
//         </p>
        
//         {/* Animated CTA button */}
//         <div className="gallery-cta-container">
//           <button className="gallery-cta-button" onClick={scrollToGallery}>
//             <span>Explore Gallery</span>
//             <div className="gallery-arrow-circle">
//               <svg viewBox="0 0 24 24">
//                 <path d="M5 12h14M12 5l7 7-7 7"/>
//               </svg>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Gallery = () => {
//   const [activeTab, setActiveTab] = useState("photo");
//   const [filter, setFilter] = useState("all");
//   const galleryRef = useRef(null);

//   useEffect(() => {
//     AOS.init({
//       offset: 100,
//       delay: 100,
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//       mirror: false,
//       anchorPlacement: "top-bottom",
//     });
    
//   }, []);

//   const scrollToGallery = () => {
//     galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const galleryImages = [
//     { id: 1, large: require("../../../assets/Large/event1.jpg"), thumb: require("../../../assets/small/event1.jpg"), category: "event" },
//     { id: 2, large: require("../../../assets/Large/event2.jpg"), thumb: require("../../../assets/small/event2.jpg"), category: "event" },
//     { id: 17, large: require("../../../assets/Large/people1.jpg"), thumb: require("../../../assets/small/people1.jpg"), category: "people" },
//     { id: 4, large: require("../../../assets/Large/4.png"), thumb: require("../../../assets/small/4.png"), category: "venue" },
//     { id: 5, large: require("../../../assets/Large/5.png"), thumb: require("../../../assets/small/5.png"), category: "venue" },
//     { id: 6, large: require("../../../assets/Large/event6.jpg"), thumb: require("../../../assets/small/event6.jpg"), category: "event" },
//     { id: 7, large: require("../../../assets/Large/people3.jpg"), thumb: require("../../../assets/small/people3.jpg"), category: "people" },
//     { id: 9, large: require("../../../assets/Large/event4.jpg"), thumb: require("../../../assets/small/event4.jpg"), category: "event" },
//     { id: 10, large: require("../../../assets/Large/10.png"), thumb: require("../../../assets/small/10.png"), category: "venue" },
//     { id: 11, large: require("../../../assets/Large/people4.jpg"), thumb: require("../../../assets/small/people4.jpg"), category: "people" },
//     { id: 12, large: require("../../../assets/Large/event5.jpg"), thumb: require("../../../assets/small/event5.jpg"), category: "event" },
//     { id: 13, large: require("../../../assets/Large/13.png"), thumb: require("../../../assets/small/13.png"), category: "venue" },
//     { id: 14, large: require("../../../assets/Large/people6.jpg"), thumb: require("../../../assets/small/people6.jpg"), category: "people" },
//     { id: 15, large: require("../../../assets/Large/event6.jpg"), thumb: require("../../../assets/small/event6.jpg"), category: "event" },
//     { id: 16, large: require("../../../assets/Large/16.png"), thumb: require("../../../assets/small/16.png"), category: "venue" },
//   ];

//   const galleryProducts = [
//     { id: 101, large: require("../../../assets/Large/IMG0261.jpg"), thumb: require("../../../assets/small/IMG0261.jpg"), name: "", price: " " },
//     { id: 102, large: require("../../../assets/Large/IMG0271.jpg"), thumb: require("../../../assets/small/IMG0271.jpg"), name: "", price: "" },
//     { id: 103, large: require("../../../assets/Large/IMG0292.jpg"), thumb: require("../../../assets/small/IMG0292.jpg"), name: "", price: "" },
//     { id: 104, large: require("../../../assets/Large/15.png"), thumb: require("../../../assets/small/15.png"), name: "", price: "" },
//     { id: 105, large: require("../../../assets/Large/IMG0144.jpg"), thumb: require("../../../assets/small/IMG0144.jpg"), name: "", price: "" },
//     { id: 106, large: require("../../../assets/Large/IMG0299.jpg"), thumb: require("../../../assets/small/IMG0299.jpg"), name: "", price: "" },
//   ];

//   const galleryVideos = [
//     { id: 1, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Wedding Highlights", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//     { id: 2, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Birthday Celebration", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//     { id: 3, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Corporate Event", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//     { id: 4, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Anniversary Party", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
//   ];

//   const categories = ["all", ...new Set(galleryImages.map(img => img.category))];
//   const filteredImages = filter === "all" ? galleryImages : galleryImages.filter(img => img.category === filter);

//   return (
//     <>
//       <Header />
//       <WhatApp />
      
//       <GalleryHeader scrollToGallery={scrollToGallery} />
      
//       <div className="gallery-container" ref={galleryRef}>
//         {/* Tab Navigation */}
//         <div className="gallery-tab-navigation" data-aos="fade-up">
//           <div className="container">
//             <div className="d-flex justify-content-center gap-3">
//               <button
//                 className={`gallery-tab-btn ${activeTab === "photo" ? "gallery-active" : ""}`}
//                 onClick={() => setActiveTab("photo")}
//               >
//                 <i className="bi bi-images me-2"></i>Photo Gallery
//               </button>
//               <button
//                 className={`gallery-tab-btn ${activeTab === "product" ? "gallery-active" : ""}`}
//                 onClick={() => setActiveTab("product")}
//               >
//                 <i className="bi bi-shop me-2"></i>Our Products
//               </button>
//               <button
//                 className={`gallery-tab-btn ${activeTab === "video" ? "gallery-active" : ""}`}
//                 onClick={() => setActiveTab("video")}
//               >
//                 <i className="bi bi-camera-reels me-2"></i>Video Gallery
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="container py-5">
//           {activeTab === "photo" ? (
//             <>
//               {/* Filter Buttons */}
//               <div className="d-flex flex-wrap justify-content-center gap-2 mb-5" data-aos="fade-up">
//                 {categories.map(category => (
//                   <button
//                     key={category}
//                     className={`gallery-filter-btn ${filter === category ? 'gallery-active' : ''} text-capitalize`}
//                     onClick={() => setFilter(category)}
//                   >
//                     {category === "event" && <i className="bi bi-calendar-event me-2"></i>}
//                     {category === "people" && <i className="bi bi-people me-2"></i>}
//                     {category === "venue" && <i className="bi bi-building me-2"></i>}
//                     {category === "all" && <i className="bi bi-collection me-2"></i>}
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Photo Gallery */}
//               <div className="row g-4">
//                 {filteredImages.map((img) => (
//                   <div 
//                     className="col-md-4 col-lg-3" 
//                     key={img.id}
//                     data-aos="fade-up"
//                     data-aos-delay={img.id % 5 * 100}
//                   >
//                     <div className="gallery-card">
//                       <a href={img.large} data-lightbox="gallery" data-title={`Image ${img.id}`}>
//                         <img 
//                           src={img.thumb} 
//                           alt={`Image ${img.id}`} 
//                           className="img-fluid"
//                           loading="lazy"
//                         />
//                         <div className="gallery-overlay">
//                           <div className="gallery-icon">
//                             <i className="bi bi-zoom-in"></i>
//                           </div>
//                           <div className="gallery-category">
//                             <span className={`gallery-badge gallery-bg-${img.category}`}>
//                               {img.category}
//                             </span>
//                           </div>
//                         </div>
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : activeTab === "product" ? (
//             <>
//               {/* Product Gallery */}
//               <h3 className="text-center mb-5" data-aos="fade-up">Our Menu</h3>
//               <div className="row g-4">
//                 {galleryProducts.map((product) => (
//                   <div 
//                     className="col-md-4 col-lg-3" 
//                     key={product.id}
//                     data-aos="fade-up"
//                     data-aos-delay={product.id % 5 * 100}
//                   >
//                     <div className="gallery-product-card">
//                       <a href={product.large} data-lightbox="products" data-title={product.name}>
//                         <img 
//                           src={product.thumb} 
//                           alt={product.name} 
//                           className="img-fluid"
//                           loading="lazy"
//                         />
//                         <div className="gallery-product-overlay">
//                           <div className="gallery-product-info">
//                             <h5>{product.name}</h5>
//                             <p className="gallery-product-price">{product.price}</p>
//                           </div>
                          
//                         </div>
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Video Gallery */}
//               <h3 className="text-center mb-5" data-aos="fade-up">Event Videos</h3>
//               <div className="row g-4">
//                 {galleryVideos.map((video) => (
//                   <div 
//                     className="col-md-6" 
//                     key={video.id}
//                     data-aos="fade-up"
//                     data-aos-delay={video.id % 3 * 100}
//                   >
//                     <div className="gallery-video-card">
//                       <div className="gallery-video-thumbnail">
//                         <img src={video.thumb} alt={video.title} className="img-fluid" loading="lazy" />
//                         <div className="gallery-play-button" onClick={() => window.open(video.url, '_blank')}>
//                           <i className="bi bi-play-fill"></i>
//                         </div>
//                       </div>
//                       <div className="gallery-video-info">
//                         <h5>{video.title}</h5>
//                         <button 
//                           className="gallery-watch-btn"
//                           onClick={() => window.open(video.url, '_blank')}
//                         >
//                           Watch Video <i className="bi bi-arrow-right"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Gallery;

import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactImageLightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import "./Gallery.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatApp from "../WhatsApp/WhatApp";

const GalleryHeader = ({ scrollToGallery }) => {
  return (
    <div className="gallery-hero">
      {/* Particle animation background */}
      <div className="gallery-particles">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="gallery-particle"
            style={{
              '--size': `${Math.random() * 8 + 2}px`,
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${Math.random() * 20 + 10}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--opacity': `${Math.random() * 0.6 + 0.2}`,
              '--blur': `${Math.random() * 3 + 1}px`,
              '--color': `hsl(${Math.random() * 60 + 330}, 80%, 60%)`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="gallery-gradient-overlay"></div>

      {/* Floating shapes */}
      <div className="gallery-floating-shapes">
        <div className="gallery-shape gallery-shape-1"></div>
        <div className="gallery-shape gallery-shape-2"></div>
        <div className="gallery-shape gallery-shape-3"></div>
      </div>

      {/* Main content with layered text effect */}
      <div className="gallery-hero-content" data-aos="fade-up">
        <div className="gallery-text-layers">
          <h1 className="gallery-layer-1">GALLERY</h1>
          <h1 className="gallery-layer-2">GALLERY</h1>
          <h1 className="gallery-layer-3">GALLERY</h1>
        </div>
        
        <div className="gallery-animated-divider">
          <div className="gallery-line"></div>
          <div className="gallery-dot"></div>
          <div className="gallery-line"></div>
        </div>
        
        <p className="gallery-hero-subtitle">
          <span className="gallery-subtitle-word">Tempting</span>
          <span className="gallery-subtitle-word">Tastebuds</span>
          <span className="gallery-subtitle-word">One</span>
          <span className="gallery-subtitle-word">Bite</span>
          <span className="gallery-subtitle-word">at a Time</span>
        </p>
        
        {/* Animated CTA button */}
        <div className="gallery-cta-container">
          <button className="gallery-cta-button" onClick={scrollToGallery}>
            <span>Explore Gallery</span>
            <div className="gallery-arrow-circle">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("photo");
  const [filter, setFilter] = useState("all");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const galleryRef = useRef(null);
    const [playingVideoUrl, setPlayingVideoUrl] = useState(null);

  useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 100,
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

    const closeVideo = () => {
    setPlayingVideoUrl(null);
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const galleryImages = [
    { id: 1, large: require("../../../assets/Large/event1.jpg"), thumb: require("../../../assets/Large/event1.jpg"), category: "event" },
    { id: 2, large: require("../../../assets/Large/event2.jpg"), thumb: require("../../../assets/Large/event2.jpg"), category: "event" },
    { id: 17, large: require("../../../assets/Large/people1.jpg"), thumb: require("../../../assets/Large/people1.jpg"), category: "people" },
    { id: 4, large: require("../../../assets/Large/4.png"), thumb: require("../../../assets/Large/4.png"), category: "venue" },
    { id: 5, large: require("../../../assets/Large/5.png"), thumb: require("../../../assets/Large/5.png"), category: "venue" },
    { id: 6, large: require("../../../assets/Large/event6.jpg"), thumb: require("../../../assets/Large/event6.jpg"), category: "event" },
    { id: 7, large: require("../../../assets/Large/people3.jpg"), thumb: require("../../../assets/Large/people3.jpg"), category: "people" },
    { id: 9, large: require("../../../assets/Large/event4.jpg"), thumb: require("../../../assets/Large/event4.jpg"), category: "event" },
    { id: 10, large: require("../../../assets/Large/10.png"), thumb: require("../../../assets/Large/10.png"), category: "venue" },
    { id: 11, large: require("../../../assets/Large/people4.jpg"), thumb: require("../../../assets/Large/people4.jpg"), category: "people" },
    { id: 12, large: require("../../../assets/Large/event5.jpg"), thumb: require("../../../assets/Large/event5.jpg"), category: "event" },
    { id: 13, large: require("../../../assets/Large/13.png"), thumb: require("../../../assets/Large/13.png"), category: "venue" },
    { id: 14, large: require("../../../assets/Large/people6.jpg"), thumb: require("../../../assets/Large/people6.jpg"), category: "people" },
    { id: 15, large: require("../../../assets/Large/event6.jpg"), thumb: require("../../../assets/Large/event6.jpg"), category: "event" },
    { id: 16, large: require("../../../assets/Large/16.png"), thumb: require("../../../assets/Large/16.png"), category: "venue" },
  ];

  const galleryProducts = [
    { id: 101, large: require("../../../assets/Large/IMG0261.jpg"), thumb: require("../../../assets/Large/IMG0261.jpg"), name: "", price: " " },
    { id: 102, large: require("../../../assets/Large/IMG0271.jpg"), thumb: require("../../../assets/Large/IMG0271.jpg"), name: "", price: "" },
    { id: 103, large: require("../../../assets/Large/IMG0292.jpg"), thumb: require("../../../assets/Large/IMG0292.jpg"), name: "", price: "" },
    { id: 104, large: require("../../../assets/Large/15.png"), thumb: require("../../../assets/Large/15.png"), name: "", price: "" },
    { id: 105, large: require("../../../assets/Large/IMG0144.jpg"), thumb: require("../../../assets/Large/IMG0144.jpg"), name: "", price: "" },
    { id: 106, large: require("../../../assets/Large/IMG0299.jpg"), thumb: require("../../../assets/Large/IMG0299.jpg"), name: "", price: "" },
  ];

  const galleryVideos = [
    { id: 1, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Wedding Highlights", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
    { id: 2, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Birthday Celebration", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
    { id: 3, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Corporate Event", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
    { id: 4, url: "https://www.youtube.com/embed/2CluFZKclto", title: "Anniversary Party", thumb: "https://img.youtube.com/vi/2CluFZKclto/maxresdefault.jpg" },
  ];

  const categories = ["all", ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = filter === "all" ? galleryImages : galleryImages.filter(img => img.category === filter);

  return (
    <>
      <Header />
      <WhatApp />
      
      <GalleryHeader scrollToGallery={scrollToGallery} />
      
      <div className="gallery-container" ref={galleryRef}>
        {/* Tab Navigation */}
        <div className="gallery-tab-navigation" data-aos="fade-up">
          <div className="container">
            <div className="d-flex justify-content-center gap-3">
              <button
                className={`gallery-tab-btn ${activeTab === "photo" ? "gallery-active" : ""}`}
                onClick={() => setActiveTab("photo")}
              >
                <i className="bi bi-images me-2"></i>Photo Gallery
              </button>
              <button
                className={`gallery-tab-btn ${activeTab === "product" ? "gallery-active" : ""}`}
                onClick={() => setActiveTab("product")}
              >
                <i className="bi bi-shop me-2"></i>Our Products
              </button>
              {/* <button
                className={`gallery-tab-btn ${activeTab === "video" ? "gallery-active" : ""}`}
                onClick={() => setActiveTab("video")}
              >
                <i className="bi bi-camera-reels me-2"></i>Video Gallery
              </button> */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-5">
          {activeTab === "photo" ? (
            <>
              {/* Filter Buttons */}
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-5" data-aos="fade-up">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`gallery-filter-btn ${filter === category ? 'gallery-active' : ''} text-capitalize`}
                    onClick={() => setFilter(category)}
                  >
                    {category === "event" && <i className="bi bi-calendar-event me-2"></i>}
                    {category === "people" && <i className="bi bi-people me-2"></i>}
                    {category === "venue" && <i className="bi bi-building me-2"></i>}
                    {category === "all" && <i className="bi bi-collection me-2"></i>}
                    {category}
                  </button>
                ))}
              </div>

              {/* Photo Gallery */}
              <div className="row g-4">
                {filteredImages.map((img, index) => (
                  <div 
                    className="col-md-4 col-lg-3" 
                    key={img.id}
                    data-aos="fade-up"
                    data-aos-delay={img.id % 5 * 100}
                  >
                    <div className="gallery-card">
                      <div 
                        onClick={() => {
                          setPhotoIndex(index);
                          setIsOpen(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <img 
                          src={img.thumb} 
                          alt={`Image ${img.id}`} 
                          className="img-fluid"
                          loading="lazy"
                        />
                        <div className="gallery-overlay">
                          <div className="gallery-icon">
                            <i className="bi bi-zoom-in"></i>
                          </div>
                          <div className="gallery-category">
                            <span className={`gallery-badge gallery-bg-${img.category}`}>
                              {img.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isOpen && (
                <ReactImageLightbox
                  mainSrc={filteredImages[photoIndex].large}
                  nextSrc={filteredImages[(photoIndex + 1) % filteredImages.length].large}
                  prevSrc={filteredImages[(photoIndex + filteredImages.length - 1) % filteredImages.length].large}
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex((photoIndex + filteredImages.length - 1) % filteredImages.length)
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % filteredImages.length)
                  }
                />
              )}
            </>
          ) : activeTab === "product" ? (
            <>
              {/* Product Gallery */}
              <h3 className="text-center mb-5" data-aos="fade-up">Our Menu</h3>
              <div className="row g-4">
                {galleryProducts.map((product, index) => (
                  <div 
                    className="col-md-4 col-lg-3" 
                    key={product.id}
                    data-aos="fade-up"
                    data-aos-delay={product.id % 5 * 100}
                  >
                    <div className="gallery-product-card">
                      <div 
                        onClick={() => {
                          setProductIndex(index);
                          setIsProductOpen(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <img 
                          src={product.thumb} 
                          alt={product.name} 
                          className="img-fluid"
                          loading="lazy"
                        />
                        <div className="gallery-product-overlay">
                          <div className="gallery-product-info">
                            <h5>{product.name}</h5>
                            <p className="gallery-product-price">{product.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isProductOpen && (
                <ReactImageLightbox
                  mainSrc={galleryProducts[productIndex].large}
                  nextSrc={galleryProducts[(productIndex + 1) % galleryProducts.length].large}
                  prevSrc={galleryProducts[(productIndex + galleryProducts.length - 1) % galleryProducts.length].large}
                  onCloseRequest={() => setIsProductOpen(false)}
                  onMovePrevRequest={() =>
                    setProductIndex((productIndex + galleryProducts.length - 1) % galleryProducts.length)
                  }
                  onMoveNextRequest={() =>
                    setProductIndex((productIndex + 1) % galleryProducts.length)
                  }
                />
              )}
            </>
          ) : (
            <>
              {/* Video Gallery */}
              <h3 className="text-center mb-5" data-aos="fade-up">Event Videos</h3>
            <div className="row g-4">
        {galleryVideos.map((video) => (
          <div
            className="col-md-6"
            key={video.id}
            data-aos="fade-up"
            data-aos-delay={(video.id % 3) * 100}
          >
            <div className="gallery-video-card">
              <div className="gallery-video-thumbnail" onClick={() => setPlayingVideoUrl(video.url)}>
                <img src={video.thumb} alt={video.title} className="img-fluid" loading="lazy" />
                <div className="gallery-play-button">
                  <i className="bi bi-play-fill"></i>
                </div>
              </div>
              <div className="gallery-video-info">
                <h5>{video.title}</h5>
                <button
                  className="gallery-watch-btn"
                  onClick={() => setPlayingVideoUrl(video.url)}
                >
                  Watch Video <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal or inline video player */}
      {playingVideoUrl && (
        <div className="video-modal">
          <div className="video-modal-content">
            <button className="video-close-btn" onClick={closeVideo}>X</button>

            {/* Assuming videos are YouTube or direct video URLs */}
            {/* If YouTube URL, embed iframe */}
            {playingVideoUrl.includes("youtube") || playingVideoUrl.includes("youtu.be") ? (
              <iframe
                width="100%"
                height="315"
                src={playingVideoUrl.replace("watch?v=", "embed/")}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={playingVideoUrl}
                controls
                autoPlay
                style={{ width: "100%", maxHeight: "400px" }}
              />
            )}
          </div>
        </div>
      )}


            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Gallery;