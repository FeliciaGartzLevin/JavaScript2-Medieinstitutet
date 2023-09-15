import { Timestamp } from "firebase/firestore"

export type Meme = {
	_id: string
	created: Timestamp
	name: string		// lolcat.png
	path: string		// memes/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png
	size: number		// 133700
	type: string		// image/png
	uid: string			// Ksm3TjvMXGaC81Qgo1Pmx0tUTfl1
	url: string			// public url to meme
}
