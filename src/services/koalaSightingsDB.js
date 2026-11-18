// Save koala sighting form entries to IndexDB local storage
import { openDB } from 'idb';

const DB_NAME = 'KoalaSightingsDB';
const STORE_NAME = 'sightings';

const dbPromise = openDB(DB_NAME, 1, { // opens the database, if not exist yet it creates it.
    upgrade(db) {
        db.createObjectStore(STORE_NAME, { // creates an object store
            keyPath: 'id', autoIncrement: true // uses id as primary key and generates it automatically
        });
    }
});

export async function saveSighting(sighting) { // saves completed sighting form data as an object and inserts into the database
    const db = await dbPromise;
    return db.add(STORE_NAME, sighting);
}

export async function getAllSightings() { // returns all saves sightings
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
}

export async function deleteSighting(id) { // delete a koala sighting record
    const db = await dbPromise;
    return db.delete(STORE_NAME, id);
}