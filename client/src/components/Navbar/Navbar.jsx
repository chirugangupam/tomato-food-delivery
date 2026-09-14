import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { 
  ShoppingBag, 
  Search, 
  User, 
  Package, 
  LogOut, 
  ShieldCheck, 
  X,
  Menu as MenuIcon
} from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { 
    getTotalCartCount, 
    token, 
    user, 
    logout, 
    searchTerm, 
    setSearchTerm 
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();
  const totalCount = getTotalCartCount();

  const handleNavClick = (sectionId, name) => {
    setMenu(name);
    setIsMobileNavOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🍅</span>
          <span className="brand-name">
            Tomato<span className="brand-dot">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={`navbar-menu ${isMobileNavOpen ? "mobile-open" : ""}`}>
          <li
            onClick={() => handleNavClick("root", "home")}
            className={menu === "home" && location.pathname === "/" ? "active" : ""}
          >
            Home
          </li>
          <li
            onClick={() => handleNavClick("explore-menu", "menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </li>
          <li
            onClick={() => handleNavClick("app-download", "mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile App
          </li>
          <li
            onClick={() => handleNavClick("footer", "contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </li>
          {/* Quick link to admin in mobile view */}
          <li className="mobile-admin-link">
            <Link to="/admin" onClick={() => setIsMobileNavOpen(false)}>
              ⚡ Admin Panel
            </Link>
          </li>
        </ul>

        {/* Right Action Icons */}
        <div className="navbar-right">
          {/* Search Toggle / Input */}
          <div className={`navbar-search ${isSearchOpen ? "open" : ""}`}>
            <Search 
              size={20} 
              className="search-icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
            />
            {isSearchOpen && (
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search dishes, salads, cakes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                {searchTerm && (
                  <X 
                    size={16} 
                    className="clear-search" 
                    onClick={() => setSearchTerm("")} 
                  />
                )}
              </div>
            )}
          </div>

          {/* Cart Icon with Live Badge */}
          <Link to="/cart" className="navbar-cart-icon" title="View Cart">
            <ShoppingBag size={22} />
            {totalCount > 0 && (
              <span className="cart-badge animate-pop-in">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Admin Switch Shortcut Button */}
          <Link to="/admin" className="admin-pill-btn" title="Open Admin Dashboard">
            <ShieldCheck size={16} />
            <span>Admin</span>
          </Link>

          {/* User Authentication & Profile Dropdown */}
          {!token ? (
            <button 
              className="navbar-signin-btn" 
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          ) : (
            <div 
              className="navbar-profile" 
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="profile-avatar">
                <User size={18} />
                <span className="user-initial">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              
              {isProfileOpen && (
                <ul className="profile-dropdown animate-fade-in">
                  <li className="user-greeting">
                    <p className="greeting-name">{user?.name || "Customer"}</p>
                    <p className="greeting-email">{user?.email || ""}</p>
                  </li>
                  <div className="dropdown-divider"></div>
                  <li onClick={() => { navigate("/myorders"); setIsProfileOpen(false); }}>
                    <Package size={17} />
                    <span>My Orders</span>
                  </li>
                  <li onClick={() => { navigate("/admin"); setIsProfileOpen(false); }}>
                    <ShieldCheck size={17} />
                    <span>Admin Panel</span>
                  </li>
                  <div className="dropdown-divider"></div>
                  <li onClick={() => { logout(); setIsProfileOpen(false); }} className="logout-item">
                    <LogOut size={17} />
                    <span>Logout</span>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Toggle menu"
          >
            {isMobileNavOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
