import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../../components/Navbar';
import AppFooter from '../../components/Footer';
import { Send, CheckCircle2 } from 'lucide-react';

/* Target student — in production this comes from router state / props */
const STUDENT = {
  initials: 'FM', bg: '#7c3aed',
  name: 'Fatima Malik', id: '23L-0845',
  dept: 'Computer Science', batch: '2023',
  skills: ['Python', 'Machine Learning', 'Deep Learning'],
  match: 95,
};

export default function Sendrequest() {
  const navigate      = useNavigate();
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-body)', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar />

      <main style={{ flex: 1, padding: '40px 32px', maxWidth: 560, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {!done ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              Send Partner Request
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-placeholder)', marginBottom: 28 }}>
              Send a partnership request to collaborate on your FYP
            </p>

            {/* Student preview */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--accent-cyan-border)',
              borderRadius: 14, padding: 20, marginBottom: 22,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', background: STUDENT.bg, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700, color: '#fff',
                }}>{STUDENT.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#fff' }}>{STUDENT.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-placeholder)' }}>
                    {STUDENT.id}&nbsp;&nbsp;•&nbsp;&nbsp;{STUDENT.dept}&nbsp;&nbsp;•&nbsp;&nbsp;Batch {STUDENT.batch}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                    {STUDENT.skills.map(s => (
                      <span key={s} style={{
                        fontSize: 11, padding: '2px 9px', borderRadius: 4,
                        background: 'rgba(45,255,234,0.09)', color: '#2DFFEA',
                        border: '1px solid rgba(45,255,234,0.22)',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#2DFFEA', flexShrink: 0 }}>
                  {STUDENT.match}%
                </span>
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
                Add a message&nbsp;<span style={{ color: 'var(--text-placeholder)' }}>(optional)</span>
              </label>
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="Hi! I think we'd make a great FYP team. I have experience in..."
                rows={4}
                style={{
                  width: '100%', boxSizing: 'border-box', padding: '12px 14px',
                  background: 'var(--bg-card)', border: '1px solid var(--accent-cyan-border)',
                  borderRadius: 10, color: '#fff', fontSize: 13,
                  resize: 'vertical', lineHeight: 1.55,
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Send Partner Request */}
              <button onClick={() => setDone(true)} style={{
                flex: 1, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#2DFFEA,#22D3EE)',
                color: '#051518', fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Send size={16} /> Send Partner Request
              </button>
              <button onClick={() => navigate(-1)} style={{
                padding: '12px 22px', borderRadius: 10, cursor: 'pointer', fontSize: 14,
                background: 'transparent', border: '1px solid var(--accent-cyan-border)',
                color: 'var(--text-muted)',
              }}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          /* ── Success state ── */
          <div style={{ textAlign: 'center', paddingTop: 64 }}>
            <CheckCircle2 size={68} color="#2DFFEA" style={{ marginBottom: 22 }} />
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Request Sent!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 30 }}>
              Your partner request has been sent to&nbsp;
              <strong style={{ color: '#2DFFEA' }}>{STUDENT.name}</strong>.
              <br />You'll be notified when they respond.
            </p>
            <button onClick={() => navigate('/app/search')} style={{
              padding: '10px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#2DFFEA,#22D3EE)',
              color: '#051518', fontWeight: 600, fontSize: 14,
            }}>
              Back to Search
            </button>
          </div>
        )}

      </main>
      <AppFooter />
    </div>
  );
}