import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Home from './Home';
import JobTracker from './JobTracker';
import './Dashboard.css';
import { FaUserCircle,FaRocket } from 'react-icons/fa';

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get user info from localStorage or context (adjust as needed)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUsername(user.name);
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <div className="dashboard-header">
      <h2 className="dashboard-title">
      <FaRocket style={{ marginRight: '8px', color: 'linear-gradient(to right, #8e2de2, #4a00e0)' }} />

      Job Tracker
</h2>        <div className="dashboard-user">
          <FaUserCircle size={24} style={{ marginRight: '8px' }} />
          <span>{username || 'Guest'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <Sidebar />
        <div className="dashboard-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="job-tracker" element={<JobTracker />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
