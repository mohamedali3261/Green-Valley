// Simplified Particles Animation System - Optimized for Performance
class ParticlesGenerator {
    constructor(containerId, particleCount = 20) {
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

        // Generate fewer particles for better performance
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Simpler size variation
        const sizeClass = Math.random() < 0.5 ? 'particle-small' : 'particle-medium';
        particle.classList.add(sizeClass);

        // Simpler animation - only 3 speed options
        const speedOptions = ['particle-slow', 'particle-medium-speed', 'particle-fast'];
        const randomSpeed = speedOptions[Math.floor(Math.random() * speedOptions.length)];
        particle.classList.add(randomSpeed);

        // Random horizontal position
        const randomX = Math.random() * 100;
        particle.style.left = randomX + '%';

        // Random bottom position
        const randomBottom = Math.random() * 20 - 20;
        particle.style.bottom = randomBottom + '%';

        // Random animation delay
        const randomDelay = Math.random() * 5;
        particle.style.animationDelay = randomDelay + 's';

        container.appendChild(particle);
        this.particles.push(particle);
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

// Initialize particles on page load with reduced counts
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip particles if user prefers reduced motion
        return;
    }

    // Initialize particles for hero sections with reduced count
    const heroSections = document.querySelectorAll('.hero-with-particles');
    
    heroSections.forEach((hero, index) => {
        const containerId = hero.id || `hero-${index}`;
        if (!hero.id) {
            hero.id = containerId;
        }
        
        // Reduced particle count for better performance
        const particleCount = window.innerWidth > 768 ? 30 : 15;
        new ParticlesGenerator(containerId, particleCount);
    });

    // Initialize particles for footer with minimal count
    const footer = document.querySelector('footer');
    if (footer && !footer.id) {
        footer.id = 'footer-particles';
    }
    
    if (footer) {
        // Minimal particles for footer - much lighter
        const footerParticleCount = window.innerWidth > 768 ? 20 : 10;
        new ParticlesGenerator('footer-particles', footerParticleCount);
    }
});
