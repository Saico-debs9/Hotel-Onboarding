import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import BackButton from '../components/BackButton';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      alert('Login successful');

      if (res.data.role === 'main') {
        navigate('/admin/dashboard');
      } else {
        navigate('/hoteladmin/dashboard');
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="headHome">Admin Login</h2>
        <div className='inputBox'>
        <form onSubmit={handleLogin} className='formBox'>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputHome"
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputHome"
            required
          /><br />
          <div className="inputBtn">
            <button type="submit" className="btnHome">Login</button>
          </div>
        </form>
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default LoginPage;
