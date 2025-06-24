<<<<<<< HEAD
// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import BackButton from '../components/BackButton';
>>>>>>> booking-hotel

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

<<<<<<< HEAD
      // Redirect based on role
=======
>>>>>>> booking-hotel
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
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
=======
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
>>>>>>> booking-hotel
    </div>
  );
};

export default LoginPage;
