import { FirebaseError } from 'firebase/app'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { storage } from '../services/firebase'
import { UpdateProfileFormData } from '../types/User.types'

const UpdateProfile = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const anonymousImg = 'https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png'
	const {
		currentUser,
		reloadUser,
		setDisplayName,
		setEmail,
		setPassword,
		setPhotoUrl,
		userPhotoUrl,
	} = useAuth()
	const { handleSubmit, register, watch, formState: { errors } } = useForm<UpdateProfileFormData>({
		defaultValues: {
			email: currentUser?.email ?? "",
			name: currentUser?.displayName ?? "",
		}
	})

	// Watch the current value of `password` form field
	const passwordRef = useRef("")
	passwordRef.current = watch('password')

	const photoFileRef = useRef<FileList | null>(null)
	photoFileRef.current = watch("photoFile")

	if (!currentUser) {
		return <p>Error, error, error!</p>
	}

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		// Clear any previous error state
		setErrorMessage(null)

		// Update user profile
		try {
			// Disable update-button while update is in progress
			setLoading(true)

			// Update displayName *ONLY* if it has changed
			if (data.name !== (currentUser.displayName ?? "")) {
				console.log("Updating display name...")
				await setDisplayName(data.name)
			}

			// Only upload a photo if one has been selected
			if (data.photoFile.length) {
				const photo = data.photoFile[0]

				// create a reference to upload the file to
				// example: "photos/3PjBWeCaZmfasyz4jTEURhnFtI83/space.jpg"
				const fileRef = ref(storage, `photos/${currentUser.uid}/${photo.name}`)

				try {
					// upload photo to fileRef
					const uploadResult = await uploadBytes(fileRef, photo)

					// get download url to uploaded file
					const photoUrl = await getDownloadURL(uploadResult.ref)

					console.log("Photo successfully uploaded, download url is: " + photoUrl)

					// set download url as the users photoURL
					await setPhotoUrl(photoUrl)

				} catch (e) {
					console.log("Upload failed", e)
					setErrorMessage("Upload failed!")
				}
			}

			// Update email *ONLY* if it has changed
			if (data.email !== (currentUser.email ?? "")) {
				console.log("Updating email...")
				await setEmail(data.email)
			}

			// Update password *ONLY* if the user has provided a new password to set
			if (data.password) {
				console.log("Updating password...")
				await setPassword(data.password)
			}

			// Reload user data
			await reloadUser()

			// Show success toast 🥂
			toast.success("Profile successfully updated")

			// Enable update-button again
			setLoading(false)
			console.log("All ok 👍🏻👍🏻👍🏻!")

		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("Something went wrong. Have you tried turning it off and on again?")
			}
			setLoading(false)
		}
	}

	const handleDelProfileImg = async () => {
		await setPhotoUrl('')
		reloadUser()
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Update Profile</Card.Title>

							{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}
							<Container >
								<Row>
									<Col className='d-flex justify-content-center mb-2'>
										<Image
											src={userPhotoUrl ?? anonymousImg}
											height={100}
											width={100}
											alt={userPhotoUrl ? 'Profile image' : 'Anonymous profile image'}
											fluid
											roundedCircle />
									</Col>
								</Row>
								<Row>
									<Col className='d-flex justify-content-center'>
										<Button
											onClick={handleDelProfileImg}
										>Delete image
										</Button>
									</Col>
								</Row>
							</Container>

							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								{/*
									Fill the displayName, photoURL and email form fields with their current value!
								*/}
								<Form.Group controlId="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder="Sean Banan"
										type="text"
										{...register('name', {
											minLength: {
												value: 3,
												message: "If you have a name, it has to be at least 3 characters long"
											}
										})}
									/>
									{errors.name && <p className="invalid">{errors.name.message ?? "Invalid value"}</p>}
								</Form.Group>

								<Form.Group controlId="photo" className="mb-3">
									<Form.Label>Photo</Form.Label>
									<Form.Control
										type="file"
										accept="image/gif,image/jpeg,image/png,image/webp"
										{...register('photoFile')}
									/>
									{errors.photoFile && <p className="invalid">{errors.photoFile.message ?? "Invalid value"}</p>}
									<Form.Text>{photoFileRef.current && photoFileRef.current.length > 0 && (
										<span>
											{photoFileRef.current[0].name}
											{' '}
											({Math.round(photoFileRef.current[0].size / 1024)} kB)
										</span>
									)}</Form.Text>
								</Form.Group>

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
											minLength: {
												value: 3,
												message: "Please enter at least 3 characters"
											},
											validate: (value) => {
												return !passwordRef.current || value === passwordRef.current || "The passwords does not match 🤦🏼‍♂️"
											}
										})}
									/>
									{errors.passwordConfirm && <p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
								</Form.Group>

								<Button
									disabled={loading}
									variant="primary"
									type="submit"
								>
									{loading
										? "Updating profile..."
										: "Save"}
								</Button>
							</Form>

						</Card.Body>
					</Card>

				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfile
