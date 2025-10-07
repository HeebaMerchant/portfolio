import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === '/' || location.pathname === '/portfolio/' || location.pathname === '/portfolio') {
      // Already on main page, just scroll to projects section
      const section = document.getElementById('section-projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Not on main page, navigate to main page and jump directly to projects
      navigate('/', { state: { scrollToProjects: true } });
      
      // Wait for navigation to complete, then immediately jump to projects section
      setTimeout(() => {
        const section = document.getElementById('section-projects');
        if (section) {
          // Disable smooth scrolling temporarily for instant jump
          const htmlElement = document.documentElement;
          const originalBehavior = htmlElement.style.scrollBehavior;
          htmlElement.style.scrollBehavior = 'auto';
          
          section.scrollIntoView({ behavior: 'auto' });
          
          // Restore smooth scrolling
          setTimeout(() => {
            htmlElement.style.scrollBehavior = originalBehavior;
          }, 10);
        }
      }, 50);
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