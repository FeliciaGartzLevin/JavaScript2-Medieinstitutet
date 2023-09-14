import { orderBy, where } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useStreamCollection from './useStreamCollection'

const useGetTodos = (uid = "") => {
	return useStreamCollection<Todo>(
		todosCol,
		where("uid", "==", uid),
		orderBy('completed'),
		orderBy('title')
	)
}

export default useGetTodos
