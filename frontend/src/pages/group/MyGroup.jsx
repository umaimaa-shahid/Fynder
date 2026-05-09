import { useState, useEffect } from "react";
import { Settings, UserPlus, Crown, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./MyGroup.css";

export default function MyGroup() {
  // Add these states at the top
  const [showInvite, setShowInvite] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const maxGroupSize = 3;

  useEffect(() => {
    api
      .get("/group/me")
      .then((res) => setGroup(res.data.group))
      .catch((err) => {
        if (err.response?.status === 404) setError("no-group");
        else setError("Failed to load group");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await api.get(`/students?search=${searchQuery}`);
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
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create group");
    }
  };

  const handleMessage = (member) => {
    localStorage.setItem(
      "chatWith",
      JSON.stringify({
        userId: member._id,
        name: member.name,
        rollNumber: member.profile?.rollNumber || "",
        lastMsg: "",
        time: new Date(),
      }),
    );
    navigate("/app/chat");
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  if (error === "no-group")
    return (
      <div className="group-page fade-in">
        <div className="group-hero">
          <h1 className="page-title">My Group</h1>
          <p className="page-subtitle">You are not in a group yet</p>
        </div>
        <div
          className="card group-header-card"
          style={{ alignItems: "center", gap: 16 }}
        >
          <p className="text-muted">
            Create a group to get started with your FYP team.
          </p>
          <button className="btn-primary" onClick={handleCreateGroup}>
            <UserPlus size={16} /> Create Group
          </button>
        </div>
      </div>
    );

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const myId = localStorage.getItem("userId");
  const members = group.members || [];

  return (
    <div className="group-page fade-in">
      <div className="group-hero">
        <h1 className="page-title">My Group</h1>
        <p className="page-subtitle">
          Manage your FYP team and collaborate effectively
        </p>
      </div>

      <div className="card group-header-card">
        <div className="group-header-top">
          <div>
            <h2
              className="text-white font-bold"
              style={{ fontSize: 24, marginBottom: 4 }}
            >
              {group.name}
            </h2>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Created{" "}
              {new Date(group.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex-row gap-3">
            {group.leader?._id === myId && (
              <button
                className="btn-primary"
                onClick={() => setShowInvite(true)}
                disabled={members.length >= maxGroupSize}
              >
                <UserPlus size={16} /> Invite Member
              </button>
            )}
          </div>
        </div>

        <div className="group-size-container">
          <div className="group-size-info">
            <span className="group-size-label">Group Size</span>
            <span className="group-size-count">
              {members.length} / {maxGroupSize} members
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${(members.length / maxGroupSize) * 100}%` }}
            />
          </div>
          <div className="flex-row justify-between" style={{ marginTop: 8 }}>
            <span className="text-muted" style={{ fontSize: 14 }}>
              {maxGroupSize - members.length > 0
                ? `You can add ${maxGroupSize - members.length} more member`
                : "Your group is full"}
            </span>
            {members.length < maxGroupSize && (
              <span
                className="badge badge-warning"
                style={{ padding: "6px 16px" }}
              >
                Looking for Members
              </span>
            )}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, color: "white" }}>
        Team Members
      </h2>

      <div className="members-grid">
        {members.map((member) => {
          const p = member.profile || {};
          const initials = member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const isLeader = group.leader?._id === member._id;

          return (
            <div key={member._id} className="card member-card">
              <div className="member-card-header">
                <div className="member-avatar">{initials}</div>
                <div className="member-info">
                  <div className="member-name-row">
                    <span
                      className="text-white"
                      style={{ fontSize: 18, fontWeight: 600 }}
                    >
                      {member.name}
                    </span>
                    {isLeader && <Crown size={20} className="crown-icon" />}
                  </div>
                  <span className="text-muted" style={{ fontSize: 14 }}>
                    {p.rollNumber}
                  </span>
                </div>
              </div>

              <div className="skills-row">
                {(p.skills || []).map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex-row gap-2" style={{ marginTop: "auto" }}>
                <button
                  className="btn-outline"
                  style={{ gap: 6 }}
                  onClick={() => {
                    const myId = localStorage.getItem("userId");
                    navigate(
                      member._id === myId
                        ? "/app/profile"
                        : `/app/profile/${member._id}`,
                    );
                  }}
                >
                  <ExternalLink size={16} /> View Profile
                </button>
                <button
                  className="btn-primary"
                  style={{ gap: 6 }}
                  onClick={() => handleMessage(member)}
                >
                  Message
                </button>
              </div>
            </div>
          );
        })}

        {members.length < maxGroupSize && (
          <div className="card member-card add-member-card">
            <div className="add-icon-circle">
              <UserPlus size={24} />
            </div>
            <span className="text-muted" style={{ fontSize: 14 }}>
              Add a new member
            </span>
            <button
              className="btn-primary"
              onClick={() => navigate("/app/search")}
            >
              Find Partners
            </button>
          </div>
        )}
      </div>

      {showInvite && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="card"
            style={{
              width: 480,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h2
              className="text-white"
              style={{ fontSize: 20, fontWeight: 600 }}
            >
              Invite a Member
            </h2>

            <div className="flex-row gap-2">
              <input
                className="form-input"
                style={{ flex: 1 }}
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="btn-primary"
                onClick={handleSearch}
                disabled={searching}
              >
                {searching ? "..." : "Search"}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxHeight: 240,
                overflowY: "auto",
              }}
            >
              {searchResults.length === 0 && searchQuery && !searching && (
                <p className="text-muted" style={{ fontSize: 14 }}>
                  No students found
                </p>
              )}
              {searchResults.map((s) => (
                <div
                  key={s._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "var(--bg-deep)",
                  }}
                >
                  <div>
                    <p
                      className="text-white"
                      style={{ fontWeight: 600, fontSize: 14 }}
                    >
                      {s.name}
                    </p>
                    <p className="text-muted" style={{ fontSize: 12 }}>
                      {s.profile?.rollNumber || s.email}
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
