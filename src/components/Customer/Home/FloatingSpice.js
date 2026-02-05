import React from "react";
import "./FloatingSpice.css";

const FloatingSpice = ({ image, top, left, size }) => {
  return (
    <img
      src={image}
      alt="spice"
      className="floating-spice"
      style={{
        top,
        left,
        width: size,
        height: size,
      }}
    />
  );
};

export default FloatingSpice;
