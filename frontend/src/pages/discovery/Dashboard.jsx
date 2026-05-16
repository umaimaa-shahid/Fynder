import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, UserCheck, Clock, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const STAT_META = [
  { key: 'profileViews',    label: 'Profile Views',    bg: 'rgba(167,139,250,0.15)', color: '#a78bfa', Icon: Eye       },
  { key: 'requestsSent',    label: 'Requests Sent',    bg: 'rgba(45,255,234,0.15)',  color: '#2DFFEA', Icon: UserCheck },
  { key: 'pendingReceived', label: 'Pending Requests', bg: 'rgba(251,146,60,0.15)',  color: '#fb923c', Icon: Clock     },
];

const cyanTag = {
  fontSize: 11, padding: '2px 9px', borderRadius: 4,
  background: 'rgba(45,255,234,0.09)', color: '#2DFFEA',
  border: '1px solid rgba(45,255,234,0.22)',
};

const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

const AVATAR_COLORS = ['#7c3aed', '#0d9488', '#2563eb', '#db2777', '#d97706'];

export default function Dashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  const userName = JSON.parse(localStorage.getItem('user') || '{}').name || 'there';

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setData(res.data))
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
      <Loader2 size={32} color="#2DFFEA" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ color: '#ff6b6b', textAlign: 'center', padding: 40 }}>
      ⚠️ {error} — make sure the backend is running.
    </div>
  );

  const { stats, profileStrength, topMatches, recentRequests } = data;

  return (
    <>
      <style>{`
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        .dash-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 767px) {
          .dash-bottom-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 639px) {
          .dash-stats-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
        @media (min-width: 640px) and (max-width: 767px) {
          .dash-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 479px) {
          .dash-welcome-card {
            padding: 16px !important;
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Welcome card */}
        <div
          className="dash-welcome-card"
          style={{
            background: 'linear-gradient(135deg,rgba(13,148,136,0.13),rgba(45,255,234,0.04))',
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: 16, padding: '28px 32px',
          }}
        >
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 700, color: '#2DFFEA', margin: 0, marginBottom: 4 }}>
            Welcome, {userName.split(' ')[0]}!
          </h1>
          <p style={{ fontSize: 13.5, color: '#94A3B8', margin: 0, marginBottom: 26 }}>
            Here's what's happening with your FYP partner search
          </p>

          {/* Stats */}
          <div className="dash-stats-grid">
            {STAT_META.map(({ key, label, bg, color, Icon }) => (
              <div key={key} style={{
                background: '#0A2A2E', border: '1px solid rgba(34,211,238,0.15)',
                borderRadius: 12, padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={19} color={color} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                    {stats[key] ?? 0}
                  </div>
                  <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 3 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Strength */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>Profile Strength</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Complete your profile to get better matches</div>
              </div>
              <span style={{ background: 'rgba(45,255,234,0.12)', color: '#2DFFEA', fontSize: 12, fontWeight: 700, padding: '3px 11px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                {profileStrength}%
              </span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${profileStrength}%`, height: '100%', background: 'linear-gradient(90deg,#2DFFEA,#22D3EE)', borderRadius: 999 }} />
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="dash-bottom-grid">

          {/* Top Matches */}
          <div style={{ background: '#0A2A2E', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 14, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>Top Matches</span>
              <Link to="/app/search" style={{ fontSize: 13, color: '#2DFFEA', textDecoration: 'none' }}>View all</Link>
            </div>

            {topMatches.length === 0 && (
              <p style={{ color: '#64748B', fontSize: 13 }}>No matches yet — add skills to your profile!</p>
            )}

            {topMatches.map((m, i) => (
              <div key={m._id} style={{
                background: '#051518', borderRadius: 10, padding: '12px 14px', marginBottom: 10,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10,
              }}>
                <div style={{ display: 'flex', gap: 10, minWidth: 0 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                    {initials(m.name)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#64748B', marginBottom: 5 }}>{m.studentId}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {(m.skills || []).slice(0, 3).map(t => <span key={t} style={cyanTag}>{t}</span>)}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#2DFFEA', flexShrink: 0, paddingTop: 2 }}>{m.pct}%</span>
              </div>
            ))}
          </div>

          {/* Recent Requests */}
          <div style={{ background: '#0A2A2E', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 14, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>Recent Requests</span>
              <Link to="/app/requests" style={{ fontSize: 13, color: '#2DFFEA', textDecoration: 'none' }}>View all</Link>
            </div>

            {recentRequests.length === 0 && (
              <p style={{ color: '#64748B', fontSize: 13 }}>No pending requests yet.</p>
            )}

            {recentRequests.map((r, i) => (
              <div key={r._id} style={{
                background: '#051518', borderRadius: 10, padding: 14, marginBottom: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                    {initials(r.sender?.name)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.sender?.name}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{r.sender?.studentId}</div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 6, background: 'rgba(45,255,234,0.12)', color: '#2DFFEA', flexShrink: 0 }}>New</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}