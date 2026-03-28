import { NavLink } from 'react-router-dom';
import { Home, Search, Bell, Users, MessageSquare, UserCircle, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fynder</span>
      </div>
      
      <nav className="header-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={20} /> Dashboard
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Search size={20} /> Search
        </NavLink>
        <NavLink to="/requests" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Bell size={20} /> Requests
        </NavLink>
        <NavLink to="/group" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} /> Groups
        </NavLink>
        <NavLink to="/group/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MessageSquare size={20} /> Chat
        </NavLink>
      </nav>

      <div className="header-actions">
        <NavLink to="/profile" className={({ isActive }) => `icon-btn ${isActive ? 'active' : ''}`}>
          <UserCircle size={24} />
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `icon-btn ${isActive ? 'active' : ''}`}>
          <Settings size={24} />
        </NavLink>
      </div>
    </header>
  );
}
