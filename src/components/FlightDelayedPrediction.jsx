import React, { useEffect, useState } from 'react';
import './FlightDelayedPrediction.css'; // We'll create this file next
import BackButton from './BackButton';
import ProjectNavBar from './ProjectNavBar';

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

  // Define navigation links for this project
  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'approach', label: 'Approach' },
    { id: 'features', label: 'Features' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'future', label: 'Future Plans' }
  ];
  
  return (
    <div className="fdp-container">
      <BackButton />
      
      {/* Navigation Bar */}
      <ProjectNavBar 
        title="Flight Delayed Prediction"
        links={navLinks}
        theme="fdp"
      />
      
      {/* Hero Section with flight animation */}
      <div className="fdp-hero" id="hero">
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
              Sky High Predictions Grounded in Data
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
              {/* <button className="fdp-secondary-button">
                Try Extension
              </button> */}
            </div>
          </div>
        </div>
        
        <div className="fdp-scroll-indicator">
          <p className="fdp-scroll-text">Scroll to explore</p>
          <div className="fdp-scroll-line"></div>
        </div>
      </div>
      
      {/* Problem Section */}
      <div className="fdp-section fdp-section-blue" id="problem">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">The Problem</h2>
          <div className="fdp-section-grid">
            <div className="fdp-section-text">
              <p className="fdp-paragraph">
                Flight delays are a significant and persistent issue in air travel, affecting millions of passengers annually. Our research revealed that approximately 20% of all flights are delayed according to the Bureau of Transportation, with an average delay length of 53 minutes in 2023.
              </p>
              <p className="fdp-paragraph">
                In 2017 alone, approximately 740 million passengers traveled across 8 million flights (averaging 91 passengers per flight). The economic impact is staggering: an estimated 3 million work hours are lost annually due to these delays, equivalent to 342 work years of productivity.
              </p>
              <p className="fdp-paragraph">
                The lack of accurate prediction tools means travelers have limited ability to plan for these disruptions, resulting in missed connections, wasted time, and significant economic costs.
              </p>
            </div>
            <div className="fdp-metrics">
              <div className="fdp-metric">
                <span className="fdp-metric-value">20%</span>
                <span className="fdp-metric-label">Of Flights Delayed</span>
              </div>
              <div className="fdp-metric">
                <span className="fdp-metric-value">53</span>
                <span className="fdp-metric-label">Minutes Avg. Delay</span>
              </div>
              <div className="fdp-metric">
                <span className="fdp-metric-value">3M</span>
                <span className="fdp-metric-label">Work Hours Lost Annually</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div className="fdp-section fdp-section-light" id="approach">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Our Approach</h2>
          
          <div className="fdp-team-structure">
            <h3 className="fdp-subsection-title">Team Structure</h3>
            <div className="fdp-team-grid">
              <div className="fdp-team-card">
                <h4 className="fdp-team-name">Analysis Team</h4>
                <p className="fdp-team-description">
                  Focused on data processing, model selection, and algorithm optimization.
                </p>
                <div className="fdp-team-members">Andrew R., Parth P., Sarvesh T., Aayush P., Samiya P., Adithya R.</div>
              </div>
              <div className="fdp-team-card">
                <h4 className="fdp-team-name">Platform Team</h4>
                <p className="fdp-team-description">
                  Developed the Chrome extension, user interface, and backend infrastructure.
                </p>
                <div className="fdp-team-members">Pranav E., Heeba M., Ian W., Varenya A., Joie Y.</div>
              </div>
              <div className="fdp-team-card">
                <h4 className="fdp-team-name">Data Visualization Team</h4>
                <p className="fdp-team-description">
                  Created intuitive visualizations and user-friendly interfaces.
                </p>
                <div className="fdp-team-members">Jinseok H., Kate J., Riyan P.</div>
              </div>
            </div>
          </div>
          
          <div className="fdp-ml-approach">
            <h3 className="fdp-subsection-title">Machine Learning Model</h3>
            <div className="fdp-approach-grid">
              <div className="fdp-approach-card">
                <h4 className="fdp-approach-title">Data Source</h4>
                <p className="fdp-approach-text">
                  Flight data from 2023-2024 including schedules and delay times, enriched with comprehensive weather data.
                </p>
              </div>
              <div className="fdp-approach-card">
                <h4 className="fdp-approach-title">Model Type</h4>
                <p className="fdp-approach-text">
                  Random Forest with 50 estimators, selected after testing multiple models including XGBoost, LSTM, MLP, and Voting Classifiers.
                </p>
              </div>
              <div className="fdp-approach-card">
                <h4 className="fdp-approach-title">Prediction Categories</h4>
                <p className="fdp-approach-text">
                  On time, 0-30 minutes delay, 30-60 minutes delay, 60+ minutes delay, with color-coded indicators.
                </p>
              </div>
              <div className="fdp-approach-card">
                <h4 className="fdp-approach-title">Current Accuracy</h4>
                <p className="fdp-approach-text">
                  70% accuracy, representing a 6% improvement from the previous semester's implementation.
                </p>
              </div>
            </div>
            
            <div className="fdp-features-importance">
              <h4 className="fdp-features-title">Key Prediction Features</h4>
              <div className="fdp-features-list">
                <div className="fdp-feature-item">
                  <div className="fdp-feature-rank">1</div>
                  <div className="fdp-feature-name">Departure time</div>
                </div>
                <div className="fdp-feature-item">
                  <div className="fdp-feature-rank">2</div>
                  <div className="fdp-feature-name">Destination</div>
                </div>
                <div className="fdp-feature-item">
                  <div className="fdp-feature-rank">3</div>
                  <div className="fdp-feature-name">Distance</div>
                </div>
                <div className="fdp-feature-item">
                  <div className="fdp-feature-rank">4</div>
                  <div className="fdp-feature-name">Arrival time</div>
                </div>
                <div className="fdp-feature-item">
                  <div className="fdp-feature-rank">5</div>
                  <div className="fdp-feature-name">Temperature at 2m</div>
                </div>
                <div className="fdp-feature-item">
                  <div className="fdp-feature-rank">6</div>
                  <div className="fdp-feature-name">Carrier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Features */}
      <div className="fdp-section fdp-section-dark" id="features">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Key Features</h2>
          
          <div className="fdp-features">
            <div className="fdp-feature-card">
              <div className="fdp-feature-icon">🔒</div>
              <h3 className="fdp-feature-title">Secure Authentication</h3>
              <p className="fdp-feature-text">
                Google OAuth integration with Firebase Authentication for secure user sign-in/sign-out, protecting user data and flight information.
              </p>
            </div>
            
            <div className="fdp-feature-card">
              <div className="fdp-feature-icon">🔄</div>
              <h3 className="fdp-feature-title">Smart Web Scraping</h3>
              <p className="fdp-feature-text">
                Automatically extracts flight data from Google Flights, verifies flight existence, and pulls details like airline, times, and price.
              </p>
            </div>
            
            <div className="fdp-feature-card">
              <div className="fdp-feature-icon">🧠</div>
              <h3 className="fdp-feature-title">ML-Powered Predictions</h3>
              <p className="fdp-feature-text">
                Random Forest model analyzes over 8 critical factors to predict flight delays with 70% accuracy, categorized into delay-time ranges.
              </p>
            </div>
            
            <div className="fdp-feature-card">
              <div className="fdp-feature-icon">🔔</div>
              <h3 className="fdp-feature-title">Personalized Notifications</h3>
              <p className="fdp-feature-text">
                Customizable alert system with toggles for each flight and adjustable notification frequency to keep users informed.
              </p>
            </div>
          </div>
          
          <div className="fdp-ui-features">
            <h3 className="fdp-subsection-title">User Interface</h3>
            <div className="fdp-ui-grid">
              <div className="fdp-ui-card">
                <h4 className="fdp-ui-title">Google-like Interface</h4>
                <p className="fdp-ui-text">
                  Clean, intuitive design that complements Google Flights for a seamless user experience.
                </p>
              </div>
              <div className="fdp-ui-card">
                <h4 className="fdp-ui-title">Saved Flights Dashboard</h4>
                <p className="fdp-ui-text">
                  Centralized view of all saved flights with delay predictions and color-coded status indicators.
                </p>
              </div>
              <div className="fdp-ui-card">
                <h4 className="fdp-ui-title">Manual Flight Addition</h4>
                <p className="fdp-ui-text">
                  Add flights manually with automatic verification against Google Flights database.
                </p>
              </div>
              <div className="fdp-ui-card">
                <h4 className="fdp-ui-title">Profile Management</h4>
                <p className="fdp-ui-text">
                  User-specific settings and preferences for a personalized experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech Stack */}
      <div className="fdp-section fdp-section-light" id="tech">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Technology Stack</h2>
          
          <div className="fdp-tech-stack">
            <div className="fdp-tech-category">
              <h3 className="fdp-category-title">Frontend</h3>
              <div className="fdp-tech-grid">
                <div className="fdp-tech-item">React</div>
                <div className="fdp-tech-item">TailwindCSS</div>
                <div className="fdp-tech-item">Chrome Extension API</div>
                <div className="fdp-tech-item">JavaScript</div>
              </div>
            </div>
            
            <div className="fdp-tech-category">
              <h3 className="fdp-category-title">Backend</h3>
              <div className="fdp-tech-grid">
                <div className="fdp-tech-item">Firebase Authentication</div>
                <div className="fdp-tech-item">Firestore</div>
                <div className="fdp-tech-item">Flask REST API</div>
                <div className="fdp-tech-item">Docker</div>
                <div className="fdp-tech-item">Google Cloud Run</div>
              </div>
            </div>
            
            <div className="fdp-tech-category">
              <h3 className="fdp-category-title">Machine Learning</h3>
              <div className="fdp-tech-grid">
                <div className="fdp-tech-item">Random Forest</div>
                <div className="fdp-tech-item">Python</div>
                <div className="fdp-tech-item">Scikit-learn</div>
                <div className="fdp-tech-item">Label Encoding</div>
                <div className="fdp-tech-item">XGBoost</div>
                <div className="fdp-tech-item">Feature Importance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Challenges Section */}
      <div className="fdp-section fdp-section-blue" id="challenges">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Challenges We Overcame</h2>
          
          <div className="fdp-challenges-grid">
            <div className="fdp-challenge-card">
              <div className="fdp-challenge-icon">💾</div>
              <h3 className="fdp-challenge-title">RAM Management</h3>
              <p className="fdp-challenge-text">
                Optimized processing for datasets exceeding 60 million rows, implementing efficient data handling techniques.
              </p>
            </div>
            
            <div className="fdp-challenge-card">
              <div className="fdp-challenge-icon">🌦️</div>
              <h3 className="fdp-challenge-title">API Limitations</h3>
              <p className="fdp-challenge-text">
                Managed over 100,000 API calls for weather data collection, developing caching and batching strategies.
              </p>
            </div>
            
            <div className="fdp-challenge-card">
              <div className="fdp-challenge-icon">⚖️</div>
              <h3 className="fdp-challenge-title">Data Imbalance</h3>
              <p className="fdp-challenge-text">
                Addressed skewed data distribution through rebalancing techniques, significantly improving model accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Future Development */}
      <div className="fdp-section fdp-section-gradient" id="future">
        <div className="fdp-content-container">
          <h2 className="fdp-section-title">Future Developments</h2>
          
          <div className="fdp-timeline">
            <h3 className="fdp-subsection-title">Spring 2025 Timeline</h3>
            <div className="fdp-timeline-phases">
              <div className="fdp-timeline-phase">
                <h4 className="fdp-phase-title">First Half</h4>
                <ul className="fdp-phase-list">
                  <li>Model improvements (testing RNN)</li>
                  <li>Connect model to Chrome Extension</li>
                  <li>Implement email alerts</li>
                </ul>
              </div>
              <div className="fdp-timeline-phase">
                <h4 className="fdp-phase-title">Second Half</h4>
                <ul className="fdp-phase-list">
                  <li>Publication to Chrome Web Store</li>
                  <li>User feedback collection</li>
                  <li>Performance optimization</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="fdp-roadmap">
            <h3 className="fdp-subsection-title">Development Roadmap</h3>
            
            <div className="fdp-roadmap-item">
              <div className="fdp-roadmap-marker">1</div>
              <div className="fdp-roadmap-content">
                <h3 className="fdp-roadmap-title">Analysis Improvements</h3>
                <p className="fdp-roadmap-text">
                  Testing stronger models (RNN), removing less important weather columns to improve accuracy, and hosting the model on Vertex AI for streamlined prediction processing.
                </p>
              </div>
            </div>
            
            <div className="fdp-roadmap-item">
              <div className="fdp-roadmap-marker">2</div>
              <div className="fdp-roadmap-content">
                <h3 className="fdp-roadmap-title">Platform Enhancements</h3>
                <p className="fdp-roadmap-text">
                  Adding email alerts for flight delay notifications, connecting the model with Google scraping for real-time predictions, and fixing bugs before publication.
                </p>
              </div>
            </div>
            
            <div className="fdp-roadmap-item">
              <div className="fdp-roadmap-marker">3</div>
              <div className="fdp-roadmap-content">
                <h3 className="fdp-roadmap-title">User Experience Improvements</h3>
                <p className="fdp-roadmap-text">
                  Polishing the frontend design, adding dark mode, integrating with calendars (Google/Outlook), and adding data insights visualization with interactive charts and graphs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="fdp-cta-section">
        <div className="fdp-content-container">
          <h2 className="fdp-cta-title">Ready to make more informed travel decisions?</h2>
          <p className="fdp-cta-text">Join our beta testing program and help shape the future of flight delay prediction.</p>
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#contact';
              window.scrollTo(0, 0);
            }}
            className="fdp-primary-button fdp-cta-button"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlightDelayedPrediction;