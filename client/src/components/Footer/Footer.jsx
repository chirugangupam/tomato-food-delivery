import React from "react";
import "./Footer.css";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Globe,
  Share2,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="footer-brand">
            <span className="brand-icon">🍅</span>
            <span className="brand-name">Tomato<span className="brand-dot">.</span></span>
          </div>
          <p className="footer-bio">
            Tomato is your ultimate destination for gourmet cuisines and speedy door-step 
            deliveries. Crafted with fresh local ingredients, artisanal care, and passionate culinary artistry.
          </p>
          <div className="footer-social-icons">
            <a href="#social" className="social-icon" aria-label="Website" onClick={(e) => e.preventDefault()}>
              <Globe size={18} />
            </a>
            <a href="#social" className="social-icon" aria-label="Community" onClick={(e) => e.preventDefault()}>
              <MessageCircle size={18} />
            </a>
            <a href="#social" className="social-icon" aria-label="Share" onClick={(e) => e.preventDefault()}>
              <Share2 size={18} />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h3>COMPANY</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#explore-menu">About us</a></li>
            <li><Link to="/myorders">Delivery & Tracking</Link></li>
            <li><a href="#privacy">Privacy policy</a></li>
            <li><Link to="/admin">Admin Portal</Link></li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+1 (555) 234-5678</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>support@tomato.com</span>
            </li>
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>100 Foodie Lane, Suite 400, NY</span>
            </li>
          </ul>
        </div>
      </div>
      
      <hr className="footer-divider" />
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright 2026 © Tomato.com - All Rights Reserved.
        </p>
        <p className="footer-credits">
          Made with <Heart size={14} className="heart-icon" /> for GreatStack & Food Lovers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
