import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = async () => {
    try {
      // basic validation
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      // save token
      localStorage.setItem("token", res.data.token);

      // go to email verification
      navigate("/verify-email");

    } catch (err) {
      console.log(err);
      alert("Signup failed (user may already exist)");
    }
  };

  return (
    <div className="signup-page">

      {/* Logo */}
      <div className="signup-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>

      {/* Form Section */}
      <div className="signup-form-wrapper">
        <div className="signup-form">

          <h2 className="signup-title">Create Account</h2>

          <p className="signup-subtitle">
            Join Fynder to find your perfect FYP team
          </p>

          <label className="signup-label">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="signup-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="signup-label">University Email</label>
          <input
            type="email"
            placeholder="youremail@nu.edu.pk"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="signup-label">Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="signup-label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="signup-options">
            <input type="checkbox" className="signup-checkbox" />

            <span>
              I agree to the{" "}
              <Link to="/terms" className="signup-link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="signup-link">
                Privacy Policy
              </Link>
            </span>
          </div>

          <button
            onClick={handleCreateAccount}
            className="signup-button"
          >
            Create Account
          </button>

          <p className="signup-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Sign in
            </Link>
          </p>

          <div className="signup-note">
            <strong>Note:</strong> You must use your official university
            email address (<span className="font-mono">@nu.edu.pk</span>)
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}