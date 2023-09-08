export type SignUpCredentials = {
	email: string
	password: string
	passwordConfirm: string
}

export type LoginCredentials = Omit<SignUpCredentials, 'passwordConfirm'>
