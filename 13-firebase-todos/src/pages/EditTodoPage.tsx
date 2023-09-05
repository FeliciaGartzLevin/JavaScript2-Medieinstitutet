import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!todoId) {
			return
		}
	}

	return (
		<>
			<h1>Edit: {``}</h1>

			<Form onSubmit={handleSubmit} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
					/>
				</Form.Group>

				<Button variant="primary" type="submit" disabled={false}>
					Save
				</Button>
			</Form>

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
