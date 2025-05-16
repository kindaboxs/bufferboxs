"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

import { signUpEmailAction } from "@/actions/sign-up-email-action";
import {
	signUpSchema,
	signUpSchemaType,
} from "@/app/(auth)/_schemas/sign-up-schema";
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

export const SignUpFormServer = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<signUpSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: "",
			username: "",
			email: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmit = (data: signUpSchemaType) => {
		startTransition(() => {
			signUpEmailAction(data).then(({ success, error }) => {
				if (success) {
					router.push("/sign-in");
					form.reset();
					toast.success("Account created successfully, please sign in.", {
						id: "sign-up-success",
					});
				} else {
					if (error instanceof ZodError) {
						toast.error("Invalid input", {
							id: "sign-up-error",
							description: error.message,
						});
					} else {
						toast.error(error, {
							id: "sign-up-error",
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
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Your full name"
										type="text"
										autoComplete="name"
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
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="youremail@email.com"
										type="email"
										autoComplete="email"
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
							<Loader2 className="animate-spin" /> Signing Up
						</>
					) : (
						"Sign Up"
					)}
				</Button>
			</form>
		</Form>
	);
};
