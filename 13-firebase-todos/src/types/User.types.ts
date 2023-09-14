export type SignUpCredentials = {
	email: string
	password: string
	passwordConfirm: string
}

export type LoginCredentials = Omit<SignUpCredentials, 'passwordConfirm'>

export type ForgotPasswordFormData = {
	email: string
}

export type UpdateProfileFormData = {
	name: string
	photoFile: FileList
	email: string
	password: string
	passwordConfirm: string
}

