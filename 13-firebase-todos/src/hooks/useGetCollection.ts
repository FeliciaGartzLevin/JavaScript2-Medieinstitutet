import { useEffect, useState } from 'react'
import { CollectionReference, getDocs } from 'firebase/firestore'

const useGetCollection = <T>(colRef: CollectionReference<T>) => {
	const [data, setData] = useState<T[] | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const getData = async () => {
		setLoading(true)

		// get query snapshot of collection
		const snapshot = await getDocs(colRef)

		if (!snapshot.docs) {
			setData(null)
			setLoading(false)
			setError(true)
			return
		}
		// loop over all docs
		const data: T[] = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id,
			}
		})

		setData(data)
		setLoading(false)
	}
	// Get data on component mount
	useEffect(() => {
		getData()
	}, [])

	return {
		data,
		loading,
		error,
		getData

	}
}

export default useGetCollection
