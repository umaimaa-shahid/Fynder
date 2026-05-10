import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserRoundCheck, UserRoundPlus, Clock, X, Check, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

const AVATAR_COLORS = ['#2DFFEA', '#0d9488', '#7c3aed', '#2563eb', '#db2777'];

const cyanTag  = { fontSize: 11, padding: '2px 9px', borderRadius: 4, background: 'rgba(45,255,234,0.09)', color: '#2DFFEA', border: '1px solid rgba(45,255,234,0.22)' };
const batchTag = { fontSize: 11, padding: '2px 9px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.08)' };

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  if (days > 0)  return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${mins} min ago`;
}

function ReceivedCard({ req, onAction }) {
  const [status, setStatus]   = useState(req.status === 'pending' ? null : req.status);
  const [loading, setLoading] = useState(false);

  const handle = async (action) => {
    setLoading(true);
    try {
      await api.patch(`/requests/${req._id}`, { action });
      setStatus(action === 'accept' ? 'accepted' : 'declined');
      onAction?.();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const sender = req.sender || {};

  return (
    <div style={{ background: '#0A2A2E', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 12, padding: 20, marginBottom: 14 }}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 10 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#2DFFEA', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#051518' }}>
          {initials(sender.name)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>{sender.name}</div>
          <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>{sender.studentId}  •  {sender.dept}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            <span style={batchTag}>Batch {sender.batch}</span>
            {(sender.skills || []).slice(0, 3).map(t => <span key={t} style={cyanTag}>{t}</span>)}
          </div>
        </div>
      </div>

      {req.message && (
        <div style={{ background: '#051518', borderRadius: 8, padding: '11px 14px', fontSize: 13, color: '#94A3B8', lineHeight: 1.55, marginBottom: 12 }}>
          {req.message}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 5 }}>
          <Clock size={13} />{timeAgo(req.createdAt)}
        </span>
        {status === null ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => handle('decline')}
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, background: 'rgba(255,69,58,0.09)', border: '1px solid rgba(255,69,58,0.35)', color: '#ff6b6b', opacity: loading ? 0.5 : 1 }}
            >
              <X size={13} /> Decline
            </button>
            <button
              onClick={() => handle('accept')}
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg,#2DFFEA,#22D3EE)', border: 'none', color: '#051518', opacity: loading ? 0.5 : 1 }}
            >
              {loading ? <Loader2 size={13} /> : <Check size={13} />} Accept
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

function SentCard({ req, onAction }) {
  const [status, setStatus]   = useState(req.status);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await api.patch(`/requests/${req._id}`, { action: 'cancel' });
      setStatus('cancelled');
      onAction?.();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const receiver = req.receiver || {};

  return (
    <div style={{ background: '#0A2A2E', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 12, padding: '18px 20px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#2DFFEA', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#051518' }}>
          {initials(receiver.name)}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>{receiver.name}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{receiver.studentId}  •  {receiver.dept}</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>
            Sent on {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {status === 'pending' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 11px', borderRadius: 20, background: 'rgba(251,146,60,0.12)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.3)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={12} /> Pending
          </span>
          <button
            onClick={handleCancel}
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#94A3B8', opacity: loading ? 0.5 : 1 }}
          >
            <X size={13} /> Cancel
          </button>
        </div>
      ) : (
        <span style={{ fontSize: 13, color: status === 'accepted' ? '#2DFFEA' : '#64748B', flexShrink: 0, fontWeight: 600 }}>
          {status === 'accepted' ? '✓ Accepted' : status === 'declined' ? '✗ Declined' : 'Cancelled'}
        </span>
      )}
    </div>
  );
}

export default function Requests() {
  const { state } = useLocation();

  const [tab, setTab]           = useState(state?.openTab || 'received');
  const [received, setReceived] = useState([]);
  const [sent, setSent]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [recv, sentData] = await Promise.all([
        api.get('/requests/received'),
        api.get('/requests/sent'),
      ]);
      setReceived(recv.data);
      setSent(sentData.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, marginBottom: 4 }}>Partner Requests</h1>
      <p style={{ fontSize: 13, color: '#64748B', margin: 0, marginBottom: 22 }}>Manage your incoming and outgoing partner requests</p>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(34,211,238,0.12)', marginBottom: 24 }}>
        {[
          { key: 'received', Icon: UserRoundCheck, label: 'Received', count: received.length },
          { key: 'sent',     Icon: UserRoundPlus,  label: 'Sent',     count: sent.length },
        ].map(({ key, Icon, label, count }) => {
          const active = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', cursor: 'pointer',
              background: 'transparent', border: 'none',
              borderBottom: `2px solid ${active ? '#2DFFEA' : 'transparent'}`,
              color: active ? '#2DFFEA' : '#64748B',
              fontWeight: active ? 600 : 400, fontSize: 14, marginBottom: -1, transition: 'color 0.15s',
            }}>
              <Icon size={15} /> {label}
              <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: active ? 'rgba(45,255,234,0.15)' : 'rgba(255,255,255,0.07)', color: active ? '#2DFFEA' : '#64748B', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {error && <div style={{ color: '#ff6b6b', marginBottom: 16 }}>⚠️ {error}</div>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader2 size={32} color="#2DFFEA" style={{ animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : tab === 'received' ? (
        received.length === 0
          ? <p style={{ color: '#64748B', textAlign: 'center', padding: 40 }}>No requests received yet.</p>
          : received.map(r => <ReceivedCard key={r._id} req={r} onAction={fetchAll} />)
      ) : (
        sent.length === 0
          ? <p style={{ color: '#64748B', textAlign: 'center', padding: 40 }}>You haven't sent any requests yet.</p>
          : sent.map(s => <SentCard key={s._id} req={s} onAction={fetchAll} />)
      )}
    </div>
  );
}