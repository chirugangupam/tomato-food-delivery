import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { X, Lock, Mail, User, Sparkles, AlertCircle } from "lucide-react";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUser, addToast, loadCartData } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        await loadCartData(response.data.token);
        setShowLogin(false);
        addToast(`Welcome back, ${response.data.user.name}! 🍕`, "success");
      } else {
        setErrorMessage(response.data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrorMessage(
        error.response?.data?.message || "Connection error. Make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login Button
  const fillDemoCredentials = async (type = "user") => {
    const demoData = type === "admin" 
      ? { name: "Admin Manager", email: "admin@tomato.com", password: "adminpassword123", role: "admin" }
      : { name: "Alex Johnson", email: "alex@example.com", password: "password123", role: "user" };

    setData({
      name: demoData.name,
      email: demoData.email,
      password: demoData.password
    });

    // Try auto register or login
    setLoading(true);
    try {
      // First try login
      let res = await axios.post(`${url}/api/user/login`, {
        email: demoData.email,
        password: demoData.password
      }).catch(() => null);

      // If login fails (user doesn't exist yet), register them!
      if (!res || !res.data.success) {
        res = await axios.post(`${url}/api/user/register`, demoData);
      }

      if (res && res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        await loadCartData(res.data.token);
        setShowLogin(false);
        addToast(`Logged in as Demo ${type === 'admin' ? 'Admin' : 'Customer'}! 🎉`, "success");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not auto-login demo account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-backdrop" onClick={() => setShowLogin(false)}></div>
      
      <form onSubmit={onLogin} className="login-popup-container animate-pop-in">
        <div className="login-popup-title">
          <h2>{currState === "Login" ? "Welcome Back" : "Create Account"}</h2>
          <button 
            type="button" 
            className="close-modal-btn" 
            onClick={() => setShowLogin(false)}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <p className="login-popup-sub">
          {currState === "Login"
            ? "Sign in to track orders and save your favorite dishes."
            : "Join Tomato to enjoy fast delivery and exclusive food deals."}
        </p>

        {errorMessage && (
          <div className="auth-error-banner animate-fade-in">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email address"
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Password (at least 6 characters)"
              required
            />
          </div>
        </div>

        <button type="submit" className="login-submit-btn" disabled={loading}>
          {loading ? (
            <span className="btn-spinner"></span>
          ) : currState === "Sign Up" ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </button>

        {/* 1-Click Demo Buttons */}
        <div className="demo-accounts-box">
          <p className="demo-box-label">
            <Sparkles size={14} /> Quick Demo Access:
          </p>
          <div className="demo-btn-group">
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => fillDemoCredentials("user")}
            >
              👤 Demo Customer
            </button>
            <button
              type="button"
              className="demo-pill-btn admin"
              onClick={() => fillDemoCredentials("admin")}
            >
              ⚡ Demo Admin
            </button>
          </div>
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" id="terms" required defaultChecked />
          <label htmlFor="terms">
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>

        <div className="login-popup-toggle">
          {currState === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => { setCurrState("Sign Up"); setErrorMessage(""); }}>
                Sign up here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => { setCurrState("Login"); setErrorMessage(""); }}>
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
