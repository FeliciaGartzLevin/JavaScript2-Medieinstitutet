import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { todosCol } from '../services/firebase'
import { Todos } from '../types/Todo.types'

const useGetTodos = () => {
	const [data, setData] = useState<Todos | null>(null)
	const [loading, setLoading] = useState(true)

	// Get todos
	const getData = async () => {
		setLoading(true)

		// get query snapshot of collection
		const snapshot = await getDocs(todosCol)

		// loop over all docs
		const data: Todos = snapshot.docs.map(doc => {
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
		getData,
		loading,
	}
}

export default useGetTodos
