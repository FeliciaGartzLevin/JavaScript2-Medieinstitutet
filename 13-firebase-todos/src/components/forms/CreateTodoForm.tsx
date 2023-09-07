import { useForm, SubmitHandler } from "react-hook-form"
import { NewTodo } from '../../types/Todo.types'
import Form from 'react-bootstrap/Form'
import { collection, addDoc } from "firebase/firestore";
import Button from 'react-bootstrap/Button'
import { db } from "../../services/firebase";
import useGetTodos from "../../hooks/useGetTodos";
import { useEffect } from "react";


const CreateTodoForm = () => {
	const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm<NewTodo>()
	const {
		data: todos,
		getData: getTodos,
		loading
	} = useGetTodos()

	const onCreateTodoSubmit: SubmitHandler<NewTodo> = async (data) => {

		// add new todo to firebase
		await addDoc(collection(db, "todos"), {
			title: data.title,
			completed: false,
		})
	}

	useEffect(() => {
		reset({
			title: "",
		})
		getTodos()
	}, [isSubmitSuccessful])

	return (
		<Form onSubmit={handleSubmit(onCreateTodoSubmit)}>
			<Form.Group className='mb-3' controlId='name'>
				<Form.Control
					type='text'
					placeholder='New todo'
					{...register('title', {
						required: true,
						minLength: 2,
						maxLength: 40,
					})}
				/>
				{errors.title && <p role="alert">Your todo must contain at least 2 letters</p>}

				<Button
					variant='success'
					type='submit'
				>
					Create
				</Button>
			</Form.Group>

		</Form>
	)
}

export default CreateTodoForm
