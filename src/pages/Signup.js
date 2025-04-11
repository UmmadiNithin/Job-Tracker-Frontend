import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Link CSS file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
  
      toast.success('Signup successful!', {
        position: 'top-center',
        autoClose: 1500,
      });
  
      setTimeout(() => navigate('/login'), 1800); // Delay a bit to let toast show
    } catch (err) {
      toast.error(err.message || 'Something went wrong', {
        position: 'top-center',
      });
    }
  };
  
//   return (
//     <div className="signup-container">
//       <form onSubmit={handleSignup} className="signup-form">
//         <h2>Signup</h2>

//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

//         <button type="submit">Signup</button>
//         <p className="login-link">
//   Already have an account? <span onClick={() => navigate('/login')}>Login</span>
// </p>

//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>}
//       </form>
//       <ToastContainer />

//     </div>
//   );
return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Signup</h2>
  
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
  
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
  
        <button type="submit">Signup</button>
  
        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
  
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      <ToastContainer />
    </div>
  );
  

};

export default Signup;
