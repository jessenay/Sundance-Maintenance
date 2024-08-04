import { openDB } from 'idb';

const DB_NAME = 'sundance-lift-maintenance';
const STORE_NAME = 'submissions';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const saveSubmission = async (data) => {
  const db = await dbPromise;
  await db.add(STORE_NAME, data);
};

export const getAllSubmissions = async () => {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
};

export const deleteSubmission = async (id) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
};
