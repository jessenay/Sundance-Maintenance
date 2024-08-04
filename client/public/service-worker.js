const CACHE_NAME = 'sundance-lift-maintenance-cache-v2'; // Change the version number on each deployment
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
