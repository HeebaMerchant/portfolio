import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FrameworkCard from './FrameworkCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Portfolio.css';

const Portfolio = () => {
  const [introHeadingRef, introHeadingVisible] = useIntersectionObserver();
  const gtSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const gtLogoRef = useRef(null);
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
  const timelineRef = useRef(null);
  const zoomContainerRef = useRef(null);
  const zoomTargetRef = useRef(null);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
      
      // Add smooth parallax for hero section based on mouse position
      const heroLayers = document.querySelectorAll('.depth-layer');
      if (heroLayers.length) {
        heroLayers.forEach((layer, index) => {
          const depth = (index + 1) * 5;
          const moveX = mousePosition.x * depth;
          const moveY = mousePosition.y * depth;
          layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Enhanced scroll animations
      const scrollY = window.scrollY;
      
      // Apply scroll effects to hero section
      if (gtSectionRef.current) {
        const heroRect = gtSectionRef.current.getBoundingClientRect();
        const heroHeight = heroRect.height;
        const scrollPercentage = Math.min(1, Math.max(0, -heroRect.top / heroHeight));
        
        // Apply transformations based on scroll position
        if (heroContentRef.current) {
          heroContentRef.current.style.transform = `translateY(${scrollPercentage * 50}px)`;
        }
        
        if (gtLogoRef.current) {
          gtLogoRef.current.style.transform = `rotate(-10deg) translateY(${scrollPercentage * 100}px)`;
        }
      }

      // Check for elements with scroll reveal
      const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
      scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = elementTop < window.innerHeight * 0.85;
        
        if (elementVisible) {
          element.classList.add('visible');
        }
      });

      // Parallax effect for background layers
      const scrolledValue = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.bg-layer, .hero-layer');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.05);
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

  // Add animation to timeline elements when they come into view
  useEffect(() => {
    const handleTimelineAnimation = () => {
      const timelineElements = document.querySelectorAll('.timeline-content.scroll-reveal');
      
      timelineElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = elementTop < window.innerHeight * 0.8;
        
        if (elementVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleTimelineAnimation);
    handleTimelineAnimation(); // Initial check
    
    return () => window.removeEventListener('scroll', handleTimelineAnimation);
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

  // Enhanced 3D card tilt effect
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const tiltX = (y - 0.5) * 15; // Reduced tilt for smoother effect
    const tiltY = (x - 0.5) * -15;
    const intensity = 20; // Parallax intensity
    
    const content = card.querySelector('.card-content');
    const icon = card.querySelector('.card-icon');
    const title = card.querySelector('.card-title');
    const description = card.querySelector('.card-description');
    
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px) scale(1.02)`;
    
    // Parallax effect for inner elements
    if (content) content.style.transform = `translateZ(30px)`;
    if (icon) icon.style.transform = `translateZ(40px) translateX(${(x - 0.5) * -intensity}px) translateY(${(y - 0.5) * -intensity}px)`;
    if (title) title.style.transform = `translateZ(25px) translateX(${(x - 0.5) * -intensity * 0.5}px)`;
    if (description) description.style.transform = `translateZ(10px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    const content = card.querySelector('.card-content');
    const icon = card.querySelector('.card-icon');
    const title = card.querySelector('.card-title');
    const description = card.querySelector('.card-description');
    
    card.style.transform = 'rotateX(0) rotateY(0) translateZ(0) scale(1)';
    
    // Reset inner elements
    if (content) content.style.transform = 'translateZ(10px)';
    if (icon) icon.style.transform = 'translateZ(20px)';
    if (title) title.style.transform = 'translateZ(0)';
    if (description) description.style.transform = 'translateZ(0)';
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
          href="#section-education" 
          className={`nav-link ${activePage === 'education' ? 'active' : ''}`}
        >
          Education
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

      {/* Hero Section with depth layers and advanced scroll effects */}
      <section className="hero" id="section-education" ref={gtSectionRef}>
        <div className="depth-layer depth-layer-1"></div>
        <div className="depth-layer depth-layer-2"></div>
        <div className="depth-layer depth-layer-3"></div>
        
        <div className="gt-emblem parallax-element" aria-hidden="true">GT</div>
        <img 
          src="/georgia-tech-logo.png" 
          alt="Georgia Tech" 
          className="gt-logo parallax-element" 
          aria-hidden="true"
          ref={gtLogoRef}
        />
        <div className="particles">
          <div className="particle parallax-element"></div>
          <div className="particle parallax-element"></div>
          <div className="particle parallax-element"></div>
          <div className="particle parallax-element"></div>
          <div className="particle parallax-element"></div>
        </div>
        <div className="hero-content" ref={heroContentRef}>
          <h1>Georgia Tech <span className="highlight">Senior</span></h1>
          <p className="subtitle">COMPUTER SCIENCE <br/> INTELLIGENCE • MEDIA</p>
          <a href="#work" className="hero-cta" aria-label="Explore my journey">EXPLORE MY JOURNEY</a>
        </div>
        <div className="diagonal-divider" aria-hidden="true"></div>
      </section>


      {/* 3D Cards Section */}
      <section className="cards-section" id="work">
        <div className="floating-element">
          <div className="floating-circle"></div>
        </div>
        
        <div className="cards-container scroll-reveal">
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

      {/* Timeline Section - Redesigned with single background */}
      <section className="timeline-section" id="education" ref={timelineRef}>
        <div className="timeline-container">
          {/* Single background image for the entire timeline */}
          <div className="timeline-background" style={{
            backgroundImage: 'url(/georgia-tech-joins-cumu.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            filter: 'brightness(0.7)'
          }}></div>
          
          {/* Vertical timeline line */}
          <div className="timeline-line"></div>
          
          {/* Timeline events */}
          <div className="timeline-events">
            {/* Timeline Event 1 */}
            <div className="timeline-event">
              <div className="timeline-year">2020</div>
              <div className="timeline-content scroll-reveal">
                <h2 className="timeline-heading">Beginning at Georgia Tech</h2>
                <p className="timeline-description">Started my journey at Georgia Tech as a Biology/Neuroscience major, diving into foundational concepts and exploring the rich academic ecosystem.</p>
                <div className="timeline-details">
                  <span className="timeline-detail">Bio/Neuroscience Major</span>
                  <span className="timeline-detail">Foundations</span>
                </div>
              </div>
            </div>

            {/* Timeline Event 2021 */}
            <div className="timeline-event">
              <div className="timeline-year">2021</div>
              <div className="timeline-content scroll-reveal">
                <h2 className="timeline-heading">Switched to Computer Science</h2>
                <p className="timeline-description">Changed my major to Computer Science. Recognized on the Dean's List for both July and December. Began exploring new opportunities in the CS field.</p>
                <div className="timeline-details">
                  <span className="timeline-detail">Dean's List Summer & Fall</span>
                  <span className="timeline-detail">CS Major</span>
                </div>
              </div>
            </div>

            {/* Timeline Event 2 */}
            <div className="timeline-event">
              <div className="timeline-year">2022</div>
              <div className="timeline-content scroll-reveal">
                <h2 className="timeline-heading">Academic Excellence</h2>
                <p className="timeline-description">Focused on academic growth and excellence. Achieved President's List in May, demonstrating commitment to my studies.</p>
                <div className="timeline-details">
                  <span className="timeline-detail">President's List May 2022</span>
                </div>
              </div>
            </div>

            {/* Timeline Event 2023 */}
            <div className="timeline-event">
              <div className="timeline-year">2023</div>
              <div className="timeline-content scroll-reveal">
                <h2 className="timeline-heading">Dean's List Achievement</h2>
                <p className="timeline-description">Continued academic success with recognition on the Dean's List and contributed to collaborative projects.</p>
                <div className="timeline-details">
                  <span className="timeline-detail">Dean's List</span>
                  <span className="timeline-detail">Projects</span>
                </div>
              </div>
            </div>

            {/* Timeline Event 2024 */}
            <div className="timeline-event">
              <div className="timeline-year">2024</div>
              <div className="timeline-content scroll-reveal">
                <h2 className="timeline-heading">Intelligence Media Focus</h2>
                <p className="timeline-description">Specialized in Intelligence Media, combining AI concepts with media applications. Developed innovative projects at the intersection of these fields.</p>
                <div className="timeline-details">
                  <span className="timeline-detail">Intell Media Specialization</span>
                </div>
              </div>
            </div>

             {/* Timeline Event 2025 */}
             <div className="timeline-event">
              <div className="timeline-year">2025</div>
              <div className="timeline-content scroll-reveal">
                <h2 className="timeline-heading">Campus Involvement & Hackathons</h2>
                <p className="timeline-description">Increased campus involvement through various organizations and activities. Participated in Hacklytics, gaining valuable collaborative experience and networking opportunities</p>
                <div className="timeline-details">
                  <span className="timeline-detail">Campus Involvement</span>
                  <span className="timeline-detail">Hacklytics</span>
                </div>
              </div>
            </div>

            {/* Timeline Event 2026 */}
            <div className="timeline-event">
              <div className="timeline-year">2026</div>
              <div className="timeline-content scroll-reveal">
                <h2 className="timeline-heading">Master's Program</h2>
                <p className="timeline-description">Pursuing a Master's degree at Georgia Tech to further specialize and deepen my knowledge in computer science and intelligence systems.</p>
                <div className="timeline-details">
                  <span className="timeline-detail">Masters Program</span>
                  <span className="timeline-detail">Research</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="achievements-container">
          <h2 className="section-title">Achievements</h2>
          <div className="section-line"></div>
          
          <div className="achievements-grid">

            <div className="achievement-card">
              <div className="achievement-icon">🎓</div>
              <h3>Faculty Honors</h3>
              <p>Achieved Faculty Honors for exceptional academic performance</p>
              <span className="achievement-date">May 2025</span>
            </div>

            <div className="achievement-card">
              <div className="achievement-icon">🎓</div>
              <h3>President's List</h3>
              <p>Achieved President's List recognition for academic excellence</p>
              <span className="achievement-date">May 2022, Dec 2022</span>
            </div>

           <div className="achievement-card">
              <div className="achievement-icon">🎓</div>
              <h3>Dean's List</h3>
              <p>Achieved Dean's List recognition for academic excellence</p>
              <span className="achievement-date">Jul 2021, Dec 2021, May 2023</span>
            </div>

            <div className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <h3>Hacklytics Winner</h3>
              <p>Placed 3rd at Hacklytics 2025 under the Generative AI category for Sympli healthcare app</p>
              <span className="achievement-date">2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Campus & Community Involvement Section */}
      <section className="community-section">
        <div className="community-container">
          <h2 className="section-title">Campus & Community Involvement</h2>
          <div className="section-line"></div>
          <div className="community-grid">
            <div className="community-card community-horizontal">
              <div className="community-logo-col">
                <img src="/logo/bdbi.png" alt="BDBI Logo" className="community-logo" />
              </div>
              <div className="community-content-col">
                <div className="community-header">
                  <h3>Director of Marketing, <span className="club-name"><em>BDBI – Big Data Big Impact</em></span></h3>
                  <span className="community-date">Aug 2024 - Present</span>
                </div>
                <ul className="community-list">
                  <li>Designed posts and promotional content for events across all social media platforms, increasing attendance by 30%.</li>
                  <li>Utilized Canva, Figma, and Adobe Photoshop to create visually engaging designs.</li>
                  <li>Collaborated with other clubs at Georgia Tech to co-host and design events, expanding outreach and engagement.</li>
                </ul>
                <a href="https://gtbigdatabigimpact.com/" className="community-link" target="_blank" rel="noopener noreferrer">
                  Visit Club Website
                </a>
              </div>
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
                <Link to="/sympli" className="view-project" onClick={() => window.scrollTo(0, 0)}>View Project <span className="arrow-icon">→</span></Link>
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
                <Link to="fdp" className="view-project" onClick={() => window.scrollTo(0, 0)}>View Project <span className="arrow-icon">→</span></Link>
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
                <Link to='/etd' className="view-project" onClick={() => window.scrollTo(0, 0)}>View Project <span className="arrow-icon">→</span></Link>
              </div>
              <div className="project-info">
                <h3>Effective Team Dynamics</h3>
                <p>Interactive data visualization dashboard with real-time updates and filtering capabilities for complex data analysis. <a href="https://etdworkshop.mse.gatech.edu/" target="_blank" rel="noopener noreferrer" className="project-link">Visit Workshop Website</a></p>
                <div className="tech-stack">D3.js • Python • CSV</div>
              </div>
            </div>
            
            {/* ATLANTA FOOD FINDER */}
            <div className="project-item">
              <div className="project-image-wrapper">
                <img src="ATL Food Finder/Logo copy.webp" alt="Mobile App" className="project-thumbnail" />
                <Link to='atlFoodFinder' className="view-project" onClick={() => window.scrollTo(0, 0)}>View Project <span className="arrow-icon">→</span></Link>
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
                <Link to='EmailPhishingDetection' className="view-project" onClick={() => window.scrollTo(0, 0)}>View Project <span className="arrow-icon">→</span></Link>
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
        <div className="project2-Scroll"></div>
        <div className="animation2-Scroll"></div>
        <h2 className="section-title">Skills</h2>
        <div className="section-line"></div>
        
        <div className="skills-container">
          <div className="left-fade"></div>
          <div className="right-fade"></div>
          <div className="skills-heading">
            <p>
              These are the technologies and tools I've mastered to bring ideas to life and tackle challenges in software, AI, and design.
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

                {/* Resume Download Button */}
                <div className="contact-item resume-download">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Resume</h4>
                    <a href="/Heeba_Merchant_Resume.pdf" download className="resume-link">
                      Download Resume
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
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