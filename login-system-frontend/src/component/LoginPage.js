import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('general');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState(''); // New state for server error

  const validateInputs = () => {
    let valid = true;
    let errorMessages = { ...errors };

    // Validate email
    if (!email) {
      errorMessages.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessages.email = 'Please enter a valid email.';
      valid = false;
    } else {
      errorMessages.email = '';
    }

    // Validate password
    if (!password) {
      errorMessages.password = 'Password is required.';
      valid = false;
    } else {
      errorMessages.password = '';
    }

    setErrors(errorMessages);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const url = `https://clientapp-441220.uk.r.appspot.com/api/employee/get?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`;
      const response = await axios.get(url);
      const userData = response.data;

      // Add the selected role to userData
      onLogin({ ...userData, role });
      setServerError(''); // Clear the server error on successful login
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        ...errors,
        email: '',
      });
      setServerError('Invalid email, password, or role'); 
    }
  };

  return (
    <div className='login-container'>
      {serverError && (
        <div className="error-message">
          <p>{serverError}</p>
        </div>
      )}
      <div className="login-form">
        <h2>Sign in to your account</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
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
