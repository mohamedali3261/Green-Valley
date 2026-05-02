/**
 * Lazy Loading Images for Better Performance
 * Green Valley Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Select all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Replace src with data-src
                    img.src = img.dataset.src;
                    
                    // Remove data-src attribute
                    img.removeAttribute('data-src');
                    
                    // Add loaded class for fade-in effect
                    img.classList.add('lazy-loaded');
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            // Load images 50px before they enter viewport
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe each lazy image
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Lazy load background images
    if ('IntersectionObserver' in window) {
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.backgroundImage = `url(${element.dataset.bg})`;
                    element.removeAttribute('data-bg');
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyBackgrounds.forEach(bg => {
            bgObserver.observe(bg);
        });
    }
});

// Add CSS for fade-in effect
const style = document.createElement('style');
style.textContent = `
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    
    img.lazy-loaded {
        opacity: 1;
    }
    
    [data-bg] {
        background-image: none !important;
    }
`;
document.head.appendChild(style);
