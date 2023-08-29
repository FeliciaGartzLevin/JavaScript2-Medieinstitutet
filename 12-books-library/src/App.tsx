import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import GlobalLoadingSpinner from './components/GlobalLoadingSpinner'
import Navigation from './pages/partials/Navigation'
import AuthorsPage from './pages/AuthorsPage'
import AuthorPage from './pages/AuthorPage'
import BooksPage from './pages/BooksPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />
			<GlobalLoadingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/authors" element={<AuthorsPage />} />
					<Route path="/authors/:id" element={<AuthorPage />} />
					<Route path="/books" element={<BooksPage />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App
