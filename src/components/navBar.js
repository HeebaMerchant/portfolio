class Navigation {
    constructor() {
        this.currentId = null;
        this.currentLink = null;
        this.navLinks = document.querySelectorAll('nav a');
        this.sections = document.querySelectorAll('.content-section');
        this.nav = document.querySelector('nav');
        
        this.init();
    }

    init() {
        this.addEventListeners();
        this.onScroll(); // Initial check for active section
    }

    addEventListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (event) => this.onLinkClick(event));
        });

        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.onScroll());
    }

    onLinkClick(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const topOffset = targetSection.offsetTop - this.nav.offsetHeight;
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    }

    onScroll() {
        const scrollPosition = window.scrollY + this.nav.offsetHeight + 1;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            if (scrollPosition >= section.offsetTop) {
                this.setActiveLink(section.id);
                break;
            }
        }
    }

    setActiveLink(sectionId) {
        if (this.currentId !== sectionId) {
            this.currentId = sectionId;
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
}

// Initialize the Navigation
new Navigation();