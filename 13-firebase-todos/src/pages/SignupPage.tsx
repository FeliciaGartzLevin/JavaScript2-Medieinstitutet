import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpCredentials } from '../types/User.types'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'

const SignupPage = () => {
	const { handleSubmit, register, watch, formState: { errors } } = useForm<SignUpCredentials>()
	const { signup } = useAuth()
	const navigate = useNavigate()

	// Watch the current value of `password` form field
	const passwordRef = useRef("")
	passwordRef.current = watch('password')

	const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
		console.log("Would sign up user", data)

		try {
			// Pass email and password along to signup in auth-context
			const userCredential = await signup(data.email, data.password)

			console.log("Account created", userCredential)

			navigate('/')
			return
		} catch (err: any) {
			// console.log('err.code:', err.code)
			toast.error(
				`An error occured: ${err.code}`
			)
			return
		}
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className="mb-3">Sign Up</Card.Title>

						<Form onSubmit={handleSubmit(onSignup)}>
							<Form.Group controlId="email" className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									placeholder="snelhest2000@horsemail.com"
									type="email"
									{...register('email', {
										required: "You have to enter an email",
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
										required: "You're kidding, right? Enter a password, stupid",
										minLength: {
											value: 3,
											message: "Please enter at least 3 characters"
										},
									})}
								/>
								{errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
								<Form.Text>At least 6 characters</Form.Text>
							</Form.Group>

							<Form.Group controlId="confirmPassword" className="mb-3">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									autoComplete="off"
									{...register('passwordConfirm', {
										required: "Enter your password again.........",
										minLength: {
											value: 3,
											message: "Please enter at least 3 characters"
										},
										validate: (value) => {
											return value === passwordRef.current || "The passwords does not match 🤦🏼‍♂️"
										}
									})}
								/>
								{errors.passwordConfirm && <p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
							</Form.Group>

							<Button variant="primary" type="submit">Create Account</Button>
						</Form>

						{/* <div className="text-center">
							<Link to="/forgot-password">Forgot Password?</Link>
						</div> */}
					</Card.Body>
				</Card>

				<div className="text-center mt-3">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</Col>
		</Row>
	)
}

export default SignupPage
