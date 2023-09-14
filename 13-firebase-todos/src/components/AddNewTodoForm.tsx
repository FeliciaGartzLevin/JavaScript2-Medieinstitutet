import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TodoFormData } from '../types/Todo.types'

interface IProps {
	onAddTodo: (data: TodoFormData) => Promise<void>
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, reset } = useForm<TodoFormData>()

	const onFormSubmit: SubmitHandler<TodoFormData> = async (data: TodoFormData) => {
		// Pass form data along to parent component
		await onAddTodo(data)   // <-- calls `addTodo()` in `App.tsx`
	}

	useEffect(() => {
		// Reset form when submit is successful
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
			<InputGroup>
				<Form.Control
					type="text"
					className="form-control"
					aria-label="The title of the new Todo"
					{...register('title', {
						required: "You have to write something at least...",
						minLength: {
							value: 5,
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
