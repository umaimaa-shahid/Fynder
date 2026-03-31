import React from "react";
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
import Button from "../../components/Button";
import "./HomePage.css";   

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Find Your Perfect FYP Partner</h1>
        <p className="hero-subtitle">
          Stop wasting time in WhatsApp groups. Connect with compatible teammates
          through AI-powered matching and verified university profiles.
        </p>
        <Link to="/signup">
          <Button label="Get Started Free →" />
        </Link>
        <div className="hero-features">
          <div>✓ AI-powered compatibility scoring</div>
          <div>✓ Real-time chat & notifications</div>
          <div>✓ Secure university verification</div>
          <div>✓ Advanced search filters</div>
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
            description="Secure registration via university email. Only real students can join."
          />
          <FeatureCard
            icon={<SparklesIcon className="icon" />}
            title="AI-Powered Matching"
            description="Smart recommendations based on skills, interests, and compatibility."
          />
          <FeatureCard
            icon={<MagnifyingGlassIcon className="icon" />}
            title="Advanced Search"
            description="Filter by skills, domain, batch, and availability status."
          />
          <FeatureCard
            icon={<UserGroupIcon className="icon" />}
            title="Group Management"
            description="Create and manage FYP teams with up to 3 members."
          />
          <FeatureCard
            icon={<ChatBubbleLeftRightIcon className="icon" />}
            title="Built-in Chat"
            description="Communicate directly without switching to external apps."
          />
          <FeatureCard
            icon={<LightBulbIcon className="icon" />}
            title="Project Ideas"
            description="AI-generated FYP ideas based on your group's strengths."
          />
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps">
        <h2 className="steps-title">How It Works</h2>
        <p className="steps-subtitle">Get started in just four simple steps</p>

        <div className="steps-line"></div>

        <div className="steps-grid">
          <StepCard number="01" title="Sign Up" description="Register with your university email and verify your account." />
          <StepCard number="02" title="Create Profile" description="Add your skills, interests, and preferred FYP domains." />
          <StepCard number="03" title="Find Partners" description="Get AI recommendations or search manually for compatible teammates." />
          <StepCard number="04" title="Form Team" description="Send requests, chat, and build your perfect FYP group." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-wrapper">
        <section className="cta">
          <h2 className="cta-title">Ready to Find Your Team?</h2>
          <p className="cta-subtitle">
            Join hundreds of students who have already found their perfect FYP partners
          </p>
          <Link to="/signup">
            <button className="cta-button">Start Matching Today →</button>
          </Link>
        </section>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    {icon}
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="step-card">
    <div className="step-number">{number}</div>
    <h3 className="step-title">{title}</h3>
    <p className="step-description">{description}</p>
  </div>
);

export default HomePage;
