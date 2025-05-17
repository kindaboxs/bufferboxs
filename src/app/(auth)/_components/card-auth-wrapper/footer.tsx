"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

export const CardAuthWrapperFooter = ({
	isSignUp = false,
}: {
	isSignUp?: boolean;
}) => {
	const searchParams = useSearchParams();
	const redirect_to = searchParams.get("redirect_to");

	return (
		<CardFooter className="flex-col">
			<div className="flex w-full items-center justify-center">
				{isSignUp ? (
					<>
						<p className="text-muted-foreground text-sm">
							Already have an account?
						</p>
						<Button
							variant="link"
							size="sm"
							className="ml-1 cursor-pointer p-0"
							asChild
						>
							<Link
								href={
									redirect_to
										? `/sign-in?redirect_to=${encodeURIComponent(redirect_to)}`
										: "/sign-in"
								}
							>
								Sign In
							</Link>
						</Button>
					</>
				) : (
					<>
						<p className="text-muted-foreground text-sm">
							Don&apos;t have an account?
						</p>
						<Button
							variant="link"
							size="sm"
							className="ml-1 cursor-pointer p-0"
							asChild
						>
							<Link
								href={
									redirect_to
										? `/sign-up?redirect_to=${encodeURIComponent(redirect_to)}`
										: "/sign-up"
								}
							>
								Sign Up
							</Link>
						</Button>
					</>
				)}
			</div>
		</CardFooter>
	);
};
