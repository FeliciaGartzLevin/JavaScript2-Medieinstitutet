import React from 'react'
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ListGroup from "react-bootstrap/ListGroup"
import { Todo } from '../../types/Todo.types'

type TodoListProps = {
	onDelete: (id: string) => void
	onToggle: (id: string) => void
	todos: Todo[]
}

const TodoList: React.FC<TodoListProps> = ({
	onDelete,
	onToggle,
	todos,
}) => {
	return (
		<ListGroup className="todolist" role="list">
			{todos.map((todo) => (
				<ListGroup.Item
					key={todo.id}
					className={todo.completed ? "done" : ""}
					role="listitem"
				>
					<span className="todo-title">{todo.title}</span>
					<ButtonGroup>
						<Button
							variant="outline-success"
							size="sm"
							onClick={() => onToggle(todo.id)}
						>
							{todo.completed ? "Undo" : "Done"}
						</Button>
						<Button
							variant="outline-danger"
							size="sm"
							onClick={() => onDelete(todo.id)}
						>
							Delete
						</Button>
					</ButtonGroup>
				</ListGroup.Item>
			))}
		</ListGroup>
	)
}

export default TodoList
