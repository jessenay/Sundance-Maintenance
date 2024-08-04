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
  const forms = await getFromLocalStorage('formSubmissions');
  for (const form of forms) {
    try {
      await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      removeFromLocalStorage('formSubmissions', form);
    } catch (error) {
      console.error('Sync failed for form', form, error);
    }
  }
};

const getFromLocalStorage = async (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const removeFromLocalStorage = (key, form) => {
  const existingData = JSON.parse(localStorage.getItem(key)) || [];
  const updatedData = existingData.filter((item) => item !== form);
  localStorage.setItem(key, JSON.stringify(updatedData));
};
