// Service Worker - stub to prevent 404 errors
// This file intentionally left minimal

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Only handle http/https requests, ignore chrome-extension etc.
  if (!event.request.url.startsWith('http')) return;
  event.respondWith(fetch(event.request));
});
