import Container from 'react-bootstrap/Container'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import './assets/scss/App.scss'
import useThemeContext from '../src/hooks/useThemeContext'
import classNames from 'classnames'
import RandomDogPage from './pages/RandomDogPage'
import ChuckNorrisPage from './pages/ChuckNorrisPage'

const App = () => {
	const { isDarkMode } = useThemeContext()

	const cssClasses = classNames({
		'bg-dark text-white': isDarkMode,
		// 'app': true, //skriv såhär om man alltid vill ha med en css-klass

	})

	return (
		<div id="App" className={cssClasses}>
			<Navigation />

			<Container className='py-3'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path="/chuck-norris" element={<ChuckNorrisPage />} />
					<Route path="/random-dog" element={<RandomDogPage />} />
					<Route path="/search" element={<SearchPage />} />

					<Route path='/*' element={<NotFound />} />
				</Routes>
			</Container>
		</div>

	)
}

export default App


