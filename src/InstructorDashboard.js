import React, { useState } from "react";

function InstructorDashboard({ user, onSignOut }) {
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("My Courses");
  const [courses, setCourses] = useState([
    { title: "React Development Fundamentals", students: 45, progress: "85%", status: "Published" },
    { title: "Advanced JavaScript Concepts", students: 32, progress: "60%", status: "Draft" },
    { title: "Full Stack Web Development", students: 28, progress: "92%", status: "Published" }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", students: "", progress: "", status: "" });

  const sidebarItems = ["Dashboard", "My Courses", "Assignments", "Students", "Analytics"];
  const courseTabs = ["My Courses", "Assignments", "Students", "Analytics"];

  const handleInputChange = e => setNewCourse({ ...newCourse, [e.target.name]: e.target.value });

  const handleAddCourse = e => {
    e.preventDefault();
    if (
      !newCourse.title.trim() ||
      !newCourse.students.trim() ||
      !newCourse.progress.trim() ||
      !newCourse.status.trim()
    ) {
      alert("Fill all fields!");
      return;
    }
    setCourses(prev => [...prev, { ...newCourse }]);
    setModalOpen(false);
    setNewCourse({ title: "", students: "", progress: "", status: "" });
  };

  const renderMainPanel = () => {
    if (activeSidebar === "Dashboard") {
      return (
        <>
          <h1 style={{ fontWeight: 700, fontSize: 28 }}>Instructor Dashboard</h1>
          <div style={{ color: "#777", marginBottom: 30 }}>Manage your courses, assignments, and student progress</div>
          <div style={{ display: "flex", gap: 36, marginBottom: 30 }}>
            <Stat title="Total Courses" value={courses.length} note="2 active, 1 draft" noteColor="#3472f7" />
            <Stat title="Total Students" value={courses.reduce((sum, c) => sum + Number(c.students || 0), 0)} note="+8 this week" noteColor="green" />
            <Stat title="Assignments Due" value="7" note="2 overdue" noteColor="#fa6801" />
            <Stat title="Avg. Completion" value="79%" note="+5% this month" noteColor="green" />
          </div>
        </>
      );
    }
    if (activeSidebar === "My Courses") {
      return (
        <>
          <button
            onClick={() => setModalOpen(true)}
            style={{ marginBottom: 24, padding: "9px 23px", background: "#1a1a27", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600 }}>
            + Create New Course
          </button>
          <div style={{ marginBottom: 18 }}>
            {courseTabs.map(tab => (
              <button
                key={tab}
                style={{
                  marginRight: 9,
                  background: activeTab === tab ? "#e4e4ed" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontWeight: 500,
                  color: activeTab === tab ? "#222" : "#444"
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === "My Courses" && <CoursesTable courses={courses} />}
          {activeTab === "Assignments" && <AssignmentsPanel />}
          {activeTab === "Students" && <StudentsPanel />}
          {activeTab === "Analytics" && <AnalyticsPanel />}
        </>
      );
    }
    if (activeSidebar === "Assignments") return <AssignmentsPanel />;
    if (activeSidebar === "Students") return <StudentsPanel />;
    if (activeSidebar === "Analytics") return <AnalyticsPanel />;
    return <div>Please select an option from the sidebar.</div>;
  };

  return (
    <div style={{ display: "flex", fontFamily: "sans-serif", minHeight: "100vh", background: "#fafbfc" }}>
      <aside style={{ width: 240, background: "#fff", borderRight: "1px solid #eee", padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontWeight: 700, fontSize: 22 }}>EduFlow LMS</div>
          <span style={{ fontSize: 12, color: "#3472f7", background: "#e7f3ff", borderRadius: 8, padding: "2px 10px", marginTop: 7, display: "inline-block" }}>Instructor</span>
        </div>
        <nav style={{ flex: 1 }}>
          {sidebarItems.map(item => (
            <div
              key={item}
              onClick={() => setActiveSidebar(item)}
              style={{
                marginBottom: 12,
                cursor: "pointer",
                fontWeight: activeSidebar === item ? 600 : 400,
                color: activeSidebar === item ? "#111" : "#222"
              }}
            >
              {item}
            </div>
          ))}
        </nav>
        <div>
          <div style={{ fontSize: 14, color: "#555" }}>{user.email}</div>
          <button onClick={onSignOut} style={{ color: "#da2253", marginTop: 8, background: "none", border: "none", cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: "36px 50px" }}>
        {renderMainPanel()}
        {modalOpen && (
          <Modal>
            <form onSubmit={handleAddCourse} autoComplete="off" style={{ display: "flex", flexDirection: "column", width: 300 }}>
              <h2 style={{ marginBottom: 15 }}>Add New Course</h2>
              <input type="text" name="title" placeholder="Course Title" value={newCourse.title} onChange={handleInputChange} style={inputStyle} required />
              <input type="number" name="students" placeholder="No. of Students" value={newCourse.students} onChange={handleInputChange} style={inputStyle} required />
              <input type="text" name="progress" placeholder="Progress (e.g. 60%)" value={newCourse.progress} onChange={handleInputChange} style={inputStyle} required />
              <select name="status" value={newCourse.status} onChange={handleInputChange} style={inputStyle} required>
                <option value="">Select Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <button type="submit" style={{
                marginTop: 14,
                padding: "9px 0",
                background: "#1a1a27",
                color: "#fff", border: "none", borderRadius: 6,
                fontWeight: 600, fontSize: 15
              }}>Add Course</button>
              <button type="button" onClick={() => setModalOpen(false)} style={{
                marginTop: 8, padding: "7px 0", borderRadius: 6,
                border: "none", background: "#eee", color: "#222", fontWeight: 500
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

function CoursesTable({ courses }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: 20, marginTop: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 14 }}>Course Management</div>
      <table width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <th style={{ textAlign: "left", padding: 10 }}>Course Title</th>
            <th style={{ textAlign: "left", padding: 10 }}>Students</th>
            <th style={{ textAlign: "left", padding: 10 }}>Progress</th>
            <th style={{ textAlign: "left", padding: 10 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i}>
              <td style={{ padding: 8 }}>{c.title}</td>
              <td style={{ padding: 8 }}>{c.students}</td>
              <td style={{ padding: 8 }}>{c.progress}</td>
              <td style={{
                padding: 8,
                color: c.status === "Published" ? "green" : "#fca103",
                fontWeight: 600
              }}>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AssignmentsPanel() {
  return <div style={{ marginTop: 32 }}><h2>Assignments</h2><p>(You can add assignments table here.)</p></div>;
}

function StudentsPanel() {
  return <div style={{ marginTop: 32 }}><h2>Students</h2><p>(You can add student list or data here.)</p></div>;
}

function AnalyticsPanel() {
  return <div style={{ marginTop: 32 }}><h2>Analytics</h2><p>(Add charts/analytics features here.)</p></div>;
}

const inputStyle = {
  padding: "10px 12px",
  borderRadius: 6,
  border: "1.5px solid #ddd",
  marginBottom: 12,
  fontSize: 16
};

export default InstructorDashboard;
