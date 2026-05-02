/**
 * Performance Optimization Script
 * Green Valley Website
 */

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        { href: '../css/common.css', as: 'style' },
        { href: '../css/navbar.css', as: 'style' },
        { href: '../js/common.js', as: 'script' },
        { href: '../images/logo.png', as: 'image' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}

// Defer non-critical CSS
function deferNonCriticalCSS() {
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
    nonCriticalCSS.forEach(link => {
        link.media = 'print';
        link.onload = function() {
            this.media = 'all';
        };
    });
}

// Optimize font loading
function optimizeFontLoading() {
    if ('fonts' in document) {
        // Preload critical fonts
        const criticalFonts = [
            new FontFace('Cairo', 'url(https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-a1TpMEtF.woff2)', {
                weight: '400',
                style: 'normal',
                display: 'swap'
            })
        ];
        
        criticalFonts.forEach(font => {
            font.load().then(loadedFont => {
                document.fonts.add(loadedFont);
            }).catch(error => {
                console.error('Font loading failed:', error);
            });
        });
    }
}

// Reduce JavaScript execution time
function optimizeJavaScript() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Your scroll handler code here
        });
    }, { passive: true });
    
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Your resize handler code here
        }, 250);
    }, { passive: true });
}

// Monitor performance
function monitorPerformance() {
    if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Monitor Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                    console.log('CLS:', clsScore);
                }
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
}

// Initialize optimizations
document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    deferNonCriticalCSS();
    optimizeFontLoading();
    optimizeJavaScript();
    
    // Monitor performance in development only
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        monitorPerformance();
    }
});

// Network Information API for adaptive loading
if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        // Adjust quality based on connection speed
        if (connection.effectiveType === '4g') {
            // Load high-quality images
            document.body.classList.add('high-quality');
        } else if (connection.effectiveType === '3g') {
            // Load medium-quality images
            document.body.classList.add('medium-quality');
        } else {
            // Load low-quality images
            document.body.classList.add('low-quality');
        }
        
        // Listen for connection changes
        connection.addEventListener('change', () => {
            console.log('Connection changed:', connection.effectiveType);
        });
    }
}

// Prefetch next page on hover
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        }, { once: true });
    });
});
