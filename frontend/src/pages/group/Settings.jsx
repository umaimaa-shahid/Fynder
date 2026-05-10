// import { useState } from 'react';
// import { UserCircle, LogOut } from 'lucide-react';
// import './Settings.css';

// export default function Settings() {
//   // State to hold the form inputs
//   const [formData, setFormData] = useState({
//     fullName: 'Umaima Shahid',
//     email: 'l230123@lhr.nu.edu.pk',
//     rollNumber: '23L-1234'
//   });

//   // Basic interaction states
//   const [isSaving, setIsSaving] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Simulated logic functions for the buttons
//   const handleSaveChanges = () => {
//     setIsSaving(true);
//     setTimeout(() => {
//       alert("Changes saved successfully!");
//       setIsSaving(false);
//     }, 600); // simulate a 600ms API call
//   };

//   const handleChangePassword = () => {
//     const confirm = window.confirm("Are you sure you want to change your password? We will send an email.");
//     if (confirm) alert("Password reset link sent to " + formData.email);
//   };

//   const handleDeleteAccount = () => {
//     const confirmText = window.prompt("Type 'DELETE' to confirm account deletion:");
//     if (confirmText === 'DELETE') {
//       alert("Account deleted. We're sad to see you go!");
//       // Logic to log out or redirect goes here
//     }
//   };

//   const handleLogOut = () => {
//     const confirm = window.confirm("Do you really want to log out?");
//     if (confirm) alert("Logged out successfully.");
//   };

//   return (
//     <div className="settings-page fade-in">
//       <h1 className="page-title" style={{marginBottom: '0'}}>Settings</h1>
      
//       {/* Account Info Card */}
//       <div className="card settings-card">
//         <h2 className="settings-section-title">
//           <UserCircle size={24} /> Account Information
//         </h2>
        
//         <div className="form-group">
//           <label className="form-label">Full Name</label>
//           <input 
//             type="text" 
//             name="fullName"
//             className="form-input" 
//             value={formData.fullName} 
//             onChange={handleChange}
//           />
//         </div>
        
//         <div className="form-group">
//           <label className="form-label">Email</label>
//           <input 
//             type="email" 
//             name="email"
//             className="form-input" 
//             value={formData.email} 
//             onChange={handleChange}
//           />
//         </div>
        
//         <div className="form-group">
//           <label className="form-label">Roll Number</label>
//           <input 
//             type="text" 
//             name="rollNumber"
//             className="form-input" 
//             value={formData.rollNumber} 
//             onChange={handleChange}
//             readOnly // Usually roll number cant be changed easily
//           />
//         </div>
        
//         <div className="form-actions">
//           <button 
//             className="btn-primary" 
//             style={{padding: '10px 24px'}}
//             onClick={handleSaveChanges}
//             disabled={isSaving}
//           >
//             {isSaving ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </div>

//       {/* Danger Zone Card */}
//       <div className="card settings-card danger-card">
//         <h2 className="danger-title">Danger Zone</h2>
        
//         <div className="flex-col gap-4">
//           <div className="danger-row">
//             <div className="danger-info">
//               <span className="danger-info-title">Change Password</span>
//               <span className="danger-info-desc">Update your password to keep your account secure</span>
//             </div>
//             <button 
//               className="btn-outline" 
//               style={{borderColor: 'var(--accent-cyan-border)'}} 
//               onClick={handleChangePassword}
//             >
//               Change
//             </button>
//           </div>
          
//           <div className="danger-row" style={{border: 'none'}}>
//             <div className="danger-info">
//               <span className="danger-info-title red">Delete Account</span>
//               <span className="danger-info-desc">Permanently delete your account and all data</span>
//             </div>
//             <button 
//               className="btn-danger-outline" 
//               onClick={handleDeleteAccount}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="card" style={{padding: '24px'}}>
//         <button className="btn-logout" onClick={handleLogOut}>
//           <LogOut size={20} /> Log Out
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Settings.css';

export default function Settings() {
  const navigate = useNavigate();

  const [formData, setFormData]   = useState({
    fullName:    localStorage.getItem("userName")  || "",
    email:       localStorage.getItem("userEmail") || "",
    rollNumber:  "",
  });
  const [isSaving, setIsSaving]   = useState(false);
  const [pwForm, setPwForm]       = useState({ currentPassword: "", newPassword: "" });
  const [pwError, setPwError]     = useState("");
  const [pwSuccess, setPwSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await api.put("/user/profile", { name: formData.fullName });
      localStorage.setItem("userName", formData.fullName);
      alert("Changes saved successfully!");
    } catch {
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPwError(""); setPwSuccess("");
    if (!pwForm.currentPassword || !pwForm.newPassword)
      return setPwError("Both fields are required");
    try {
      await api.put("/user/password", pwForm);
      setPwSuccess("Password changed successfully!");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwError(err.response?.data?.message || "Failed to change password");
    }
  };

  const handleLogOut = () => {
    if (window.confirm("Do you really want to log out?")) {
      localStorage.clear();
      navigate("/signin");
    }
  };

  const handleDeleteAccount = () => {
    const confirmText = window.prompt("Type 'DELETE' to confirm:");
    if (confirmText === "DELETE") alert("Account deleted.");
  };

  return (
    <div className="settings-page fade-in">
      <h1 className="page-title" style={{marginBottom: 0}}>Settings</h1>

      {/* Account Info */}
      <div className="card settings-card">
        <h2 className="settings-section-title"><UserCircle size={24} /> Account Information</h2>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" name="fullName" className="form-input"
            value={formData.fullName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-input"
            value={formData.email} readOnly />
        </div>

        <div className="form-actions">
          <button className="btn-primary" style={{padding:'10px 24px'}}
            onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="card settings-card">
        <h2 className="settings-section-title">Change Password</h2>

        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input type="password" className="form-input"
            value={pwForm.currentPassword}
            onChange={e => setPwForm({...pwForm, currentPassword: e.target.value})} />
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <input type="password" className="form-input"
            value={pwForm.newPassword}
            onChange={e => setPwForm({...pwForm, newPassword: e.target.value})} />
        </div>

        {pwError   && <p style={{color:'red',   fontSize:14}}>{pwError}</p>}
        {pwSuccess && <p style={{color:'green', fontSize:14}}>{pwSuccess}</p>}

        <div className="form-actions">
          <button className="btn-primary" style={{padding:'10px 24px'}}
            onClick={handleChangePassword}>
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card settings-card danger-card">
        <h2 className="danger-title">Danger Zone</h2>
        <div className="flex-col gap-4">
          <div className="danger-row" style={{border:'none'}}>
            <div className="danger-info">
              <span className="danger-info-title red">Delete Account</span>
              <span className="danger-info-desc">Permanently delete your account and all data</span>
            </div>
            <button className="btn-danger-outline" onClick={handleDeleteAccount}>Delete</button>
          </div>
        </div>
      </div>

      <div className="card" style={{padding:24}}>
        <button className="btn-logout" onClick={handleLogOut}>
          <LogOut size={20} /> Log Out
        </button>
      </div>
    </div>
  );
}