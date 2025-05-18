import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardAuthWrapperHeaderProps {
	isSignUp?: boolean;
}

export function CardAuthWrapperHeader({
	isSignUp = false,
}: CardAuthWrapperHeaderProps) {
	return (
		<CardHeader>
			<CardTitle className="text-2xl">
				{isSignUp ? "Create your account" : "Welcome back!"}
			</CardTitle>
			<CardDescription>
				to continue to <span className="font-semibold">bufferboxs</span>
			</CardDescription>
		</CardHeader>
	);
}
