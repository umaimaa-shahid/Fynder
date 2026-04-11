import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Search, Bell, Users, 
  MessageSquare, User, Settings, ChevronLeft, ChevronRight, Star
} from 'lucide-react';

const ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
  { label: 'Search',    icon: Search,          path: '/app/search'    },
  { label: 'Recommended', icon: Star,          path: '/app/recommended' }, // Added this
  { label: 'Requests',  icon: Bell,            path: '/app/requests'  },
  { label: 'Groups',    icon: Users,           path: '/app/group'     },
  { label: 'Chat',      icon: MessageSquare,   path: '/app/group/chat' },
  { label: 'Profile',   icon: User,            path: '/app/profile'   },
  { label: 'Settings',  icon: Settings,        path: '/app/settings'  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 min-h-screen bg-[#051518] border-r border-[#22D3EE33] flex flex-col py-6 sticky top-0`}>
      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {ITEMS.map(({ label, icon: Icon, path }) => {
          const active = pathname === path;
          return (
            <Link 
              key={path} 
              to={path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                active 
                ? 'bg-[#2DFFEA] text-[#051518] font-bold shadow-[0_4px_15px_rgba(45,255,234,0.2)]' 
                : 'text-gray-400 hover:bg-[#2DFFEA0D] hover:text-white'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle - Hidden on Mobile */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex mx-4 p-2 rounded-lg bg-[#082226] border border-[#22D3EE33] text-[#2DFFEA] items-center justify-center hover:bg-[#2DFFEA1A]"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
