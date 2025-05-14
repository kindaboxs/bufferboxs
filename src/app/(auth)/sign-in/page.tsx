import { CardAuthWrapper } from "@/app/(auth)/_components/card-auth-wrapper";
import { SignInForm } from "@/app/(auth)/_components/sign-in-form";

export default function SignInPage() {
	return (
		<div className="mt-32 w-full">
			<CardAuthWrapper>
				<SignInForm />
			</CardAuthWrapper>
		</div>
	);
}
