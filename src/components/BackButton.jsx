import React from 'react';
import './BackButton.css';

const BackButton = () => {
  const handleBack = () => {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      // Already on main page, just scroll
      const section = document.getElementById('section-projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Not on main page, go to main page with hash
      window.location.href = '/#section-projects';
    }
  };

  return (
    <div className="back-button-container">
      <button className="back-button" onClick={handleBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to Projects</span>
      </button>
    </div>
  );
};

export default BackButton; 