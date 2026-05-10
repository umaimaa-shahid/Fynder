import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const SendMessage = () => {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const student    = state?.student || { name: 'Student', studentId: 'N/A', dept: 'N/A' };

  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSend = async () => {
    if (!student._id) {
      setError('Student ID missing — cannot send request.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/requests/send', { receiverId: student._id, message });
      setSent(true);
      setTimeout(() => navigate('/app/requests', { state: { openTab: 'sent' } }), 1800);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {!sent ? (
        <div className="bg-[#0a272b] p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold mb-1 text-[#2DFFEA]">
            Message {student.name}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {student.studentId} &nbsp;•&nbsp; {student.dept}
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full h-40 bg-[#081518] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#2DFFEA] mb-6"
            placeholder="Type your message..."
          />
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 text-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className="flex-1 py-3 bg-[#2DFFEA] text-black font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading
                ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                : 'Send'
              }
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(45,255,234,0.12)',
            border: '2px solid rgba(45,255,234,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <CheckCircle2 size={42} color="#2DFFEA" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Request Sent!
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, marginBottom: 6 }}>
            Your partner request has been sent to{' '}
            <strong style={{ color: '#2DFFEA' }}>{student.name}</strong>.
          </p>
          <p style={{ color: '#64748B', fontSize: 13 }}>Taking you to your sent requests…</p>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default SendMessage;