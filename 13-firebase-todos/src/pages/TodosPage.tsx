import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import AddNewTodoForm from "../components/AddNewTodoForm"
import useGetTodos from '../hooks/useGetTodos'
import { newTodosCol } from '../services/firebase'
import { NewTodoFormData } from "../types/Todo.types"

const TodosPage = () => {
	const {
		data: todos,
		getData: getTodos,
		loading
	} = useGetTodos()

	// Create a new todo in the API
	const addTodo = async (data: NewTodoFormData) => {
		// Add a new document with a generated ID
		const docRef = doc(newTodosCol)

		// Set the contents of the document
		await setDoc(docRef, {
			title: data.title,
			completed: false,
			created_at: serverTimestamp(),
			updated_at: serverTimestamp(),
		})

		// 🥂
		toast.success("Yay, even MORE stuff to do... 😁")
	}

	return (
		<>
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
				<Button variant="primary" onClick={() => getTodos()}>Refresh</Button>
			</div>

			<AddNewTodoForm onAddTodo={addTodo} />

			{loading && <p>Loading todos...</p>}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo._id}
							className={todo.completed ? "done" : ""}
							to={`/todos/${todo._id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
