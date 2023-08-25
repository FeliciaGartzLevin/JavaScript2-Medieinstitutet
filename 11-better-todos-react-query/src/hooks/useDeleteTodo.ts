import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { deleteTodo as TodosAPI_deleteTodo } from '../services/TodosAPI'
import { Todos } from '../types/TodosAPI.types'

const useDeleteTodo = (
	todoId: number,
	disableQueries: () => void = () => {
		return
	}
) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => TodosAPI_deleteTodo(todoId),
		onSuccess: () => {
			// disable query for this specific single todo
			disableQueries()

			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] })

			// modify query cache for ["todos"] and construct a new array with
			// the deleted todo excluded
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return prevTodos?.filter(todo => todo.id !== todoId) ?? []
			})

			// Navigate user to `/todos` (using search params/query params)
			navigate('/todos?deleted=true', {
				replace: true,
				state: {
					deleted: true,
				}
			})
		}

	})
}

export default useDeleteTodo
