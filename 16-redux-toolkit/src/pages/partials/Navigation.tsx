import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { NavLink, Link } from "react-router-dom"
import imgFavicon from "../../assets/icons/toolbox_1f9f0.png"

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<Image
						src={imgFavicon}
						width="30"
						height="30"
						className="d-inline-block align-top me-1"
						alt="A red toolbox"
					/>{" "}
					Redux Toolkit
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/account">
							<span aria-label="bank">🏦</span> Account
						</Nav.Link>
						<Nav.Link as={NavLink} to="/todos">
							<span aria-label="memo">📝</span> Todos
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
