import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/signup');
  };

  return (
    <div className="landing-container">
      <button className="start-button" onClick={handleStart}>
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
