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
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    password: '',
  });

  const validateInputs = () => {
    let valid = true;
    let errorMessages = { ...errors };

    // Check if fields are empty
    if (!firstname) {
      errorMessages.firstname = 'First name is required.';
      valid = false;
    } else {
      errorMessages.firstname = '';
    }

    if (!lastname) {
      errorMessages.lastname = 'Last name is required.';
      valid = false;
    } else {
      errorMessages.lastname = '';
    }

    if (!email) {
      errorMessages.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessages.email = 'Please enter a valid email.';
      valid = false;
    } else {
      errorMessages.email = '';
    }

    if (!dob) {
      errorMessages.dob = 'Date of birth is required.';
      valid = false;
    } else {
      errorMessages.dob = '';
    }

    if (!password) {
      errorMessages.password = 'Password is required.';
      valid = false;
    } else {
      errorMessages.password = '';
    }

    setErrors(errorMessages);
    return valid;
  };

  const handleRegistration = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const userData = {
        firstname,
        lastname,
        email,
        dob,
        password,
        role,
      };

      const response = await axios.post('https://clientapp-441220.uk.r.appspot.com/api/employee/add', userData);
      console.log('User registered:', response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (registrationSuccess) {
    return (
      <div className='centered-container'>
        <div className="login-container">
          <h1>Registration successful</h1>
          <div className="registration-link">
            <p><a href="/">Login here</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="centered-container">
      <div className="login-container">
        <h2>Registration</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstname && <p className="error">{errors.firstname}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastname && <p className="error">{errors.lastname}</p>}
        </div>
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
        <div className="input-container">
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          {errors.dob && <p className="error">{errors.dob}</p>}
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
