import { Edit, Mail, MapPin, Code, Heart, Award, Calendar, UserPlus } from 'lucide-react';
import './Profile.css';

// Mock data configuration so it reads cleanly
const profileData = {
  name: "Umaima Shahid",
  rollNumber: "23L-0893",
  avatarInitials: "US",
  email: "umaima.shahid@nu.edu.pk",
  location: "FAST-NU Lahore",
  department: "Computer Science",
  batch: "2023",
  cgpa: "3.85",
  statusLine: "Looking for group",
  statusSub: "Active now",
  bio: "Passionate CS student interested in web development and AI. Looking for dedicated teammates to work on an innovative FYP that combines modern web technologies with machine learning. Open to exploring new ideas and collaborating with creative minds!",
  techSkills: ["React", "Node.js", "Python", "Machine Learning", "UI/UX Design", "MongoDB", "TensorFlow", "Git"],
  interests: ["Artificial Intelligence", "Web Development", "Data Science", "Computer Vision"],
  joinedDate: "January 2026"
};

export default function Profile() {
  
  // Handler logic
  const handleEditProfile = () => {
    alert("Opening Edit Profile Modal...");
  };

  return (
    <div className="profile-page fade-in">
      
      {/* ---------------- PROFILE HEADER ---------------- */}
      <div className="card profile-header-card">
        <div className="profile-avatar-large">
          {profileData.avatarInitials}
        </div>
        
        <div className="profile-header-info">
          <div className="profile-title-row">
            <div>
              <h1 className="profile-title">{profileData.name}</h1>
              <div className="profile-meta">
                <span className="meta-item"><Mail size={16} /> {profileData.email}</span>
                <span className="meta-item"><MapPin size={16} /> {profileData.location}</span>
              </div>
            </div>
            
            <button className="btn-outline" onClick={handleEditProfile}>
              <Edit size={16} /> Edit Profile
            </button>
          </div>
          
          <div className="profile-badges">
            <span className="badge badge-dark" style={{color: '#051518', background: 'white'}}>
              {profileData.rollNumber}
            </span>
            <span className="badge badge-dark">
              {profileData.department}
            </span>
            <span className="badge badge-dark">
              Batch {profileData.batch}
            </span>
            <span className="badge badge-dark badge-warning" style={{background: 'white', color: '#00A63E'}}>
              {profileData.statusLine}
            </span>
          </div>
          
          <p className="profile-bio">
            {profileData.bio}
          </p>
        </div>
      </div>

      {/* ---------------- 2-COLUMN CONTENT AREA ---------------- */}
      <div className="profile-content-grid">
        
        {/* Left Column (Skills & Academics) */}
        <div className="flex-col gap-4">
          
          {/* Tech Skills */}
          <div className="card profile-section-card">
            <h3 className="section-card-title"><Code size={20} /> Technical Skills</h3>
            <div className="skills-wrapper">
              {profileData.techSkills.map(skill => (
                <span key={skill} className="badge-cyan">{skill}</span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="card profile-section-card">
            <h3 className="section-card-title"><Heart size={20} /> FYP Interests</h3>
            <div className="skills-wrapper">
              {profileData.interests.map(interest => (
                <span key={interest} className="badge-outline">{interest}</span>
              ))}
            </div>
          </div>

          {/* Academic Profile */}
          <div className="card profile-section-card">
            <h3 className="section-card-title"><Award size={20} /> Academic Information</h3>
            <div className="info-list" style={{marginTop: 8}}>
              <div className="info-row">
                <span className="info-label">Roll Number</span>
                <span className="info-value">{profileData.rollNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Department</span>
                <span className="info-value">{profileData.department}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Batch</span>
                <span className="info-value">{profileData.batch}</span>
              </div>
              <div className="info-row">
                <span className="info-label">CGPA</span>
                <span className="info-value">{profileData.cgpa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Status & Quick Info) */}
        <div className="flex-col gap-4">
          
          {/* Availability Box */}
          <div className="card profile-section-card">
            <h3 className="section-card-title" style={{marginBottom: 12}}>Availability Status</h3>
            <div className="status-box">
              <span className="status-text">{profileData.statusLine}</span>
              <span className="status-sub">{profileData.statusSub}</span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="card profile-section-card">
            <h3 className="section-card-title" style={{marginBottom: 12}}>Quick Info</h3>
            <div className="flex-col gap-3">
              <div className="meta-item text-muted" style={{fontSize: 14}}>
                <Calendar size={16} /> Joined {profileData.joinedDate}
              </div>
              <div className="meta-item text-muted" style={{fontSize: 14}}>
                <MapPin size={16} /> {profileData.location}
              </div>
            </div>
          </div>

          {/* Group Status */}
          <div className="card profile-section-card">
            <h3 className="section-card-title" style={{marginBottom: 12}}>Group Status</h3>
            <p className="text-muted" style={{fontSize: 14}}>Not currently in a group</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
