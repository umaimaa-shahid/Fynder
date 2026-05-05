import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";
import "./SignUp.css";   

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.placeholder.includes("name") ? "name" :
      e.target.type === "email" ? "email" :
      e.target.placeholder.includes("Confirm") ? "confirmPassword" : "password"
    ]: e.target.value });
  };

  const handleCreateAccount = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/verify-email", { state: { email: form.email } });

    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>

      <div className="signup-form-wrapper">
        <div className="signup-form">
          <h2>Create Account</h2>

          <input placeholder="Enter your full name" onChange={handleChange} />
          <input type="email" placeholder="youremail@nu.edu.pk" onChange={handleChange} />
          <input type="password" placeholder="Create a strong password" onChange={handleChange} />
          <input type="password" placeholder="Confirm your password" onChange={handleChange} />

          <button onClick={handleCreateAccount}>Create Account</button>

          <Link to="/login">Sign in</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}