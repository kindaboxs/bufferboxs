"use client";

import Link from "next/link";

import { Construction } from "lucide-react";

import Noise from "@/components/react-bits/Noise/Noise";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GetOutPage() {
	return (
		<div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden p-6">
			<div
				className={cn(
					"absolute inset-0",
					"[background-size:50px_50px]",
					"[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
					"dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
					"pointer-events-none -z-10 opacity-60 dark:opacity-30"
				)}
			/>
			<div
				className={cn(
					"absolute inset-0",
					"[background-size:25px_25px]",
					"[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
					"dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
					"pointer-events-none -z-10 opacity-30 dark:opacity-15"
				)}
			/>
			<Noise
				patternSize={250}
				patternScaleX={1}
				patternScaleY={1}
				patternRefreshInterval={2}
				patternAlpha={20}
			/>
			<main className="mx-auto w-full max-w-xl">
				<div className="space-y-6 text-center">
					{/* Logo */}
					<div className="bg-secondary mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full">
						<Construction className="h-8 w-8" />
					</div>

					{/* Main heading */}
					<h1 className="mt-4 text-3xl font-bold tracking-tight">
						go away. come back when you&apos;re useful.
					</h1>

					{/* Description */}
					<div className="space-y-1">
						<p className="text-muted-foreground mx-auto text-lg">
							this site is under construction — just like your personality.
						</p>
						<p className="text-muted-foreground mx-auto text-lg">
							don&apos;t refresh, don&apos;t wait, just leave.
						</p>
					</div>

					{/* Decorative element */}
					<div className="bg-secondary mx-auto my-6 h-1 w-16 rounded-full" />
				</div>
			</main>
			{/* Footer */}
			<footer className="text-muted-foreground absolute bottom-6 text-xs">
				© {new Date().getFullYear()}{" "}
				<Button
					variant="link"
					size="sm"
					className="text-muted-foreground hover:text-primary cursor-pointer p-0"
					asChild
				>
					<Link href="https://x.com/isntboxs">mrboxs</Link>
				</Button>
			</footer>
		</div>
	);
}
