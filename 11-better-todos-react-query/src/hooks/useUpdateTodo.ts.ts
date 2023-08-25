import { useQueryClient, useMutation } from '@tanstack/react-query'
import * as TodosAPI from '../services/TodosAPI'
import { PartialTodo, Todo } from '../types/TodosAPI.types'

// defaulta en tom funktion  = () => {}
const useUpdateTodo = (
	todoId: number,
	onSuccess: (todo: Todo) => void = () => { return }
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: PartialTodo) =>
			TodosAPI.updateTodo(todoId, data),
		onSuccess: (updatedTodo) => {
			// set the response from the mutation as the query cache for the specific single todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo)

			queryClient.refetchQueries({ queryKey: ["todos"] })

			// call onSuccess-method passed to our custom hook
			// optional, defaults to empty function
			onSuccess(updatedTodo)
		},
	})
}

export default useUpdateTodo
