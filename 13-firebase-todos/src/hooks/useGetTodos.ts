
import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useGetCollection from './useGetCollection'

const useGetTodos = () => {
	//call generic hook to get collection
	return useGetCollection<Todo>(todosCol)

}

export default useGetTodos
