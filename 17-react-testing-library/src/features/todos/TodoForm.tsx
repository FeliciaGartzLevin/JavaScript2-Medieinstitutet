import React, { useEffect } from "react"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { useForm, SubmitHandler } from "react-hook-form"
import { TodoFormData } from "../../types/Todo.types"

interface IProps {
	onSave: (data: TodoFormData) => Promise<void>
	initialValues?: TodoFormData
}

const TodoForm: React.FC<IProps> = ({ onSave, initialValues }) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm<TodoFormData>({
		defaultValues: {
			...initialValues,
			completed: initialValues?.completed ?? false,
		},
	})

	const onFormSubmit: SubmitHandler<TodoFormData> = async (
		data: TodoFormData
	) => {
		// Pass form data along to parent component
		await onSave(data)
	}

	useEffect(() => {
		// Reset form when submit is successful
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-4">
			<InputGroup>
				<Form.Control
					placeholder="What do you need to do?"
					aria-label="What do you need to do?"
					aria-describedby="button-save"
					// disabled
					type="text"
					{...register("title", {
						required: "You have to write something at least...",
						minLength: {
							value: 5,
							message:
								"That's too short to be a todo, better do it right now instead!",
						},
					})}
				/>
				<Button variant="primary" type="submit" id="button-save">
					Save
				</Button>
				<Button variant="secondary" type="reset" id="button-reset">
					Reset
				</Button>
			</InputGroup>
			{errors.title && (
				<p className="invalid">
					{errors.title.message ?? "Invalid value"}
				</p>
			)}
		</Form>
	)
}

export default TodoForm
