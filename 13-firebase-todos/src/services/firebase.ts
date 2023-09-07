import { initializeApp } from "firebase/app"
import { CollectionReference, DocumentData, collection, getFirestore } from "firebase/firestore"
import { Todo } from "../types/Todo.types"

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get Firestore instance
export const db = getFirestore(app)

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

// const todosCol = collection(db, "todos") as CollectionReference<Todo>
export const todosCol = createCollection<Todo>("todos")


export default app
