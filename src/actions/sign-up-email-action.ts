"use server";

import { APIError } from "better-auth/api";

import {
	signUpSchema,
	signUpSchemaType,
} from "@/app/(auth)/_schemas/sign-up-schema";
import { auth } from "@/lib/auth";

export const signUpEmailAction = async (data: signUpSchemaType) => {
	const validated = await signUpSchema.safeParseAsync(data);
	if (!validated.success) return { success: false, error: validated.error };

	const { email, fullName, password, username } = validated.data;

	try {
		await auth.api.signUpEmail({
			body: { email, name: fullName, password, username },
		});

		return { success: true, error: null };
	} catch (error) {
		if (error instanceof APIError) {
			return { success: false, error: error.message };
		}

		return { success: false, error: "Internal Server Error" };
	}
};
