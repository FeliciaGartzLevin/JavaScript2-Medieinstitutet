import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import useUpdateTodo from '../hooks/useUpdateTodo.ts'
import useTodo from '../hooks/useTodo.ts'

const EditTodoPage = () => {
	const [newTodoTitle, setNewTodoTitle] = useState("")
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const {
		data: todo,
		isError: error,
		isLoading: loading,
		refetch: getTodo
	} = useTodo(todoId)

	const updateTodoTitleMutation = useUpdateTodo(todoId, () => {
		// redirect user to /todos/:id
		navigate(`/todos/${todoId}`)
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!todo || !todo.id) {
			return
		}

		// Update a todo in the api
		updateTodoTitleMutation.mutate({ title: newTodoTitle, completed: false })

	}

	useEffect(() => {
		if (todo) {
			setNewTodoTitle(todo.title)
		}
	}, [todo])

	if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant='primary' onClick={() => getTodo}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	if (loading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						onChange={(e: any) => setNewTodoTitle(e.target.value)}
						value={newTodoTitle}
					/>
				</Form.Group>

				<Button variant="primary" type="submit" disabled={updateTodoTitleMutation.isLoading}>
					Save
				</Button>
			</Form>

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
