import React from "react";
import "./AppDownload.css";
import { Smartphone, Sparkles, CheckCircle2 } from "lucide-react";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <div className="app-download-content">
        <div className="download-badge">
          <Sparkles size={15} />
          <span>Mobile Experience</span>
        </div>
        <h2>For Better Experience Download <br /><span className="text-gradient">Tomato. App</span></h2>
        
        <ul className="download-perks">
          <li>
            <CheckCircle2 size={18} className="perk-icon" />
            <span>Live order tracking on interactive map</span>
          </li>
          <li>
            <CheckCircle2 size={18} className="perk-icon" />
            <span>Exclusive in-app app-only discounts up to 50%</span>
          </li>
          <li>
            <CheckCircle2 size={18} className="perk-icon" />
            <span>One-tap instant reorder with saved addresses</span>
          </li>
        </ul>

        <div className="app-download-platforms">
          {/* Play Store Button */}
          <a href="#playstore" className="store-badge-btn" onClick={(e) => e.preventDefault()}>
            <div className="store-icon">▶</div>
            <div className="store-btn-text">
              <span className="small-text">GET IT ON</span>
              <span className="bold-text">Google Play</span>
            </div>
          </a>

          {/* App Store Button */}
          <a href="#appstore" className="store-badge-btn appstore" onClick={(e) => e.preventDefault()}>
            <div className="store-icon">🍎</div>
            <div className="store-btn-text">
              <span className="small-text">Download on the</span>
              <span className="bold-text">App Store</span>
            </div>
          </a>
        </div>
      </div>

      <div className="app-download-visual">
        <div className="phone-mockup">
          <div className="phone-screen">
            <div className="screen-header">
              <span className="screen-logo">🍅 Tomato.</span>
              <span className="screen-time">12:30</span>
            </div>
            <div className="screen-card">
              <p className="screen-card-tag">Fast Delivery</p>
              <h4>Your Burger is on the way! 🛵</h4>
              <div className="screen-progress">
                <div className="screen-progress-bar"></div>
              </div>
              <span className="screen-eta">Arriving in 12 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
