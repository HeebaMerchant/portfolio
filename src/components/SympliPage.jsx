import React, { useEffect, useState } from 'react';
import './SympliPage.css';  // Import the custom CSS

const SympliPage = () => {
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
    <div className="sympli-container">
      {/* Hero Section */}
      <div className="sympli-hero">
        <div 
          className="sympli-hero-bg"
          style={{
            backgroundImage: "url('/project-healthcare.jpg')",
            transform: `translateY(${scrollPosition * 0.2}px)`,
          }}
        />
        
        <div className="content-container">
          <div className="hero-content">
            <div className="category-tag">Healthcare • GenAI • 3rd Place at Hacklytics 2025</div>
            <h1 className="hero-title">Sympli</h1>
            <p className="hero-description">
              Revolutionizing chronic illness symptom tracking for more effective healthcare management and improved patient outcomes
            </p>
            <div className="button-container">
              <a 
                href="https://sympli-health.web.app/landing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="primary-button"
              >
                Visit Website →
              </a>
              <button className="secondary-button">
                View Code →
              </button>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <p className="scroll-text">Scroll to explore</p>
          <div className="scroll-line"></div>
        </div>
      </div>
      
      {/* Problem & Inspiration Section */}
      <div className="section section-gradient">
        <div className="content-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="section-title">The Problem & Inspiration</h2>
            <p className="section-text">
              In the current healthcare landscape, 60% of Americans are diagnosed with at least one chronic condition, 
              resulting in socioeconomic impacts and costing $4.1 trillion in healthcare expenditures annually. 
              Traditional reporting of symptoms are fragmented and delayed, hindering the impact that timely reporting 
              could have on patient diagnosis and treatment.
            </p>
            
            {/* Features grid */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-container">
                  <span className="feature-icon">📊</span>
                </div>
                <h3 className="feature-title">Real-time Monitoring</h3>
                <p className="feature-text">
                  Continuous tracking of patient symptoms allows for timely interventions and better healthcare outcomes.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-container">
                  <span className="feature-icon">🧠</span>
                </div>
                <h3 className="feature-title">AI-Powered Insights</h3>
                <p className="feature-text">
                  Leveraging Gemini 2.0 to collect detailed patient symptomatology through natural conversation.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-container">
                  <span className="feature-icon">📈</span>
                </div>
                <h3 className="feature-title">Visual Analysis</h3>
                <p className="feature-text">
                  Comprehensive visuals for tracking symptom patterns and clusters over extended periods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech Stack Section - Only keep essential sections to simplify */}
      <div className="section section-dark">
        <div className="content-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="section-title">How We Built It</h2>
            <p className="section-text">
              We developed Sympli using a modern web development stack centered around React and TypeScript for robust type safety 
              and improved development experience. The frontend interface was crafted using Tailwind CSS for styling and 
              Shadcn/UI components, creating a clean and responsive design.
            </p>
            
            {/* Tech stack grid */}
            <div className="tech-grid">
              {['Firebase', 'Firestore', 'Gemini', 'Google Cloud', 'React', 'TypeScript', 'Tailwind', 'Shadcn/UI'].map((tech) => (
                <div key={tech} className="tech-item">
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action footer */}
      <div className="cta-section">
        <div className="content-container">
          <h2 className="cta-title">Interested in working together?</h2>
          <a 
            href="#contact" 
            className="primary-button"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
};

export default SympliPage;