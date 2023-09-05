import { zodResolver } from '@hookform/resolvers/zod'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import useCreateAuthor from '../../hooks/useCreateAuthor'
import { NewAuthor } from '../../types/BooksAPI.types'
import { AuthorSchema, authorSchema } from '../../schemas/authorSchema'

const CreateAuthorForm = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<AuthorSchema>({
		resolver: zodResolver(authorSchema)
	})
	const createAuthorMutation = useCreateAuthor()

	const onCreateAuthorSubmit: SubmitHandler<NewAuthor> = (data) => {
		console.log("Submitted data:", data)

		createAuthorMutation.mutate(data)
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Astrid Lindgren"
					{...register('name')}
				/>
				{errors.name && <p className="text-danger">Y U ENTER TOO SHORT NAME?!</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
					{...register('date_of_birth')}
				/>
				{errors.date_of_birth && <p className="text-danger">Y U NO IS BORN?!</p>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button
					variant="success"
					type="submit"
				>Create</Button>
			</div>
		</Form>
	)
}

export default CreateAuthorForm
