import Image from 'react-bootstrap/Image'

const NotFound = () => {
	return (
		<>
			<h1>Sorry, that page could not be found 😔</h1>

			<Image src={`https://placekitten.com/g/300/300`}
				fluid
				className="d-flex justify-content-center"
			/>
		</>
	)
}

export default NotFound
