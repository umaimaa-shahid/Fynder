import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import "./Step1.css";   // external CSS

export default function Step1() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rollNumber: "",
    department: "",
    batch: "",
    cgpa: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.rollNumber || !form.department || !form.batch) {
      alert("Please fill in all required fields.");
      return;
    }
    navigate("/profilesetup-step2");
  };

  return (
    <div className="step1-page">
      {/* Logo */}
      <div className="step1-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>

      {/* Progress bar */}
      <div className="step1-progress">
        <div className="progress-info">
          <span>Step 1 of 3</span>
          <span>33%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "33%" }} />
        </div>
      </div>

      {/* Form */}
      <div className="step1-form-wrapper">
        <div className="step1-form">
          <h2 className="step1-title">Basic Information</h2>
          <p className="step1-subtitle">Tell us about your academic background</p>

          <label className="step1-label">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={form.rollNumber}
            onChange={handleChange}
            placeholder="e.g., 23L-0893"
            className="step1-input"
          />

          <label className="step1-label">Department</label>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="e.g. BCS"
            className="step1-input"
          />

          <label className="step1-label">Batch / Academic Year</label>
          <input
            type="text"
            name="batch"
            value={form.batch}
            onChange={handleChange}
            placeholder="e.g. 2023"
            className="step1-input"
          />

          <label className="step1-label">
            CGPA <span className="optional">(Optional)</span>
          </label>
          <input
            type="number"
            name="cgpa"
            value={form.cgpa}
            onChange={handleChange}
            placeholder="e.g., 3.5"
            min="0"
            max="4"
            step="0.01"
            className="step1-input"
          />

          <div className="step1-actions">
            <button onClick={handleNext} className="step1-button">
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
