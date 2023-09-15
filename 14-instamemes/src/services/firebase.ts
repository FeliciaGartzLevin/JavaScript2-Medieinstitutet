import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { CollectionReference, collection, DocumentData, getFirestore } from "firebase/firestore"
import { Meme } from "../types/Meme.types"

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get Auth instance
export const auth = getAuth(app)

// Get Firestore instance
export const db = getFirestore(app)

// Get Storage instance
export const storage = getStorage(app)

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

// Export collection references
export const memesCol = createCollection<Meme>("memes")

export default app
