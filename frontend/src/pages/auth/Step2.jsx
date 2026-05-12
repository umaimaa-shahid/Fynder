import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios"; // ✅ added
import "./Step2.css";   

export default function Step2() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skills = [
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "AI",
    "Data Science",
    "UI/UX Design",
    "Backend Development",
    "Frontend Development",
    "DevOps",
    "Blockchain",
    "Cloud Computing",
    "Cybersecurity",
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // ✅ UPDATED FUNCTION ONLY
  const handleNext = async () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN IN STEP2:", token);

    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }
    if (selectedSkills.length < 3) {
      alert("Please select at least 3 skills.");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  
    try {
      
      const res = await axios.post(
        `${apiUrl}/api/profile/step2`,
        { skills: selectedSkills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("SUCCESS:", res.data);
  
      if (res.data.success) {
        navigate("/profilesetup-step3");
      } else {
        alert(res.data.message);
      }
  
    } catch (err) {
      console.error("STEP2 ERROR:", err.response?.data || err.message);
      alert("Failed to save skills. Please try again.");
    }
  };
  const handleBack = () => {
    navigate("/profilesetup-step1");
  };

  return (
    <div className="step2-page">
      {/* Logo */}
      <div className="step2-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>

      {/* Progress bar */}
      <div className="step2-progress">
        <div className="progress-info">
          <span>Step 2 of 3</span>
          <span>67%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "67%" }} />
        </div>
      </div>

      {/* Form */}
      <div className="step2-form-wrapper">
        <div className="step2-form">
          <h2 className="step2-title">Technical Skills</h2>
          <p className="step2-subtitle">
            Select the skills you have (select at least 3)
          </p>

          <div className="skills-grid">
            {skills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`skill-button ${
                  selectedSkills.includes(skill) ? "selected" : ""
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          <div className="step2-actions">
            <button onClick={handleBack} className="back-button">
              ← Back
            </button>
            <button onClick={handleNext} className="next-button">
              Next →
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}