import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title"></h2>
      <nav>
        <ul className="sidebar-list">
          <li>
          <div className="sidebar-item">

            <Link to="/dashboard">
              <FaHome className="sidebar-icon" /> Home
            </Link>
            </div>
          </li>
          <li>
          <div className="sidebar-item">

            <Link to="/dashboard/job-tracker">
              <FaBriefcase className="sidebar-icon" /> Job Tracker
            </Link>
            </div>
          </li>
          <li>

            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="sidebar-icon" /> Logout
            </button>
            

          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
