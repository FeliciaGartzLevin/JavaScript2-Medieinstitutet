import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContextProvider'
import { NavLink, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Navigation = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext)

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>

						<Button
							variant='outline-secondary'
							onClick={toggleTheme}
						>
							{isDarkMode ? '🌞' : '🌙'}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
