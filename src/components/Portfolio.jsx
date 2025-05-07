import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Navigation } from './navBar';
import './Portfolio.css';
import './bee';
import { Import } from 'lucide-react';

const Portfolio = () => {
  const [introHeadingRef, introHeadingVisible] = useIntersectionObserver();
  const gtSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePage, setActivePage] = useState('introduction'); // Track active section
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (gtSectionRef.current) {
        const sectionTop = gtSectionRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        const progress = Math.max(0, Math.min(1, 1 - (sectionTop / viewportHeight)));
        setScrollProgress(progress);
        
        // Handle text visibility
        if (progress > 0.3 && imageLoaded) {
          setTimeout(() => {
            setTextVisible(true);
          }, 300);
        } else if (progress < 0.1) {
          setTextVisible(false);
        }
      }

      // Check if projects section is in view
      if (projectsSectionRef.current) {
        const rect = projectsSectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          setProjectsVisible(true);
        }
      }
      
      // Determine which section is currently in view to update active page
      updateActiveSection();
    };

    // Function to determine active section based on scroll position
    const updateActiveSection = () => {
      const sections = [
        { id: 'introduction', element: document.getElementById('section-introduction') },
        { id: 'projects', element: document.getElementById('section-projects') },
        // Add other sections here as they're implemented
        { id: 'skills', element: document.getElementById('section-skills') },
        { id: 'resume', element: document.getElementById('section-resume') },
        { id: 'contact', element: document.getElementById('section-contact') }
      ];
      
      // Find the section that is most visible in the viewport
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // If section is mostly in view (top part visible)
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
            setActivePage(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [imageLoaded]);

  const handleImageLoad = () => {
    console.log("Image loaded");
    setImageLoaded(true);
  };

  // Simpler transform values based on scroll
  // As user scrolls down, image moves up slightly and scales up
  const translateY = -scrollProgress * 3.5; // Move image up slightly as scroll down (percentage)
  const scale = 1 + (scrollProgress * 0.12); // Slowly scale up as user scrolls, similar to reference

  // Mouse-based parallax effect
  const parallaxX = mousePosition.x * 5; // Subtle horizontal movement
  const parallaxY = mousePosition.y * 5; // Subtle vertical movement

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, []);

  return (
    <div className="portfolio-container">
      {/* Navigation with active page indicator */}
      <nav className="glass-nav">
        <a 
          href="#section-introduction" 
          className={`nav-link ${activePage === 'introduction' ? 'active' : ''}`}
        >
          Introduction
        </a>
        <a 
          href="#section-projects" 
          className={`nav-link ${activePage === 'projects' ? 'active' : ''}`}
        >
          Projects
        </a>
        <a 
          href="#section-skills" 
          className={`nav-link ${activePage === 'skills' ? 'active' : ''}`}
        >
          Skills
        </a>
        <a 
          href="#section-resume" 
          className={`nav-link ${activePage === 'resume' ? 'active' : ''}`}
        >
          Resume
        </a>
        <a 
          href="#section-contact" 
          className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
        >
          Contact
        </a>
      </nav>

      {/* Introduction Section with enhanced animation */}
      <section id="section-introduction" className="intro-section">
        <div className="intro-background"></div>
        <h1 className="intro animate-text" ref={introHeadingRef}> 
          Heeba<br/>Merchant 
        </h1>
        <p className="title animate-text-delay">Full Stack Developer</p>
        <div className="scroll-indicator">
          <span>Scroll to discover</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>
      
      {/* Georgia Tech Section with simplified parallax effect */}
      <section ref={gtSectionRef} className="gt-section">
        <div className="gt-fullscreen-container">
          <div className="gt-image-wrapper">
            <img 
              src="/georgia-tech-joins-cumu.png" 
              alt="Georgia Tech campus view" 
              className="gt-fullscreen-image"
              style={{
                willChange: 'transform',
                transform: `translate3d(${parallaxX}px, ${translateY}%, 0px) scale3d(${scale}, ${scale}, 1)`,
                transformStyle: 'preserve-3d'
              }}
              onLoad={handleImageLoad}
            />
          </div>
          <div className="gt-overlay">
            <div 
              className={`gt-text-container ${textVisible ? 'visible' : ''}`}
            >
              <h2>
                I'm a passionate front-end developer specializing in creating seamless user interfaces 
                that are both visually stunning and highly functional. As a Computer Science student at 
                Georgia Tech with a focus on Intelligence and Media, I blend technical expertise with creative 
                design principles. I've developed award-winning projects including a healthcare application 
                that won 3rd place at Hacklytics 2025, and worked as a Software Engineer Intern redesigning 
                websites with dynamic elements. My skills span React, TypeScript, Python, and various web 
                technologies, allowing me to craft responsive layouts, ensure accessibility, and enhance user 
                engagement through interactive design elements. My goal is to leverage these capabilities to 
                contribute to innovative projects and help businesses achieve their digital goals through beautiful, 
                user-friendly web experiences.
              </h2>
            </div>
            <div id="bee-container" className="bee-corner"></div>
          </div>
        </div>
      </section>

      {/* Projects Section - Enhanced with modern UI and animations */}
      <section 
        id="section-projects" 
        ref={projectsSectionRef}
        className="projects-section dark-background"
      >
        <h2 className="section-title">My Projects</h2>
        <div className="section-line"></div>
        
        <div className="projects-container">
          {/* Project Grid with card layout and animations */}
          <div className="project-list">
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="/project-healthcare.jpg" alt="Healthcare App" className="project-thumbnail" />
                <a href="#" className="view-project">View Project <span className="arrow-icon">→</span></a>
              </div>
              <div className="project-info">
                <h3>Healthcare App</h3>
                <p>Award-winning healthcare application that won 3rd place at Hacklytics 2025. Created an innovative solution for patient management with AI-powered diagnostics.</p>
                <div className="tech-stack">React • TypeScript • Firebase</div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="/project-website.jpg" alt="Website Redesign" className="project-thumbnail" />
                <a href="#" className="view-project">View Project <span className="arrow-icon">→</span></a>
              </div>
              <div className="project-info">
                <h3>Website Redesign</h3>
                <p>Dynamic website with modern UI elements and responsive design for optimal user experience across all devices.</p>
                <div className="tech-stack">JavaScript • CSS3 • Figma</div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="/project-dataviz.jpg" alt="Data Visualization" className="project-thumbnail" />
                <a href="#" className="view-project">View Project <span className="arrow-icon">→</span></a>
              </div>
              <div className="project-info">
                <h3>Data Visualization</h3>
                <p>Interactive data visualization dashboard with real-time updates and filtering capabilities for complex data analysis.</p>
                <div className="tech-stack">D3.js • Python • CSV</div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="/project-mobile.jpg" alt="Mobile App" className="project-thumbnail" />
                <a href="#" className="view-project">View Project <span className="arrow-icon">→</span></a>
              </div>
              <div className="project-info">
                <h3>Mobile App</h3>
                <p>Cross-platform mobile application with seamless user experience and offline capabilities for productivity management.</p>
                <div className="tech-stack">React Native • Redux • Expo</div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="/project-ai.jpg" alt="AI Project" className="project-thumbnail" />
                <a href="#" className="view-project">View Project <span className="arrow-icon">→</span></a>
              </div>
              <div className="project-info">
                <h3>AI Assistant</h3>
                <p>Smart AI assistant that helps users manage schedules and automate routine tasks with natural language processing.</p>
                <div className="tech-stack">TensorFlow • Python • NLP</div>
              </div>
            </div>
          </div>
          
          {/* View All Button with hover animation */}
          <div className="view-all-container">
            <a href="#" className="view-all-button">
              View All Projects <span className="arrow-icon">→</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Placeholder sections for other pages to demonstrate active navigation */}
      <section id="section-skills" className="skills-section">
        <h2 className="section-title">Skills</h2>
        <div className="section-line"></div>
        {/* Skills content goes here */}
      </section>
      
      <section id="section-resume" className="resume-section">
        <h2 className="section-title">Resume</h2>
        <div className="section-line"></div>
        {/* Resume content goes here */}
      </section>
      
      <section id="section-contact" className="contact-section">
        <h2 className="section-title">Contact</h2>
        <div className="section-line"></div>
        {/* Contact content goes here */}
      </section>
    </div>
  );
};

export default Portfolio;