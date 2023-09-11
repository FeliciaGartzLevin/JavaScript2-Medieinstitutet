import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navigation = () => {
	const { logout, isLoggedIn } = useAuth()

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">🔥 Firebase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{!isLoggedIn && (
							<>
								<Nav.Link as={NavLink} end to="/signup">Signup</Nav.Link>
								<Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
							</>
						)}
						{isLoggedIn && (
							<>
								<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
								<Nav.Link as={NavLink} end to="/login"
									onClick={logout}>Log out 🚪</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
