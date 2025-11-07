import React, { useState } from "react";

function ContentCreatorDashboard({ user, onSignOut }) {
  const [activeTab, setActiveTab] = useState("Content Library");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [contents, setContents] = useState([
    { title: "Introduction to React Hooks", type: "Video", course: "React Development", status: "Published" },
    { title: "JavaScript ES6 Cheat Sheet", type: "Document", course: "Advanced JavaScript", status: "Draft" }
  ]);
  const [newContent, setNewContent] = useState({ title: "", type: "", course: "", status: "" });

  const tabs = ["Content Library", "Projects", "Media Library", "Analytics"];

  const handleInputChange = e => setNewContent({ ...newContent, [e.target.name]: e.target.value });

  const handleAddContent = e => {
    e.preventDefault();
    if (!newContent.title || !newContent.type || !newContent.course || !newContent.status) {
      alert("Fill all fields!");
      return;
    }
    setContents([...contents, { ...newContent }]);
    setShowCreateModal(false);
    setNewContent({ title: "", type: "", course: "", status: "" });
  };

  return (
    <div style={{display:"flex",fontFamily:"sans-serif",minHeight:"100vh",background:"#fafbfc"}}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: "#fff", borderRight: "1px solid #eee", padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontWeight: 700, fontSize: 22 }}>EduFlow LMS</div>
          <span style={{ fontSize: 12, color: "#bb33d2", background: "#fae8ff", borderRadius: 8, padding: "2px 10px", marginTop: 7, display: "inline-block" }}>
            Content Creator
          </span>
        </div>
        <nav style={{ flex: 1 }}>
          <div style={{ marginBottom: 12 }}>Content Library</div>
          <div style={{ marginBottom: 12 }}>Projects</div>
          <div style={{ marginBottom: 12 }}>Media Library</div>
          <div style={{ marginBottom: 12 }}>Analytics</div>
          <div style={{ marginBottom: 12, fontWeight: 600, color: "#111" }}>Dashboard</div>
          <div style={{ marginBottom: 12 }}>Notifications</div>
          <div style={{ marginBottom: 12 }}>Help & Support</div>
          <div style={{ marginBottom: 12 }}>Settings</div>
        </nav>
        <div>
          <div style={{ fontSize: 14, color: "#555" }}>{user.email}</div>
          <button onClick={onSignOut} style={{ color: "#da2253", marginTop: 8, background: "none", border: "none", cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      </aside>
      {/* Main dashboard */}
      <main style={{ flex: 1, padding: "36px 50px" }}>
        <h1 style={{ fontWeight: 700, fontSize: 28 }}>Content Creator Dashboard</h1>
        <div style={{ color: "#777" }}>Create, manage, and optimize educational content</div>
        <div style={{ display: "flex", gap: 36, margin: "30px 0" }}>
          <Stat title="Total Content" value={contents.length} note="+5 this week" noteColor="green" />
          <Stat title="Total Views" value="12.4K" note="+18% this month" noteColor="green" />
          <Stat title="Active Projects" value="3" note="2 in review" noteColor="#276ef1" />
          <Stat title="Avg. Rating" value="4.7" note="Excellent" noteColor="#fcc419" />
        </div>
        {/* Action buttons */}
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => alert("Media upload logic not yet implemented.")}
            style={{ padding: "8px 22px", border: "1px solid #ccc", background: "#fff", borderRadius: 6, fontWeight: 600 }}>
            Upload Media
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{ padding: "9px 23px", background: "#1a1a27", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, marginLeft: 10 }}>
            + Create Content
          </button>
        </div>
        {/* Tabs */}
        <div style={{ marginBottom: 18 }}>
          {tabs.map(tab => (
            <button
              key={tab}
              style={{
                marginRight: 9,
                background: activeTab === tab ? "#e4e4ed" : "transparent", border: "none",
                borderRadius: 8, padding: "4px 14px", fontWeight: 500, color: activeTab === tab ? "#222" : "#444"
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab panels */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 14 }}>Content Management</div>
          {activeTab === "Content Library" &&
            <ContentTable contents={contents} />}
          {activeTab !== "Content Library" &&
            <div style={{ color: "#888", padding: 36, fontStyle: "italic" }}>{activeTab} panel (logic to be implemented)</div>}
        </div>
        {/* Create Modal */}
        {showCreateModal && (
          <Modal>
            <form onSubmit={handleAddContent} autoComplete="off" style={{ display: "flex", flexDirection: "column", width: 300 }}>
              <h2 style={{ marginBottom: 15 }}>Add New Content</h2>
              <input type="text" name="title" placeholder="Content Title" value={newContent.title} onChange={handleInputChange} style={inputStyle} required />
              <select name="type" value={newContent.type} onChange={handleInputChange} style={inputStyle} required>
                <option value="">Select Type</option>
                <option value="Video">Video</option>
                <option value="Document">Document</option>
              </select>
              <input type="text" name="course" placeholder="Course" value={newContent.course} onChange={handleInputChange} style={inputStyle} required />
              <select name="status" value={newContent.status} onChange={handleInputChange} style={inputStyle} required>
                <option value="">Select Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <button type="submit" style={{
                marginTop: 14, padding: "9px 0", background: "#1a1a27", color: "#fff", border: "none", borderRadius: 6,
                fontWeight: 600, fontSize: 15
              }}>Add Content</button>
              <button type="button" onClick={() => setShowCreateModal(false)} style={{
                marginTop: 8, padding: "7px 0", borderRadius: 6, border: "none", background: "#eee", color: "#222", fontWeight: 500
              }}>Cancel</button>
            </form>
          </Modal>
        )}
      </main>
    </div>
  );
}

function Modal({ children }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "#fff", padding: 30, borderRadius: 12, boxShadow: "0 4px 24px rgba(20,20,80,.18)" }}>
        {children}
      </div>
    </div>
  );
}

function Stat({ title, value, note, noteColor }) {
  return (
    <div>
      <div style={{ color: "#444", fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
      <div style={{ color: noteColor, fontSize: 14, fontWeight: 500 }}>{note}</div>
    </div>
  );
}

function ContentTable({ contents }) {
  return (
    <table width="100%" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #eee" }}>
          <th style={{ textAlign: "left", padding: 10 }}>Content</th>
          <th style={{ textAlign: "left", padding: 10 }}>Type</th>
          <th style={{ textAlign: "left", padding: 10 }}>Course</th>
          <th style={{ textAlign: "left", padding: 10 }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {contents.map((c, i) => (
          <tr key={i}>
            <td style={{ padding: 8 }}>{c.title}</td>
            <td style={{ padding: 8 }}>{c.type}</td>
            <td style={{ padding: 8 }}>{c.course}</td>
            <td style={{ padding: 8, color: c.status === "Published" ? "green" : "#da2253", fontWeight: 600 }}>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const inputStyle = {
  padding: "10px 12px",
  borderRadius: 6,
  border: "1.5px solid #ddd",
  marginBottom: 12,
  fontSize: 16
};

export default ContentCreatorDashboard;
