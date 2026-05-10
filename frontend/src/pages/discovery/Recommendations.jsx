import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Card from '../../components/Card';
import api from '../../utils/api';

const Recommendations = () => {
  const navigate = useNavigate();

  const [recommended, setRecommended] = useState([]);
  const [totalCount, setTotalCount]   = useState(0);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');

  useEffect(() => {
    Promise.all([
      api.get('/students/recommendations'),
      api.get('/students'),
    ])
      .then(([recs, all]) => {
        setRecommended(recs.data);
        setTotalCount(all.data.length);
      })
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#082226] min-h-screen text-white">

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold italic">Top Matches</h1>
        <p className="text-gray-400 text-sm">Find FYP partners by skills, interests, or department</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/app/search')}
          className="bg-transparent border border-[#22D3EE33] text-gray-400 px-6 py-2 rounded-xl text-xs font-bold hover:text-white transition-colors"
        >
          All Students ({totalCount})
        </button>
        <button className="bg-[#2DFFEA] text-[#051518] px-6 py-2 rounded-xl font-bold text-xs shadow-[0_0_15px_rgba(45,255,234,0.3)]">
          Recommended ({recommended.length})
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-sm">⚠️ {error}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} color="#2DFFEA" style={{ animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : recommended.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-[#0a2a2e]/50 rounded-3xl border border-dashed border-white/10">
          No recommendations yet — complete your profile and add skills to get matched!
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {recommended.map((student, i) => (
            <Card
              key={student._id || i}
              student={{
                ...student,
                id: student.studentId,
                initials: student.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
              }}
              onSend={() => navigate('/app/send-request-message', { state: { student } })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;