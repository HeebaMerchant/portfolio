import React, { useEffect, useState } from 'react';
import './EffectiveTeamDynamics.css';

const EffectiveTeamDynamics = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['intro', 'overview', 'tech', 'features', 'team'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="etd-container">
      {/* Navigation */}
      <nav className={`etd-nav ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-title">ETD Workshop App</div>
          <div className="nav-items">
            <a 
              href="#intro" 
              className={activeSection === 'intro' ? 'active' : ''}
            >
              Overview
            </a>
            <a 
              href="#tech" 
              className={activeSection === 'tech' ? 'active' : ''}
            >
              Tech Stack
            </a>
            <a 
              href="#features" 
              className={activeSection === 'features' ? 'active' : ''}
            >
              Features
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="intro" className="hero-section">
        <div className="hero-content">
          <div 
            className="hero-bg"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
          <div className="hero-text">
            <h1 className="hero-title">
              Effective Team<br />
              Dynamics Workshop
            </h1>
            <p className="hero-subtitle">
              A modern web application that digitizes team activities and streamlines workshop management for Georgia Tech's professional development initiative.
            </p>
            <div className="hero-badges">
              <div className="badge primary">
                <span className="badge-icon">🏆</span>
                1st Place - GT Capstone Expo 2025
              </div>
              <div className="badge secondary">
                <span className="badge-icon">🤝</span>
                Collaboration with Gallup Inc.
              </div>
            </div>
            <div className="hero-cta">
              <a href="/project-demo" className="btn-primary">
                View Live Demo
              </a>
              <a href="https://github.com/ameerahmourad/JIA-4315-ETD-App" className="btn-secondary">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="content-section overview-section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>Project Overview</h2>
            <p className="section-subtitle">Transforming physical workshops into digital experiences</p>
          </div>
          
          <div className="overview-grid">
            <div className="overview-item">
              <div className="overview-image">
                <img src="/images/etd-dashboard.png" alt="Dashboard" />
              </div>
              <div className="overview-text">
                <h3>Digital Transformation</h3>
                <p>
                  Replaced physical supplementary materials with an interactive web application, 
                  improving accessibility for remote participants and enhancing workshop flexibility.
                </p>
              </div>
            </div>
            
            <div className="overview-item reverse">
              <div className="overview-image">
                <img src="/images/etd-activities.png" alt="Activities Interface" />
              </div>
              <div className="overview-text">
                <h3>Streamlined Experience</h3>
                <p>
                  Built using React and Node.js with SQLite database integration, providing a clean 
                  desktop experience without the need for installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="content-section tech-section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>Technology Stack</h2>
            <p className="section-subtitle">Built with modern web technologies</p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-icon">
                <img src="/icons/react.svg" alt="React" />
              </div>
              <h4>React</h4>
              <p>Frontend framework for building interactive UI</p>
            </div>
            
            <div className="tech-item">
              <div className="tech-icon">
                <img src="/icons/nodejs.svg" alt="Node.js" />
              </div>
              <h4>Node.js</h4>
              <p>JavaScript runtime for server-side development</p>
            </div>
            
            <div className="tech-item">
              <div className="tech-icon">
                <img src="/icons/sqlite.svg" alt="SQLite" />
              </div>
              <h4>SQLite</h4>
              <p>Lightweight database for persistent data storage</p>
            </div>
            
            <div className="tech-item">
              <div className="tech-icon">
                <img src="/icons/sequelize.svg" alt="Sequelize" />
              </div>
              <h4>Sequelize</h4>
              <p>ORM for database operations and migrations</p>
            </div>
            
            <div className="tech-item">
              <div className="tech-icon">
                <img src="/icons/typescript.svg" alt="TypeScript" />
              </div>
              <h4>TypeScript</h4>
              <p>Type-safe JavaScript for better code quality</p>
            </div>
            
            <div className="tech-item">
              <div className="tech-icon">
                <img src="/icons/figma.svg" alt="Figma" />
              </div>
              <h4>Figma</h4>
              <p>UI/UX design and prototyping tool</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="content-section features-section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>Key Features</h2>
            <p className="section-subtitle">Empowering teams through digital collaboration</p>
          </div>
          
          <div className="features-showcase">
            <div className="feature-preview">
              <div className="preview-screen">
                <div className="preview-bar">
                  <div className="preview-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="preview-content">
                  <img src="/images/etd-feature-auth.png" alt="Authentication" />
                </div>
              </div>
            </div>
            
            <div className="features-list">
              <div className="feature-item active">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h3>Secure Authentication</h3>
                  <p>Georgia Tech SSO integration with bcrypt password hashing for non-GT users</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h3>Strength Selection</h3>
                  <p>Interactive strength assessment and personalized activity matching</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h3>Team Management</h3>
                  <p>Real-time team formation with secure code-based joining system</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">04</div>
                <div className="feature-content">
                  <h3>Activity Modules</h3>
                  <p>Five interactive modules including My Mindset, Personal Values, and Team Contribution</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">05</div>
                <div className="feature-content">
                  <h3>PDF Generation</h3>
                  <p>Export completed activities as professional PDF reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="content-section team-section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>Development Team</h2>
            <p className="section-subtitle">JIA-4315 Project Team</p>
          </div>
          
          <div className="team-grid">
            <div className="team-member highlight">
              <h4>Heeba Merchant</h4>
              <p>UI/UX Planner & Developer</p>
              <span>Frontend Design & Implementation</span>
            </div>
            
            <div className="team-member">
              <h4>Ameerah Mourad</h4>
              <p>Team Lead & UI/UX Developer</p>
            </div>
            
            <div className="team-member">
              <h4>Scott Watanuki</h4>
              <p>UI/UX & Full-Stack Developer</p>
            </div>
            
            <div className="team-member">
              <h4>Kevin Cao</h4>
              <p>Backend/Full-Stack Developer</p>
            </div>
            
            <div className="team-member">
              <h4>Ben DiPrete</h4>
              <p>Backend/Full-Stack Developer</p>
            </div>
            
            <div className="team-member">
              <h4>Vincent Kong</h4>
              <p>UI/UX Developer</p>
            </div>
          </div>
          
          <div className="client-info">
            <p>Client: Dr. Mary Lynn Realff</p>
            <p>Academic Year: August 2024 - May 2025</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="project-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://github.com/ameerahmourad/JIA-4315-ETD-App">GitHub Repository</a>
            <a href="/contact">Contact Team</a>
          </div>
          <p className="footer-copyright">
            © 2025 Effective Team Dynamics Workshop App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EffectiveTeamDynamics;