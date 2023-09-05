import { z } from 'zod'

// validation schema
export const authorSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters" })
		.max(20, { message: "Too long name, can be max 20 characters" }),

	date_of_birth: z
		.date(),
})

// extract the type from the schema
export type AuthorSchema = z.infer<typeof authorSchema>
