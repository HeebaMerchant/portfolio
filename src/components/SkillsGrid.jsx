// Initialize the skills grid animations
const initSkillsGrid = () => {
    const skillsSection = document.getElementById('section-skills');
    if (!skillsSection) return;
    
    // Get all framework cards that have content
    const frameworkCards = Array.from(skillsSection.querySelectorAll('.framework-card'))
      .filter(card => card.querySelector('.framework-icon'));
    
    if (frameworkCards.length === 0) return;
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startRandomGlowEffect(frameworkCards);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    observer.observe(skillsSection);
  };
  
  // Add random glow effect to cards
  const startRandomGlowEffect = (cards) => {
    let activeCards = [];
    
    const updateActiveCards = () => {
      // Remove active class from all cards
      activeCards.forEach(card => {
        card.classList.remove('active');
      });
      
      activeCards = [];
      
      // Add active class to random cards
      const numberOfActiveCards = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numberOfActiveCards; i++) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const card = cards[randomIndex];
        
        // Avoid duplicates
        if (!activeCards.includes(card)) {
          activeCards.push(card);
          card.classList.add('active');
        }
      }
    };
    
    // Initial update
    updateActiveCards();
    
    // Set interval for animation
    setInterval(updateActiveCards, 2000);
  };
  
  // Initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initSkillsGrid);