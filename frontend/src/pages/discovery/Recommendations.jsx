import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';

const Recommendations = () => {
  const navigate = useNavigate();

  const recommended = [
    { 
      initials: 'FM', name: 'Fatima Malik', id: '23L-0945', 
      dept: 'Computer Science', batch: '2023', 
      skills: ['Python', 'Machine Learning', 'Data Science'], 
      interests: ['AI', 'Data Analytics'], available: true 
    },
    { 
      initials: 'HA', name: 'Hassan Ali', id: '23L-0956', 
      dept: 'Software Engineering', batch: '2023', 
      skills: ['React', 'Node.js', 'MongoDB'], 
      interests: ['Web Development'], available: true 
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#082226] min-h-screen text-white">
      {/* 1. Static Header - No search input or filter button [cite: 96, 97] */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold italic">Top Matches</h1>
        <p className="text-gray-400 text-sm">Find FYP partners by skills, interests, or department</p>
      </div>

      {/* 2. Navigation Tabs [cite: 98] */}
      <div className="flex gap-3">
        <button 
          onClick={() => navigate('/app/search')} // Navigates AWAY to the search page
          className="bg-transparent border border-[#22D3EE33] text-gray-400 px-6 py-2 rounded-xl text-xs font-bold hover:text-white transition-colors"
        >
          All Students (4)
        </button>
        <button className="bg-[#2DFFEA] text-[#051518] px-6 py-2 rounded-xl font-bold text-xs shadow-[0_0_15px_rgba(45,255,234,0.3)]">
          Recommended (2)
        </button>
      </div>

      {/* 3. Pure Grid - Only student cards [cite: 103, 113] */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
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