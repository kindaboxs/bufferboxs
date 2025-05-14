import { z } from "zod";

export const signUpSchema = z.object({
	fullName: z
		.string()
		.min(3, { message: "Full name must be at least 3 characters" })
		.max(50, { message: "Full name must be at most 50 characters" }),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(50, { message: "Username must be at most 50 characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" })
		.max(128, { message: "Password must be at most 128 characters" }),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
