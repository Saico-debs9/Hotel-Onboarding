import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'

const SignupPage = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'main' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="headHome">Admin Signup</h2>
        <form onSubmit={handleSignup} className="formBox">
          <input
            className="inputHome"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          /><br />
          <input
            className="inputHome"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          /><br />
          <select
            className="inputHome"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="main">Main Admin</option>
            <option value="hotel">Hotel Admin</option>
          </select><br />
          <div className="inputBtn">
            <button className="btnHome" type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
