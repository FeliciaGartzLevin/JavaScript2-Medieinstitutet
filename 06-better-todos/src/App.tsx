import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateTodoPage from './pages/CreateTodoPage'
import TodoPage from './pages/TodoPage'
import Navigation from './components/Navigation'
import TodosPage from './pages/TodosPage'
import NotFoundPage from './pages/NotFoundPage'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/createTodo" element={<CreateTodoPage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
