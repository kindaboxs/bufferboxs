import { z } from "zod";

export const signInSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(50, { message: "Username must be at most 50 characters" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" })
		.max(128, { message: "Password must be at most 128 characters" }),
});

export type signInSchemaType = z.infer<typeof signInSchema>;
