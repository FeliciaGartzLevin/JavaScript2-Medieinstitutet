import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useGetDocument from './useGetDocument'

const useGetTodo = (documentId: string) => {
	//call generic hook to get document
	return useGetDocument<Todo>(todosCol, documentId)


}

export default useGetTodo
