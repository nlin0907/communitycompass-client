import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('general');

  const handleLogin = async () => {
    try {
      const url = `https://clientapp-441220.uk.r.appspot.com/api/employee/get?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`;
      const response = await axios.get(url);
      const userData = response.data;

      // Add the selected role to userData
      onLogin({ ...userData, role });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='login-container'>
      <div className="login-form">
        <h2>Sign in to your account</h2>
        <div className="input-container">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="role-selection">
          <label>
            <input
              type="radio"
              value="general"
              checked={role === 'general'}
              onChange={(e) => setRole(e.target.value)}
            />
            General
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
        </div>
        <button className="login-button" type="button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
