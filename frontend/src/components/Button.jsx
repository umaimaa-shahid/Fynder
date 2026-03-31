import React from "react";

const Button = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-teal-300 transition"
  >
    {label}
  </button>
);

export default Button;
