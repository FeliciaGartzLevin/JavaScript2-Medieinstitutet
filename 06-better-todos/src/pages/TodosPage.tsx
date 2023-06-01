import { useEffect, useState } from 'react'
import { Todo, Todos } from '../types'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import { Alert } from 'react-bootstrap'

const TodosPage: React.FC = () => {
	const [todos, setTodos] = useState<Todos>([])
	const location = useLocation()
	const [completedTodos, setCompletedTodos] = useState<Todos>([])

	// Get todos from api
	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
	}

	// fetch todos when App is being mounted
	useEffect(() => {
		getTodos()
	}, [])

	return (
		<>
			<h1 className="mb-3">Todos</h1>


			{
				location.state?.message && (
					<Alert variant='success'>
						{location.state.message}
					</Alert>
				)
			}


			{todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						<h3>Not completed</h3>
						{todos
							.filter(todo => !todo.completed)
							.sort((a, b) =>
								a.title > b.title
									? 1
									: -1)
							.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									key={todo.id}
									className={todo.completed ? 'done' : ''}
									to={`/todos/${todo.id}`}
								>
									{todo.title}
								</ListGroup.Item>
							))}
					</ListGroup>

					<ListGroup className="todolist mt-2">
						<h3>Completed</h3>
						{todos
							.filter(todo => todo.completed)
							.sort((a, b) =>
								a > b
									? 1
									: -1)
							.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									key={todo.id}
									className={todo.completed ? 'done' : ''}
									to={`/todos/${todo.id}`}
								>
									{todo.title}
								</ListGroup.Item>
							))}
					</ListGroup>
				</>
			)}

			{todos.length === 0 && (
				<p>You have no todos to do. Have a rest 🌞</p>
			)}
		</>
	)
}

export default TodosPage
