// Portfolio.jsx
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Portfolio.css';
// import './initial.js';

const Portfolio = () => {
  const [introHeadingRef, introHeadingVisible] = useIntersectionObserver();
  const [projectsHeadingRef, projectsHeadingVisible] = useIntersectionObserver();

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