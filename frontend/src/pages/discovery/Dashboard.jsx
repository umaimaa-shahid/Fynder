import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, UserCheck, Clock } from 'lucide-react';

const STATS = [
  { icon: Eye,       value: 24, label: 'Profile Views',    iconBg: 'rgba(167,139,250,0.15)', iconColor: '#a78bfa' },
  { icon: UserCheck, value: 5,  label: 'Requests Sent',    iconBg: 'rgba(45,255,234,0.15)',  iconColor: '#2DFFEA' },
  { icon: Clock,     value: 3,  label: 'Pending Requests', iconBg: 'rgba(251,146,60,0.15)',  iconColor: '#fb923c' },
];

const TOP_MATCHES = [
  { initials: 'FM', bg: '#7c3aed', name: 'Fatima Malik', id: '23L-0845', pct: 95, tags: ['Python', 'Machine Learning', 'Deep Learning'] },
  { initials: 'HA', bg: '#0d9488', name: 'Hassan Ali',   id: '23L-0956', pct: 88, tags: ['React', 'Node.js', 'Machine Learning'] },
];

const RECENT_REQUESTS = [
  { initials: 'AK', bg: '#0d9488', name: 'Ahmed Khan', id: '23L-0895', time: '2 hours ago' },
  { initials: 'SA', bg: '#0d9488', name: 'Sara Ahmed',  id: '23L-0912', time: '5 hours ago' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#082226] text-white flex flex-col">
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* ── Welcome card (Responsive padding) ── */}
        <div className="bg-gradient-to-br from-[#0d948821] to-[#2dffea0a] border border-[#22D3EE33] rounded-2xl p-6 md:p-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2DFFEA] mb-1">
            Welcome, Umaima!
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mb-6">
            Here's what's happening with your FYP partner search
          </p>

          {/* Stats Grid: 1 column on mobile, 3 columns on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {STATS.map(({ icon: Icon, value, label, iconBg, iconColor }) => (
              <div key={label} className="bg-[#0A2A2E] border border-[#22D3EE33] rounded-xl p-4 flex items-center gap-4">
                <div style={{ background: iconBg }} className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={18} color={iconColor} />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">{value}</div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Strength */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="font-semibold text-sm">Profile Strength</p>
                <p className="text-[11px] text-gray-500">Complete your profile to get better matches</p>
              </div>
              <span className="bg-[#2DFFEA1F] text-[#2DFFEA] text-xs font-bold px-3 py-1 rounded-full">85%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-gradient-to-r from-[#2DFFEA] to-[#22D3EE]" />
            </div>
          </div>
        </div>

        {/* ── Bottom grid: Stack on mobile, side-by-side on large screens ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top Matches Section */}
          <section className="bg-[#0A2A2E] border border-[#22D3EE33] rounded-2xl p-5 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Top Matches</h2>
              <Link to="/app/recommended" className="text-sm text-[#2DFFEA] hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {TOP_MATCHES.map(m => (
                <div key={m.id} 
                  onClick={() => navigate('/app/send-request-message')} 
                  className="bg-[#051518] hover:border-[#2DFFEA66] border border-transparent transition-all cursor-pointer rounded-xl p-4 flex justify-between items-start"
                >
                  <div className="flex gap-3">
                    <div style={{ background: m.bg }} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                      {m.initials}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{m.name}</p>
                      <p className="text-[10px] text-gray-500 mb-2">{m.id}</p>
                      <div className="flex flex-wrap gap-2">
                        {m.tags.map(t => (
                          <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-[#2DFFEA11] text-[#2DFFEA] border border-[#2DFFEA33]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#2DFFEA] font-bold text-sm">{m.pct}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Requests Section */}
          <section className="bg-[#0A2A2E] border border-[#22D3EE33] rounded-2xl p-5 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Recent Requests</h2>
              <Link to="/app/requests" className="text-sm text-[#2DFFEA] hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {RECENT_REQUESTS.map(r => (
                <div key={r.id} className="bg-[#051518] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div style={{ background: r.bg }} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs">
                      {r.initials}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{r.name}</p>
                      <p className="text-[10px] text-gray-500">{r.id} • {r.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#2DFFEA1F] text-[#2DFFEA] font-bold px-3 py-1 rounded-md">New</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}