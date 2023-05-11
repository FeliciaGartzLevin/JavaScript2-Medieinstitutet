import { useState } from 'react'
import './App.css'

type Todo = {
	title: string,
	completed: boolean,
}


function App() {

	const [todos, setTodos] = useState<Todo[]>([
		{ title: 'Do laundry', completed: true, },
		{ title: 'Cultivate plants', completed: true, },
		{ title: 'Go hiking', completed: false, },
	])
	const [completed, setCompletedStatus] = useState(false)
	// input state
	const [newTodoTitle, setNewTodoTitle] = useState("")

	const handleCompletedToggle = (todo: Todo) => {
		setCompletedStatus(todo.completed = !todo.completed)
		setTodos([...todos])

	}

	const handleDeleteTodo = (todoToDelete: Todo) => {
		setTodos(todos.filter(todo => todo !== todoToDelete))
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// add a new todo to the todos state
		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}

		setTodos([...todos, newTodo])


		// clear newTodoTitle state
		setNewTodoTitle("")
	}

	const completedTodos = todos.filter(todo => todo.completed)

	return (
		<>
			<form onSubmit={handleFormSubmit} className='m-3 text-light bg-info rounded-3 p-3 px-5'>
				<div className='input-group'>
					<input
						type="text"
						className='form-control'
						placeholder='New todo...'
						onChange={e => setNewTodoTitle(e.target.value)}
						value={newTodoTitle}
						required
					/>
					<button
						type="submit"
						className="btn btn-success"
					>
						Create
					</button>
				</div>
			</form>

			{todos.length > 0 && (
				<ul className='text-light bg-info rounded-3 p-3 list-group'>
					<h2>Todos</h2>
					{
						todos.map((todo, index) => (
							<li key={index}
								className='border border-light bg-secondary rounded-3 p-3 m-2'
							>
								{todo.title}
								<button
									className="btn btn-light btn-sm ms-1"
									onClick={() => handleCompletedToggle(todo)}
								>
									{!todo.completed && <span>DONE?</span>}
									{todo.completed && <span>✔</span>}
								</button>
								<button
									className="btn btn-danger btn-sm ms-1"
									onClick={() => handleDeleteTodo(todo)}
								>
									🗑️
								</button>
							</li>
						))
					}
				</ul>
			)}
			{todos.length === 0 && (<p className='alert alert-light'>No todos for you to do. Take a rest! 😎</p>)}

			{todos.length > 0 && (
				<ul className='text-light bg-info rounded-3 p-3 list-group mt-3'>
					<h2>Have dones</h2>
					{/* {
						todos.filter((todo) => {
							if (todo.completed) {
								return <li key={index}
									className='border border-light bg-secondary rounded-3 p-3 m-2'
								>
									{todo.title}
									<button
										className="btn btn-light btn-sm ms-1"
										onClick={() => handleCompletedToggle(todo)}
									>
										{!todo.completed && <span>DONE?</span>}
										{todo.completed && <span>✔</span>}
									</button>
									<button
										className="btn btn-danger btn-sm ms-1"
										onClick={() => handleDeleteTodo(todo)}
									>
										🗑️
									</button>
								</li>
							}
						})

					} */}
				</ul>
			)}

			<div className="alert alert-success mt-3" role="alert">
				<p className='m-2'>
					Completed {completedTodos.length} of {todos.length} todos
				</p>
			</div>
		</>
	)
}

export default App
