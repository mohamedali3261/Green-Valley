// Grid Particles Animation System
class ParticlesGenerator {
    constructor(containerId, particleCount = 40) {
        this.container = document.getElementById(containerId);
        this.particleCount = particleCount;
        this.particles = [];
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        // Create particles container with grid background
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        this.container.appendChild(particlesContainer);

        // Generate particles that move across the grid
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size with bias towards medium particles
        const rand = Math.random();
        let sizeClass;
        if (rand < 0.3) {
            sizeClass = 'particle-small';
        } else if (rand < 0.7) {
            sizeClass = 'particle-medium';
        } else {
            sizeClass = 'particle-large';
        }
        particle.classList.add(sizeClass);

        // Random animation speed - more variety
        const speedOptions = [
            'particle-slow', 'particle-slow-left', 'particle-slow-wide',
            'particle-medium-speed', 'particle-medium-speed-left', 'particle-medium-speed-wide',
            'particle-fast', 'particle-fast-left', 'particle-fast-wide'
        ];
        const randomSpeed = speedOptions[Math.floor(Math.random() * speedOptions.length)];
        particle.classList.add(randomSpeed);

        // Random horizontal position (spread across width)
        const randomX = Math.random() * 100;
        particle.style.left = randomX + '%';

        // Random bottom position (start from bottom)
        const randomBottom = Math.random() * 20 - 20; // Start below the viewport
        particle.style.bottom = randomBottom + '%';

        // Random animation delay for staggered effect
        const randomDelay = Math.random() * 8;
        particle.style.animationDelay = randomDelay + 's';

        container.appendChild(particle);
        this.particles.push(particle);
    }

    // Add more particles dynamically
    addParticles(count) {
        const particlesContainer = this.container.querySelector('.particles-container');
        for (let i = 0; i < count; i++) {
            this.createParticle(particlesContainer);
        }
    }

    // Clear all particles
    clear() {
        const particlesContainer = this.container.querySelector('.particles-container');
        if (particlesContainer) {
            particlesContainer.remove();
        }
        this.particles = [];
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles for hero sections
    const heroSections = document.querySelectorAll('.hero-with-particles');
    
    heroSections.forEach((hero, index) => {
        const containerId = hero.id || `hero-${index}`;
        if (!hero.id) {
            hero.id = containerId;
        }
        
        // Create particles with appropriate count based on screen size
        // Grid particles need more count for better visual effect
        const particleCount = window.innerWidth > 768 ? 60 : 40;
        new ParticlesGenerator(containerId, particleCount);
    });

    // Initialize particles for footer
    const footer = document.querySelector('footer');
    if (footer && !footer.id) {
        footer.id = 'footer-particles';
    }
    
    if (footer) {
        // Create particles with appropriate count based on screen size
        // Footer needs more particles for full coverage
        const footerParticleCount = window.innerWidth > 768 ? 80 : 50;
        new ParticlesGenerator('footer-particles', footerParticleCount);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Optionally adjust particle count on resize
    // This can be extended based on requirements
});
