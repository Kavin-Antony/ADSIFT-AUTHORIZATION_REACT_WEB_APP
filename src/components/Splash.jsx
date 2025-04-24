

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splash.css";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <div className="splash-box">
        <img src="/logos.png" alt="AdSift Logo" className="splash-logo" />
        <h1 className="splash-title">
          <span className="title-red">Ad</span>Sift
        </h1>
        <div className="splash-buttons">
          <button className="splash-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="splash-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Splash;




