import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Edit, Mail, MapPin, Code, Heart, Award, Calendar, Save, X,
} from "lucide-react";
import api from "../../utils/api";
import "./Profile.css";

const SKILL_OPTIONS = [
  "React", "Node.js", "Python", "Machine Learning", "UI/UX Design",
  "MongoDB", "TensorFlow", "Git", "Flutter", "Firebase", "TypeScript",
  "Java", "C++", "Data Science", "Cybersecurity", "DevOps", "Blockchain", "Cloud Computing",
];

const INTEREST_OPTIONS = [
  "Artificial Intelligence", "Web Development", "Mobile Apps", "Data Analytics",
  "IoT", "Blockchain", "Computer Vision", "NLP", "Game Development",
  "AR/VR", "Cybersecurity", "Cloud Computing",
];

export default function Profile() {
  const { id } = useParams(); // undefined = own profile, has value = viewing someone else

  const [user, setUser]       = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    const endpoint = id ? `/user/${id}` : "/user/me";
    api.get(endpoint)
      .then((res) => {
        setUser(res.data.user);
        setForm({
          name:      res.data.user.name,
          bio:       res.data.user.profile?.bio || "",
          skills:    (res.data.user.profile?.skills    || []).join(", "),
          interests: (res.data.user.profile?.interests || []).join(", "),
        });
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put("/user/profile", {
        name:      form.name,
        bio:       form.bio,
        skills:    form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        interests: form.interests.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setUser(res.data.user);
      setEditing(false);
    } catch {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  const p        = user.profile || {};
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const isOwnProfile = !id;

  return (
    <div className="profile-page fade-in">
      <div className="card profile-header-card">
        <div className="profile-avatar-large">{initials}</div>

        <div className="profile-header-info">
          <div className="profile-title-row">
            <div>
              {editing ? (
                <input className="form-input" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }} />
              ) : (
                <h1 className="profile-title">{user.name}</h1>
              )}
              <div className="profile-meta">
                <span className="meta-item"><Mail size={16} /> {user.email}</span>
                <span className="meta-item"><MapPin size={16} /> {p.department || "FAST-NU"}</span>
              </div>
            </div>

            {/* Only show edit button on own profile */}
            {isOwnProfile && (
              <div className="flex-row gap-3">
                {editing ? (
                  <>
                    <button className="btn-outline" onClick={() => setEditing(false)}>
                      <X size={16} /> Cancel
                    </button>
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>
                      <Save size={16} /> {saving ? "Saving..." : "Save"}
                    </button>
                  </>
                ) : (
                  <button className="btn-outline" onClick={() => setEditing(true)}>
                    <Edit size={16} /> Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="profile-badges">
            <span className="badge badge-dark" style={{ color: "#051518", background: "white" }}>
              {p.rollNumber}
            </span>
            <span className="badge badge-dark">{p.department}</span>
            <span className="badge badge-dark">Batch {p.batch}</span>
            <span className="badge badge-dark" style={{ background: "white", color: "#00A63E" }}>
              {p.availability || "Looking for group"}
            </span>
          </div>

          {editing ? (
            <textarea className="form-input" rows={3} value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              style={{ borderRadius: 12, padding: 12, width: "100%" }} />
          ) : (
            <p className="profile-bio">{p.bio}</p>
          )}
        </div>
      </div>

      <div className="profile-content-grid">
        <div className="flex-col gap-4">

          {/* Technical Skills */}
          <div className="card profile-section-card">
            <h3 className="section-card-title"><Code size={20} /> Technical Skills</h3>
            {editing ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SKILL_OPTIONS.map((skill) => {
                  const selected = form.skills.split(",").map((s) => s.trim()).includes(skill);
                  return (
                    <span key={skill} onClick={() => {
                        const current = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
                        const updated = selected ? current.filter((s) => s !== skill) : [...current, skill];
                        setForm({ ...form, skills: updated.join(", ") });
                      }}
                      style={{
                        padding: "6px 14px", borderRadius: 12, fontSize: 14, cursor: "pointer",
                        background: selected ? "var(--accent-gradient)" : "transparent",
                        color:      selected ? "var(--text-dark)"      : "var(--text-white)",
                        border:     selected ? "none" : "1px solid rgba(255,255,255,0.2)",
                        fontWeight: selected ? 600 : 400,
                      }}>
                      {skill}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="skills-wrapper">
                {(p.skills || []).map((s) => <span key={s} className="badge-cyan">{s}</span>)}
              </div>
            )}
          </div>

          {/* FYP Interests */}
          <div className="card profile-section-card">
            <h3 className="section-card-title"><Heart size={20} /> FYP Interests</h3>
            {editing ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {INTEREST_OPTIONS.map((interest) => {
                  const selected = form.interests.split(",").map((s) => s.trim()).includes(interest);
                  return (
                    <span key={interest} onClick={() => {
                        const current = form.interests.split(",").map((s) => s.trim()).filter(Boolean);
                        const updated = selected ? current.filter((s) => s !== interest) : [...current, interest];
                        setForm({ ...form, interests: updated.join(", ") });
                      }}
                      style={{
                        padding: "6px 14px", borderRadius: 12, fontSize: 14, cursor: "pointer",
                        background: selected ? "var(--accent-gradient)" : "transparent",
                        color:      selected ? "var(--text-dark)"      : "var(--text-white)",
                        border:     selected ? "none" : "1px solid rgba(255,255,255,0.2)",
                        fontWeight: selected ? 600 : 400,
                      }}>
                      {interest}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="skills-wrapper">
                {(p.interests || []).map((i) => <span key={i} className="badge-outline">{i}</span>)}
              </div>
            )}
          </div>

          {/* Academic Information */}
          <div className="card profile-section-card">
            <h3 className="section-card-title"><Award size={20} /> Academic Information</h3>
            <div className="info-list">
              {[
                ["Roll Number", p.rollNumber],
                ["Department",  p.department],
                ["Batch",       p.batch],
                ["CGPA",        p.cgpa],
              ].map(([label, val]) => (
                <div className="info-row" key={label}>
                  <span className="info-label">{label}</span>
                  <span className="info-value">{val || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-col gap-4">
          <div className="card profile-section-card">
            <h3 className="section-card-title">Availability Status</h3>
            <div className="status-box">
              <span className="status-text">{p.availability || "Looking for group"}</span>
            </div>
          </div>

          <div className="card profile-section-card">
            <h3 className="section-card-title"><Calendar size={16} /> Quick Info</h3>
            <div className="flex-col gap-3">
              <div className="meta-item text-muted" style={{ fontSize: 14 }}>
                <MapPin size={16} /> {p.department || "FAST-NU Lahore"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}