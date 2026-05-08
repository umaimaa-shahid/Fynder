import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";
import "./Step3.css";

export default function Step3() {
  const navigate = useNavigate();

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");

  const interests = [
    "Artificial Intelligence",
    "Web Development",
    "Mobile Apps",
    "Data Analytics",
    "IoT",
    "Blockchain",
    "Computer Vision",
    "NLP",
    "Game Development",
    "AR/VR",
    "Cybersecurity",
    "Cloud Computing",
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = async () => {
    if (selectedInterests.length === 0 || !availability) {
      alert("Please select at least one interest and set availability.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not logged in");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/profile/step3",
        {
          interests: selectedInterests,
          availability,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile setup complete!");

      // IMPORTANT FIX: correct route
      navigate("/app/dashboard");

    } catch (err) {
      console.log(err);
      alert("Error completing profile. Try again.");
    }
  };

  const handleBack = () => {
    navigate("/profilesetup-step2");
  };

  return (
    <div className="step3-page">

      {/* Logo */}
      <div className="step3-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>

      {/* Progress */}
      <div className="step3-progress">
        <div className="progress-info">
          <span>Step 3 of 3</span>
          <span>100%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "100%" }} />
        </div>
      </div>

      {/* Form */}
      <div className="step3-form-wrapper">
        <div className="step3-form">

          <h2 className="step3-title">FYP Interests</h2>
          <p className="step3-subtitle">
            Select your interest areas
          </p>

          <div className="interests-grid">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`interest-button ${
                  selectedInterests.includes(interest) ? "selected" : ""
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <label className="step3-label">Availability Status</label>
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="e.g., Available for collaboration"
            className="step3-input"
          />

          <label className="step3-label">
            Bio <span className="optional">(Optional)</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell others about your FYP goals..."
            rows={4}
            className="step3-textarea"
          />

          <div className="step3-actions">
            <button onClick={handleBack} className="back-button">
              ← Back
            </button>

            <button onClick={handleComplete} className="complete-button">
              Complete
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}