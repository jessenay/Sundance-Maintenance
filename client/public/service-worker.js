const CACHE_NAME = 'sundance-lift-maintenance-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/images/flatheadPicture.png',
  '/assets/images/jakesPicture.png',
  '/assets/images/outlawPicture.png',
  '/assets/images/redsPicture.png',
  '/assets/images/stairwayPicture.png',
  '/assets/images/sundancePicture.png',
  '/assets/images/wildwoodPicture.png',
  '/assets/index-1a97e031.css',
  '/assets/index-e53f8e79.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.webmanifest',
  '/registerSW.js',
  '/service-worker.js',
  '/sw.js',
  '/vite.svg',
  '/workbox-c46461b8.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(error => {
        console.error('Failed to cache', error);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

const syncForms = async () => {
  const forms = await getFromIndexedDB('formSubmissions');
  for (const form of forms) {
    try {
      await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: form.query, variables: form.formData }),
      });
      await removeFromIndexedDB('formSubmissions', form.id);
    } catch (error) {
      console.error('Sync failed for form', form, error);
    }
  }
};

const getFromIndexedDB = async (key) => {
  const db = await openDB('sundance-maintenance-db', 1);
  const tx = db.transaction(key, 'readonly');
  const store = tx.objectStore(key);
  const forms = await store.getAll();
  await tx.done;
  return forms;
};

const removeFromIndexedDB = async (key, id) => {
  const db = await openDB('sundance-maintenance-db', 1);
  const tx = db.transaction(key, 'readwrite');
  await tx.objectStore(key).delete(id);
  await tx.done;
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' }).then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}
