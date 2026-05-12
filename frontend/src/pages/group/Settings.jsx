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

  const handleDeleteAccount = async () => {
  const confirmText = window.prompt("Type 'DELETE' to confirm:");
  if (confirmText !== "DELETE") return;
  try {
    await api.delete("/user/me");
    localStorage.clear();
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to delete account.");
  }
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