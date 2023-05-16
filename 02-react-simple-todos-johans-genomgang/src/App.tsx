import { useEffect, useState } from 'react'
import TodoCounter from './components/TodoCounter'
import AddNewTodoForm from './components/AddNewTodoForm'
import ATodoList from './components/ATodoList'
import { Todo, TodoList } from './types'
import './assets/scss/App.scss'
import { getTodos, createTodo, delTodo, patchTodo } from './services/TodosAPI'

function App() {
	const [todos, setTodos] = useState<TodoList>([])

	// steg 1. WS.gör en async/await function och kalla på getTodos() ✅

	const fetchCommands = () => {
		if (!todos) {
			return
		}

		const fetchTodos = async () => {
			try {
				const payload = await getTodos()

				setTodos(payload)
			} catch (e: any) {
				console.log(e)
			}
		}
		fetchTodos()
	}

	useEffect(() => {
		fetchCommands()

	}, [])

	const addTodo = async (newTodo: Todo) => {
		// setTodos([...todos, newTodo])

		try {
			await createTodo(newTodo)

		} catch (e: any) {
			console.log(e)
		}

		fetchCommands()

	}

	const deleteTodo = async (todoToDelete: Todo) => {
		// fetchCommands() //behövs detta verkligen? onödig hämtning?
		const todoDel = todos.find(todo => todo === todoToDelete)
		if (!todoDel) return
		await delTodo(todoDel.id!.toString())

		fetchCommands()
	}

	const toggleTodo = async (todo: Todo) => {
		if (!todo) return
		todo.completed = !todo.completed
		await patchTodo(todo.id!.toString(), todo)

		// setTodos([...todos])

		fetchCommands()
	}

	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

	return (
		<div className="container text-light">
			<h1 className="mb-3">React Simple Todos</h1>

			<AddNewTodoForm
				onAddTodo={addTodo}
			/>

			{todos.length > 0 && (
				<>
					<ATodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={unfinishedTodos}
					/>

					<ATodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={finishedTodos}
					/>

					<TodoCounter
						todos={todos}
						finishedTodos={finishedTodos} //johan föreslår att bara skicka in arrayerna.length så att vi inte skickar in mer data än nödvändigt
					/>

				</>
			)}

			{todos.length === 0 && (
				<p>No todos to do. Take a rest 😊</p>
			)}

		</div>
	)
}

export default App
