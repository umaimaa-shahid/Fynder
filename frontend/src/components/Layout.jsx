import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import AppNavbar from './Navbar'; 

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#082226]">
      {/* 1. Permanent Sidebar - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* Top Navbar stays at the top */}
        <AppNavbar />

        {/* Scrollable area for Dashboard, Search, etc. */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}