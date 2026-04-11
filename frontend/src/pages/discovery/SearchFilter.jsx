import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

export default function SearchFilter() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [dept, setDept] = useState('');
  const [batch, setBatch] = useState('');
  const [skill, setSkill] = useState('');

  const students = [
    { name: 'Fatima Malik', id: '23L-0945', initials: 'FM', dept: 'Computer Science', batch: '2023', skills: ['Python', 'Machine Learning', 'Data Science'], recommended: true },
    { name: 'Hassan Ali', id: '23L-0956', initials: 'HA', dept: 'Software Engineering', batch: '2023', skills: ['React', 'Node.js', 'MongoDB'], recommended: true },
    { name: 'Zainab Khan', id: '23L-0967', initials: 'ZK', dept: 'Computer Science', batch: '2023', skills: ['Flutter', 'Dart', 'Firebase'], recommended: false },
    { name: 'Ali Hassan', id: '23L-0920', initials: 'AH', dept: 'Computer Science', batch: '2023', skills: ['Python', 'AI'], recommended: false }
  ];

  const filtered = students.filter(s => {
    const matchesTab = activeTab === 'all' || s.recommended;
    
    // Normalize function to handle spaces and casing
    const normalize = (text) => text.toString().toLowerCase().trim();

    // Logic for Search Bar (Name or Skills)
    const q = normalize(searchQuery);
    const matchesSearch = q === '' || 
                          normalize(s.name).includes(q) || 
                          s.skills.some(sk => normalize(sk).includes(q));

    // Logic for Department Filter
    const d = normalize(dept);
    const matchesDept = d === '' || normalize(s.dept).includes(d);

    // Logic for Batch Filter
    const b = normalize(batch);
    const matchesBatch = b === '' || normalize(s.batch).includes(b);

    // Logic for Skill Filter (Specific skill box)
    const skBox = normalize(skill);
    const matchesSkill = skBox === '' || s.skills.some(sk => normalize(sk).includes(skBox));

    return matchesTab && matchesSearch && matchesDept && matchesBatch && matchesSkill;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold italic text-white">Search Students</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by name, skills or interests..." 
            className="w-full bg-[#0a2a2e] border border-white/10 rounded-xl py-3 px-10 text-sm text-white focus:border-[#2DFFEA] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
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

      {showFilters && (
        <div className="p-6 bg-[#0a2a2e] border border-[#2DFFEA]/20 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Department</label>
            <input 
              type="text" 
              placeholder="e.g. Computer Science" 
              className="w-full bg-white rounded-lg p-2.5 text-black text-sm outline-none" 
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Batch</label>
            <input 
              type="text" 
              placeholder="e.g. 2023" 
              className="w-full bg-white rounded-lg p-2.5 text-black text-sm outline-none" 
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Skill</label>
            <input 
              type="text" 
              placeholder="e.g. React" 
              className="w-full bg-white rounded-lg p-2.5 text-black text-sm outline-none" 
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mt-2">
            <button onClick={() => setShowFilters(false)} className="bg-[#2DFFEA] text-black px-6 py-2 rounded-lg font-bold text-xs">Apply</button>
            <button 
              onClick={() => { setDept(''); setBatch(''); setSkill(''); setSearchQuery(''); }} 
              className="text-red-400 px-6 py-2 text-xs font-bold"
            >
              Reset All
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4 border-b border-white/5">
        <button onClick={() => setActiveTab('all')} className={`pb-3 text-sm font-bold ${activeTab === 'all' ? 'text-[#2DFFEA] border-b-2 border-[#2DFFEA]' : 'text-gray-500'}`}>
          All Students ({students.length})
        </button>
        <button onClick={() => setActiveTab('recommended')} className={`pb-3 text-sm font-bold ${activeTab === 'recommended' ? 'text-[#2DFFEA] border-b-2 border-[#2DFFEA]' : 'text-gray-500'}`}>
          Recommended (2)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length > 0 ? filtered.map(s => (
          <div key={s.id} className="bg-[#0a2a2e] p-6 rounded-[24px] border border-white/5 relative group transition-all hover:border-[#2DFFEA]/30">
            <span className="absolute top-6 right-6 bg-white text-black px-3 py-1 rounded-full text-[10px] font-bold">Available</span>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#2DFFEA] text-[#051518] rounded-2xl flex items-center justify-center text-xl font-bold">{s.initials}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{s.name}</h3>
                <p className="text-xs text-gray-500">{s.id} • {s.dept} Batch {s.batch}</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">Skills</p>
              <div className="flex flex-wrap gap-2">
                {s.skills.map(sk => (
                  <span key={sk} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-lg text-xs">{sk}</span>
                ))}
              </div>
            </div>
            <button 
              onClick={() => navigate('/app/send-request-message', { state: { student: s } })}
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
    </div>
  );
}