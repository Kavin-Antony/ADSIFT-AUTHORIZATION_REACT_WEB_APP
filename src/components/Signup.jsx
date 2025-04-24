import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null); // <-- Fixed here

  const [error, setError] = useState("");

  const handleSignup = async () => {
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
    if (username.length < 5) {
      setError("Username must be at least 5 characters.");
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address ending with @gmail.com.");
    } else if (!passwordRegex.test(password)) {
      setError("Password must be 8+ chars with uppercase, lowercase, and a number.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
  
      try {
        const body = new URLSearchParams();
        body.append("user_id", email);
        body.append("username", username);
        body.append("password", password);
  
        const response = await fetch("https://goshawk-musical-liger.ngrok-free.app/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: body
        });
  
        const data = await response.json();
        console.log(data);
  
        if (data.success) {
          alert("Signup successful!");
          window.location.href = "https://kavin-antony.github.io/ADSIFT-WEB_APP_REACT_WITHOUT_AD/";
        } else {
          setError(data.message || "Signup failed.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign up</h2>
        <input type="text" placeholder="Username" className="signup-input" ref={usernameRef} />
        <input type="email" placeholder="Email Address" className="signup-input" ref={emailRef} />
        <input type="password" placeholder="Password" className="signup-input" ref={passwordRef} />
        <input type="password" placeholder="Confirm Password" className="signup-input" ref={confirmPasswordRef} />
        <button className="signup-button" onClick={handleSignup}>Sign Up</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <p className="signup-footer">
          Already have an account?
          <Link to="/login"> Log in.</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
