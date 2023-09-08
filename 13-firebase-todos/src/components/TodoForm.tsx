import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TodoFormData } from '../types/Todo.types'

interface IProps {
	onSave: (data: TodoFormData) => Promise<void>
	initialValues?: TodoFormData
}

const TodoForm: React.FC<IProps> = ({ onSave, initialValues }) => {
	const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, reset } = useForm<TodoFormData>({
		defaultValues: {
			...initialValues,
			completed: initialValues?.completed ?? false,
		},
	})

	const onFormSubmit: SubmitHandler<TodoFormData> = async (data: TodoFormData) => {
		// Pass form data along to parent component
		// console.log(data)
		await onSave(data)
	}

	useEffect(() => {
		// Reset form when submit is successful
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className='mb-3'>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					{...register('title', {
						required: "You have to write something at least...",
						minLength: {
							value: 5,
							message: "That's too short to be a todo, better do it right now instead!"
						},
					})}
				/>
				{errors.title && <p className="invalid">{errors.title.message ?? "Invalid value"}</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="completed">
				<Form.Label>Completed</Form.Label>
				<Form.Check
					type="checkbox"
					{...register('completed')}
				/>
				{errors.completed && <p className="invalid">{errors.completed.message ?? "Invalid value"}</p>}
			</Form.Group>

			<Button variant="primary" type="submit">
				Save
			</Button>
		</Form>
	)
}

export default TodoForm
