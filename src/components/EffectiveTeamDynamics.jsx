import React, { useEffect, useState } from 'react';
import './EffectiveTeamDynamics.css';
import BackButton from './BackButton';
import ProjectNavBar from './ProjectNavBar';

const EffectiveTeamDynamics = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['intro', 'overview', 'architecture', 'ui', 'tech', 'features', 'team'];
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
  
  // Define navigation links for this project
  const navLinks = [
    { id: 'intro', label: 'Overview' },
    { id: 'overview', label: 'Project Details' },
    { id: 'architecture', label: 'System Architecture' },
    { id: 'ui', label: 'UI Design' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'features', label: 'Features' },
    { id: 'team', label: 'Team' }
  ];

  return (
    <div className="etd-container">
      <BackButton />
      
      {/* Navigation */}
      <ProjectNavBar 
        title="ETD Workshop App"
        links={navLinks}
        theme="etd"
      />

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
              A modern web application that digitizes Georgia Tech's team workshop activities, improving accessibility and efficiency for facilitators and participants.
            </p>
            <div className="hero-badges">
              <div className="badge primary">
                <span className="badge-icon">🏆</span>
                GT Capstone Project
              </div>
              <div className="badge secondary">
                <span className="badge-icon">🤝</span>
                GT Professional Development Initiative
              </div>
            </div>
            <div className="hero-cta">
              <a href={`https://github.com/ameerahmourad/JIA-4315-ETD-App`} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View GitHub Repo
              </a>
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/#contact';
                  window.scrollTo(0, 0);
                }}
                className="btn-secondary"
              >
                Contact Team
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
                  The Effective Team Dynamics (ETD) Workshop App digitizes Georgia Tech's existing 
                  initiative that helps diverse teams realize their full potential. Our application 
                  replaces physical workshop materials with interactive digital features, improving 
                  accessibility for remote participants and enhancing workshop flexibility.
                </p>
              </div>
            </div>
            
            <div className="overview-item reverse">
              <div className="overview-image">
                <img src="/images/etd-activities.png" alt="Activities Interface" />
              </div>
              <div className="overview-text">
                <h3>Key Benefits</h3>
                <p>
                  Our digital solution improves workshop accessibility for remote participants, 
                  reduces preparation time for facilitators, provides better workshop flexibility, 
                  maintains a consistent experience across sessions, and eliminates the logistics 
                  challenges of managing physical materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="content-section architecture-section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>System Architecture</h2>
            <p className="section-subtitle">Layered design with secure authentication</p>
          </div>

          <div className="architecture-diagram">
            <div className="arch-layer">
              <div className="arch-title">Presentation Layer</div>
              <div className="arch-description">
                <p>User interaction interface built with React</p>
                <ul className="arch-features">
                  <li>Interactive workshop activities</li>
                  <li>Strength selection interface</li>
                  <li>Team management dashboard</li>
                </ul>
              </div>
            </div>

            <div className="arch-layer">
              <div className="arch-title">Business Layer</div>
              <div className="arch-description">
                <p>Backend logic and database communication via Express</p>
                <ul className="arch-features">
                  <li>RESTful API endpoints</li>
                  <li>JWT-based authentication</li>
                  <li>Business logic processing</li>
                </ul>
              </div>
            </div>

            <div className="arch-layer">
              <div className="arch-title">Database Layer</div>
              <div className="arch-description">
                <p>Persistent storage using SQLite with Sequelize ORM</p>
                <ul className="arch-features">
                  <li>Users, Teams, and Activities data storage</li>
                  <li>Strengths catalog with categories</li>
                  <li>Workshop progress tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="auth-security">
            <h3>Authentication & Security</h3>
            <div className="security-grid">
              <div className="security-item">
                <div className="security-icon">🔐</div>
                <h4>GT SSO Integration</h4>
                <p>Secure login for Georgia Tech users</p>
              </div>
              
              <div className="security-item">
                <div className="security-icon">👤</div>
                <h4>Custom Accounts</h4>
                <p>Account creation for external workshop participants</p>
              </div>
              
              <div className="security-item">
                <div className="security-icon">🔒</div>
                <h4>Password Security</h4>
                <p>bcrypt hashing for secure credential storage</p>
              </div>
              
              <div className="security-item">
                <div className="security-icon">🎟️</div>
                <h4>JWT Authentication</h4>
                <p>Stateless authentication with secure tokens</p>
              </div>
              
              <div className="security-item">
                <div className="security-icon">🔄</div>
                <h4>HTTPS Encryption</h4>
                <p>Secure data transmission between client and server</p>
              </div>
              
              <div className="security-item">
                <div className="security-icon">🛡️</div>
                <h4>Data Protection</h4>
                <p>No plaintext storage of sensitive information</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UI Design Section */}
      <section id="ui" className="content-section ui-section">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>UI Design</h2>
            <p className="section-subtitle">User-centered design principles</p>
          </div>
          
          <div className="ui-principles">
            <div className="principle-item">
              <div className="principle-icon">✨</div>
              <h4>Aesthetic and Minimalist Design</h4>
              <p>Clean interfaces without superfluous information</p>
            </div>
            
            <div className="principle-item">
              <div className="principle-icon">🧠</div>
              <h4>Recognition Rather than Recall</h4>
              <p>Showing selected strengths and previous responses</p>
            </div>
            
            <div className="principle-item">
              <div className="principle-icon">🔄</div>
              <h4>User Control and Freedom</h4>
              <p>Options to reset selections and navigate easily</p>
            </div>
            
            <div className="principle-item">
              <div className="principle-icon">⚠️</div>
              <h4>Error Prevention</h4>
              <p>Clear guidelines and validation to prevent mistakes</p>
            </div>
            
            <div className="principle-item">
              <div className="principle-icon">📱</div>
              <h4>Visibility of System Status</h4>
              <p>Clear indication of current state and progress</p>
            </div>
            
            <div className="principle-item">
              <div className="principle-icon">🌎</div>
              <h4>Real World Match</h4>
              <p>Intuitive language and familiar concepts</p>
            </div>
          </div>
          
          <div className="app-flow">
            <h3>Application Flow</h3>
            <div className="flow-steps">
              <div className="flow-step">
                <div className="flow-step-number">1</div>
                <div className="flow-content">
                  <h4>Authentication</h4>
                  <p>Login via GT SSO or custom account</p>
                </div>
              </div>
              
              <div className="flow-step">
                <div className="flow-step-number">2</div>
                <div className="flow-content">
                  <h4>Strength Selection</h4>
                  <p>First-time users select 5 strengths from predefined options</p>
                </div>
              </div>
              
              <div className="flow-step">
                <div className="flow-step-number">3</div>
                <div className="flow-content">
                  <h4>Dashboard Access</h4>
                  <p>View selected strengths and available activities</p>
                </div>
              </div>
              
              <div className="flow-step">
                <div className="flow-step-number">4</div>
                <div className="flow-content">
                  <h4>Team Management</h4>
                  <p>Create/join teams using team codes</p>
                </div>
              </div>
              
              <div className="flow-step">
                <div className="flow-step-number">5</div>
                <div className="flow-content">
                  <h4>Activity Completion</h4>
                  <p>Complete interactive workshop activities</p>
                </div>
              </div>
              
              <div className="flow-step">
                <div className="flow-step-number">6</div>
                <div className="flow-content">
                  <h4>Results Generation</h4>
                  <p>Get reports on completed activities</p>
                </div>
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
                <img src="/icons/expressjs.svg" alt="Express" />
              </div>
              <h4>Express</h4>
              <p>Web framework for building API endpoints</p>
            </div>
            
            <div className="tech-item">
              <div className="tech-icon">
                <img src="/icons/jwt.svg" alt="JWT" />
              </div>
              <h4>JWT</h4>
              <p>Token-based authentication for secure sessions</p>
            </div>
          </div>

          <div className="data-design">
            <h3>Database Design</h3>
            <div className="entity-grid">
              <div className="entity-card">
                <h4>Users</h4>
                <p>User credentials and profile information</p>
              </div>
              <div className="entity-card">
                <h4>Teams</h4>
                <p>Groups users can join via team codes</p>
              </div>
              <div className="entity-card">
                <h4>UserActivities</h4>
                <p>Completed activities and their results</p>
              </div>
              <div className="entity-card">
                <h4>Strengths</h4>
                <p>Strengths with categories and colors</p>
              </div>
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
                  <p>Interactive strength assessment process with 5 key strengths selection from predefined categories</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h3>Team Management</h3>
                  <p>Create and join teams with secure team codes and view all team members' strengths</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">04</div>
                <div className="feature-content">
                  <h3>Interactive Activities</h3>
                  <p>Digital workshop modules with guided instructions and intuitive user interfaces</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">05</div>
                <div className="feature-content">
                  <h3>PDF Report Generation</h3>
                  <p>Export completed activities as professional PDF reports for sharing and reference</p>
                </div>
              </div>
            </div>
          </div>

          <div className="design-benefits">
            <h3>Design Benefits</h3>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">🌐</div>
                <h4>Remote Accessibility</h4>
                <p>Improved workshop access for distributed teams</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⏱️</div>
                <h4>Time Savings</h4>
                <p>Reduced preparation time for facilitators</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🔄</div>
                <h4>Workshop Flexibility</h4>
                <p>Custom scheduling and activity sequencing</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🔍</div>
                <h4>Experience Consistency</h4>
                <p>Standardized workshop delivery</p>
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
            <p>Repository: <a href="https://github.com/ameerahmourad/JIA-4315-ETD-App" target="_blank" rel="noopener noreferrer">github.com/ameerahmourad/JIA-4315-ETD-App</a></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="project-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://github.com/ameerahmourad/JIA-4315-ETD-App" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#contact';
                window.scrollTo(0, 0);
              }}
            >
              Contact Team
            </a>
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