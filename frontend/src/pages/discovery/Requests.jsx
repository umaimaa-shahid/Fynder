import { useState } from 'react';
import AppNavbar from '../../components/Navbar';
import AppFooter from '../../components/Footer';
import { UserRoundCheck, UserRoundPlus, Clock, X, Check } from 'lucide-react';

/* ── mock data ── */
const RECEIVED = [
  {
    initials: 'AK', bg: '#0d9488',
    name: 'Ahmed Khan', id: '23L-0895', dept: 'Computer Science', batch: '2023',
    tags: ['Web Development', 'React'],
    message: "Hi! I saw your profile and think we'd be great partners. I have experience with full-stack development.",
    time: '2 hours ago',
  },
  {
    initials: 'SA', bg: '#0d9488',
    name: 'Sara Ahmed', id: '23L-0912', dept: 'Computer Science', batch: '2023',
    tags: ['UI/UX Design', 'Frontend Development'],
    message: "Hi! I saw your profile and think we'd be great partners. I have experience with full-stack development.",
    time: '5 hours ago',
  },
  {
    initials: 'AH', bg: '#7c3aed',
    name: 'Ali Hassan', id: '23L-0920', dept: 'Computer Science', batch: '2023',
    tags: ['Machine Learning', 'Python'],
    message: "Hey! Interested in an AI/ML focused FYP? Let's connect!",
    time: '1 day ago',
  },
];

const SENT = [
  { initials: 'FM', bg: '#7c3aed', name: 'Fatima Malik', id: '23L-0845', dept: 'Computer Science',     sentOn: 'March 6, 2026' },
  { initials: 'HA', bg: '#0d9488', name: 'Hassan Ali',   id: '23L-0956', dept: 'Software Engineering', sentOn: 'March 5, 2026' },
];

/* ── Received card — screenshot 5 layout ── */
function ReceivedCard({ req }) {
  const [status, setStatus] = useState(null);

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--accent-cyan-border)',
      borderRadius: 14, padding: 20, marginBottom: 14,
    }}>
      {/* Avatar + name + dept + batch + tags */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', background: req.bg, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#fff',
        }}>{req.initials}</div>

        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>{req.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-placeholder)' }}>
            {req.id}&nbsp;&nbsp;•&nbsp;&nbsp;{req.dept}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-placeholder)', marginBottom: 6 }}>Batch {req.batch}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {req.tags.map(t => (
              <span key={t} style={{
                fontSize: 11, padding: '2px 9px', borderRadius: 4,
                background: 'rgba(45,255,234,0.09)', color: '#2DFFEA',
                border: '1px solid rgba(45,255,234,0.22)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Message bubble */}
      <div style={{
        background: 'var(--bg-deep)', borderRadius: 10, padding: '12px 14px',
        fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 12,
      }}>
        {req.message}
      </div>

      {/* Time + action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--text-placeholder)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <Clock size={13} />{req.time}
        </span>

        {status === null ? (
          <div style={{ display: 'flex', gap: 10 }}>
            {/* ✕ Decline */}
            <button onClick={() => setStatus('declined')} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
              background: 'rgba(255,69,58,0.09)', border: '1px solid rgba(255,69,58,0.35)', color: '#ff6b6b',
            }}>
              <X size={14} /> Decline
            </button>
            {/* ✓ Accept */}
            <button onClick={() => setStatus('accepted')} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600,
              background: 'linear-gradient(135deg,#2DFFEA,#22D3EE)', border: 'none', color: '#051518',
            }}>
              <Check size={14} /> Accept
            </button>
          </div>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 600, color: status === 'accepted' ? '#2DFFEA' : '#ff6b6b' }}>
            {status === 'accepted' ? '✓ Accepted' : '✗ Declined'}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Sent card — screenshot 4 layout ── */
function SentCard({ req }) {
  const [cancelled, setCancelled] = useState(false);

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--accent-cyan-border)',
      borderRadius: 14, padding: '18px 20px', marginBottom: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    }}>
      {/* Left: avatar + name + id • dept + sent date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', background: req.bg, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#fff',
        }}>{req.initials}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>{req.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-placeholder)' }}>
            {req.id}&nbsp;&nbsp;•&nbsp;&nbsp;{req.dept}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-placeholder)', marginTop: 2 }}>
            Sent on {req.sentOn}
          </div>
        </div>
      </div>

      {/* Right: ⏱Pending + ✕ Cancel  —OR—  cancelled state */}
      {!cancelled ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{
            fontSize: 12, fontWeight: 600, padding: '4px 11px', borderRadius: 20,
            background: 'rgba(251,146,60,0.12)', color: '#fb923c',
            border: '1px solid rgba(251,146,60,0.3)',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <Clock size={12} /> Pending
          </span>
          <button onClick={() => setCancelled(true)} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
            background: 'rgba(255,69,58,0.09)', border: '1px solid rgba(255,69,58,0.35)', color: '#ff6b6b',
          }}>
            <X size={13} /> Cancel
          </button>
        </div>
      ) : (
        <span style={{ fontSize: 13, color: 'var(--text-placeholder)', flexShrink: 0 }}>Cancelled</span>
      )}
    </div>
  );
}

/* ── Page ── */
export default function Requests() {
  const [tab, setTab] = useState('received');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-body)', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar />

      <main style={{ flex: 1, padding: '28px 32px', maxWidth: 860, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Partner Requests</h1>
        <p style={{ fontSize: 13, color: 'var(--text-placeholder)', marginBottom: 22 }}>
          Manage your incoming and outgoing partner requests
        </p>

        {/* ── Tab bar ── */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(34,211,238,0.12)', marginBottom: 24 }}>
          {[
            { key: 'received', Icon: UserRoundCheck, label: 'Received', count: RECEIVED.length },
            { key: 'sent',     Icon: UserRoundPlus,  label: 'Sent',     count: SENT.length     },
          ].map(({ key, Icon, label, count }) => {
            const active = tab === key;
            return (
              <button key={key} onClick={() => setTab(key)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', cursor: 'pointer',
                background: 'transparent', border: 'none',
                borderBottom: `2px solid ${active ? '#2DFFEA' : 'transparent'}`,
                color: active ? '#2DFFEA' : 'var(--text-placeholder)',
                fontWeight: active ? 600 : 400, fontSize: 14,
                marginBottom: -1, transition: 'color 0.15s',
              }}>
                <Icon size={15} />
                {label}
                <span style={{
                  minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999,
                  background: active ? 'rgba(45,255,234,0.15)' : 'rgba(255,255,255,0.07)',
                  color: active ? '#2DFFEA' : 'var(--text-placeholder)',
                  fontSize: 11, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Cards ── */}
        {tab === 'received'
          ? RECEIVED.map((r, i) => <ReceivedCard key={i} req={r} />)
          : SENT.map((s, i)    => <SentCard     key={i} req={s} />)
        }

      </main>
      <AppFooter />
    </div>
  );
}