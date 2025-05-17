import { CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardAuthFooterSkeleton = () => {
	return (
		<CardFooter className="w-full items-center justify-center">
			<Skeleton className="h-4 w-[13.5rem]" />
		</CardFooter>
	);
};

export const SignInFormSkeleton = () => {
	return (
		<div className="grid w-full gap-4">
			{Array.from({ length: 2 }).map((_, index) => (
				<div className="grid gap-2" key={index}>
					<Skeleton className="h-4 w-[4.5rem]" />
					<Skeleton className="h-9 w-full" />
				</div>
			))}
		</div>
	);
};

export const SignUpFormSkeleton = () => {
	return (
		<div className="grid w-full gap-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<div className="grid gap-2" key={index}>
					<Skeleton className="h-4 w-[4.5rem]" />
					<Skeleton className="h-9 w-full" />
				</div>
			))}
		</div>
	);
};
