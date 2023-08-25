import { useQuery } from '@tanstack/react-query'
import { getTodo as TodosAPI_getTodo } from '../services/TodosAPI'

const useTodo = (todoId: number, queryEnabled = true) => {
	return useQuery(["todo", { id: todoId }], () => TodosAPI_getTodo(todoId), { enabled: queryEnabled })
}

export default useTodo
