import { useState } from 'react'
import TodoCounter from './components/TodoCounter'
import AddNewTodoForm from './components/AddNewTodoForm'
import ATodoList from './components/ATodoList'
import { Todo, TodoList } from './types'
import './assets/scss/App.scss'

function App() {
	const [todos, setTodos] = useState<TodoList>([
		{ title: "Make coffee", completed: true },
		{ title: "Drink coffee", completed: false },
		{ title: "Drink MOAR coffee", completed: false },
		{ title: "Drink ALL THE coffee", completed: false },
	])
	const addTodo = (newTodo: Todo) => {
		setTodos([...todos, newTodo])
	}

	const deleteTodo = (todoToDelete: Todo) => {
		// set a new list of todos where the clicked todo is excluded
		setTodos(todos.filter(todo => todo !== todoToDelete))
	}

	const toggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
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
				<p>Yayyy, you have 0 todos to do</p>
			)}

		</div>
	)
}

export default App
