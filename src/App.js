import React, { useState } from "react";
import AdvancedLoginPage from "./AdvancedLoginPage";
import ContentCreatorDashboard from "./ContentCreatorDashboard";
import InstructorDashboard from "./InstructorDashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = userInfo => setUser(userInfo);
  const handleSignOut = () => setUser(null);

  if (!user) return <AdvancedLoginPage onLogin={handleLogin} />;
  if (user.role === "Content Creator") return <ContentCreatorDashboard user={user} onSignOut={handleSignOut} />;
  if (user.role === "Instructor" || user.role === "Google") return <InstructorDashboard user={user} onSignOut={handleSignOut} />;

  return <div>Unknown role</div>;
}

export default App;
