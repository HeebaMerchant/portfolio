import React, { useEffect, useState } from 'react';
import './AtlantaFoodFinder.css';

const AtlantaFoodFinder = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="aff-container">
      {/* Navigation */}
      <nav className={`aff-nav ${scrollY > 100 ? 'scrolled' : ''}`}>
        <div className="nav-wrapper">
          <div className="nav-logo">
            <span className="logo-icon">🍕</span>
            <span className="logo-text">Atlanta Food Finder</span>
          </div>
          <div className="nav-menu">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#tech" className="nav-link">Tech</a>
            <a href="#team" className="nav-link">Team</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="animated-bg">
          <div className="food-icon icon-1">🍔</div>
          <div className="food-icon icon-2">🍕</div>
          <div className="food-icon icon-3">🍜</div>
          <div className="food-icon icon-4">🌮</div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 Live in Atlanta</span>
          </div>
          <h1 className="hero-title">
            Find Your Next
            <span className="title-gradient"> Favorite Dish</span>
          </h1>
          <p className="hero-description">
            Discover Atlanta's best restaurants with smart filtering, real user reviews, 
            and location-based search. Your culinary adventure starts here.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary">
              <span>Launch App</span>
            </button>
            <button className="btn-secondary">
              View Demo
            </button>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Restaurants</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Cuisines</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5km</div>
              <div className="stat-label">Radius</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.5</div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-description">
              Powerful features to help you discover Atlanta's culinary scene
            </p>
          </div>
          
          <div className="features-grid">
            <div 
              className={`feature-card ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Advanced filtering by cuisine, price, and dietary restrictions</p>
            </div>
            
            <div 
              className={`feature-card ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              <div className="feature-icon">🗺️</div>
              <h3>Live Map</h3>
              <p>Real-time restaurant locations with Google Maps integration</p>
            </div>
            
            <div 
              className={`feature-card ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <div className="feature-icon">⭐</div>
              <h3>User Reviews</h3>
              <p>Authentic feedback from Google Reviews</p>
            </div>
            
            <div 
              className={`feature-card ${activeTab === 'distance' ? 'active' : ''}`}
              onClick={() => setActiveTab('distance')}
            >
              <div className="feature-icon">📍</div>
              <h3>Distance Filter</h3>
              <p>Find restaurants within your preferred radius</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section" id="tech">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Technology</span>
            <h2 className="section-title">Built with Modern Stack</h2>
          </div>
          
          <div className="tech-columns">
            <div className="tech-column">
              <h3 className="column-title">Frontend</h3>
              <div className="tech-list">
                <div className="tech-item">
                  <span>HTML5</span>
                  <div className="tech-bar">
                    <div className="tech-progress" style={{width: '95%'}}></div>
                  </div>
                </div>
                <div className="tech-item">
                  <span>CSS3</span>
                  <div className="tech-bar">
                    <div className="tech-progress" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="tech-item">
                  <span>JavaScript</span>
                  <div className="tech-bar">
                    <div className="tech-progress" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tech-column">
              <h3 className="column-title">Backend</h3>
              <div className="tech-list">
                <div className="tech-item">
                  <span>Python</span>
                  <div className="tech-bar">
                    <div className="tech-progress" style={{width: '88%'}}></div>
                  </div>
                </div>
                <div className="tech-item">
                  <span>Django</span>
                  <div className="tech-bar">
                    <div className="tech-progress" style={{width: '82%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tech-column">
              <h3 className="column-title">APIs</h3>
              <div className="tech-list">
                <div className="tech-item">
                  <span>Google Maps</span>
                  <div className="tech-bar">
                    <div className="tech-progress" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="tech-item">
                  <span>Google Reviews</span>
                  <div className="tech-bar">
                    <div className="tech-progress" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" id="team">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Team</span>
            <h2 className="section-title">Meet the Creators</h2>
          </div>
          
          <div className="team-grid">
            <div className="team-card highlight">
              <div className="member-emoji">👩‍💻</div>
              <h4>Heeba Merchant</h4>
              <p>Frontend Developer</p>
            </div>
            <div className="team-card">
              <div className="member-emoji">👨‍💻</div>
              <h4>Andrew Lu</h4>
              <p>Backend Developer</p>
            </div>
            <div className="team-card">
              <div className="member-emoji">🎨</div>
              <h4>Arnav Gupta</h4>
              <p>UI/UX Designer</p>
            </div>
            <div className="team-card">
              <div className="member-emoji">💻</div>
              <h4>Sophia Wang</h4>
              <p>Full Stack Developer</p>
            </div>
            <div className="team-card">
              <div className="member-emoji">📋</div>
              <h4>Tevin Otiato</h4>
              <p>Project Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Journey</span>
            <h2 className="section-title">Project Timeline</h2>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>May 2024</h4>
                <p>Project Kickoff & Planning</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>June 2024</h4>
                <p>Development & API Integration</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>July 2024</h4>
                <p>Testing & Deployment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>🍴</span>
            <span>Atlanta Food Finder</span>
          </div>
          <div className="footer-links">
            <a href="https://sites.google.com/view/group4teamwebsite">Website</a>
            <a href="#">GitHub</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-year">© 2024</div>
        </div>
      </footer>
    </div>
  );
};

export default AtlantaFoodFinder;