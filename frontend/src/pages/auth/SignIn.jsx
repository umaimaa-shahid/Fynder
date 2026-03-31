import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./SignIn.css";   

export default function SignIn() {
  return (
    <div className="signin-page">
      {/* Logo */}
      <div className="signin-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>

      {/* Form Section */}
      <div className="signin-form-wrapper">
        <div className="signin-form">
          <h2 className="signin-title">Welcome Back</h2>
          <p className="signin-subtitle">Sign in to find your FYP partners</p>

          <label className="signin-label">University Email</label>
          <input
            type="email"
            placeholder="you@nu.edu.pk"
            className="signin-input"
          />

          <label className="signin-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="signin-input"
          />

          <div className="signin-options">
            <label className="signin-remember">
              <input type="checkbox" className="signin-checkbox" />
              Remember me
            </label>
            <Link to="/forgot" className="signin-forgot">
              Forgot password?
            </Link>
          </div>

          <button className="signin-button">Sign In →</button>

          <p className="signin-footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signin-signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
