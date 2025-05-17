import { Suspense } from "react";

import { CardAuthWrapper } from "@/app/(auth)/_components/card-auth-wrapper";
import { SignUpForm } from "@/app/(auth)/_components/sign-up-form";
import { SignUpFormServer } from "@/app/(auth)/_components/sign-up-form-server";
import { SignUpFormSkeleton } from "@/app/(auth)/_components/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignUpPage() {
	return (
		<div className="mt-32 w-full">
			<Tabs
				defaultValue="sign-up-client"
				className="mx-auto w-full max-w-sm space-y-4"
			>
				<TabsList className="w-full">
					<TabsTrigger value="sign-up-client" className="cursor-pointer">
						Sign Up Client Side
					</TabsTrigger>
					<TabsTrigger value="sign-up-server" className="cursor-pointer">
						Sign Up Server Side
					</TabsTrigger>
				</TabsList>
				<TabsContent value="sign-up-client">
					<SignUpClient />
				</TabsContent>
				<TabsContent value="sign-up-server">
					<SignInServer />
				</TabsContent>
			</Tabs>
		</div>
	);
}

const SignUpClient = () => {
	return (
		<CardAuthWrapper isSignUp>
			<Suspense fallback={<SignUpFormSkeleton />}>
				<SignUpForm />
			</Suspense>
		</CardAuthWrapper>
	);
};

const SignInServer = () => {
	return (
		<CardAuthWrapper isSignUp>
			<Suspense fallback={<SignUpFormSkeleton />}>
				<SignUpFormServer />
			</Suspense>
		</CardAuthWrapper>
	);
};
