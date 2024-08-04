// Import idb library for IndexedDB (make sure to include the idb library in your project)
import { openDB } from 'idb';

const CACHE_NAME = 'sundance-lift-maintenance-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add more assets to cache here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map(url => {
          return fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            return cache.put(url, response);
          }).catch(error => {
            console.error('Failed to cache', url, error);
          });
        })
      );
    }).catch(error => {
      console.error('Failed to open cache', error);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

const syncForms = async () => {
  const db = await openDB('formSubmissions', 1);
  const tx = db.transaction('submissions', 'readonly');
  const store = tx.objectStore('submissions');
  const forms = await store.getAll();
  
  for (const form of forms) {
    try {
      await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      await db.delete('submissions', form.id); // Remove from IndexedDB after successful submission
    } catch (error) {
      console.error('Sync failed for form', form, error);
    }
  }
};

// Initialize IndexedDB
self.addEventListener('activate', (event) => {
  event.waitUntil(
    openDB('formSubmissions', 1, {
      upgrade(db) {
        db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true });
      },
    })
  );
});
