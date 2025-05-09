import React, { useEffect, useState } from 'react';
import './FlightDelayedPrediction.css'; // We'll create this file next

const FlightDelayedPrediction = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="fdp-container">
      {/* Hero Section with flight animation */}
      <div className="fdp-hero">
        <div className="flight-animation">
          <div className="plane"></div>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
        </div>
        
        <div 
          className="fdp-hero-bg"
          style={{
            transform: `translateY(${scrollPosition * 0.2}px)`,
          }}
        />
        
        <div className="fdp-content-container">
          <div className="fdp-hero-content">
            <div className="fdp-badge">Chrome Extension • ML • Data Extraction</div>
            <h1 className="fdp-title">Flight Delayed Prediction</h1>
            <p className="fdp-description">
              Predict flight delays with precision using our powerful Chrome extension powered by machine learning
            </p>
            <div className="fdp-button-container">
              <a 
                href="https://github.com/your-username/flight-delayed-prediction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fdp-primary-button"
              >
                View on GitHub
              </a>
              <button className="fdp-secondary-button">
                Live Demo
              </button>
            </div>
          </div>
        </div>
        
        <div className="fdp-scroll-indicator">
          <p className="fdp-scroll-text">Scroll to explore</p>
          <div className="fdp-scroll-line"></div>
        </div>
      </div>
      
      {/* Overview Section */}
      <div className="fdp-section fdp-section-blue">
        <div className="fdp-content-container">
          <div className="fdp-section-grid">
            <div className="fdp-section-text">
              <h2 className="fdp-section-title">Project Overview</h2>
              <p className="fdp-paragraph">
                The Flight Delayed Prediction extension empowers travelers with predictive insights about potential 
                flight delays before they even occur. Using advanced machine learning algorithms and real-time data 
                extraction, our Chrome extension analyzes patterns across airlines and airports to provide accurate 
                delay predictions.
              </p>
              <p className="fdp-paragraph">
                Developed between August 2024 and May 2025, this tool integrates seamlessly with flight provider 
                websites, automatically extracting and analyzing flight data to help users make informed travel decisions.
              </p>
            </div>
            <div className="fdp-metrics">
              <div className="fdp-metric">
                <span className="fdp-metric-value">85%</span>
                <span className="fdp-metric-label">Prediction Accuracy</span>
              </div>
              <div className="fdp-metric">
                <span className="fdp-metric-value">1000+</span>
                <span className="fdp-metric-label">Active Users</span>
              </div>
              <div className="fdp-metric">
                <span className="fdp-metric-value">50+</span>
                <span className="fdp-metric-label">Supported Airlines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Features */}
      <div className="fdp-section fdp-section-dark">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Key Features</h2>
          
          <div className="fdp-features">
            <div className="fdp-feature-card">
              <div className="fdp-feature-icon">🔒</div>
              <h3 className="fdp-feature-title">Secure Authentication</h3>
              <p className="fdp-feature-text">
                Implemented Google OAuth and Firebase for secure user authentication and data storage, ensuring user 
                privacy and data protection.
              </p>
            </div>
            
            <div className="fdp-feature-card">
              <div className="fdp-feature-icon">🔄</div>
              <h3 className="fdp-feature-title">Data Extraction</h3>
              <p className="fdp-feature-text">
                Built robust data extraction pipelines that seamlessly capture flight information from provider websites 
                for real-time processing.
              </p>
            </div>
            
            <div className="fdp-feature-card">
              <div className="fdp-feature-icon">🧠</div>
              <h3 className="fdp-feature-title">ML Integration</h3>
              <p className="fdp-feature-text">
                Coordinated with ML teams to integrate prediction models with frontend components, creating a seamless 
                data flow between systems.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech Stack */}
      <div className="fdp-section fdp-section-light">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Technology Stack</h2>
          
          <div className="fdp-tech-stack">
            <div className="fdp-tech-category">
              <h3 className="fdp-category-title">Frontend</h3>
              <div className="fdp-tech-grid">
                <div className="fdp-tech-item">React</div>
                <div className="fdp-tech-item">Tailwind CSS</div>
                <div className="fdp-tech-item">Chrome API</div>
                <div className="fdp-tech-item">JavaScript</div>
              </div>
            </div>
            
            <div className="fdp-tech-category">
              <h3 className="fdp-category-title">Backend</h3>
              <div className="fdp-tech-grid">
                <div className="fdp-tech-item">Node.js</div>
                <div className="fdp-tech-item">Firebase</div>
                <div className="fdp-tech-item">Google Cloud Functions</div>
                <div className="fdp-tech-item">RESTful APIs</div>
              </div>
            </div>
            
            <div className="fdp-tech-category">
              <h3 className="fdp-category-title">Machine Learning</h3>
              <div className="fdp-tech-grid">
                <div className="fdp-tech-item">TensorFlow</div>
                <div className="fdp-tech-item">Python</div>
                <div className="fdp-tech-item">Scikit-learn</div>
                <div className="fdp-tech-item">Data Preprocessing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Future Development */}
      <div className="fdp-section fdp-section-gradient">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Future Developments</h2>
          
          <div className="fdp-roadmap">
            <div className="fdp-roadmap-item">
              <div className="fdp-roadmap-marker">1</div>
              <div className="fdp-roadmap-content">
                <h3 className="fdp-roadmap-title">Enhanced Prediction Algorithms</h3>
                <p className="fdp-roadmap-text">
                  Implementing more advanced ML models to further improve prediction accuracy and account for 
                  additional factors like weather patterns and seasonal trends.
                </p>
              </div>
            </div>
            
            <div className="fdp-roadmap-item">
              <div className="fdp-roadmap-marker">2</div>
              <div className="fdp-roadmap-content">
                <h3 className="fdp-roadmap-title">Mobile Application</h3>
                <p className="fdp-roadmap-text">
                  Developing a companion mobile app to provide on-the-go flight delay predictions with push notifications 
                  and real-time updates.
                </p>
              </div>
            </div>
            
            <div className="fdp-roadmap-item">
              <div className="fdp-roadmap-marker">3</div>
              <div className="fdp-roadmap-content">
                <h3 className="fdp-roadmap-title">Alternative Transportation Suggestions</h3>
                <p className="fdp-roadmap-text">
                  Adding features to suggest alternative transportation options when delays are predicted, 
                  including ride-sharing services and train connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="fdp-cta-section">
        <div className="fdp-content-container">
          <h2 className="fdp-cta-title">Ready to try it out?</h2>
          <p className="fdp-cta-text">Install our Chrome extension and start predicting flight delays today.</p>
          <a 
            href="#" 
            className="fdp-primary-button fdp-cta-button"
          >
            Install Extension
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlightDelayedPrediction;