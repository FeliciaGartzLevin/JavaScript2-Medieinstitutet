import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'
import useGetTodo from '../hooks/useGetTodo'
import { todosCol } from '../services/firebase'
import { toast } from 'react-toastify'
import TodoForm from '../components/TodoForm'
import { TodoFormData } from '../types/Todo.types'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const documentId = id as string

	const {
		data: todo,
		loading
	} = useGetTodo(documentId)

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	const updateTodo = async (data: TodoFormData) => {
		// Get a reference to the document
		const docRef = doc(todosCol, documentId)

		// Set the contents of the document
		toast.promise(updateDoc(docRef, {
			...data,
			updated_at: serverTimestamp(),
		}), {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo was saved successfully",
			error: "😬 Unable to save todo"
		})

	}

	return (
		<>
			<h1>Edit: {todo.title}</h1>
			<TodoForm onSave={updateTodo} initialValues={todo} />
			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>

		</>
	)
}

export default EditTodoPage
