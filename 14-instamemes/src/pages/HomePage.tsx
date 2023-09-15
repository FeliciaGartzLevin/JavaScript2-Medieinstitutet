import Container from "react-bootstrap/Container"
import UploadMeme from "../components/UploadMeme"
import useAuth from "../hooks/useAuth"

const HomePage = () => {
	const { currentUser } = useAuth()

	return (
		<Container className="py-3">
			<h1>InstaMemes</h1>
			<h2>When I get sad I stop being sad and be awesome instead</h2>

			{currentUser && <UploadMeme />}

			<p>Here be all dem memes...</p>

		</Container>
	)
}

export default HomePage
