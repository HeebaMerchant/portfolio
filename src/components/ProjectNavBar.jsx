import React, { useState, useEffect } from 'react';
import './ProjectNavBar.css';

const ProjectNavBar = ({ title, links, theme = 'default' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(links[0]?.id || '');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      if (links.length > 0) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        for (const link of links) {
          const element = document.getElementById(link.id);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(link.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav className={`project-nav ${theme}-theme ${scrollY > 50 ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="nav-title">{title}</div>
        <div className="nav-links">
          {links.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              className={activeSection === link.id ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ProjectNavBar; 