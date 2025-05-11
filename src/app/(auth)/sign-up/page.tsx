import { CardAuthWrapper } from "@/app/(auth)/_components/card-auth-wrapper";
import { SignUpForm } from "@/app/(auth)/_components/sign-up-form";

export default function SignUpPage() {
	return (
		<div className="mt-32 w-full">
			<CardAuthWrapper isSignUp>
				<SignUpForm />
			</CardAuthWrapper>
		</div>
	);
}
