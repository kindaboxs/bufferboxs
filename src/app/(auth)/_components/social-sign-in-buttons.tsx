"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/client";

export const SocialSignInButtons = () => {
	const [loading, setLoading] = useState<"github" | "google" | null>(null);

	const searchParams = useSearchParams();
	const redirect_to = searchParams.get("redirect_to");

	const handleSignIn = async (provider: "github" | "google") => {
		await signIn.social({
			provider,
			callbackURL: redirect_to ?? "/",
			errorCallbackURL: "/error",
			newUserCallbackURL: undefined,
			fetchOptions: {
				onRequest: () => {
					setLoading(provider);
				},
				onResponse: () => {
					setLoading(null);
				},
				onError: (ctx) => {
					setLoading(null);
					console.log(ctx);
					toast.error(ctx.error.message, { id: ctx.error.status });
				},
			},
		});
	};

	return (
		<div className="grid w-full grid-cols-2 gap-2">
			<Button
				variant="outline"
				size="sm"
				className="cursor-pointer"
				onClick={() => handleSignIn("github")}
				disabled={loading === "github"}
			>
				{loading === "github" ? (
					<>
						<Loader2 className="animate-spin" /> Github
					</>
				) : (
					<>
						<FaGithub /> Github
					</>
				)}
			</Button>
			<Button
				variant="outline"
				size="sm"
				className="cursor-pointer"
				onClick={() => handleSignIn("google")}
				disabled={loading === "google"}
			>
				{loading === "google" ? (
					<>
						<Loader2 className="animate-spin" /> Google
					</>
				) : (
					<>
						<FcGoogle /> Google
					</>
				)}
			</Button>
		</div>
	);
};
