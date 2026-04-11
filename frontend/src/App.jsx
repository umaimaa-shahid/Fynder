import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chat from './pages/group/Chat';
import MyGroup from './pages/group/MyGroup';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';

// Auth pages
import Home from "./pages/auth/HomePage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp"; 
import EmailVerification from "./pages/auth/EmailVerification"; 
import Step1 from "./pages/auth/Step1";
import Step2 from "./pages/auth/Step2";
import Step3 from "./pages/auth/Step3";

// Discovery pages
import Dashboard from "./pages/discovery/Dashboard";
import SearchFilter from "./pages/discovery/SearchFilter";
import Recommendations from "./pages/discovery/Recommendations";
import Requests from "./pages/discovery/Requests";
import SendRequest from "./pages/discovery/SendRequest"; 
import SendRequests from "./pages/discovery/SendRequests"; 

import './App.css';
import SendMessage from './pages/discovery/SendRequest';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 AUTH ROUTES (Direct access, No Layout) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/profilesetup-step1" element={<Step1 />} />
        <Route path="/profilesetup-step2" element={<Step2 />} />
        <Route path="/profilesetup-step3" element={<Step3 />} />

        {/* 🔹 MAIN APP ROUTES (All wrapped in Layout for Header/Footer) */}
        <Route path="/app" element={<Layout />}>
          {/* Default redirect: /app -> /app/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Discovery Section*/}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<SearchFilter />} />
          <Route path="recommended" element={<Recommendations />} />
          <Route path="requests" element={<Requests />} />
          
          <Route path="send-request" element={<SendRequest />} /> 
          <Route path="send-request-message" element={<SendMessage />} />

          {/* Group & Profile Section */}
          <Route path="group" element={<MyGroup />} />
          <Route path="group/chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;