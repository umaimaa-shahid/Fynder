import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Bell, Users, MessageSquare, User, Settings } from 'lucide-react';

// Bottom nav: 5 items only (no Profile/Settings)
const BOTTOM_NAV = [
  { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Search',    path: '/app/search',    icon: Search           },
  { name: 'Requests',  path: '/app/requests',  icon: Bell             },
  { name: 'Groups',    path: '/app/group',     icon: Users, end: true },
  { name: 'Chat',      path: '/app/group/chat',icon: MessageSquare    },
];

// Desktop center nav
const NAV = BOTTOM_NAV;

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#081518] text-white font-sans">

      {/* TOP HEADER */}
      <header className="px-8 py-4 bg-[#0a1f23] border-b border-white/10 flex justify-between items-center sticky top-0 z-50">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-[#2DFFEA] text-[#081518] w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">F</div>
          <span className="text-xl font-bold text-[#2DFFEA]">Fynder</span>
        </div>

        {/* Desktop center nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(({ name, path, icon: Icon, end }) => (
            <NavLink key={path} to={path} end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <Icon size={17} />{name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right icons */}
        <div className="hidden md:flex border-l border-white/10 pl-4 gap-3 items-center">
          <NavLink to="/app/profile"
            className={({ isActive }) =>
              `p-1 rounded-lg transition-colors ${isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-[#2DFFEA]'}`
            }
          ><User size={20} /></NavLink>
          <NavLink to="/app/settings"
            className={({ isActive }) =>
              `p-1 rounded-lg transition-colors ${isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-[#2DFFEA]'}`
            }
          ><Settings size={20} /></NavLink>
        </div>

        {/* Mobile top-right: Profile + Settings only */}
        <div id="mobile-top-actions" className="md:hidden flex gap-3 items-center">
          <NavLink to="/app/profile"
            className={({ isActive }) =>
              `p-1.5 rounded-lg transition-colors ${isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-[#2DFFEA]'}`
            }
          ><User size={22} /></NavLink>
          <NavLink to="/app/settings"
            className={({ isActive }) =>
              `p-1.5 rounded-lg transition-colors ${isActive ? 'text-[#2DFFEA]' : 'text-gray-400 hover:text-[#2DFFEA]'}`
            }
          ><Settings size={22} /></NavLink>
        </div>

      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* DESKTOP FOOTER */}
      <footer className="px-8 py-6 border-t border-white/5 flex justify-between text-[10px] text-gray-500 bg-[#081518]">
        <div>© 2026 Fynder, FAST-NU Lahore</div>
        <div className="flex gap-6 uppercase tracking-widest">
          <span>Privacy</span><span>Terms</span><span>Support</span>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAV — 5 items, no Profile/Settings */}
      <nav id="mobile-bottom-nav" aria-label="Mobile navigation">
        {BOTTOM_NAV.map(({ name, path, icon: Icon, end }) => (
          <NavLink key={path} to={path} end={end}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <Icon size={20} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

    </div>
  );
}