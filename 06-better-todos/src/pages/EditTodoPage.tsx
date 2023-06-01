import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import { Link, useParams, useNavigate } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import { Todo } from '../types'


function EditTodoPage() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [todo, setTodo] = useState<Todo | null>(null)
	const [newTodoTitle, setNewTodoTitle] = useState("")
	const { id } = useParams()
	const todoId = Number(id)
	const navigate = useNavigate()

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

	// Change the title of a todo in the api on the edit submit
	const handleFormSubmit = async (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		if (!todo!.id) {
			return
		}

		try {
			// Update a todo in the api
			const updatedTodo = await TodosAPI.updateTodo(todo!.id, {
				title: newTodoTitle
			})

			// update todo state with the updated todo
			setTodo(updatedTodo)

			// clear newTodoTitle state
			setNewTodoTitle("")

			navigate(`/todos/${id}`, {
				replace: true,
				state: {
					message: `Todo title was successfully changed to "${newTodoTitle}"`,
				}
			})

		} catch (err: any) {
			// set error
			setError(err.message)
		}

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
			<h1>Edit Todo: "{todo.title}"</h1>

			<Form
				className='mt-3'
				onSubmit={handleFormSubmit}
			>
				<h3>Change title</h3>
				<div className='input-group'>
					<input
						type="text"
						className='form-control'
						placeholder='New title'
						onChange={e => setNewTodoTitle(e.target.value)}
						value={newTodoTitle}
						required
					/>
					<button
						type="submit"
						className="btn btn-success"
					>
						Submit
					</button>
				</div>
			</Form>

			<Button
				variant='secondary mt-3'
				onClick={() => navigate(-1)}
			>
				&laquo; Back
			</Button>
		</>
	)
}

export default EditTodoPage
