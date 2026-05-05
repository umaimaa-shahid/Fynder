import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";
import "./SignIn.css";   

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ STORE TOKEN (MOST IMPORTANT LINE)
      localStorage.setItem("token", res.data.token);

      navigate("/");
      
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>

      <div className="signin-form-wrapper">
        <div className="signin-form">
          <h2>Welcome Back</h2>

          <input
            type="email"
            placeholder="you@nu.edu.pk"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Sign In →</button>

          <Link to="/signup">Sign up</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}