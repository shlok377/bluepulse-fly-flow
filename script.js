// BluePulse Interactive Features

class BluePulse {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navButtons = document.querySelectorAll('.nav-button, .nav-detail-button');
        this.scrollProgress = document.getElementById('scroll-progress');
        this.activeSection = 0;
        
        this.init();
    }
    
    init() {
        this.setupScrollProgress();
        this.setupNavigation();
        this.setupParticles();
        this.setupDataAnimation();
        this.setupBackgrounds();
        
        // Initial setup
        this.updateNavigation();
        this.updateScrollProgress();
    }
    
    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
        });
    }
    
    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        this.scrollProgress.style.width = `${scrollPercent}%`;
    }
    
    setupNavigation() {
        // Update active section on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveSection();
            this.updateNavigation();
        });
        
        // Navigation click handlers
        this.navButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const sectionIndex = parseInt(button.dataset.section);
                this.scrollToSection(sectionIndex);
            });
        });
    }
    
    updateActiveSection() {
        const scrollPosition = window.pageYOffset + window.innerHeight / 3;
        
        // Include hero section (index -1) and regular sections (0, 1, 2, 3)
        const allSections = [
            document.querySelector('.hero-section'),
            ...this.sections
        ];
        
        allSections.forEach((section, index) => {
            if (!section) return;
            
            const offsetTop = section.offsetTop;
            const offsetBottom = offsetTop + section.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                // Hero section should map to section 0, regular sections to 1, 2, 3, 4
                this.activeSection = index === 0 ? 0 : index - 1;
            }
        });
    }
    
    updateNavigation() {
        this.navButtons.forEach((button, index) => {
            const sectionIndex = parseInt(button.dataset.section);
            if (sectionIndex === this.activeSection) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    scrollToSection(index) {
        if (index === 0) {
            // Scroll to jet stream section (first actual section)
            this.sections[0]?.scrollIntoView({ behavior: 'smooth' });
        } else if (index > 0 && index < this.sections.length) {
            this.sections[index]?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    setupParticles() {
        const particleConfigs = [
            { container: 'particles-jetstream', density: 15, type: 'air' },
            { container: 'particles-atmosphere', density: 25, type: 'air' },
            { container: 'particles-coastal', density: 30, type: 'water' },
            { container: 'particles-ocean', density: 40, type: 'water' }
        ];
        
        particleConfigs.forEach(config => {
            this.createParticles(config.container, config.density, config.type);
        });
    }
    
    createParticles(containerId, density, type) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        for (let i = 0; i < density; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * (type === 'water' ? 4 : 2) + 1;
            const delay = Math.random() * 20;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${delay}s`;
            
            if (type === 'water') {
                particle.style.background = 'rgba(75, 200, 230, 0.4)';
            } else {
                particle.style.background = 'rgba(100, 180, 255, 0.3)';
            }
            
            container.appendChild(particle);
        }
    }
    
    setupDataAnimation() {
        // Animate data values every 2 seconds
        setInterval(() => {
            this.animateDataValues();
        }, 2000);
    }
    
    animateDataValues() {
        const values = document.querySelectorAll('.value[data-base]');
        
        values.forEach(value => {
            const baseValue = parseFloat(value.dataset.base);
            const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
            const newValue = baseValue + (baseValue * variation);
            
            // Format the value appropriately
            if (value.textContent.includes('M')) {
                value.textContent = newValue.toFixed(1) + 'M';
            } else if (value.textContent.includes(',')) {
                value.textContent = Math.round(newValue).toLocaleString();
            } else {
                value.textContent = newValue.toFixed(1);
            }
        });
    }
    
    setupBackgrounds() {
        // Set background images for sections
        const backgrounds = [
            'src/assets/jet-stream-bg.jpg',
            'src/assets/atmosphere-bg.jpg', 
            'src/assets/coastal-bg.jpg',
            'src/assets/deep-ocean-bg.jpg'
        ];
        
        this.sections.forEach((section, index) => {
            if (backgrounds[index]) {
                const bgImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${backgrounds[index]})`;
                section.style.backgroundImage = bgImage;
            }
        });
    }
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/smoothscroll.min.js';
    document.head.appendChild(smoothScrollPolyfill);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BluePulse();
});

// Handle resize events
window.addEventListener('resize', () => {
    // Recalculate navigation on resize
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});