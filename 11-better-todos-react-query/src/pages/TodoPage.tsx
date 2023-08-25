import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Todo, Todos } from '../types/TodosAPI.types'
import * as TodosAPI from '../services/TodosAPI'
import ConfirmationModal from '../components/ConfirmationModal'
import useTodo from '../hooks/useTodo'
import useUpdateTodo from '../hooks/useUpdateTodo.ts'

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true)
	const queryClient = useQueryClient()
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const {
		data: todo,
		isError,
		isLoading,
		refetch: getTodo,
	} = useTodo(todoId, queryEnabled)


	const deletePostMutation = useMutation({
		mutationFn: () => TodosAPI.deleteTodo(todoId),
		onSuccess: () => {
			// disable query for this specific single todo
			setQueryEnabled(false)

			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] })
			// invalidate the query for all todos
			// queryClient.invalidateQueries(['todos'])

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

	const togglePostMutation = useUpdateTodo(todoId)

	// Toggle the completed status of a todo in the api
	const toggleTodo = (todo: Todo) => {
		// Update a todo in the api
		togglePostMutation.mutate({ completed: !todo.completed })
	}

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>It wasn't me that did something /the server</p>

				<Button variant='primary' onClick={() => getTodo()}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	if (isLoading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div className="buttons mb-3">
				<Button
					variant='success'
					disabled={togglePostMutation.isLoading}
					onClick={() => toggleTodo(todo)}
				>
					Toggle
				</Button>

				<Link to={`/todos/${todoId}/edit`}>
					<Button variant='warning'>Edit</Button>
				</Link>

				<Button variant='danger' onClick={() => setShowConfirmDelete(true)}>Delete</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={() => !deletePostMutation.isLoading && deletePostMutation.mutate()}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
