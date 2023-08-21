import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { Todo } from '../types/TodosAPI.types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const createPostMutation = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: (data) => {
			queryClient.setQueryData(['todos', data.id], data)
			queryClient.invalidateQueries(['todos'], { exact: true })
		}
	})

	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {

		createPostMutation.mutate(todo)

		if (createPostMutation.isError) {
			return
		}

		setTimeout(() => {
			navigate("/todos")
		}, 2000)
	}

	return (
		<>
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{createPostMutation.isSuccess && (
				<Alert variant="success" className="mt-3">Todo created!</Alert>
			)}

			{createPostMutation.isError && (
				<Alert variant="warning" className="mt-3">Todo could not be created 😔</Alert>
			)}
		</>
	)
}

export default CreateTodoPage
