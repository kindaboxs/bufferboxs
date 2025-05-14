"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/client";

export const SignoutButton = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onError: (ctx) => {
					console.log(ctx);
					toast.error(ctx.error.message, { id: ctx.error.status });
				},
				onSuccess: () => {
					router.refresh();
				},
			},
		});
	};

	return (
		<Button
			variant="destructive"
			size="sm"
			className="cursor-pointer"
			onClick={handleSignOut}
		>
			Sign out
		</Button>
	);
};
