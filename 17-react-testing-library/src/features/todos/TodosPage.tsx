import Container from "react-bootstrap/Container"
import { toast } from "react-toastify"
import { v4 as uuid } from "uuid"
import { TodoFormData } from "../../types/Todo.types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import TodoCounter from "./TodoCounter"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
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
				<TodoList
					onDelete={handleDelete}
					onToggle={handleToggle}
					todos={todos}
				/>
			)}

			{todos && <TodoCounter count={todos.filter(todo => !todo.completed).length} />}
		</Container>
	)
}

export default TodosPage
