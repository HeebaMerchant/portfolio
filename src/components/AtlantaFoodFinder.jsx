import React, { useEffect, useState } from 'react';
import './AtlantaFoodFinder.css';
import BackButton from './BackButton';
import ProjectNavBar from './ProjectNavBar';

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

  // Define navigation links for this project
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'flow', label: 'User Flow' }
  ];

  // User flow steps data
  const userflowSteps = [
    {
      title: 'User Authentication',
      desc: 'Register or log in to access personalized features like saving favorites and leaving reviews. Secure authentication and password reset included.',
      img: '/ATL Food Finder/login.png',
    },
    {
      title: 'Home',
      desc: 'Home page with search interface and navigation to other pages',
      img: '/ATL Food Finder/home.gif',
    },
    {
      title: 'Restaurant Search',
      desc: 'Search for restaurants by name, address, cuisine, or rating. Use advanced filters to find exactly what you are craving.',
      img: '/ATL Food Finder/search.png',
    },
    {
      title: 'Geolocation & Map',
      desc: 'View search results on an interactive map. Click pins to see details and get directions to restaurants across Atlanta.',
      img: '/ATL Food Finder/map.png',
    },
    {
      title: 'Restaurant Details',
      desc: 'See detailed info: address, contact, cuisine, ratings, and reviews. Decide where to eat with confidence.',
      img: '/ATL Food Finder/detail.png',
    },
    {
      title: 'User Reviews',
      desc: 'Read and leave reviews for restaurants you have visited. See up-to-date ratings and help others make informed choices.',
      img: '/ATL Food Finder/review.png',
    },
    {
      title: 'Favorites',
      desc: 'Add restaurants to your favorites for quick access. Curate your own list of go-to spots in Atlanta.',
      img: '/ATL Food Finder/favorite.png',
    }
  ];

  return (
    <div className="aff-container">
      <BackButton />
      
      {/* Navigation */}
      <ProjectNavBar 
        title="Atlanta Food Finder"
        links={navLinks}
        theme="aff"
      />

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
            {/* <button className="btn-primary">
              <span>Launch App</span>
            </button> */}
            <button className="btn-primary" onClick={() => document.getElementById('demo-video').scrollIntoView({ behavior: 'smooth' })}>
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

      {/* User Flow - Card Grid */}
      <div className="section-header">
            {/* <span className="section-tag">Technology</span> */}
            <h2 className="section-title">User Flow: How It Works</h2>
      </div>
      <section className="userflow-grid-section dark-card" id="flow">
        {/* <h2 className="section-title">User Flow: How It Works</h2> */}
        <div className="userflow-grid">
          {userflowSteps.map((step, idx) => (
            <div className="userflow-card" key={step.title} style={{ animationDelay: `${0.1 + idx * 0.1}s` }}>
              <div className="userflow-img">
                <img src={step.img} alt={step.title} />
              </div>
              <div className="userflow-title">{step.title}</div>
              <div className="userflow-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="team-section" id="team">
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
      </section> */}

      {/* Demo Video Section */}
      <div className="section-header">
            {/* <span className="section-tag">Technology</span> */}
            <h2 className="section-title">Watch the Demo</h2>
      </div>
      <section className="demo-video-section" id="demo-video">
        <video src="/ATL Food Finder/ATLFoodFinderDemoVideo.mp4" controls style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }} />
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
          </div>
          <div className="footer-year">© 2024</div>
        </div>
      </footer>
    </div>
  );
};

export default AtlantaFoodFinder;