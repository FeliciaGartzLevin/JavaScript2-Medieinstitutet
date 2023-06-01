import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import { Todo } from '../types'

const TodoPage = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [todo, setTodo] = useState<Todo | null>(null)
	const [confirm, setConfirm] = useState(false)
	const { id } = useParams()
	const todoId = Number(id)
	const navigate = useNavigate()
	const location = useLocation()

	// Get todo from API
	const getTodo = async (id: number) => {
		setError(null)
		setLoading(true)

		try {
			// call TodosAPI
			const data = await TodosAPI.getTodo(id)

			// update todo state with data
			setTodo(data)

		} catch (err: any) {
			// set error
			setError(err.message)
		}

		setLoading(false)
	}

	// Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		setConfirm(false)

		if (!todo.id) {
			return
		}

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		// Redirect to `/todos`, carrying a message
		navigate('/todos', {
			replace: true,
			state: {
				message: `Todo "${todo.title}" was successfully deleted`
			}
		})

	}

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		const updatedTodo = await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})
		/*
			// Get the updated todos from the api
			await getTodo(todo.id)
			*/

		// Använd istället responsen för att uppdatera todo-staten,
		// för att undvika att hämta en gång till i onödan:

		// update todo state with the updated todo
		setTodo(updatedTodo)
	}

	useEffect(() => {
		if (typeof todoId !== "number") return
		getTodo(todoId)
	}, [todoId])


	if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>
			</Alert>
		)
	}

	if (loading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			{
				location.state?.message && (
					<Alert variant='success'>
						{location.state.message}
					</Alert>
				)
			}

			{confirm &&
				<Alert variant='danger'>
					Do you really want to delete this todo? This is irrevocable.
					<div className="d-flex">
						<Button
							variant='warning mt-3 mx-1'
							onClick={() => setConfirm(false)}
						>
							Cancel
						</Button>

						<Button
							variant='danger mt-3'
							onClick={() => deleteTodo(todo)}
						>
							Yes, delete
						</Button>

					</div>

				</Alert>
			}

			<div className='d-inline-flex'>

				<Button
					variant='success'
					className='m-2'
					onClick={() => toggleTodo(todo)}
				>
					{todo.completed
						? (<span>Mark as uncompleted ☑</span>)
						: (<span>Mark as completed ✅</span>)
					}

				</Button>

				<Link to={`/todos/${todoId}/edit`}>
					<Button
						variant='warning'
						className='m-2'
					>
						Edit
					</Button>
				</Link>

				<Button
					variant='danger'
					className='m-2'
					onClick={() => setConfirm(true)}
				>
					Delete todo ❌
				</Button>
			</div >
			<div className='mt-3'>
				<Link
					to={`/todos`}
				>
					<Button
						variant='secondary'
					>
						&laquo; All todos
					</Button>
				</Link>
			</div>
		</>
	)
}

export default TodoPage
