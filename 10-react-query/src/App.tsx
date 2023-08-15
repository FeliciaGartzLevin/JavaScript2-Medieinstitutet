import Container from 'react-bootstrap/Container'
import Navigation from './pages/partials/Navigation'
import { Routes, Route } from 'react-router-dom'


import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">

			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={ } />
				</Routes>
				<h1>I ❤️ React Query</h1>
			</Container>
		</div>
	)
}

export default App
