import React from 'react'
import { useState } from 'react'
import { Todo, Todos } from '../types'
import { useNavigate } from 'react-router-dom'
// import { Navigate } from "react-router-dom";
import * as TodosAPI from '../services/TodosAPI'
import AddNewTodoForm from '../components/AddNewTodoForm'


function CreateTodoPage() {
	const [msg, setMsg] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {

		try {
			const data = await TodosAPI.createTodo(todo)
			if (data) {
				setMsg(`Your todo: "${data.title}" has been created ✅`)
				setTimeout(() => {
					navigate('/todos', { replace: true })
				}, 2000)
			}

		} catch (err: any) {
			setError(err.message)
			console.log(err)
		}
	}

	return (
		<>
			<AddNewTodoForm onAddTodo={addTodo} />

			{msg && <div className="alert alert-success" role="alert">{msg}</div>}

			{error && <div className="alert alert-danger" role="alert">{error}</div>}

		</>

	)
}

export default CreateTodoPage
