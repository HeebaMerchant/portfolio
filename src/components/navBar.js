class Navigation {
    constructor() {
        this.currentId = null;
        this.currentLink = null;
        
        // Try to find navigation using both selectors for compatibility with your Portfolio component
        this.nav = document.querySelector('.glass-nav') || document.querySelector('nav');
        
        // Get sections using your Portfolio IDs
        this.sections = document.querySelectorAll(
            '#section-introduction, #section-projects, #section-skills, #section-resume, #section-contact'
        );
        
        // Fallback to content-section if needed
        if (!this.sections || this.sections.length === 0) {
            this.sections = document.querySelectorAll('.content-section');
        }
        
        // Get navigation links only if nav exists
        this.navLinks = this.nav ? this.nav.querySelectorAll('a') : [];
        
        // Only initialize if navigation was found
        if (this.nav) {
            this.init();
        } else {
            console.warn('Navigation element not found. Make sure page is fully loaded.');
            
            // Optional: retry initialization after a short delay
            setTimeout(() => {
                this.nav = document.querySelector('.glass-nav') || document.querySelector('nav');
                if (this.nav) {
                    console.log('Navigation found on retry');
                    this.init();
                }
            }, 500);
        }
    }

    init() {
        this.addEventListeners();
        // Initial check with safety
        try {
            this.onScroll();
        } catch (e) {
            console.error('Error in initial navigation setup:', e);
        }
    }

    addEventListeners() {
        // Add click listeners if we have nav links
        if (this.navLinks && this.navLinks.length > 0) {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (event) => this.onLinkClick(event));
            });
        }

        // Create bound handlers with error protection
        const safeScrollHandler = () => {
            try {
                this.onScroll();
            } catch (e) {
                console.error('Error in scroll handler:', e);
            }
        };
        
        window.addEventListener('scroll', safeScrollHandler);
        window.addEventListener('resize', safeScrollHandler);
    }

    onLinkClick(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Safety check before accessing offsetHeight
        if (targetSection && this.nav) {
            const topOffset = targetSection.offsetTop - this.nav.offsetHeight;
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    }

    onScroll() {
        // CRITICAL FIX: This is where your error is happening
        // Add safety check before accessing offsetHeight
        if (!this.nav) return;
        
        const scrollPosition = window.scrollY + this.nav.offsetHeight + 1;

        // Only proceed if we have sections to check
        if (!this.sections || this.sections.length === 0) return;

        let foundActive = false;
        
        // Find the current section
        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            
            // Safety check before accessing offsetTop
            if (section && typeof section.offsetTop !== 'undefined') {
                if (scrollPosition >= section.offsetTop) {
                    if (section.id) {
                        this.setActiveLink(section.id);
                        foundActive = true;
                        break;
                    }
                }
            }
        }
        
        // Default to first section if none is active
        if (!foundActive && this.sections.length > 0 && this.sections[0].id) {
            this.setActiveLink(this.sections[0].id);
        }
    }

    setActiveLink(sectionId) {
        if (this.currentId !== sectionId) {
            this.currentId = sectionId;
            
            // Update active classes on nav links
            if (this.navLinks && this.navLinks.length > 0) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    }
}

// Initialize Navigation only after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.navigationInstance = new Navigation();
    } catch (e) {
        console.error('Error initializing Navigation:', e);
    }
});

// Export for use in other modules if needed
export default Navigation;