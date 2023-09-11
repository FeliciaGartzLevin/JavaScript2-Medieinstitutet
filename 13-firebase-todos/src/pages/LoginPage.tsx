import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LoginCredentials } from '../types/User.types'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { useState } from 'react'

const LoginPage = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<LoginCredentials>()
	const [isLoading, setIsLoading] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()

	const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
		setIsLoading(true)
		try {
			// log in user
			const userCredential = await login(data.email, data.password)
			console.log('Logged in user with useCredential:', userCredential)

			// navigate to homepage
			navigate('/')
			setIsLoading(false)
			return
		} catch (err: any) {

			// console.log('err.code:', err.code)
			toast.error(
				`An error occured: ${err.code}`
			)
			setIsLoading(false)
			return
		}

	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className="mb-3">Login</Card.Title>

						<Form onSubmit={handleSubmit(onLogin)}>
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

							<Form.Group controlId="password" className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									autoComplete="new-password"
									{...register('password', {
										required: "You're kidding, right? Enter your password, stupid",
										minLength: {
											value: 3,
											message: "Please enter at least 3 characters"
										},
									})}
								/>
								{errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
							</Form.Group>

							<Button variant="primary" type="submit">Log In</Button>
						</Form>

						<div className="text-center">
							<Link to="/forgot-password">Forgot Password?</Link>
						</div>
					</Card.Body>
				</Card>

				<div className="text-center mt-3">
					Need an account? <Link to="/signup">Sign Up</Link>
				</div>
			</Col>
		</Row>
	)
}

export default LoginPage
