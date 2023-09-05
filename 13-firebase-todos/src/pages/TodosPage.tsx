import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo, Todos } from "../types/Todo.types"

const todos: Todos = [
	{
		id: "14c9b3244b4a",
		title: "Learn React 😊",
		completed: true,
	},
	{
		id: "5e584050fc4f",
		title: "Learn Firebase 🔥",
		completed: false,
	},
	{
		id: "d3329c34dc67",
		title: "Profit 💰",
		completed: false,
	},
	{
		id: "44fd9cc7e1a4",
		title: "Take over the world 😈",
		completed: false,
	},
]

const TodosPage = () => {
	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		// 👻
		console.log("Would add a new todo:", todo)
	}

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? "done" : ""}
							to={`/todos/${todo.id}`}
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
