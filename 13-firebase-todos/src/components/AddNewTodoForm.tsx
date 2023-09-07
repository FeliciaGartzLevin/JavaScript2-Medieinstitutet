import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewTodo } from '../types/Todo.types'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

interface IProps {
	onAddTodo: (todo: NewTodo) => Promise<void>
}

type FormData = {
	title: string
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm<FormData>()

	const onCreateTodoSubmit: SubmitHandler<FormData> = async (data: FormData) => {

		// create a new todo-object
		const newTodo: NewTodo = {
			title: data.title,
			completed: false,
		}
		await onAddTodo(newTodo)   // <-- calls `addTodo()` in `TodosPage.tsx`

	}

	useEffect(() => {
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onCreateTodoSubmit)} className="mb-3">
			<InputGroup>
				<Form.Control
					type="text"
					className="form-control"
					aria-label="The title of the new Todo"
					{...register('title', {
						required: "You have to write something at least...",
						minLength: {
							value: 2,
							message: "That's too short to be a todo, better do it right now instead!"
						},
					})}
				/>

				<Button
					type="submit"
					variant="success"
				>Create</Button>
			</InputGroup>
			{errors.title && <p className="text-danger">{errors.title.message ?? "Invalid value"}</p>}
		</Form>
	)
}

export default AddNewTodoForm
