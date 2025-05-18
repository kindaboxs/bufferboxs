"use server";

import {
	// cookies,
	headers,
} from "next/headers";

import { APIError } from "better-auth/api";

// import { parseSetCookieHeader } from "better-auth/cookies";

import {
	signInSchema,
	signInSchemaType,
} from "@/app/(auth)/_schemas/sign-in-schema";
import { auth } from "@/lib/auth";
import { AuthErrorCode } from "@/lib/auth/types";

export const signInUsernameAction = async (data: signInSchemaType) => {
	const validated = await signInSchema.safeParseAsync(data);
	if (!validated.success) return { success: false, error: validated.error };

	const { password, username } = validated.data;

	try {
		await auth.api.signInUsername({
			headers: await headers(),
			body: { password, username },
		});

		// if nex-cookies plugin not set in auth config, this will work
		// const res = await auth.api.signInUsername({
		// 	headers: await headers(),
		// 	body: { password, username },
		// 	asResponse: true,
		// });

		// const setCookieHeader = res.headers.get("set-cookie");

		// if (setCookieHeader) {
		// 	const cookie = parseSetCookieHeader(setCookieHeader);
		// 	const cookieStore = await cookies();

		// 	const [key, cookieAttributes] = [...cookie.entries()][0];
		// 	const value = cookieAttributes.value;
		// 	const maxAge = cookieAttributes["max-age"];
		// 	const path = cookieAttributes.path;
		// 	const httpOnly = cookieAttributes.httponly;
		// 	const sameSite = cookieAttributes.samesite;

		// 	cookieStore.set(key, decodeURIComponent(value), {
		// 		maxAge,
		// 		path,
		// 		httpOnly,
		// 		sameSite,
		// 	});
		// }
		// ======================

		return { success: true, error: null };
	} catch (error) {
		if (error instanceof APIError) {
			const errCode = error.body ? (error.body.code as AuthErrorCode) : null;
			switch (errCode) {
				default:
					return { success: false, error: error.message };
			}
		}

		return { success: false, error: "Internal Server Error" };
	}
};
