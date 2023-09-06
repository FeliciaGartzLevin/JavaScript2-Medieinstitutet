import { useEffect, useState } from 'react'
import { DocumentData, getDocs } from 'firebase/firestore'
import { createCollection } from '../services/firebase'

const useGetCollection = (collectionName: string) => {
	const [data, setData] = useState<DocumentData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	// Get todos
	const getData = async () => {
		setLoading(true)

		// get query snapshot of collection
		const snapshot = await getDocs(createCollection<DocumentData>(collectionName))

		if (!snapshot.docs) {
			setData(null)
			setLoading(false)
			setError(true)
			return
		}
		// loop over all docs
		const data: DocumentData = snapshot.docs.map(doc => {
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
