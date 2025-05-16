import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  return (
    <div className="back-button-container">
      <Link to="/" className="back-button" onClick={() => window.scrollTo(0, 0)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to Portfolio</span>
      </Link>
    </div>
  );
};

export default BackButton; 