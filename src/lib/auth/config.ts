import { BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import {
	admin,
	bearer,
	customSession,
	multiSession,
	oAuthProxy,
	openAPI,
	organization,
	twoFactor,
	username,
} from "better-auth/plugins";

import { APP_NAME } from "@/configs";
import { env } from "@/env";
import { db } from "@/lib/db";

export const authConfig = {
	appName: APP_NAME,
	baseURL: env.NEXT_PUBLIC_APP_URL,
	trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
	logger: {
		disabled: process.env.NODE_ENV === "production",
		level: "debug",
	},
	database: prismaAdapter(db, { provider: "postgresql" }),
	session: {
		freshAge: 0,
		expiresIn: 60 * 60 * 24 * 3, // 3 days
		updateAge: 60 * 60 * 12, // 12 hours (every 12 hours the session expiration is updated)
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // 5 minutes
		},
	},
	user: {
		changeEmail: {
			enabled: true,
		},
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		maxPasswordLength: 128,
	},
	account: {
		accountLinking: {
			trustedProviders: ["google", "github"],
		},
	},
	plugins: [
		nextCookies(),
		customSession(async (session) => {
			return {
				...session,
				user: {
					...session.user,
					dd: "test",
				},
			};
		}),
		username(),
		admin(),
		bearer(),
		multiSession(),
		twoFactor(),
		openAPI(),
		organization(),
		oAuthProxy(),
	],
	secret: env.BETTER_AUTH_SECRET,
} satisfies BetterAuthOptions;
