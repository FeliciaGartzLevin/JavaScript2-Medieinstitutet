import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContextProvider'

const HomePage = () => {
	const { isDarkMode } = useContext(ThemeContext)

	return (
		<>
			<h1>Welcome to Hacker News Search 🤓👀</h1>

			<p>Your theme is: {isDarkMode ? 'dark 🌑' : 'light 🌞'}</p>

			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	)
}

export default HomePage
