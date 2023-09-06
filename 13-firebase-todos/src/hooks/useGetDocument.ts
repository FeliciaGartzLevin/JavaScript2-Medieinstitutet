import { DocumentData, doc, getDoc } from 'firebase/firestore'
import { createCollection } from '../services/firebase'
import { useEffect, useState } from 'react'

const useGetDocument = (collectionName: string, documentId: string) => {
	const [data, setData] = useState<DocumentData | null>(null)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	// Get todo
	const getData = async (documentId: string) => {
		setError(false)
		setLoading(true)

		const docRef = doc(createCollection<DocumentData>(collectionName), documentId)
		const docSnapshot = await getDoc(docRef)

		if (!docSnapshot.exists()) {
			setData(null)
			setError(true)
			setLoading(false)
			return
		}

		const data: DocumentData = {
			...docSnapshot.data(),
			_id: docSnapshot.id,
		}

		setData(data)
		setLoading(false)
	}

	// Get data on component mount
	useEffect(() => {
		getData(documentId)
	}, [documentId])

	return {
		data,
		getData,
		loading,
		error,
	}

}

export default useGetDocument
