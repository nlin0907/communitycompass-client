import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import LoginPage from './component/LoginPage';
import AdminHome from './component/AdminHome';
import GeneralHome from './component/GeneralHome';
import RegistrationPage from './component/RegistrationPage';

function App() {
  const [user, setUser] = useState(null);

  // Load user state from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <LoginPage onLogin={handleLogin} />
              ) : user.role === 'admin' ? (
                <AdminHome user={user} onLogout={handleLogout} />
              ) : (
                <GeneralHome user={user} onLogout={handleLogout} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user ? (
                // Redirect logged-in users to the appropriate dashboard
                <Navigate to="/" />
              ) : (
                <RegistrationPage />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                // Redirect logged-in users to the appropriate dashboard
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
        </Routes>
        <div>
          {!user && <AuthLink />}
        </div>
      </div>
    </Router>
  );
}

function AuthLink() {
  const location = useLocation();
  if (location.pathname !== '/register') {
    return (
      <p className="registration-link">
        Don't have an account? <Link to="/register">Click here to register</Link>
      </p>
    );
  }
  return null;
}

export default App;
