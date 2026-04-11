import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Bell, Users, MessageSquare, User, Settings } from 'lucide-react';

export default function Layout() {
  const { pathname } = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Search', path: '/app/search', icon: Search },
    { name: 'Requests', path: '/app/requests', icon: Bell },
    { name: 'Groups', path: '/app/group', icon: Users },
    { name: 'Chat', path: '/app/group/chat', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#081518] text-white font-sans">
      <header className="px-8 py-4 bg-[#0a1f23] border-b border-white/10 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 flex-1">
          <div className="bg-[#2DFFEA] text-[#081518] w-8 h-8 rounded-lg flex items-center justify-center font-bold">F</div>
          <span className="text-2xl font-bold text-[#2DFFEA]">Fynder</span>
        </div>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              end={link.path === '/app/group'}
              className={({ isActive }) => 
                `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-white'}`
              }
            >
              <link.icon size={18} /> {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-4 items-center flex-1 justify-end">
          <div className="flex gap-4 items-center border-l border-white/10 pl-6 h-6">
            <NavLink to="/app/profile" className={({ isActive }) => isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-[#2DFFEA]'}>
              <User size={20} className="cursor-pointer transition-colors" />
            </NavLink>
            <NavLink to="/app/settings" className={({ isActive }) => isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-[#2DFFEA]'}>
              <Settings size={20} className="cursor-pointer transition-colors" />
            </NavLink>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full p-8"><Outlet /></main>
      <footer className="px-8 py-6 border-t border-white/5 flex justify-between text-[10px] text-gray-500 bg-[#081518]">
        <div>© 2026 Fynder, FAST-NU Lahore</div> [cite: 16, 71, 108, 147]
        <div className="flex gap-6 uppercase tracking-widest">
          <span>Privacy</span><span>Terms</span><span>Support</span> [cite: 34, 74, 111, 150]
        </div>
      </footer>
    </div>
  );
}