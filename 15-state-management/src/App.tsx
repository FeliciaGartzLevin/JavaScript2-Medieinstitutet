import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import CounterPage from './pages/CounterPage'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import ReducerContextCounterPage from './pages/ReducerContextCounterPage'
import ReducerCounterPage from './pages/ReducerCounterPage'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="*" element={<PageNotFound />} />
				<Route path="/counter" element={<CounterPage />} />
				<Route path="/reducer-counter" element={<ReducerCounterPage />} />
				<Route path="/reducer-context-counter" element={<ReducerContextCounterPage />} />
				<Route path="/" element={<HomePage />} />
			</Routes>
		</div>
	)
}

export default App
