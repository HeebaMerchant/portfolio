import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';
import ProjectNavBar from './ProjectNavBar';
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

  // Define navigation links for this project
  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'accomplishments', label: 'Accomplishments' },
    { id: 'future', label: 'Future Plans' }
  ];
  
  return (
    <div className="sympli-container">
      {/* Back Button */}
      <BackButton />
      
      {/* Navigation Bar */}
      <ProjectNavBar 
        title="Sympli"
        links={navLinks}
        theme="sympli"
      />
      
      {/* Hero Section */}
      <div className="sympli-hero" id="overview">
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
      <div className="section section-gradient" id="problem">
        <div className="content-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="section-title">The Problem & Inspiration</h2>
            <p className="section-text">
              The inception of Sympli stemmed from a pivotal conversation with a medical professional who highlighted a critical gap in healthcare: the need for a real-time symptom reporting platform that physicians could use to track chronic illness progression over time.
            </p>
            
            <p className="section-text">
              Our research revealed alarming statistics: 60% of Americans live with at least one chronic condition, resulting in profound socioeconomic impacts and a staggering $4.1 trillion in annual healthcare expenditures. Traditional symptom reporting methods remain fragmented and delayed, significantly hindering the potential impact that timely reporting could have on accurate diagnosis and effective treatment plans.
            </p>
            
            <p className="section-text">
              This deficit in medical information flow creates a disconnect between patients' lived experiences and the data available to healthcare providers. Our goal became clear: develop a web application that could bridge this gap and transform the way chronic conditions are monitored and managed.
            </p>
            
            <div className="stats-container">
              <div className="stat-box">
                <div className="stat-number">60%</div>
                <div className="stat-text">of Americans diagnosed with at least one chronic condition</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">$4.1T</div>
                <div className="stat-text">Annual healthcare expenditures related to chronic conditions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Solution Section */}
      <div className="section section-dark" id="solution">
        <div className="content-container">
          <div style={{ maxWidth: "1500px", width: "100%" }}>
            <h2 className="section-title">Our Solution</h2>
            <p className="section-text">
              Sympli is a web-based application designed to transform patient symptom reporting and chronic disease management. Our platform harnesses the power of real-time data collection to create a comprehensive record of patient symptoms over time.
            </p>
            
            {/* Features grid */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-container">
                  <span className="feature-icon">📊</span>
                </div>
                <h3 className="feature-title">Real-time Monitoring</h3>
                <p className="feature-text">
                  Continuous tracking of patient symptoms allows for timely interventions and better healthcare outcomes. Patterns that might be missed in traditional reporting become evident through consistent data collection.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-container">
                  <span className="feature-icon">🧠</span>
                </div>
                <h3 className="feature-title">AI-Powered Insights</h3>
                <p className="feature-text">
                  Leveraging Gemini 2.0 AI, our platform prompts users with tailored questions to capture detailed symptomatology through natural conversation, making the reporting process more engaging and comprehensive.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-container">
                  <span className="feature-icon">📈</span>
                </div>
                <h3 className="feature-title">Visual Analysis</h3>
                <p className="feature-text">
                  Our platform generates comprehensive visualizations for tracking symptom patterns and clusters over extended periods, helping both patients and providers identify trends and correlations.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-container">
                  <span className="feature-icon">🔄</span>
                </div>
                <h3 className="feature-title">Seamless Integration</h3>
                <p className="feature-text">
                  Sympli integrates effortlessly with existing healthcare workflows, allowing practitioners to access patient data within their current systems and enabling more coordinated care between different healthcare providers.
                </p>
              </div>
            </div>
            
            <div className="solution-details">
              <h3 className="subsection-title">Key Components</h3>
              <p className="section-text">
                The medical data obtained through user interactions undergoes sophisticated text parsing and data cleaning processes. The result is a comprehensive visual representation that illustrates symptom patterns and clusters over an annual period, providing both users and practitioners with valuable insights into condition progression.
              </p>
              <p className="section-text">
                Our line graph visualization shows the correlation between months and symptom frequency, with each line representing a different reported symptom. This approach allows healthcare providers to quickly assess patient conditions and make more informed treatment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech Stack Section */}
      <div className="section section-light" id="tech">
        <div className="content-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="section-title">How We Built It</h2>
            <p className="section-text">
              We developed Sympli using a modern web development stack centered around React and TypeScript for robust type safety 
              and improved development experience. The frontend interface was crafted using Tailwind CSS for styling and 
              Shadcn/UI components, creating a clean and responsive design.
            </p>
            
            <div className="tech-breakdown">
              <div className="tech-category">
                <h3 className="tech-category-title">Frontend</h3>
                <ul className="tech-list">
                  <li>React for component-based UI development</li>
                  <li>TypeScript for type safety and improved developer experience</li>
                  <li>Tailwind CSS for responsive styling</li>
                  <li>Shadcn/UI components for consistent design language</li>
                  <li>Recharts for interactive data visualization</li>
                </ul>
              </div>
              
              <div className="tech-category">
                <h3 className="tech-category-title">Backend & Services</h3>
                <ul className="tech-list">
                  <li>Firebase Authentication for secure user management</li>
                  <li>Firestore for real-time data storage and retrieval</li>
                  <li>Google's Gemini 2.0 AI model for intelligent chat interactions</li>
                  <li>Protected routes to ensure data privacy</li>
                  <li>Real-time data processing for immediate visualization updates</li>
                </ul>
              </div>
            </div>
            
            {/* Tech stack grid */}
            <div className="tech-grid">
              {['Firebase', 'Firestore', 'Gemini', 'Google Cloud', 'React', 'TypeScript', 'Tailwind', 'Shadcn/UI', 'Recharts'].map((tech) => (
                <div key={tech} className="tech-item">
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Challenges Section */}
      <div className="section section-gradient" id="challenges">
        <div className="content-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="section-title">Challenges We Faced</h2>
            <p className="section-text">
              Building Sympli presented us with several significant challenges that required creative problem-solving and technical adaptability:
            </p>
            
            <div className="challenges-list">
              <div className="challenge-item">
                <h3 className="challenge-title">User Authentication Strategy</h3>
                <p className="challenge-text">
                  Initially, we planned to implement chatbot communication via SMS services, but encountered obstacles with phone number verification processes. We pivoted to Firebase authentication for our web application, which provided a more reliable method to verify user identities and accurately track symptom logs.
                </p>
              </div>
              
              <div className="challenge-item">
                <h3 className="challenge-title">Medical Data Visualization</h3>
                <p className="challenge-text">
                  Determining the most effective way to display symptom data to physicians was a complex challenge. After exploring several approaches, we settled on line graphs that clearly show the correlation between months and symptom frequency, with each line representing a distinct symptom reported by the user. This visualization enables quick assessment and easy interpretation for healthcare providers.
                </p>
              </div>
              
              <div className="challenge-item">
                <h3 className="challenge-title">AI Integration Complexity</h3>
                <p className="challenge-text">
                  Integrating Gemini 2.0 required careful prompt engineering to ensure the AI could collect clinically relevant information while maintaining a conversational tone that wouldn't intimidate users. We went through multiple iterations to find the right balance between medical precision and user-friendly interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Accomplishments Section */}
      <div className="section section-dark" id="accomplishments">
        <div className="content-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="section-title">What We're Proud Of</h2>
            <p className="section-text">
              Looking back at our Hacklytics 2025 journey, several achievements stand out that demonstrate our team's technical prowess and commitment to creating meaningful healthcare solutions:
            </p>
            
            <div className="accomplishments-grid">
              <div className="accomplishment-card">
                <div className="accomplishment-icon">🏆</div>
                <h3 className="accomplishment-title">3rd Place at Hacklytics 2025</h3>
                <p className="accomplishment-text">
                  Our solution was recognized among hundreds of projects, validating the clinical relevance and technical implementation of our approach.
                </p>
              </div>
              
              <div className="accomplishment-card">
                <div className="accomplishment-icon">🧩</div>
                <h3 className="accomplishment-title">Modular Architecture</h3>
                <p className="accomplishment-text">
                  We developed a robust, modular code structure that isolates features into self-contained components, accelerating the addition of new functionality and simplifying maintenance.
                </p>
              </div>
              
              <div className="accomplishment-card">
                <div className="accomplishment-icon">🔄</div>
                <h3 className="accomplishment-title">Seamless Integration</h3>
                <p className="accomplishment-text">
                  Successfully integrated multiple technologies (React, Firebase, Gemini AI) into a cohesive platform that functions reliably and processes medical data accurately.
                </p>
              </div>
              
              <div className="accomplishment-card">
                <div className="accomplishment-icon">🔍</div>
                <h3 className="accomplishment-title">Real Medical Impact</h3>
                <p className="accomplishment-text">
                  Created a solution that addresses a genuine gap in healthcare by providing physicians with accurate, timely data on patient symptom progression.
                </p>
              </div>
            </div>
            
            <p className="section-text highlight-text">
              Above all, we're proud of developing a product that helps bridge a critical gap in medicine by providing a resource that physicians can use to access accurate patient health data over extended time periods.
            </p>
          </div>
        </div>
      </div>
      
      {/* Future Plans Section */}
      <div className="section section-light" id="future">
        <div className="content-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="section-title">What's Next for Sympli</h2>
            <p className="section-text">
              Our vision for Sympli extends far beyond its current implementation. We're excited to continue developing the platform with these key enhancements:
            </p>
            
            <div className="roadmap">
              <div className="roadmap-item">
                <div className="roadmap-marker">1</div>
                <div className="roadmap-content">
                  <h3 className="roadmap-title">Enhanced Medical Documentation</h3>
                  <p className="roadmap-text">
                    Implementing in-depth documentation of patient medical records from AI conversations, providing medical providers with more robust datasets to assess symptomatology over time.
                  </p>
                </div>
              </div>
              
              <div className="roadmap-item">
                <div className="roadmap-marker">2</div>
                <div className="roadmap-content">
                  <h3 className="roadmap-title">HIPAA Compliance</h3>
                  <p className="roadmap-text">
                    Incorporating comprehensive HIPAA compliance measures to ensure patient medical records are protected at the highest level and adhere to all regulatory requirements.
                  </p>
                </div>
              </div>
              
              <div className="roadmap-item">
                <div className="roadmap-marker">3</div>
                <div className="roadmap-content">
                  <h3 className="roadmap-title">Advanced Visualization Tools</h3>
                  <p className="roadmap-text">
                    Adding sophisticated visual tools that identify correlations between patient symptomatology and environmental factors, making it easier for providers to spot patterns and potential triggers.
                  </p>
                </div>
              </div>
              
              <div className="roadmap-item">
                <div className="roadmap-marker">4</div>
                <div className="roadmap-content">
                  <h3 className="roadmap-title">Provider Dashboard</h3>
                  <p className="roadmap-text">
                    Developing a specialized interface for healthcare providers to monitor multiple patients, compare data, and identify trends across patient populations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action footer */}
      <div className="cta-section">
        <div className="content-container">
          <h2 className="cta-title">Interested in working together?</h2>
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#contact';
              window.scrollTo(0, 0);
            }}
            className="primary-button cta-button"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
};

export default SympliPage;

