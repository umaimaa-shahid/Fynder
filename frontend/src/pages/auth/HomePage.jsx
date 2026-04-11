import React, { useEffect, useRef } from "react";
import {
  ShieldCheckIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./HomePage.css";   

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Find Your Perfect <span>FYP Partner</span></h1>
        <p className="hero-subtitle">
          Stop wasting time in WhatsApp groups. Connect with compatible teammates
          through AI-powered matching and verified university profiles.
        </p>
        <Link to="/signup">
          <button className="cta-button" style={{ marginBottom: '2rem' }}>Get Started Free →</button>
        </Link>
        <div className="hero-features">
          <div><SparklesIcon width={20} /> AI Scoring</div>
          <div><ChatBubbleLeftRightIcon width={20} /> Real-time Chat</div>
          <div><ShieldCheckIcon width={20} /> Verified Users</div>
          <div><MagnifyingGlassIcon width={20} /> Smart Filters</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features-title">Everything You Need</h2>
        <p className="features-subtitle">
          Smart features designed to help you build the perfect FYP team
        </p>

        <div className="features-grid">
          <FeatureCard
            icon={<ShieldCheckIcon className="icon" />}
            title="Verified Platform"
            description="Secure registration via university email. Only real students can join the network."
          />
          <FeatureCard
            icon={<SparklesIcon className="icon" />}
            title="AI-Powered Matching"
            description="Smart recommendations based on your unique skills, interests, and compatibility."
          />
          <FeatureCard
            icon={<MagnifyingGlassIcon className="icon" />}
            title="Advanced Search"
            description="Filter candidates by specific skills, project domain, batch, and availability."
          />
          <FeatureCard
            icon={<UserGroupIcon className="icon" />}
            title="Group Management"
            description="Create, organize, and manage your ultimate FYP teams with up to 3 members."
          />
          <FeatureCard
            icon={<ChatBubbleLeftRightIcon className="icon" />}
            title="Built-in Chat"
            description="Communicate directly with potential partners without needing external apps."
          />
          <FeatureCard
            icon={<LightBulbIcon className="icon" />}
            title="Project Ideas"
            description="Discover AI-generated FYP ideas tailored specifically to your group's strengths."
          />
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps">
        <h2 className="steps-title">How It Works</h2>
        <p className="steps-subtitle">Start collaborating in four simple steps</p>

        <div className="steps-grid">
          <StepCard number="1" title="Sign Up" description="Register with your university email and verify your student account." />
          <StepCard number="2" title="Create Profile" description="Add your technical skills, interests, and preferred FYP domains." />
          <StepCard number="3" title="Find Partners" description="Get precise AI recommendations or search manually for teammates." />
          <StepCard number="4" title="Form Team" description="Send requests, start chatting, and build your perfect project group." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-wrapper">
        <div className="cta">
          <h2 className="cta-title">Ready to Find Your Team?</h2>
          <p className="cta-subtitle">
            Join hundreds of students who have already found their perfect FYP partners.
          </p>
          <Link to="/signup">
            <button className="cta-button">Start Matching Today →</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="feature-card" ref={cardRef} onMouseMove={handleMouseMove}>
      {icon}
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }) => (
  <div className="step-card">
    <div className="step-number">{number}</div>
    <h3 className="step-title">{title}</h3>
    <p className="step-description">{description}</p>
  </div>
);

export default HomePage;
