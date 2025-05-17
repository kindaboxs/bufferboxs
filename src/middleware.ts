import { NextRequest, NextResponse } from "next/server";

import { betterFetch } from "@better-fetch/fetch";

import { env } from "@/env";
import { Session } from "@/lib/auth/types";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/admin", "/profile"];

export default async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const pathName = nextUrl.pathname;

	const isAuthRoute = authRoutes.includes(pathName);
	const isProtectedRoute = protectedRoutes.includes(pathName);

	const cookies = req.headers.get("cookie");

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: env.NEXT_PUBLIC_APP_URL,
			headers: {
				cookie: cookies ?? "",
			},
		}
	);

	if (isAuthRoute) {
		if (session) {
			return NextResponse.redirect(new URL("/", req.url));
		}
		return NextResponse.next();
	}

	if (!session && isProtectedRoute) {
		let redirectUrl = pathName;
		if (nextUrl.search) {
			redirectUrl += nextUrl.search;
		}

		const encodedRedirectUrl = encodeURIComponent(redirectUrl);

		return NextResponse.redirect(
			new URL(`/sign-in?redirect_to=${encodedRedirectUrl}`, req.url)
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)"],
};
