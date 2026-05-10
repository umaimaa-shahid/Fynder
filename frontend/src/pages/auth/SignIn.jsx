import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
      );

      // save token AND user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("TOKEN SAVED:", res.data.token);
      const user = res.data.user;
      if (user.profile?.profileCompleted) {
        navigate("/app/dashboard");
      } else {
        navigate("/profilesetup-step1");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="signin-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <button
            onClick={handleLogin}
            className="signin-button"
            style={{ width: "100%" }}
          >
            Sign In →
          </button>

          <p className="signin-footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signin-signup">
              Sign up
            </Link>
          </p>
        </div>

        <div className="signin-secure-text">
          🔒 Secure login for FAST-NU students only
        </div>
      </div>

      <Footer />
    </div>
  );
}
