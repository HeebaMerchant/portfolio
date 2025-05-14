import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FrameworkCard from './FrameworkCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Portfolio.css';

const Portfolio = () => {
  const [introHeadingRef, introHeadingVisible] = useIntersectionObserver();
  const gtSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePage, setActivePage] = useState('introduction');
  const [scrolled, setScrolled] = useState(false);
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      setScrolled(window.scrollY > 50);

      // Parallax effect for background layers
      const scrolledValue = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.bg-layer, .hero-layer');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolledValue * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      if (gtSectionRef.current) {
        const sectionTop = gtSectionRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        
        const progress = Math.max(0, Math.min(1, 1 - (sectionTop / viewportHeight)));
        setScrollProgress(progress);
        
        if (progress > 0.3 && imageLoaded) {
          setTimeout(() => {
            setTextVisible(true);
          }, 300);
        } else if (progress < 0.1) {
          setTextVisible(false);
        }
      }

      if (projectsSectionRef.current) {
        const rect = projectsSectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          setProjectsVisible(true);
        }
      }
      
      updateActiveSection();
    };

    const updateActiveSection = () => {
      const sections = [
        { id: 'introduction', element: document.getElementById('section-introduction') },
        { id: 'home', element: document.getElementById('home') },
        { id: 'work', element: document.getElementById('work') },
        { id: 'education', element: document.getElementById('education') },
        { id: 'projects', element: document.getElementById('section-projects') },
        { id: 'skills', element: document.getElementById('section-skills') },
        { id: 'contact', element: document.getElementById('section-contact') }
      ];
      
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
            setActivePage(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [imageLoaded]);

  // Timeline animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const timelineElements = document.querySelectorAll('.timeline-item');
    timelineElements.forEach(item => observer.observe(item));

    return () => {
      timelineElements.forEach(item => observer.unobserve(item));
    };
  }, []);

  // Floating elements effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      document.querySelectorAll('.floating-element').forEach((element, index) => {
        const speed = 0.02 + (index * 0.01);
        const x = (mouseX - 0.5) * 100 * speed;
        const y = (mouseY - 0.5) * 100 * speed;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D card tilt effect
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const tiltX = (y - 0.5) * 20;
    const tiltY = (x - 0.5) * -20;
    
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
  };

  const handleImageLoad = () => {
    console.log("Image loaded");
    setImageLoaded(true);
  };

  const translateY = -scrollProgress * 3.5;
  const scale = 1 + (scrollProgress * 0.12);
  const parallaxX = mousePosition.x * 5;
  const parallaxY = mousePosition.y * 5;

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="portfolio-container">
      {/* Navigation */}
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
          href="#section-contact" 
          className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
        >
          Contact
        </a>
      </nav>


      {/* Introduction Section */}
      <section id="section-introduction" className="intro-section">
        <div className="intro-background">
        </div>
        <h1 className="intro animate-text" ref={introHeadingRef}> 
          Heeba<br/>Merchant 
        </h1>
        <p className="title animate-text-delay">Full Stack Developer</p>
        <div className="scroll-indicator">
          <span>Scroll to discover</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      <section className="hero" id="home">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-layer hero-layer-1"></div>
        <div className="hero-layer hero-layer-2"></div>
      </div>
      <div className="hero-content">
        <h1>Georgia Tech Senior</h1>
        <p className="subtitle">• COMPUTER SCIENCE • <br/> INTELLIGENCE & MEDIA</p>
        <a href="#work" className="hero-cta" aria-label="Explore my journey">EXPLORE MY JOURNEY</a>
      </div>
      <div className="scroll-indicator" aria-hidden="true"></div>
    </section>


      {/* 3D Cards Section */}
      <section className="cards-section" id="work">
        <div className="floating-element floating-element-1">
          <div className="floating-circle"></div>
        </div>
        <div className="floating-element floating-element-2">
          <div className="floating-circle"></div>
        </div>
        
        <div className="cards-container">
          <div 
            className="card-3d"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-face">
              <div className="card-content">
                <div className="card-icon">🤖</div>
                <h3 className="card-title">Intelligence Focus</h3>
                <p className="card-description">Specializing in artificial intelligence and machine learning, working on cutting-edge projects that push the boundaries of intelligent systems.</p>
              </div>
            </div>
          </div>
          
          <div 
            className="card-3d"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-face">
              <div className="card-content">
                <div className="card-icon">🎨</div>
                <h3 className="card-title">Media Technologies</h3>
                <p className="card-description">Exploring the intersection of computing and creative media, developing innovative solutions for digital content creation and interaction.</p>
              </div>
            </div>
          </div>
          
          <div 
            className="card-3d"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-face">
              <div className="card-content">
                <div className="card-icon">🚀</div>
                <h3 className="card-title">Future Goals</h3>
                <p className="card-description">Preparing for Master's in Computer Science to deepen expertise in emerging technologies and contribute to groundbreaking research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Timeline Section */}
            <section className="timeline-section" id="education">
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <h3>Senior Year at Georgia Tech</h3>
              <p>Currently completing my final year, focusing on advanced coursework in AI and machine learning. Leading multiple projects that combine intelligence with practical applications.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <h3>Computer Science Major</h3>
              <p>Specializing in Intelligence and Media concentration, developing expertise in neural networks, computer vision, and natural language processing.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <h3>Master's Program (Coming Soon)</h3>
              <p>Accepted into Georgia Tech's Master's in Computer Science program, planning to focus on advanced AI research and innovative technology development.</p>
            </div>
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
          <div className="project-list">

          {/* SYMPLI */}
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="sympli final.jpeg" alt="Healthcare App" className="project-thumbnail" />
                <Link to="/sympli" className="view-project">View Project <span className="arrow-icon">→</span></Link>
              </div>
              <div className="project-info">
                <h3>Sympli</h3>
                <p>Award-winning healthcare application that won 3rd place at Hacklytics 2025. Created an innovative solution for patient management with AI-powered diagnostics.</p>
                <div className="tech-stack">React • TypeScript • Firebase</div>
              </div>
            </div>
            
            {/* FLIGHT DELAYED PREDICTION */}
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="fdp_Images/fdp-logo.jpg" alt="Website Redesign" className="project-thumbnail" />
                <Link to="fdp" className="view-project">View Project <span className="arrow-icon">→</span></Link>
              </div>
              <div className="project-info">
                <h3>Flight Delayed Prediction</h3>
                <p>Dynamic website with modern UI elements and responsive design for optimal user experience across all devices.</p>
                <div className="tech-stack">JavaScript • CSS3 • Figma</div>
              </div>
            </div>
            
            {/* EFFECTIVE TEAM DYANMICS */}
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="/etd-final-logo.png" alt="Data Visualization" className="project-thumbnail" />
                <Link to='/etd' className="view-project">View Project <span className="arrow-icon">→</span></Link>
              </div>
              <div className="project-info">
                <h3>Effective Team Dynamics</h3>
                <p>Interactive data visualization dashboard with real-time updates and filtering capabilities for complex data analysis.</p>
                <div className="tech-stack">D3.js • Python • CSV</div>
              </div>
            </div>
            
            {/* ATLANTA FOOD FINDER */}
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="ATL Food Finder/Logo copy.webp" alt="Mobile App" className="project-thumbnail" />
                <Link to='atlFoodFinder' className="view-project">View Project <span className="arrow-icon">→</span></Link>
              </div>
              <div className="project-info">
                <h3>Atlanta Food Finder</h3>
                <p>Cross-platform mobile application with seamless user experience and offline capabilities for productivity management.</p>
                <div className="tech-stack">React Native • Redux • Expo</div>
              </div>
            </div>
            
            {/* Email Phishing Detection */}
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="/email-phishing-logo.jpg" alt="AI Project" className="project-thumbnail" />
                <Link to='EmailPhishingDetection' className="view-project">View Project <span className="arrow-icon">→</span></Link>
              </div>
              <div className="project-info">
                <h3>Email Phishing Detection</h3>
                <p>Smart AI assistant that helps users manage schedules and automate routine tasks with natural language processing.</p>
                <div className="tech-stack">TensorFlow • Python • NLP</div>
              </div>
            </div>
          </div>
          
          <div className="view-all-container">
            <a href="#" className="view-all-button">
              View All Projects <span className="arrow-icon">→</span>
            </a>
          </div>
        </div>

        <div className="animation-Scroll"></div>
        <div className="project-Scroll"></div>
      </section>
      
      {/* Skills Section */}
      <section id="section-skills" className="skills-section">
        <h2 className="section-title">Skills</h2>
        <div className="section-line"></div>
        
        <div className="skills-container">
          <div className="left-fade"></div>
          <div className="right-fade"></div>
          <div className="skills-heading">
            <p>
              Powering your favorite frameworks and tools
            </p>
          </div>
          
          <div className="frameworks-grid">
            {/* Row 1 - Empty cards */}
            {Array(16).fill(null).map((_, index) => (
              <FrameworkCard key={`empty-row1-${index}`} empty={true} />
            ))}
            
            {/* Row 2 - First empty cells */}
            <FrameworkCard key="empty-row2-1" empty={true} />
            <FrameworkCard key="empty-row2-2" empty={true} />
            <FrameworkCard key="empty-row2-3" empty={true} />
            <FrameworkCard key="empty-row2-4" empty={true} />
            
            {/* Framework cards with icons */}
            <FrameworkCard key="react" iconSrc="/logo/react.png" iconAlt="React" />
            <FrameworkCard key="html" iconSrc="/logo/html.png" iconAlt="HTML" />
            <FrameworkCard key="css" iconSrc="/logo/CSS.png" iconAlt="CSS" />
            <FrameworkCard key="javascript" iconSrc="/logo/javascript.png" iconAlt="JavaScript" />
            <FrameworkCard key="typescript" iconSrc="/logo/TypeScript.webp" iconAlt="TypeScript" />
            <FrameworkCard key="tailwind" iconSrc="/logo/tailwind.png" iconAlt="Tailwind" />
            <FrameworkCard key="shadcn" iconSrc="/logo/shadcn:ui.png" iconAlt="shadcn/ui" />
            <FrameworkCard key="figma" iconSrc="/logo/figma.png" iconAlt="Figma" />
            
            {/* Row 3 - Empty cells first */}
            {Array(8).fill(null).map((_, index) => (
              <FrameworkCard key={`empty-row3-${index}`} empty={true} />
            ))}
            
            <FrameworkCard key="assembly" iconSrc="/logo/assembly.png" iconAlt="Assembly" />
            <FrameworkCard key="python" iconSrc="/logo/python.png" iconAlt="Python" />
            <FrameworkCard key="nodejs" iconSrc="/logo/nodejs.png" iconAlt="Node.js" />
            <FrameworkCard key="java" iconSrc="/logo/java.png" iconAlt="Java" />
            <FrameworkCard key="c" iconSrc="/logo/c.png" iconAlt="C" />
            <FrameworkCard key="django" iconSrc="/logo/django-Photoroom.png" iconAlt="Django" />
            <FrameworkCard key="firebase" iconSrc="/logo/firebase.png" iconAlt="Firebase" />
            <FrameworkCard key="gcp" iconSrc="/logo/gcp.png" iconAlt="Google Cloud" />
            
            {/* Row 4 - Empty cells first */}
            {Array(11).fill(null).map((_, index) => (
              <FrameworkCard key={`empty-row4-${index}`} empty={true} />
            ))}
            
            {/* Final framework cards */}
            <FrameworkCard key="pytorch" iconSrc="/logo/pytorch.png" iconAlt="Pytorch" />
            <FrameworkCard key="numpy" iconSrc="/logo/numpy.png" iconAlt="Numpy"/>
            
            {/* Remaining empty cells */}
            {Array(22).fill(null).map((_, index) => (
              <FrameworkCard key={`empty-bottom-${index}`} empty={true} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Contact Section */}
      <section id="section-contact" className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Let's Connect</h2>
          <div className="section-line"></div>
          
          <div className="contact-content">
            {/* Left side - Contact Info */}
            <div className="contact-info">
              <h3 className="contact-subtitle">Get in Touch</h3>
              <p className="contact-description">
                I'm always excited to collaborate on innovative projects or discuss new opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>Atlanta, Georgia</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-10 5L2 7"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <a href="mailto:heebamerchant@gmail.com">heebamerchant@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>LinkedIn</h4>
                    <a href="https://linkedin.com/in/heeba-merchant" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/heeba-merchant
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>GitHub</h4>
                    <a href="https://github.com/HeebaMerchant" target="_blank" rel="noopener noreferrer">
                      github.com/HeebaMerchant
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61H6.002zm1.593 4.084h2.274l3.293 6.31-3.293 6.31H7.595l3.293-6.31-3.293-6.31zm4.851 0h3.418l3.293 6.31-3.293 6.31h-3.418l-3.293-6.31 3.293-6.31zm5.692 0h2.274l-3.293 6.31 3.293 6.31h-2.274l-3.293-6.31 3.293-6.31z"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Devpost</h4>
                    <a href="https://devpost.com/HeebaMerchant" target="_blank" rel="noopener noreferrer">
                      devpost.com/HeebaMerchant
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="social-links">
                <a href="https://github.com/heeba-merchant" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/heeba-merchant" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a href="mailto:heebamerchant@gmail.com" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"></path>
                  </svg>
                </a>
                <a href="https://devpost.com/HeebaMerchant" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61H6.002zm1.593 4.084h2.274l3.293 6.31-3.293 6.31H7.595l3.293-6.31-3.293-6.31zm4.851 0h3.418l3.293 6.31-3.293 6.31h-3.418l-3.293-6.31 3.293-6.31zm5.692 0h2.274l-3.293 6.31 3.293 6.31h-2.274l-3.293-6.31 3.293-6.31z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right side - Contact Form */}
            <div className="contact-form-container">
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    required
                    placeholder="Subject of your message"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows="5"
                    placeholder="Your message here..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
                
                {submitStatus === 'success' && (
                  <div className="form-status success">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Message sent successfully!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="form-status error">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="contact-decoration"></div>
      </section>
    </div>
  );
};

export default Portfolio;