"use server";

import { APIError } from "better-auth/api";

import {
	signInSchema,
	signInSchemaType,
} from "@/app/(auth)/_schemas/sign-in-schema";
import { auth } from "@/lib/auth";

export const signInUsernameAction = async (data: signInSchemaType) => {
	const validated = await signInSchema.safeParseAsync(data);
	if (!validated.success) return { success: false, error: validated.error };

	const { password, username } = validated.data;

	try {
		await auth.api.signInUsername({
			body: { password, username },
		});

		return { success: true, error: null };
	} catch (error) {
		if (error instanceof APIError) {
			return { success: false, error: error.message };
		}

		return { success: false, error: "Internal Server Error" };
	}
};
