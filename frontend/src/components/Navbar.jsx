import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <header className="header" style={{background: 'transparent', boxShadow: 'none'}}>
      <Link to="/" className="header-left">
        <div className="logo-icon" style={{background: '#2dd4bf', color: '#082226'}}>F</div>
        <div className="logo-text">Fynder</div>
      </Link>

      <nav className="header-actions">
        <Link to="/login" style={{color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '14px'}}>
          Log In
        </Link>
        <Link
          to="/signup"
          style={{
            background: '#2dd4bf', 
            color: '#082226', 
            padding: '8px 16px', 
            borderRadius: '9999px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px'
          }}
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
