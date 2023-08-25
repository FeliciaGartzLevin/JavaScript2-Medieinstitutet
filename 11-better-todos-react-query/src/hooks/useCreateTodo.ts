import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createTodo as TodosAPI_createTodo } from '../services/TodosAPI'
import { Todos } from '../types/TodosAPI.types'

const useCreateTodo = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: TodosAPI_createTodo,
		onSuccess: (newTodo) => {
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return [
					...prevTodos ?? [],
					newTodo,
				]
			})

			// also insert the new todo into the query cache
			queryClient.setQueryData(["todo", { id: newTodo.id }], newTodo)

			setTimeout(() => {
				navigate("/todos")
			}, 2000)
		}
	})
}

export default useCreateTodo
