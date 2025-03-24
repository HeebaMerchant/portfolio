import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Portfolio.css';
import './bee';

const Portfolio = () => {
  const [introHeadingRef, introHeadingVisible] = useIntersectionObserver();
  const gtSectionRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (gtSectionRef.current) {
        const sectionTop = gtSectionRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        
        // Calculate opacity based on scroll position
        const opacityValue = Math.min(1, Math.max(0, 1 - (sectionTop / (viewportHeight * 0.6))));
        setOpacity(opacityValue);
        
        // Check if image is fully visible
        if (opacityValue > 0.95 && imageLoaded) {
          // Delay the text appearance slightly
          setTimeout(() => {
            setTextVisible(true);
          }, 300);
        } else if (opacityValue < 0.7) {
          setTextVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [imageLoaded]);

  const handleImageLoad = () => {
    console.log("Image loaded");
    setImageLoaded(true);
  };

  return (
    <>
      {/* Navigation */}
      <nav>
        <a href="#section-introduction">Introduction</a>
        <a href="#section-projects">Projects</a>
        <a href="#section-skills">Skills</a>
        <a href="#section-resume">Resume</a>
        <a href="#section-contact">Contact</a>
      </nav>

      {/* Introduction Section */}
      <section id="section-introduction">
        <h1 className="intro" ref={introHeadingRef}> 
          Heeba<br/>Merchant 
        </h1>
        <p className="title">Full Stack Developer</p>
      </section>
      
      {/* Georgia Tech Section */}
      <section ref={gtSectionRef} className="gt-section">
        <div className="gt-fullscreen-container" style={{ opacity: opacity }}>
          <div className="gt-image-wrapper">
            <img 
              src="/georgia-tech-joins-cumu.png" 
              alt="Georgia Tech campus view" 
              className="gt-fullscreen-image"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="gt-overlay">
            <div className={`gt-text-container ${textVisible ? 'visible' : ''}`}>
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

      {/* Projects Section placeholder */}
      <section id="section-projects" className="projects-section">
        <h2>Projects</h2>
        {/* Project content will go here */}
      </section>
    </>
  );
};

export default Portfolio;

      // {/* Main Content Sections */}
      // <main className="content-main">
      //   {/* Introduction */}
      //   <section className="content-section" id="section-introduction">
      //     <div className="intro-content">
      //       <div className="intro-text">
      //         <h1 
      //           ref={introHeadingRef}
      //           className={`main-heading heading-fade ${introHeadingVisible ? 'visible' : ''}`}
      //         >
      //           HI, MY NAME IS HEEBA!
      //         </h1>
      //         <p className="subtitle">
      //           I'm a <span className="highlight">Software Engineer</span> that's ready to help 
      //           you build innovative solutions!
      //         </p>
      //         <p className="location">* Based at Georgia Institute of Technology</p>
      //       </div>

      //       <div className="profile-card">
      //         <div className="profile-image">
      //           <img src="/Me.JPG" alt="Heeba Merchant" />
      //         </div>
      //         <div className="profile-info">
      //           <h2>Heeba Merchant</h2>
      //           <p className="profile-title">Software Engineer</p>
      //           <p className="profile-quote">"I do what I do for the love of it"</p>
      //         </div>
      //       </div>
      //     </div>
      //   </section>

      //   {/* Projects */}
      //   <section className="content-section" id="section-projects">
      //     <h1 
      //       ref={projectsHeadingRef}
      //       className={`heading-fade ${projectsHeadingVisible ? 'visible' : ''}`}
      //     >
      //       PROJECTS
      //     </h1>
      //     <div className="project_container">
      //       <div className="FDP-container">
      //         <div className="front side">
      //           <div className="contents">
      //             <h2>Flight Delayed Prediction</h2>
      //             <p>Prediction of flights</p>
      //           </div>
      //         </div>
      //         <div className="back side">
      //           <div className="contents">
      //             <h2>codes</h2>
      //             <p>Prediction of flights</p>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="ETD-container">
      //         <div className="front side">
      //           <div className="contents">
      //             <h2>Effective Team Dynamics</h2>
      //             <p>Web app</p>
      //           </div>
      //         </div>
      //         <div className="back side">
      //           <div className="contents">
      //             <h2>codes</h2>
      //             <p>Prediction of flights</p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>

      //     <div className="project_container">
      //       <div className="AFF-container">
      //         <div className="front side">
      //           <div className="contents">
      //             <h2>Atlanta food finder</h2>
      //             <p>Web app</p>
      //           </div>
      //         </div>
      //         <div className="back side">
      //           <div className="contents">
      //             <h2>codes</h2>
      //             <p>Prediction of flights</p>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="CA-container">
      //         <div className="front side">
      //           <div className="contents">
      //             <h2>Class Attendance using Facial Recognition</h2>
      //             <p>Web app</p>
      //           </div>
      //         </div>
      //         <div className="back side">
      //           <div className="contents">
      //             <h2>codes</h2>
      //             <p>Prediction of flights</p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </section>
      // </main>
  
        // {/* Skills */}
        // {/* <section className="content-section" id="section-skills">
        //   <h1>Skills</h1>
        //   <h3>Information about my skills and expertise.</h3>
        // </section> */}

        // {/* Resume */}
        // {/* <section className="content-section" id="section-resume">
        //   <h1>Resume</h1>
        //   <h3>Details about my professional background and experience.</h3>
        // </section> */}

        // {/* Contact */}
        // {/* <section className="content-section" id="section-contact">
        //   <h1>Contact</h1>
        //   <h3>Feel free to get in touch with me!</h3>
        // </section> */}
//       </main>
//     </>
//   );
// };

// export default Portfolio;