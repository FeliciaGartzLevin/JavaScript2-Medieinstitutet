import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './assets/scss/App.scss'

import HomePage from './pages/HomePage'
import Navigation from './pages/partials/Navigation'
import PageNotFound from './pages/PageNotFound'
import RandomCatPage from './pages/RandomCatPage'

const App = () => {
	return (
		<div id="App">

			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-cat" element={<RandomCatPage />} />

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</div>
	)
}

export default App
