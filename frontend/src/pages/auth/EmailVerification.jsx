import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function EmailVerification() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#082226] flex flex-col">
      {}
      <div className="flex flex-col items-center mt-16 mb-8">
      <div className="flex flex-col items-center mt-12">
          <div className="flex items-center space-x-2">
            <div className="logo-icon" style={{ width: 32, height: 32 }}>F</div>
            <span className="text-white font-bold text-2xl">Fynder</span>
          </div>
        </div>
      </div>

      {}
      <div className="flex flex-col items-center justify-center flex-grow px-4 mb-16">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-[#082226] mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to your university email address. Please click the link to verify your account and continue.
          </p>

          {}
          <div className="bg-gray-900 text-white rounded p-3 mb-2 text-center">
            student@nu.edu.pk
          </div>
          <p className="text-green-600 text-sm mb-6 text-center">Email sent successfully.</p>

          {}
          <button
             onClick={() => navigate("/profilesetup-step1")}
            className="w-full bg-teal-400 text-[#082226] font-semibold py-2 rounded hover:bg-teal-300 transition mb-4"
          >
            Continue to Profile Setup
          </button>
          {}
          <p className="text-gray-500 text-sm text-center">
            Didn't receive the email?{" "}
            <Link to="/resend" className="text-teal-400 hover:text-teal-300">
              Resend
            </Link>
          </p>
        </div>
      </div>

      {}
      <Footer />
    </div>
  );
}
