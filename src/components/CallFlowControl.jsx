import { useState, useEffect } from 'react';
import { updateTargetStatus } from '../services/ringbaApi';
import '../styles/CustomStyles.css'; // Import your custom styles

export default function CallFlowControl() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to update the time display
    const updateTime = () => {
      const now = new Date();
      const currentTimeElement = document.getElementById('currentTime');
      if (currentTimeElement) {
        currentTimeElement.textContent = now.toLocaleTimeString();
      }
    };

    // Initialize the time display and set an interval to update it
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Function to handle Start and Pause actions
  const handleToggle = async (newState) => {
    setError(null);
    try {
      // Call the API function to update the target status
      const response = await updateTargetStatus(newState);
      if (!response) throw new Error('Failed to update status');

      // Update the active state and show system status
      setIsActive(newState);
      showSystemStatus(newState ? 'System Activated' : 'System Paused');

      // Toggle the energy field visuals
      const energyField = document.getElementById('energyField');
      if (energyField) {
        energyField.classList.toggle('active', newState);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to show system status with animation
  const showSystemStatus = (message) => {
    const statusElement = document.getElementById('systemStatus');
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.classList.add('active');
      setTimeout(() => statusElement.classList.remove('active'), 2000);
    }
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
        <img src="/400x120.png" alt="ACA Health Insurance Portal Logo" className="logo" width="400" height="120" />
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
