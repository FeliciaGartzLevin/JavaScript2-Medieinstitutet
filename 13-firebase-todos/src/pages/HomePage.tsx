import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Container from "react-bootstrap/Container"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"

const HomePage = () => {
	const { currentUser } = useAuth()
	if (!currentUser) {
		throw new Error("YOU CAN BE A USER")
	}

	return (
		<Container className="py-3">

			<h1>Firebase Todos</h1>
			<h2>Because when you're life is on fire, you need a todo list</h2>

			<p>You are logged in as {currentUser.email} ({currentUser.uid})!</p>

			<ButtonGroup>
				<Button
					variant="danger"
					size="lg"
					onClick={() => {
						toast.error(
							"🚂 CHOO-CHOO, GET ON DA HYPE TRAIINNNN!!111"
						)
					}}
				>
					HYPE ME 🔥
				</Button>
			</ButtonGroup>
		</Container>
	)
}

export default HomePage
