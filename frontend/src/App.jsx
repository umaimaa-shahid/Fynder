import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chat from './pages/group/Chat';
import MyGroup from './pages/group/MyGroup';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';

// Auth pages
import Home from "./pages/auth/HomePage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp"; // ⚠️ make sure filename matches
import EmailVerification from "./pages/auth/EmailVerification"; 
import Step1 from "./pages/auth/Step1";
import Step2 from "./pages/auth/Step2";
import Step3 from "./pages/auth/Step3";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔹 AUTH ROUTES (NO Layout) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/profilesetup-step1" element={<Step1 />} />
        <Route path="/profilesetup-step2" element={<Step2 />} />
        <Route path="/profilesetup-step3" element={<Step3 />} />

        {/* 🔹 APP ROUTES (WITH Layout) */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="group/chat" replace />} />
          <Route path="group" element={<MyGroup />} />
          <Route path="group/chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;