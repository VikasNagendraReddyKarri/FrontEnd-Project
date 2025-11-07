import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function AdvancedLoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setRole("");
    setError("");
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) {
      setError("Please select a role");
      return;
    }
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful! Please login.");
        toggleMode();
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onLogin({ email: userCredential.user.email, role });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin({ email: result.user.email, role: "Google" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      maxWidth: 400, margin: "80px auto", padding: 32, borderRadius: 12,
      boxShadow: "0 0 25px rgba(0,0,0,0.1)", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#fff"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>{isSignup ? "Sign Up" : "Welcome Back"}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>Email Address</label>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <label>Password</label>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <label>Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} required style={inputStyle}>
          <option value="">Select Role</option>
          <option value="Content Creator">Content Creator</option>
          <option value="Instructor">Instructor</option>
        </select>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        <button type="submit" style={btnStyle}>{isSignup ? "Register" : "Sign In"}</button>
      </form>
      <hr style={{ margin: "20px 0" }} />
      <button onClick={handleGoogleLogin} style={googleBtnStyle}>Sign In with Google</button>
      <p onClick={toggleMode} style={{ cursor: "pointer", marginTop: 20, textAlign: "center", color: "#555" }}>
        {isSignup ? "Back to Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: 10, margin: "10px 0 15px 0", borderRadius: 6, border: "1px solid #ccc"
};

const btnStyle = {
  width: "100%", padding: 12, backgroundColor: "#1a1a27", color: "#fff",
  fontWeight: "bold", fontSize: 16, border: "none", borderRadius: 8, cursor: "pointer"
};

const googleBtnStyle = {
  width: "100%", padding: 12, backgroundColor: "#4285F4", color: "#fff",
  fontWeight: "bold", fontSize: 16, border: "none", borderRadius: 8, cursor: "pointer"
};

export default AdvancedLoginPage;
