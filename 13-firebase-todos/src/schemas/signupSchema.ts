import { z } from 'zod'

// validation schema
export const signupSchema = z.object({
	email: z
		.string()
		.email({ message: "Must be a valid email adress" }),

	password: z
		.string(),

	passwordConfirm: z
		.string(),

})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ["passwordConfirm"], // path of error
	});

// extract the type from the schema
export type SignupSchema = z.infer<typeof signupSchema>
