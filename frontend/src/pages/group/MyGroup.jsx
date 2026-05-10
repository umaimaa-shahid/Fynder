import { useState, useEffect } from "react";
import { Settings, UserPlus, Crown, ExternalLink, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./MyGroup.css";

export default function MyGroup() {
  const [showInvite, setShowInvite]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching]         = useState(false);
  const [group, setGroup]                 = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");
  const navigate                          = useNavigate();
  const maxGroupSize                      = 3;

  const loadGroup = () => {
    setLoading(true);
    api.get("/group/me")
      .then((res) => {
        setGroup(res.data.group);
        setError("");
      })
      .catch((err) => {
        if (err.response?.status === 404) setError("no-group");
        else setError("Failed to load group");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadGroup(); }, []);

  // Search by name OR roll number
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await api.get(`/students?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchResults(res.data);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleAddMember = async (student) => {
    try {
      const res = await api.post("/group/invite", { userId: student._id });
      setGroup(res.data.group);
      setShowInvite(false);
      setSearchQuery("");
      setSearchResults([]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to invite member");
    }
  };

  const handleCreateGroup = async () => {
    const name = window.prompt("Enter your group name:");
    if (!name) return;
    try {
      const res = await api.post("/group/create", { name });
      setGroup(res.data.group);
      setError("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create group");
    }
  };

  const handleMessage = (member) => {
    localStorage.setItem(
      "chatWith",
      JSON.stringify({
        userId:     member._id,
        name:       member.name,
        rollNumber: member.profile?.rollNumber || "",
        lastMsg:    "",
        time:       new Date(),
      }),
    );
    navigate("/app/chat");
  };

  if (loading) return <p className="text-muted" style={{ padding: 40 }}>Loading...</p>;

  if (error === "no-group")
    return (
      <div className="group-page fade-in">
        <div className="group-hero">
          <h1 className="page-title">My Group</h1>
          <p className="page-subtitle">You are not in a group yet</p>
        </div>
        <div className="card group-header-card" style={{ alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "center" }}>
            <Users size={48} color="#94A3B8" style={{ marginBottom: 12 }} />
            <p className="text-muted" style={{ marginBottom: 16 }}>
              Create a group to start your FYP team, or accept a partner request to be added to a group automatically.
            </p>
          </div>
          <button className="btn-primary" onClick={handleCreateGroup}>
            <UserPlus size={16} /> Create Group
          </button>
        </div>
      </div>
    );

  if (error) return <p style={{ color: "red", padding: 40 }}>{error}</p>;

  const myId    = localStorage.getItem("userId");
  const members = group?.members || [];
  const isFull  = members.length >= maxGroupSize;

  return (
    <div className="group-page fade-in">
      <div className="group-hero">
        <h1 className="page-title">My Group</h1>
        <p className="page-subtitle">Manage your FYP team and collaborate effectively</p>
      </div>

      {/* Group header card */}
      <div className="card group-header-card">
        <div className="group-header-top">
          <div>
            <h2 className="text-white font-bold" style={{ fontSize: 24, marginBottom: 4 }}>
              {group.name}
            </h2>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Created{" "}
              {new Date(group.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
          </div>

          <div className="flex-row gap-3">
            {/* Group full badge */}
            {isFull && (
              <span style={{
                padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                background: "rgba(0,166,62,0.12)", color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.25)",
              }}>
                ✓ Group Complete
              </span>
            )}

            {/* Only leader can invite when group not full */}
            {group.leader?._id === myId && !isFull && (
              <button className="btn-primary" onClick={() => setShowInvite(true)}>
                <UserPlus size={16} /> Invite Member
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="group-size-container">
          <div className="group-size-info">
            <span className="group-size-label">Group Size</span>
            <span className="group-size-count">{members.length} / {maxGroupSize} members</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${(members.length / maxGroupSize) * 100}%` }}
            />
          </div>
          <div className="flex-row justify-between" style={{ marginTop: 8 }}>
            <span className="text-muted" style={{ fontSize: 14 }}>
              {isFull
                ? "Your group is complete — ready for FYP!"
                : `You can add ${maxGroupSize - members.length} more member${maxGroupSize - members.length > 1 ? "s" : ""}`}
            </span>
            {!isFull && (
              <span className="badge badge-warning" style={{ padding: "6px 16px" }}>
                Looking for Members
              </span>
            )}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, color: "white" }}>Team Members</h2>

      <div className="members-grid">
        {members.map((member) => {
          const p        = member.profile || {};
          const initials = member.name
            .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
          const isLeader = group.leader?._id === member._id ||
                           group.leader?._id?.toString() === member._id?.toString();
          const isMe     = member._id?.toString() === myId ||
                           member._id === myId;

          return (
            <div key={member._id} className="card member-card">
              <div className="member-card-header">
                <div className="member-avatar">{initials}</div>
                <div className="member-info">
                  <div className="member-name-row">
                    <span className="text-white" style={{ fontSize: 18, fontWeight: 600 }}>
                      {member.name} {isMe && <span style={{ fontSize: 12, color: "#94A3B8" }}>(You)</span>}
                    </span>
                    {isLeader && <Crown size={20} className="crown-icon" />}
                  </div>
                  <span className="text-muted" style={{ fontSize: 14 }}>{p.rollNumber}</span>
                  {p.department && (
                    <span className="text-muted" style={{ fontSize: 12 }}>
                      {p.department} · Batch {p.batch}
                    </span>
                  )}
                </div>
              </div>

              {(p.skills || []).length > 0 && (
                <div className="skills-row">
                  {(p.skills || []).map((skill) => (
                    <span key={skill} className="badge">{skill}</span>
                  ))}
                </div>
              )}

              <div className="flex-row gap-2" style={{ marginTop: "auto" }}>
                <button
                  className="btn-outline"
                  style={{ gap: 6 }}
                  onClick={() =>
                    navigate(isMe ? "/app/profile" : `/app/profile/${member._id}`)
                  }
                >
                  <ExternalLink size={16} /> Profile
                </button>
                {!isMe && (
                  <button
                    className="btn-primary"
                    style={{ gap: 6 }}
                    onClick={() => handleMessage(member)}
                  >
                    <MessageSquare size={16} /> Message
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Empty slot cards */}
        {!isFull && (
          <div className="card member-card add-member-card">
            <div className="add-icon-circle">
              <UserPlus size={24} />
            </div>
            <span className="text-muted" style={{ fontSize: 14 }}>
              Add a new member
            </span>
            <button className="btn-primary" onClick={() => navigate("/app/search")}>
              Find Partners
            </button>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div className="card" style={{
            width: 500, padding: 32,
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <h2 className="text-white" style={{ fontSize: 20, fontWeight: 600 }}>
              Invite a Member
            </h2>
            <p className="text-muted" style={{ fontSize: 13 }}>
              Search by name or roll number (e.g. 23L-0893)
            </p>

            <div className="flex-row gap-2">
              <input
                style={{
                  flex: 1, background: "white", borderRadius: 8, padding: "10px 14px",
                  color: "#082226", fontSize: 14, border: "none", outline: "none",
                }}
                placeholder="Name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="btn-primary" onClick={handleSearch} disabled={searching}>
                {searching ? "..." : "Search"}
              </button>
            </div>

            <div style={{
              display: "flex", flexDirection: "column", gap: 8,
              maxHeight: 280, overflowY: "auto",
            }}>
              {!searching && searchQuery && searchResults.length === 0 && (
                <p className="text-muted" style={{ fontSize: 14, textAlign: "center", padding: 20 }}>
                  No students found for "{searchQuery}"
                </p>
              )}
              {searchResults.map((s) => (
                <div key={s._id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 16px", borderRadius: 10, background: "var(--bg-deep)",
                }}>
                  <div>
                    <p className="text-white" style={{ fontWeight: 600, fontSize: 14 }}>
                      {s.name}
                    </p>
                    <p className="text-muted" style={{ fontSize: 12 }}>
                      {s.studentId || s.dept}
                    </p>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ padding: "6px 16px", fontSize: 13 }}
                    onClick={() => handleAddMember(s)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            <button
              className="btn-outline"
              onClick={() => {
                setShowInvite(false);
                setSearchResults([]);
                setSearchQuery("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
