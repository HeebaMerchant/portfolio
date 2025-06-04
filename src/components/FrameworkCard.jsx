import React, { useState } from 'react';

const FrameworkCard = ({ iconSrc, iconAlt, empty = false }) => {
  // State to track hover
  const [isHovered, setIsHovered] = useState(false);
  
  // Color mapping for different technologies
  const colorMap = {
    'React': '61dafb',       // React blue
    'Node.js': '83cd29',     // Node green
    'Python': '3776ab',      // Python blue
    'JavaScript': 'f0db4f',  // JavaScript yellow
    'TypeScript': '3178c6',
    'HTML': 'e34f26',        // HTML orange
    'CSS': '264de4',         // CSS blue
    'Java': 'f89820',        // Java orange
    'Firebase': 'ff9800',    // Firebase orange
    'C': '004482',           // C blue
    'Django': '2c7956',      // Django green
    'WordPress': '21759b',   // WordPress blue
    'Assembly': '654ff0',    // Assembly purple
    'Tailwind': '38bdf8',    // Tailwind blue
    'shadcn/ui': 'ffffff',   // White
    'Numpy': '4dabcf',       // NumPy blue
    'Pytorch': 'ee4c2c',     // PyTorch orange
    'Google Cloud': '4285f4', // Google Cloud blue
    'Figma': '693efe',       // Figma red/orange
  };
  
  // If it's an empty card, just return a basic div
  if (empty) {
    return <div className="framework-card"></div>;
  }
  
  // Get the color for this technology (or use a default)
  const color = colorMap[iconAlt] || '64ffff'; // Default cyan
  
  // Convert hex to rgba for the glow effect
  const getRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  return (
    <div 
      className="framework-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? {
        boxShadow: `0 0 15px ${getRGBA(color, 0.5)}, 0 0 30px ${getRGBA(color, 0.3)}`,
        borderColor: getRGBA(color, 0.4),
        transform: 'translateY(-5px)'
      } : {}}
    >
      {iconSrc && (
        <img 
          src={iconSrc} 
          alt={iconAlt} 
          className="framework-icon" 
          style={isHovered ? { transform: 'scale(1.1)' } : {}} 
        />
      )}
      <span 
        className="framework-name"
        style={isHovered ? { opacity: 1, transform: 'translateY(0)' } : {}}
      >
        {iconAlt}
      </span>
    </div>
  );
};

export default FrameworkCard;