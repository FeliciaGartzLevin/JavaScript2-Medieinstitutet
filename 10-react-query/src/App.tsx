import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './assets/scss/App.scss'

import HomePage from './pages/HomePage'
import Navigation from './pages/partials/Navigation'
import PageNotFound from './pages/PageNotFound'
import RandomCatPage from './pages/RandomCatPage'
import GlobalFetchingSpinner from './components/GlobalFetchingSpinner'
import SearchHackerNewsPage from './pages/SearchHackerNewsPage'

const App = () => {
	return (
		<div id="App">

			<Navigation />
			<GlobalFetchingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-cat" element={<RandomCatPage />} />
					<Route path="/search-hacker-news" element={<SearchHackerNewsPage />} />

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</div>
	)
}

export default App
