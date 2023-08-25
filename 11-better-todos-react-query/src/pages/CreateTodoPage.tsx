import Alert from 'react-bootstrap/Alert'
import { NewTodo } from '../types/TodosAPI.types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import useCreateTodo from '../hooks/useCreateTodo'

const CreateTodoPage = () => {

	const createPostMutation = useCreateTodo()

	// Create a new todo in the API
	const addTodo = async (todo: NewTodo) => {
		await createPostMutation.mutateAsync(todo)
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
