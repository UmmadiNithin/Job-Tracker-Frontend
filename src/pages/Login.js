import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      localStorage.setItem('user', JSON.stringify(data.user)); // Make sure your backend returns `user`


      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 1500,
      });

      setTimeout(() => navigate('/dashboard'), 1800);
    } catch (err) {
      toast.error(err.message || 'Something went wrong', {
        position: 'top-center',
      });
    }
  };



return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
  
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
  
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
  
        <button type="submit">Login</button>
        
        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate('/Signup')}>Signup</span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
  
}
;

export default Login;
