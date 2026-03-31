import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-darkgreen-1000 text-white px-6 py-4 flex justify-between items-center shadow">
      {}
      <div className="flex items-center space-x-2">
       <div className="logo-icon" style={{width: 32, height: 32}}>F</div>

        <Link to="/" className="text-2xl font-bold text-teal-200">
          Fynder
        </Link>
      </div>

      {}
      <nav className="flex gap-6 items-center">
        <Link to="/login" className="hover:text-teal-300">
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-teal-400 text-gray-900 px-4 py-2 rounded hover:bg-teal-300 font-semibold"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
