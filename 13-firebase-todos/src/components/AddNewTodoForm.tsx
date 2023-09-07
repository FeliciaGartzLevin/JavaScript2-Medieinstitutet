import React, { useEffect, useRef, useState } from 'react'
import { NewTodo } from '../types/Todo.types'
import CreateTodoForm from './forms/CreateTodoForm'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {
	onAddTodo: (todo: NewTodo) => void
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const [newTodoTitle, setNewTodoTitle] = useState("")
	const newTodoTitleRef = useRef<HTMLInputElement>(null)
	/*
		const handleSubmit = (e: React.FormEvent) => {
			// stop form from submitting
			e.preventDefault()

			// create a new todo and set a new todos state
			const newTodo: NewTodo = {
				title: newTodoTitle,
				completed: false,
			}
			onAddTodo(newTodo)   // <-- calls `addTodo()` in `App.tsx`

			// clear newTodoTitle state
			setNewTodoTitle("")
		} */

	// On component mount, focus on input field
	useEffect(() => {
		newTodoTitleRef.current?.focus()
	}, [])

	// console.log("AddNewTodoForm rendering...")

	return (
		<CreateTodoForm />
	)
}

export default AddNewTodoForm
