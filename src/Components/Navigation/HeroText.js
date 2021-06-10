import React from "react";

export default function HeroText() {
  return (
    <div className="hero-section-homepage">
      <div className="hero-section-text">
        <h1 className="mb-4">
          {" "}
          <span>   We ship you happiness.</span>
        </h1>
        <h1>
          The <span>fastest growing Ecommerce Store.</span>.
        </h1>
        <a href="/shop" className="shop-now-button">
          Shop now
        </a>
      </div>
    </div>
  );
}
