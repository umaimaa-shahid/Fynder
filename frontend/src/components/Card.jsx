import { useState } from 'react';
import { Send, Check } from 'lucide-react';

/**
 * StudentCard
 * Props:
 *   student : { initials, bg, name, id, dept, batch, skills[], interests[], available }
 *   onSend  : (student) => void
 */
export default function StudentCard({ student, onSend }) {
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (sent) return;
    setSent(true);
    onSend?.(student);
  }

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--accent-cyan-border)',
      borderRadius: 12,
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>

      {/* ── Row 1: avatar + info + available badge ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: student.bg || '#0d9488',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {student.initials}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-white)', lineHeight: 1.3 }}>
              {student.name}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-placeholder)', marginTop: 1 }}>
              {student.id}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
              {student.dept}&nbsp;&nbsp;•&nbsp;&nbsp;Batch {student.batch}
            </div>
          </div>
        </div>

        {student.available && (
          <span style={{
            fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, flexShrink: 0,
            background: 'rgba(0,166,62,0.12)', color: '#4ade80',
            border: '1px solid rgba(74,222,128,0.25)',
          }}>
            Available
          </span>
        )}
      </div>

      {/* ── Skills ── */}
      {student.skills?.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-placeholder)', marginBottom: 5, fontWeight: 500 }}>
            Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {student.skills.map(s => (
              <span key={s} style={{
                fontSize: 11, padding: '2px 9px', borderRadius: 4,
                background: 'rgba(45,255,234,0.09)', color: '#2DFFEA',
                border: '1px solid rgba(45,255,234,0.22)',
              }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── Interests ── */}
      {student.interests?.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-placeholder)', marginBottom: 5, fontWeight: 500 }}>
            Interests
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {student.interests.map(i => (
              <span key={i} style={{
                fontSize: 11, padding: '2px 9px', borderRadius: 4,
                background: 'rgba(125,211,252,0.08)', color: '#7dd3fc',
                border: '1px solid rgba(125,211,252,0.2)',
              }}>{i}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── Send Partner Request button ── */}
      <button
        onClick={handleSend}
        disabled={sent}
        style={{
          marginTop: 2,
          width: '100%',
          padding: '9px 0',
          borderRadius: 8,
          border: 'none',
          cursor: sent ? 'default' : 'pointer',
          background: sent
            ? 'rgba(45,255,234,0.08)'
            : 'linear-gradient(135deg, #2DFFEA 0%, #22D3EE 100%)',
          color: sent ? '#2DFFEA' : '#051518',
          fontWeight: 600,
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          transition: 'opacity 0.2s',
        }}
      >
        {sent ? <Check size={14} /> : <Send size={14} />}
        {sent ? 'Request Sent' : 'Send Partner Request'}
      </button>
    </div>
  );
}