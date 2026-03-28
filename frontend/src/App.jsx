import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chat from './pages/group/Chat';
import MyGroup from './pages/group/MyGroup';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/group/chat" replace />} />
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
