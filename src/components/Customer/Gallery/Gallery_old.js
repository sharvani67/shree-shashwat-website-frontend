import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "lightbox2/dist/css/lightbox.min.css";
import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
import "./Gallery.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatApp from "../WhatsApp/WhatApp";

const Gallery = () => {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 3000,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  const galleryImages = [
    {
      large: require("../../../assets/Large/1.png"),
      thumb: require("../../../assets/small/1.png"),
    },
    {
      large: require("../../../assets/Large/2.png"),
      thumb: require("../../../assets/small/2.png"),
    },
    {
      large: require("../../../assets/Large/3.png"),
      thumb: require("../../../assets/small/3.png"),
    },
    {
      large: require("../../../assets/Large/4.png"),
      thumb: require("../../../assets/small/4.png"),
    },
    {
      large: require("../../../assets/Large/5.png"),
      thumb: require("../../../assets/small/5.png"),
    },
    {
      large: require("../../../assets/Large/6.png"),
      thumb: require("../../../assets/small/6.png"),
    },
    {
      large: require("../../../assets/Large/7.png"),
      thumb: require("../../../assets/small/7.png"),
    },
    {
      large: require("../../../assets/Large/9.png"),
      thumb: require("../../../assets/small/9.png"),
    },
    {
      large: require("../../../assets/Large/10.png"),
      thumb: require("../../../assets/small/10.png"),
    },
    {
      large: require("../../../assets/Large/11.png"),
      thumb: require("../../../assets/small/11.png"),
    },
    {
      large: require("../../../assets/Large/12.png"),
      thumb: require("../../../assets/small/12.png"),
    },
    {
      large: require("../../../assets/Large/13.png"),
      thumb: require("../../../assets/small/13.png"),
    },
    {
      large: require("../../../assets/Large/14.png"),
      thumb: require("../../../assets/small/14.png"),
    },
    {
      large: require("../../../assets/Large/15.png"),
      thumb: require("../../../assets/small/15.png"),
    },
    {
      large: require("../../../assets/Large/16.png"),
      thumb: require("../../../assets/small/16.png"),
    },
  ];

  return (
    <>
      <Header />
      <WhatApp />
      <div className="gallery-intro text-center mb-5">
  <h1 className="main-heading">Gallery</h1>
  <p className="main-heading-para lead">
    Explore moments captured in our gallery showcasing events, experiences, and more.
  </p>
</div>

      <div
        className="gallery"
        style={{ paddingTop: "10px" }}
        // data-aos="zoom-in-right"
      >
        {galleryImages.map((img, index) => (
          <div className="gallery-item" key={index}>
            <a href={img.large} data-lightbox="gallery">
              <img src={img.thumb} alt={`Image ${index + 1}`} />
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
