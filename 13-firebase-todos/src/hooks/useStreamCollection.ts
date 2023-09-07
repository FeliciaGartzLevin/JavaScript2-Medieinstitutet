import { CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useStreamCollection = <T>(colRef: CollectionReference<T>) => {
	const [data, setData] = useState<T[] | null>(null)
	const [loading, setLoading] = useState(true)

	// Get data on component mount
	useEffect(() => {
		// Subscribe to changes in the collection
		const unsubscribe = onSnapshot(colRef, (snapshot) => {
			// loop over all docs
			const data: T[] = snapshot.docs.map(doc => {
				return {
					...doc.data(),
					_id: doc.id,
				}
			})

			setData(data)
			setLoading(false)
		})

		// Return unsubscribe function as cleanup
		return unsubscribe
	}, [colRef])

	return {
		data,
		loading,
	}
}

export default useStreamCollection
