import React from "react";
import "./StickyOfferStrip.css";

const StickyOfferStrip = () => {
  return (
    <div className="sticky-offer-strip">
      <marquee behavior="scroll" direction="left" scrollamount="4">
        🎁 Buy 4 packs – Get 10% OFF + Free Delivery! | 🥗 Buy 2 packs – Get 5% OFF (Shipping charges apply) |
        📝 Give us your valuable reviews and get 5% OFF on your next purchase – *Conditions apply (Minimum quantity required)
      </marquee>
    </div>
  );
};

export default StickyOfferStrip;
