import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useParams } from "react-router-dom"
import { Todo } from "../types/Todo.types"
import ConfirmationModal from "../components/ConfirmationModal"

const todo: Todo = {
	id: "133713371337",
	title: "Learn to fake better data 😅",
	completed: true,
}

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const { id } = useParams()
	const todoId = Number(id)

	return (
		<>
			<h1>{todo.title}</h1>

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? "Completed" : "Not completed"}
			</p>

			<div className="buttons mb-3">
				<Button
					variant="success"
					onClick={() => console.log("Would toggle todo")}
				>
					Toggle
				</Button>

				<Link to={`/todos/${todoId}/edit`}>
					<Button variant="warning">Edit</Button>
				</Link>

				<Button
					variant="danger"
					onClick={() => setShowConfirmDelete(true)}
				>
					Delete
				</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={() =>
					console.log("Would delete todo with id:", todoId)
				}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
