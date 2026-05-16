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
    setLoading(true); setError('');
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
    const t = setTimeout(fetchStudents, 350);
    return () => clearTimeout(t);
  }, [fetchStudents]);

  const displayed = activeTab === 'all' ? students : recommended;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <style>{`
        /* ── Search row ── */
        .sf-search-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          width: 100%;
        }
        .sf-search-wrap {
          flex: 1;
          position: relative;
          min-width: 0;
        }
        .sf-search-input {
          width: 100%;
          background: #0a2a2e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 12px 12px 40px;
          color: white;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
        }
        .sf-search-input:focus { border-color: #2DFFEA; }
        .sf-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          pointer-events: none;
        }
        .sf-filter-btn {
          background: #0a2a2e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 20px;
          color: #94a3b8;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .sf-filter-btn.open { border-color: #2DFFEA; color: #2DFFEA; }

        /* ── Filter panel ── */
        .sf-filter-panel {
          background: #0a2a2e;
          border: 1px solid rgba(45,255,234,0.2);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }
        .sf-filter-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; display: block; }
        .sf-filter-input {
          width: 100%;
          background: white;
          border-radius: 8px;
          padding: 8px 12px;
          color: #082226;
          font-size: 13px;
          border: none;
          outline: none;
          box-sizing: border-box;
        }
        .sf-filter-actions { grid-column: 1/-1; display: flex; gap: 12px; margin-top: 4px; }

        /* ── Tabs ── */
        .sf-tabs { display: flex; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 20px; }
        .sf-tab {
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          border: none;
          background: transparent;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.15s;
          margin-bottom: -1px;
        }
        .sf-tab.active { color: #2DFFEA; border-bottom-color: #2DFFEA; }

        /* ── Student grid ── */
        .sf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .sf-card {
          background: #0a2a2e;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.2s;
        }
        .sf-card:hover { border-color: rgba(45,255,234,0.3); }
        .sf-card-top { display: flex; align-items: flex-start; gap: 12px; }
        .sf-avatar {
          width: 48px; height: 48px;
          background: #2DFFEA;
          color: #051518;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700;
          flex-shrink: 0;
        }
        .sf-info { flex: 1; min-width: 0; }
        .sf-name { font-size: 15px; font-weight: 700; color: white; margin-bottom: 2px; }
        .sf-sub  { font-size: 12px; color: #64748b; margin-bottom: 4px; }
        .sf-available {
          display: inline-block;
          background: white;
          color: black;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 999px;
          margin-top: 4px;
        }
        .sf-skills-label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }
        .sf-skills { display: flex; flex-wrap: wrap; gap: 6px; }
        .sf-skill {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #cbd5e1;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11px;
        }

        /* Send button always at bottom, full width */
        .sf-btn {
          width: 100%;
          background: #2DFFEA;
          color: #051518;
          border: none;
          border-radius: 10px;
          padding: 11px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-top: auto;
        }
        .sf-btn:hover { opacity: 0.88; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .sf-search-row   { flex-direction: column; gap: 8px; }
          .sf-filter-btn   { width: 100%; justify-content: center; }
          .sf-grid         { grid-template-columns: 1fr; }
          .sf-filter-panel { grid-template-columns: 1fr; }
          .sf-card         { padding: 14px; }
          .sf-avatar       { width: 40px; height: 40px; font-size: 13px; border-radius: 10px; }
          .sf-name         { font-size: 14px; }
          .sf-tab          { font-size: 12px; padding: 8px 10px; }
        }

        @media (min-width: 769px) and (max-width: 1023px) {
          .sf-grid { grid-template-columns: 1fr; }
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <h1 style={{ fontSize: 'clamp(20px,5vw,28px)', fontWeight: 700, fontStyle: 'italic', color: 'white', marginBottom: 20 }}>
        Search Students
      </h1>

      {/* Search + Filter button */}
      <div className="sf-search-row">
        <div className="sf-search-wrap">
          <Search className="sf-search-icon" size={16} />
          <input
            className="sf-search-input"
            placeholder="Search by name, skills or interests..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className={`sf-filter-btn${showFilters ? ' open' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="sf-filter-panel">
          <div>
            <span className="sf-filter-label">Department</span>
            <input className="sf-filter-input" placeholder="e.g. BCS" value={dept} onChange={e => setDept(e.target.value)} />
          </div>
          <div>
            <span className="sf-filter-label">Batch</span>
            <input className="sf-filter-input" placeholder="e.g. 2023" value={batch} onChange={e => setBatch(e.target.value)} />
          </div>
          <div>
            <span className="sf-filter-label">Skill</span>
            <input className="sf-filter-input" placeholder="e.g. React" value={skill} onChange={e => setSkill(e.target.value)} />
          </div>
          <div className="sf-filter-actions">
            <button className="sf-btn" style={{ width: 'auto', padding: '8px 20px', marginTop: 0 }} onClick={() => setShowFilters(false)}>Apply</button>
            <button onClick={() => { setDept(''); setBatch(''); setSkill(''); setSearchQuery(''); }}
              style={{ background: 'transparent', border: 'none', color: '#f87171', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="sf-tabs">
        <button className={`sf-tab${activeTab === 'all' ? ' active' : ''}`} onClick={() => setActiveTab('all')}>
          All Students ({students.length})
        </button>
        <button className={`sf-tab${activeTab === 'recommended' ? ' active' : ''}`} onClick={() => setActiveTab('recommended')}>
          Recommended ({recommended.length})
        </button>
      </div>

      {error && <p style={{ color: '#f87171', marginBottom: 16 }}>⚠️ {error}</p>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader2 size={30} color="#2DFFEA" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      ) : displayed.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b', background: 'rgba(10,42,46,0.5)', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.1)' }}>
          No students found.
        </div>
      ) : (
        <div className="sf-grid">
          {displayed.map(s => (
            <div key={s._id} className="sf-card">
              <div className="sf-card-top">
                <div className="sf-avatar">{initials(s.name)}</div>
                <div className="sf-info">
                  <div className="sf-name">{s.name}</div>
                  <div className="sf-sub">{s.studentId} • {s.dept}</div>
                  <div className="sf-sub">Batch {s.batch}</div>
                  {s.available && <span className="sf-available">Available</span>}
                  {activeTab === 'recommended' && s.matchPct !== undefined && (
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#2DFFEA', marginTop: 4 }}>{s.matchPct}% match</div>
                  )}
                </div>
              </div>
              {(s.skills || []).length > 0 && (
                <>
                  <div className="sf-skills-label">Skills</div>
                  <div className="sf-skills">
                    {(s.skills || []).map(sk => <span key={sk} className="sf-skill">{sk}</span>)}
                  </div>
                </>
              )}
              <button className="sf-btn" onClick={() => navigate('/app/send-request', { state: { student: s } })}>
                🚀 Send Partner Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}