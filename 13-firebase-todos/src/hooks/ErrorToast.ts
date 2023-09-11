import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
	errorCode: string
}

const ErrorToast: React.FC<Props> = ({ errorCode }) => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	if (errorCode == "auth/email-already-in-use") {
		setErrorMsg("The email address is already in use");

	} else if (errorCode == "auth/invalid-email") {
		setErrorMsg("The email address is not valid.");

	} else if (errorCode == "auth/operation-not-allowed") {
		setErrorMsg("Operation not allowed.");
	} else if (errorCode == "auth/weak-password") {
		setErrorMsg("The password is too weak.");
	}

	return (
		toast.error(
			`An error occured: ${errorMsg}`
		)
	)
}

export default ErrorToast
