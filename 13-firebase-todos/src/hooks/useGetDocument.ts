import { CollectionReference, DocumentData, doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

const useGetDocument = <T>(colRef: CollectionReference<T>, documentId: string) => {
	const [data, setData] = useState<DocumentData | null>(null)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	// Get todo
	const getData = useCallback(async () => {
		setError(false)
		setLoading(true)

		const docRef = doc(colRef, documentId)
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
	}, [colRef, documentId])

	// Get data on component mount
	useEffect(() => {
		getData()
	}, [getData])

	return {
		data,
		getData,
		loading,
		error,
	}

}

export default useGetDocument
