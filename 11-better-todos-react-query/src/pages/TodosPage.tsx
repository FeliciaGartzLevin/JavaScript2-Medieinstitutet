import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NewTodo } from '../types/TodosAPI.types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import AddNewTodoForm from '../components/AddNewTodoForm'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import * as TodosAPI from '../services/TodosAPI'

const TodosPage = () => {
	const location = useLocation()
	const queryClient = useQueryClient()
	const [searchParams, setSearchParams] = useSearchParams()
	const searchParams_deletedTodo = searchParams.get("deleted")
	const deletedTodo = Boolean(searchParams_deletedTodo)

	const {
		data: todos,
		isError,
	} = useQuery(['todos'], TodosAPI.getTodos)

	const createPostMutation = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: (data) => {
			queryClient.setQueryData(['todos', data.id], data)
			queryClient.invalidateQueries(['todos'], { exact: true })
		}
	})

	// // sort alphabetically by title
	// data.sort((a, b) => a.title.localeCompare(b.title))

	// // sort by completed status
	// data.sort((a, b) => Number(a.completed) - Number(b.completed))

	// Create a new todo in the API
	const addTodo = async (todo: NewTodo) => {
		// await TodosAPI.createTodo(todo)
		createPostMutation.mutate(todo)
	}

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)}

			{deletedTodo && (
				<AutoDismissingAlert variant="success" hideAfter={3}>
					Todo was successfully deleted
				</AutoDismissingAlert>
			)}

			{isError && (
				<Alert variant="danger">
					An terrible, inexplicable error occurred while fetching todos. It wasn't me!
				</Alert>
			)}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map(todo => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? 'done' : ''}
							to={`/todos/${todo.id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
