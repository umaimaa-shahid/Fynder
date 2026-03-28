import { useState } from 'react';
import { Settings, UserPlus, Crown, ExternalLink } from 'lucide-react';
import './MyGroup.css';

// Pre-define the group members mock data
const initialMembers = [
  {
    id: 1,
    name: "Umaima Shahid",
    rollNumber: "23L-0893",
    avatar: "US",
    isLeader: true,
    skills: ["React", "Node.js", "UI/UX"]
  },
  {
    id: 2,
    name: "Areej Hafeez",
    rollNumber: "23L-0983",
    avatar: "AH",
    isLeader: false,
    skills: ["Python", "Machine Learning", "TensorFlow"]
  }
];

export default function MyGroup() {
  const [members] = useState(initialMembers);
  const maxGroupSize = 3;

  // Interaction handlers
  const handleInvite = () => {
    const newRollNum = window.prompt("Enter the roll number of the student you want to invite:");
    if (newRollNum) {
      alert(`Invitation sent to ${newRollNum}!`);
    }
  };

  const handleSettings = () => {
    alert("Opening group settings modal...");
  };

  const handleOpenProfile = (memberName) => {
    // Simulated navigation using alert for now
    alert(`Navigating to ${memberName}'s full profile...`);
  };

  const handleFindPartners = () => {
    alert("Taking you to Search / Find Partners page!");
    // logic to push to search page 
  };

  return (
    <div className="group-page fade-in">
      {/* ---------------- TITLE SECTION ---------------- */}
      <div className="group-hero">
        <h1 className="page-title">My Group</h1>
        <p className="page-subtitle">Manage your FYP team and collaborate effectively</p>
      </div>

      {/* ---------------- GROUP HEADER CARD ---------------- */}
      <div className="card group-header-card">
        <div className="group-header-top">
          <div>
            <h2 className="text-white font-bold" style={{fontSize: 24, marginBottom: 4}}>Tech Innovators</h2>
            <p className="text-muted" style={{fontSize: 14}}>Created on March 5, 2026</p>
          </div>
          
          <div className="flex-row gap-3">
            <button className="btn-outline" onClick={handleSettings}>
              <Settings size={16} /> Settings
            </button>
            <button className="btn-primary" onClick={handleInvite} disabled={members.length >= maxGroupSize}>
              <UserPlus size={16} /> Invite Member
            </button>
          </div>
        </div>

        {/* Group Fill Tracker */}
        <div className="group-size-container">
          <div className="group-size-info">
            <span className="group-size-label">Group Size</span>
            <span className="group-size-count">{members.length} / {maxGroupSize} members</span>
          </div>
          
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(members.length / maxGroupSize) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex-row justify-between" style={{marginTop: 8}}>
            <span className="text-muted flex-row" style={{fontSize: 14}}>
              {maxGroupSize - members.length > 0 ? `You can add ${maxGroupSize - members.length} more member` : "Your group is full"}
            </span>
            {members.length < maxGroupSize && (
              <span className="badge badge-warning" style={{padding: '6px 16px'}}>Looking for Members</span>
            )}
          </div>
        </div>
      </div>

      <h2 style={{fontSize: 20, fontWeight: 600, color: 'white'}}>Team Members</h2>
      
      {/* ---------------- CARDS SECTION ---------------- */}
      <div className="members-grid">
        
        {/* Render each member mapped from state */}
        {members.map((member) => (
          <div key={member.id} className="card member-card">
            <div className="member-card-header">
              <div className="member-avatar">{member.avatar}</div>
              <div className="member-info">
                <div className="member-name-row">
                  <span className="text-white" style={{fontSize: 18, fontWeight: 600}}>
                    {member.name}
                  </span>
                  {member.isLeader && <Crown size={20} className="crown-icon" />}
                </div>
                <span className="text-muted" style={{fontSize: 14}}>{member.rollNumber}</span>
              </div>
            </div>
            
            <div className="skills-row">
              {member.skills.map(skill => (
                <span key={skill} className="badge">{skill}</span>
              ))}
            </div>
            
            <button 
              className="btn-outline" 
              style={{marginTop: 'auto', gap: 6}}
              onClick={() => handleOpenProfile(member.name)}
            >
               <ExternalLink size={16} /> View Profile
            </button>
          </div>
        ))}

        {/* Dynamic add-member card rendering ONLY if space allows */}
        {members.length < maxGroupSize && (
          <div className="card member-card add-member-card">
            <div className="add-icon-circle">
              <UserPlus size={24} />
            </div>
            <span className="text-muted" style={{fontSize: 14}}>Add a new member</span>
            <button className="btn-primary" onClick={handleFindPartners}>
              Find Partners
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
