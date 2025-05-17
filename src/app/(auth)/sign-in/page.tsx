import { Suspense } from "react";

import { CardAuthWrapper } from "@/app/(auth)/_components/card-auth-wrapper";
import { SignInForm } from "@/app/(auth)/_components/sign-in-form";
import { SignInFormServer } from "@/app/(auth)/_components/sign-in-form-server";
import { SignInFormSkeleton } from "@/app/(auth)/_components/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignInPage() {
	return (
		<div className="mt-32 w-full">
			<Tabs
				defaultValue="sign-in-client"
				className="mx-auto w-full max-w-sm space-y-4"
			>
				<TabsList className="w-full">
					<TabsTrigger value="sign-in-client" className="cursor-pointer">
						Sign In Client Side
					</TabsTrigger>
					<TabsTrigger value="sign-in-server" className="cursor-pointer">
						Sign In Server Side
					</TabsTrigger>
				</TabsList>
				<TabsContent value="sign-in-client">
					<SignInClient />
				</TabsContent>
				<TabsContent value="sign-in-server">
					<SignInServer />
				</TabsContent>
			</Tabs>
		</div>
	);
}

const SignInClient = () => {
	return (
		<CardAuthWrapper>
			<Suspense fallback={<SignInFormSkeleton />}>
				<SignInForm />
			</Suspense>
		</CardAuthWrapper>
	);
};

const SignInServer = () => {
	return (
		<CardAuthWrapper>
			<Suspense fallback={<SignInFormSkeleton />}>
				<SignInFormServer />
			</Suspense>
		</CardAuthWrapper>
	);
};
