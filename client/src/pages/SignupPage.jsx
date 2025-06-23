import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Signup</h2>
        <input className="w-full p-2 mb-3 border" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input className="w-full p-2 mb-3 border" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <select className="w-full p-2 mb-3 border" name="role" value={form.role} onChange={handleChange}>
          <option value="main">Main Admin</option>
          <option value="hotel">Hotel Admin</option>
        </select>
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
