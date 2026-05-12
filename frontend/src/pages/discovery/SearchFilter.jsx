import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

export default function SearchFilter() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab]     = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dept, setDept]               = useState('');
  const [batch, setBatch]             = useState('');
  const [skill, setSkill]             = useState('');

  const [students, setStudents]       = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (dept)        params.append('dept', dept);
      if (batch)       params.append('batch', batch);
      if (skill)       params.append('skill', skill);

      const [all, recs] = await Promise.all([
        api.get(`/students?${params}`),
        api.get('/students/recommendations'),
      ]);
      setStudents(all.data);
      setRecommended(recs.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, dept, batch, skill]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, 350);
    return () => clearTimeout(timer);
  }, [fetchStudents]);

  const displayed = activeTab === 'all' ? students : recommended;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold italic text-white">Search Students</h1>

      {/* Search bar + filter toggle */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name, skills or interests..."
            className="w-full bg-[#0a2a2e] border border-white/10 rounded-xl py-3 px-10 text-sm text-white focus:border-[#2DFFEA] outline-none"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`bg-[#0a2a2e] border ${showFilters ? 'border-[#2DFFEA] text-[#2DFFEA]' : 'border-white/10 text-gray-400'} rounded-xl px-4 py-3 text-sm flex items-center gap-2 hover:border-[#2DFFEA] transition-all`}
        >
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="p-6 bg-[#0a2a2e] border border-[#2DFFEA]/20 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Department</label>
            <input
              type="text"
              placeholder="e.g. Computer Science"
              className="w-full bg-white rounded-lg p-2.5 text-black text-sm outline-none"
              value={dept}
              onChange={e => setDept(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Batch</label>
            <input
              type="text"
              placeholder="e.g. 2023"
              className="w-full bg-white rounded-lg p-2.5 text-black text-sm outline-none"
              value={batch}
              onChange={e => setBatch(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Skill</label>
            <input
              type="text"
              placeholder="e.g. React"
              className="w-full bg-white rounded-lg p-2.5 text-black text-sm outline-none"
              value={skill}
              onChange={e => setSkill(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => setShowFilters(false)}
              className="bg-[#2DFFEA] text-black px-6 py-2 rounded-lg font-bold text-xs"
            >
              Apply
            </button>
            <button
              onClick={() => { setDept(''); setBatch(''); setSkill(''); setSearchQuery(''); }}
              className="text-red-400 px-6 py-2 text-xs font-bold"
            >
              Reset All
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/5">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 text-sm font-bold ${activeTab === 'all' ? 'text-[#2DFFEA] border-b-2 border-[#2DFFEA]' : 'text-gray-500'}`}
        >
          All Students ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('recommended')}
          className={`pb-3 text-sm font-bold ${activeTab === 'recommended' ? 'text-[#2DFFEA] border-b-2 border-[#2DFFEA]' : 'text-gray-500'}`}
        >
          Recommended ({recommended.length})
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-sm text-center py-4">⚠️ {error}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} color="#2DFFEA" style={{ animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.length > 0 ? displayed.map(s => (
            <div
              key={s._id}
              className="bg-[#0a2a2e] p-6 rounded-[24px] border border-white/5 relative group transition-all hover:border-[#2DFFEA]/30"
            >
              {s.available && (
                <span className="absolute top-6 right-6 bg-white text-black px-3 py-1 rounded-full text-[10px] font-bold">
                  Available
                </span>
              )}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#2DFFEA] text-[#051518] rounded-2xl flex items-center justify-center text-xl font-bold">
                  {initials(s.name)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{s.name}</h3>
                  <p className="text-xs text-gray-500">
                    {s.studentId} • {s.dept} Batch {s.batch}
                  </p>
                  {activeTab === 'recommended' && s.matchPct !== undefined && (
                    <span className="text-xs font-bold text-[#2DFFEA]">{s.matchPct}% match</span>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {(s.skills || []).map(sk => (
                    <span key={sk} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-lg text-xs">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate('/app/send-request', { state: { student: s } })}
                className="w-full bg-[#2DFFEA] text-[#051518] py-3.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
              >
                🚀 Send Partner Request
              </button>
            </div>
          )) : (
            <div className="text-gray-500 col-span-2 text-center py-20 bg-[#0a2a2e]/50 rounded-3xl border border-dashed border-white/10">
              No students found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}