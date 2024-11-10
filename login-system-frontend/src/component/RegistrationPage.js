import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function RegistrationPage() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('general');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = async () => {
    try {
      const userData = {
        firstname,
        lastname,
        email,
        dob,
        password,
        role,
      };

      const response = await axios.post('http://localhost:9090/api/customer/add', userData);
      console.log('User registered:', response.data);

    } catch (error) {
      console.error('Registration error:', error);
    }
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
    return (
    <div className='centered-container'>
      <div className="login-container">
      <h1>Registration successful</h1>
      <h2> </h2>
      <div className="registration-link">
        <p><a href="/">Login here</a></p>
      </div>
      </div>

    </div>);
  }

  return (
    <div className="centered-container">
    <div className="login-container">
      <h2>Registration</h2>
      <div className="input-container">
        <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="input-container">
        <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="input-container">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-container">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="admin"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            value="general"
            checked={role === 'general'}
            onChange={() => setRole('general')}
          />
          General
        </label>
      </div>
      <button className="login-button" onClick={handleRegistration}>Register</button>
      <div className="login-link">
        <p className='registration-link'>Already have an account? <a href="/">Login here</a></p>
      </div>
    </div>
    </div>
  );
}

export default RegistrationPage;

