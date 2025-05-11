import { CardAuthWrapperFooter } from "@/app/(auth)/_components/card-auth-wrapper/footer";
import { CardAuthWrapperHeader } from "@/app/(auth)/_components/card-auth-wrapper/header";
import { Card, CardContent } from "@/components/ui/card";

export const CardAuthWrapper = ({
	children,
	isSignUp = false,
}: {
	isSignUp?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<Card className="mx-auto w-full max-w-sm">
			<CardAuthWrapperHeader isSignUp={isSignUp} />
			<CardContent>{children}</CardContent>
			<CardAuthWrapperFooter isSignUp={isSignUp} />
		</Card>
	);
};
