import { Activity } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

import "./App.css";

function App() {
  const { pathname } = useLocation()

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={
          <Activity mode={pathname.includes('signup') ? 'visible' : 'hidden'}>
            <SignupForm />
          </Activity>}
        />
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/login" element={
          <Activity mode={pathname.includes('login') ? 'visible' : 'hidden'}>
            <LoginForm />
          </Activity>}
        />
      </Routes>
    </div >
  );
}

export default App;
