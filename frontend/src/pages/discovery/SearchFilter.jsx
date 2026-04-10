import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppNavbar from '../../components/Navbar';
import AppFooter from '../../components/Footer';
import StudentCard from '../../components/Card';
import { Search, SlidersHorizontal } from 'lucide-react';

const STUDENTS = [
  {
    initials: 'FM', bg: '#7c3aed',
    name: 'Fatima Malik', id: '23L-0845',
    dept: 'Computer Science', batch: '2023',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    interests: ['AI', 'Data Analytics'],
    available: true, recommended: true,
  },
  {
    initials: 'AH', bg: '#0d9488',
    name: 'Areej Hafeez', id: '23L-0956',
    dept: 'Software Engineering', batch: '2023',
    skills: ['React', 'Node.js', 'MongoDB'],
    interests: ['Web Development'],
    available: true, recommended: false,
  },
  {
    initials: 'ZK', bg: '#0ea5e9',
    name: 'Zainab Khan', id: '23L-0967',
    dept: 'Computer Science', batch: '2023',
    skills: ['Flutter', 'Dart', 'Firebase'],
    interests: ['Mobile Apps', 'UI/UX'],
    available: true, recommended: true,
  },
  {
    initials: 'BA', bg: '#f59e0b',
    name: 'Bilal Ahmed', id: '23L-0978',
    dept: 'AI', batch: '2023',
    skills: ['Computer Vision', 'Deep Learning', 'OpenCV'],
    interests: ['AI', 'Computer Vision'],
    available: true, recommended: false,
  },
];

export default function SearchFilter() {
  const [searchParams]    = useSearchParams();
  const initTab           = searchParams.get('tab') === 'recommended' ? 'recommended' : 'all';
  const [tab, setTab]     = useState(initTab);
  const [query, setQuery] = useState('');
  const [open, setOpen]   = useState(true);
  const [dept,  setDept]  = useState('');
  const [batch, setBatch] = useState('');
  const [skill, setSkill] = useState('');

  const pool = tab === 'recommended' ? STUDENTS.filter(s => s.recommended) : STUDENTS;

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return pool.filter(s => {
      const mQ = !q || s.name.toLowerCase().includes(q) || s.skills.some(sk => sk.toLowerCase().includes(q)) || s.interests.some(i => i.toLowerCase().includes(q));
      const mD = !dept  || s.dept.toLowerCase().includes(dept.toLowerCase());
      const mB = !batch || s.batch.includes(batch);
      const mS = !skill || s.skills.some(sk => sk.toLowerCase().includes(skill.toLowerCase()));
      return mQ && mD && mB && mS;
    });
  }, [pool, query, dept, batch, skill]);

  const recCount = STUDENTS.filter(s => s.recommended).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-body)', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar />

      <main style={{ flex: 1, padding: '28px 32px', maxWidth: 1040, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Search Students</h1>
        <p style={{ fontSize: 13, color: 'var(--text-placeholder)', marginBottom: 18 }}>
          Find FYP partners by skills, interests, or department
        </p>

        {/* ── Tabs ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { key: 'all',         label: `All Students (${STUDENTS.length})` },
            { key: 'recommended', label: `Recommended (${recCount})` },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, fontWeight: 500, background: 'transparent',
              border: `1px solid ${tab === key ? '#2DFFEA' : 'rgba(34,211,238,0.2)'}`,
              color: tab === key ? '#2DFFEA' : 'var(--text-muted)',
            }}>{label}</button>
          ))}
        </div>

        {/* ── Search bar ── */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Search size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-placeholder)' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, skills, or interests..."
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 130px 10px 38px',
              background: 'var(--bg-card)', border: '1px solid var(--accent-cyan-border)',
              borderRadius: 10, color: '#fff', fontSize: 13,
            }}
          />
          <button onClick={() => setOpen(v => !v)} style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'center', gap: 6, padding: '5px 13px', borderRadius: 7,
            background: 'rgba(45,255,234,0.08)', border: '1px solid rgba(45,255,234,0.25)',
            color: '#2DFFEA', cursor: 'pointer', fontSize: 12, fontWeight: 500,
          }}>
            <SlidersHorizontal size={13} /> Filters
          </button>
        </div>

        {/* ── Filter panel ── */}
        {open && (
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--accent-cyan-border)',
            borderRadius: 12, padding: '16px 18px', marginBottom: 18,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 14 }}>
              {[
                { label: 'Department', val: dept,  set: setDept,  ph: 'e.g. BCS'  },
                { label: 'Batch',      val: batch, set: setBatch, ph: 'e.g. 2023' },
                { label: 'Skill',      val: skill, set: setSkill, ph: 'e.g. Web'  },
              ].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>{label}</label>
                  <input
                    value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '8px 12px',
                      background: 'var(--bg-body)', border: '1px solid var(--accent-cyan-border)',
                      borderRadius: 8, color: '#fff', fontSize: 12,
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{
                padding: '7px 20px', borderRadius: 8,
                background: 'linear-gradient(135deg,#2DFFEA,#22D3EE)',
                color: '#051518', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer',
              }}>Apply</button>
              <button onClick={() => { setDept(''); setBatch(''); setSkill(''); }} style={{
                padding: '7px 18px', borderRadius: 8, background: 'transparent',
                border: '1px solid var(--accent-cyan-border)',
                color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer',
              }}>Close</button>
            </div>
          </div>
        )}

        {/* ── Result count ── */}
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>
          Showing&nbsp;<strong style={{ color: '#fff' }}>{results.length}</strong>&nbsp;results
        </p>

        {/* ── Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}>
          {results.map(s => <StudentCard key={s.id + s.name} student={s} />)}
        </div>

      </main>
      <AppFooter />
    </div>
  );
}