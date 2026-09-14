import React from "react";
import "./Hero.css";
import { ArrowRight, Clock, Star, Sparkles, Utensils } from "lucide-react";

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById("explore-menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-contents animate-fade-in">
        <div className="hero-badge">
          <Sparkles size={16} className="badge-sparkle" />
          <span>Special Offer: Use code <strong>GANESH2026</strong> for 20% OFF</span>
        </div>

        <h1 className="hero-title">
          Order your <br />
          <span className="hero-highlight">favourite food</span> here
        </h1>

        <p className="hero-desc">
          Choose from a diverse menu featuring a delectable array of dishes crafted 
          with the finest fresh ingredients and culinary passion. Elevate your dining 
          experience with lightning-fast delivery right to your doorstep.
        </p>

        <div className="hero-actions">
          <button className="hero-btn" onClick={scrollToMenu}>
            <span>Explore Menu</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Quick Highlights / Stats */}
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Utensils size={18} />
            </div>
            <div>
              <h4>30+</h4>
              <p>Curated Dishes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Clock size={18} />
            </div>
            <div>
              <h4>30 Mins</h4>
              <p>Fast Delivery</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Star size={18} />
            </div>
            <div>
              <h4>4.9 ★</h4>
              <p>Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
