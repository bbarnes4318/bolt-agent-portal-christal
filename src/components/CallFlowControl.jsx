// src/components/CallFlowControl.jsx
import { useState, useEffect } from 'react';
import { updateTargetStatus } from '../services/ringbaApi';
import logo from '../assets/400x120.png'; // Adjust the path if necessary
import '../styles/CustomStyles.css'; // Custom CSS file for styles

export default function CallFlowControl() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Function to update the time
  const updateTime = () => {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString();
  };

  // Function to handle Start and Pause
  const handleToggle = async (newState) => {
    setError(null);
    try {
      // Call Ringba API
      const response = await updateTargetStatus(newState);
      if (!response) throw new Error('Failed to update status');
      setIsActive(newState);
      showSystemStatus(newState ? 'System Activated' : 'System Paused');
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to show system status
  const showSystemStatus = (message) => {
    const status = document.getElementById('systemStatus');
    status.textContent = message;
    status.classList.add('active');
    setTimeout(() => status.classList.remove('active'), 2000);
  };

  return (
    <div className="dashboard">
      <div className="hero-image"></div>
      <div className="grid-background"></div>
      <div className="pulse-rings">
        <div className="pulse-ring"></div>
        <div className="pulse-ring" style={{ animationDelay: '1s' }}></div>
        <div className="pulse-ring" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="header">
        <img src={logo} alt="ACA Health Insurance Portal Logo" className="logo" width="400" height="120" />
        <div className="time" id="currentTime"></div>
      </div>

      <div className="control-buttons">
        <button
          className="btn"
          onClick={() => handleToggle(true)}
          disabled={isActive}
          style={{ opacity: isActive ? '0.7' : '1' }}
        >
          Start Lead Flow
        </button>
        <button
          className="btn"
          onClick={() => handleToggle(false)}
          disabled={!isActive}
          style={{ background: '#333', opacity: !isActive ? '0.7' : '1' }}
        >
          Pause System
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="system-status" id="systemStatus"></div>
      <div className="energy-field" id="energyField"></div>
    </div>
  );
}
