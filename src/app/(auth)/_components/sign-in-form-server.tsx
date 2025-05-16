"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

import { signInUsernameAction } from "@/actions/sign-in-username-action";
import {
	signInSchema,
	signInSchemaType,
} from "@/app/(auth)/_schemas/sign-in-schema";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const SignInFormServer = () => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm<signInSchemaType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmit = async (data: signInSchemaType) => {
		startTransition(() => {
			signInUsernameAction(data).then(({ success, error }) => {
				if (success) {
					router.push("/");
					form.reset();
					toast.success("Signed in successfully.", {
						id: "sign-in-success",
					});
				} else {
					if (error instanceof ZodError) {
						toast.error("Invalid input", {
							id: "sign-in-error",
							description: error.message,
						});
					} else {
						toast.error(error, {
							id: "sign-in-error",
						});
					}
				}
			});
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit(onSubmit)(e);
				}}
				className="grid gap-6"
			>
				<div className="grid gap-4">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="yourusername"
										type="text"
										autoComplete="username"
										disabled={isPending || form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Your unique password"
										type="password"
										autoComplete="new-password"
										disabled={isPending || form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					className="w-full cursor-pointer"
					disabled={
						isPending || !form.formState.isValid || form.formState.isSubmitting
					}
				>
					{isPending ? (
						<>
							<Loader2 className="animate-spin" /> Signing In
						</>
					) : (
						"Sign In"
					)}
				</Button>
			</form>
		</Form>
	);
};
