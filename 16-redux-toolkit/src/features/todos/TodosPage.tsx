import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { toast } from "react-toastify"
import { v4 as uuid } from "uuid"
import { TodoFormData } from "../../types/Todo.types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import TodoForm from "./TodoForm"
import { add, remove, toggle } from "./todosSlice"

const TodosPage = () => {
	const dispatch = useAppDispatch()
	const todos = useAppSelector(state => state.todos)

	const handleAddTodo = async (data: TodoFormData) => {
		dispatch(add({
			id: uuid(),
			...data,
		}))

		// 🥂
		toast.success("Yay, even MORE stuff to do... 😁")
	}

	const handleToggle = async (id: string) => {
		dispatch(toggle(id))

		// 🥂
		toast.success("Yay, you did something... 😁")
	}

	const handleDelete = async (id: string) => {
		dispatch(remove(id))

		// 🥂
		toast.success("Deleting stuff instead of doing them still counts... 🏆")
	}

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
			</div>

			<TodoForm onSave={handleAddTodo} />

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							key={todo.id}
							className={todo.completed ? "done" : ""}
						>
							<span className="todo-title">{todo.title}</span>
							<ButtonGroup>
								<Button
									variant="outline-success"
									size="sm"
									onClick={() => handleToggle(todo.id)}
								>
									{todo.completed ? "Undo" : "Done"}
								</Button>
								<Button
									variant="outline-danger"
									size="sm"
									onClick={() => handleDelete(todo.id)}
								>
									Delete
								</Button>
							</ButtonGroup>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</Container>
	)
}

export default TodosPage
