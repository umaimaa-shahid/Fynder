import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';

const Recommendations = () => {
  const navigate = useNavigate();

  const recommended = [
    { 
      initials: 'FM', bg: '#7c3aed', name: 'Fatima Malik', id: '23L-0845', 
      dept: 'Computer Science', batch: '2023', 
      skills: ['Python', 'Machine Learning', 'Data Science'], 
      interests: ['AI', 'Data Analytics'], available: true 
    },
    { 
      initials: 'ZK', bg: '#0ea5e9', name: 'Zainab Khan', id: '23L-0967', 
      dept: 'Computer Science', batch: '2023', 
      skills: ['Flutter', 'Dart', 'Firebase'], 
      interests: ['Mobile Apps', 'UI/UX'], available: true 
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 bg-[#082226] min-h-screen text-white">
      <h1 className="text-2xl md:text-3xl font-bold">Recommended Partners</h1>

      {/* Tabs */}
      <div className="flex gap-3">
        <button 
          onClick={() => navigate('/app/search')}
          className="bg-transparent border border-[#22D3EE33] text-gray-400 px-5 py-2 rounded-full text-xs md:text-sm hover:text-white transition-colors"
        >
          All Students (4)
        </button>
        <button className="bg-[#2DFFEA] text-[#051518] px-5 py-2 rounded-full font-bold text-xs md:text-sm shadow-[0_0_15px_rgba(45,255,234,0.3)]">
          Recommended (2)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommended.map((student, i) => (
          <Card 
            key={i} 
            student={student} 
            onSend={() => navigate('/app/send-request-message', { state: { student } })}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;