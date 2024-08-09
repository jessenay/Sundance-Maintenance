import { saveSubmission } from './idb';

export const handleFormSubmit = async (url, query, formData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: formData }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error('GraphQL errors: ' + JSON.stringify(responseData.errors));
    }

    return responseData;
  } catch (error) {
    console.error('Submit failed; saving offline', error);

    // Save form submission to IndexedDB
    await saveSubmission({ query, variables: formData });

    // Register sync event
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        return registration.sync.register('sync-forms');
      }).catch((syncError) => {
        console.error('Sync registration failed', syncError);
      });
    }

    throw error; // Re-throw the error after handling offline scenario
  }
};
