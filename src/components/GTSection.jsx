import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Code, Cpu, GraduationCap, BookOpen } from 'lucide-react';
import './GTSection.css';

const GTSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    window.addEventListener('scroll', handleScroll);
    
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const heroScale = 1 + scrollY * 0.0005;

  return (
    <section id="georgia-tech" className="gt-section">
      {/* Hero Section */}
      <div 
        className="gt-hero"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${heroScale})`,
          opacity: heroOpacity
        }}
      >
        <div className="gt-gradient-overlay" />
        
        {/* Animated background */}
        <div className="gt-animated-bg">
          <div className="gt-bg-layer-1" />
          <div 
            className="gt-bg-layer-2" 
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
        </div>

        {/* Content */}
        <div 
          className="gt-hero-content"
          style={{
            transform: `translateY(${scrollY * -0.3}px)`,
          }}
        >
          <h1 className="gt-title">
            Georgia Tech
          </h1>
          <p className="gt-subtitle">
            Computer Science Senior
          </p>
          <div className="gt-scroll-indicator">
            <ChevronDown className="gt-scroll-icon" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="gt-about-section">
        <div className="gt-about-container">
          <div className={`gt-about-content ${isVisible ? 'visible' : ''}`}>
            <h2 className="gt-about-title">
              About Me
            </h2>
            
            <div className="gt-about-grid">
              <div className="gt-info-cards">
                <div className={`gt-info-card ${isVisible ? 'visible' : ''}`}>
                  <div className="gt-card-header">
                    <Code className="gt-card-icon" />
                    <h3 className="gt-card-title">Computer Science</h3>
                  </div>
                  <p className="gt-card-description">
                    Pursuing a degree in Computer Science with a passion for creating innovative solutions
                  </p>
                </div>

                <div className={`gt-info-card ${isVisible ? 'visible' : ''}`}>
                  <div className="gt-card-header">
                    <Cpu className="gt-card-icon" />
                    <h3 className="gt-card-title">Intelligence & Media</h3>
                  </div>
                  <p className="gt-card-description">
                    Specializing in artificial intelligence and digital media technologies
                  </p>
                </div>
              </div>

              <div className={`gt-visual-element ${isVisible ? 'visible' : ''}`}>
                <div className="gt-visual-box">
                  <div className="gt-visual-content">
                    <GraduationCap className="gt-visual-icon" />
                    <p className="gt-visual-text">Georgia Tech</p>
                    <p className="gt-visual-subtext">Class of 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Timeline */}
      <div ref={educationRef} className="gt-education-section">
        <div className="gt-education-container">
          <h2 className="gt-education-title">
            Education Journey
          </h2>

          <div className="gt-timeline">
            <div 
              className={`gt-timeline-item ${scrollY > 100 ? 'visible' : ''}`}
              style={{
                transitionDelay: '0.2s'
              }}
            >
              <div className="gt-timeline-content">
                <div className="gt-timeline-icon-wrapper">
                  <div className="gt-timeline-icon-bg gold">
                    <BookOpen className="gt-timeline-icon" />
                  </div>
                </div>
                <div className="gt-timeline-info">
                  <h3 className="gt-degree-title">Bachelor of Science</h3>
                  <p className="gt-field">Computer Science</p>
                  <p className="gt-institution">Georgia Institute of Technology • 2025</p>
                  <p className="gt-concentration">Concentration: Intelligence & Media</p>
                </div>
              </div>
            </div>

            <div 
              className={`gt-timeline-item ${scrollY > 200 ? 'visible' : ''}`}
              style={{
                transitionDelay: '0.4s'
              }}
            >
              <div className="gt-timeline-content">
                <div className="gt-timeline-icon-wrapper">
                  <div className="gt-timeline-icon-bg navy">
                    <GraduationCap className="gt-timeline-icon" />
                  </div>
                </div>
                <div className="gt-timeline-info">
                  <h3 className="gt-degree-title">Master of Science</h3>
                  <p className="gt-field">Computer Science</p>
                  <p className="gt-institution">Georgia Institute of Technology • Coming Soon</p>
                  <div className="gt-future-badge">
                    Future Plans
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="gt-footer">
        <p className="gt-footer-text">&copy; 2025 Georgia Tech Student Portfolio</p>
      </footer>
    </section>
  );
};

export default GTSection;