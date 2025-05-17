import { CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardAuthFooterSkeleton = () => {
	return (
		<CardFooter className="w-full items-center justify-center">
			<Skeleton className="h-4 w-[13.5rem]" />
		</CardFooter>
	);
};
