"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { signIn } from "@/lib/auth/client";

export const SignInForm = () => {
	const [loading, setLoading] = useState<boolean>(false);

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
		await signIn.username({
			username: data.username,
			password: data.password,
			fetchOptions: {
				onRequest: () => {
					setLoading(true);
				},
				onResponse: () => {
					setLoading(false);
				},
				onSuccess: () => {
					router.push("/");
					form.reset();
					toast.success("Signed in successfully.", {
						id: "sign-in-success",
					});
				},
				onError: (ctx) => {
					setLoading(false);
					toast.error(ctx.error.message, { id: ctx.error.status });
					console.log(ctx);
				},
			},
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
										disabled={loading || form.formState.isSubmitting}
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
										disabled={loading || form.formState.isSubmitting}
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
						loading || !form.formState.isValid || form.formState.isSubmitting
					}
				>
					{loading ? (
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
