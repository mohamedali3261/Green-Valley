// Service Worker for Green Valley Website
// Version 1.0.0

const CACHE_NAME = 'green-valley-v1';
const urlsToCache = [
  '/',
  '/html/home.html',
  '/html/about.html',
  '/html/products.html',
  '/html/blog.html',
  '/html/contact.html',
  '/html/certificates.html',
  '/html/calendar.html',
  '/css/common.css',
  '/css/navbar.css',
  '/css/home.css',
  '/css/responsive.css',
  '/js/common.js',
  '/js/home.js',
  '/js/i18n.js',
  '/images/logo.png',
  '/images/vegetables.png',
  '/images/fruit-plate.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(
          response => {
            // Check if valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Update Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
