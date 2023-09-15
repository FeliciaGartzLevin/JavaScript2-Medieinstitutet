import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ForgotPasswordFormData } from '../types/User.types'

const ForgotPasswordPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { handleSubmit, register, formState: { errors } } = useForm<ForgotPasswordFormData>()
	const { resetPassword } = useAuth()

	const onForgotPassword: SubmitHandler<ForgotPasswordFormData> = async (data) => {
		// Clear any previous error state
		setErrorMessage(null)

		// Try to send the "forgot password" link to the provided email (if the user exists)
		try {
			setLoading(true)
			await resetPassword(data.email)

			// If successful, tell the user to check their email
			setSuccessMessage("We've sent you a password reset link to the provided email. Please check your spam-folder if the email hasn't arrived in a few minutes.")

			// Re-enable button in case the user has forgot their password to multiple accounts
			setLoading(false)

		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("Something went wrong. Have you tried turning it off and on again?")
			}
			setLoading(false)
		}
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Forgot Password?</Card.Title>

							{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}
							{successMessage && (<Alert variant="success">{successMessage}</Alert>)}

							<p>Enter your email address and we will send you a password reset link.</p>

							<Form onSubmit={handleSubmit(onForgotPassword)}>
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register('email', {
											required: "You have to enter your email",
										})}
									/>
									{errors.email && <p className="invalid">{errors.email.message ?? "Invalid value"}</p>}
								</Form.Group>

								<Button
									disabled={loading}
									variant="primary"
									type="submit"
								>
									{loading
										? "Sending email..."
										: "Send password reset email"}
								</Button>
							</Form>
						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						Suddenly remembered your password?<br/>
						<Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPasswordPage
