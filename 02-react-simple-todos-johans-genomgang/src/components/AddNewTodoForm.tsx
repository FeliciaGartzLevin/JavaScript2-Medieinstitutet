import React, { useState } from 'react'
import { Todo } from '../types'

interface IProps {
	onAddTodo: (todo: Todo) => void
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const [newTodoTitle, setNewTodoTitle] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// create a new todo and set a new todos state
		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}


		// Man kan skapa svårfunna buggar om man kan setta en state ute i componenterna,
		// så detta gör vi inte här, utan skickar ut datan till 'App' så att setState sker enbart där.
		// setTodos([...todos, newTodo]) // <------ detta ska inte vara här (se ovan)

		// Vi skriver såhär istället:
		onAddTodo(newTodo)   // <-- calls `addTodo()` in `App.tsx`

		// clear newTodoTitle state
		setNewTodoTitle("")
	}

	return (
		<form onSubmit={handleSubmit} className="mb-3">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Todo title"
					onChange={e => setNewTodoTitle(e.target.value)}
					value={newTodoTitle}
				/>

				<button
					disabled={!newTodoTitle.trim()}
					type="submit"
					className="btn btn-success"
				>Create</button>
			</div>
		</form>
	)
}

export default AddNewTodoForm
