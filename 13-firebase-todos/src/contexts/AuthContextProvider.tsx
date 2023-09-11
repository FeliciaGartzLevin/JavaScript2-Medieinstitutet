/* eslint-disable @typescript-eslint/no-empty-function */
import {
	CompleteFn,
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
	signup: (email: string, password: string) => Promise<UserCredential>
	userEmail: string | null
	isLoggedIn: boolean
	isLoading: boolean
	// authStateErrorMsg: string | null

}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	console.log('isLoggedIn:', isLoggedIn)

	const login = (email: string, password: string) => {
		setIsLoading(true)
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		setIsLoggedIn(false)
		return signOut(auth)
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	// add auth-state observer here (somehow... 😈)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) return
			setCurrentUser(currentUser)
			setIsLoggedIn(true)
			setIsLoading(false)
			console.log('onAuthStateChanged to currentUser:', currentUser)

		})

		return () => {
			setIsLoading(true)
			setIsLoggedIn(false)
			unsubscribe
			setIsLoading(false)
		}

	}, [onAuthStateChanged])

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			signup,
			userEmail,
			isLoggedIn,
			isLoading,
			// authStateErrorMsg
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
