"use client";

import { useRouter } from "next/navigation";

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth/client";

export const NavSidebarUserMenu = () => {
	const { data: session, isPending } = useSession();
	const { isMobile } = useSidebar();

	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onError: (ctx) => {
					console.log(ctx);
					toast.error(ctx.error.message, { id: ctx.error.status });
				},
				onSuccess: () => {
					router.push("/sign-in");
					toast.success("Signed out successfully.", { id: "sign-out-success" });
				},
			},
		});
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{isPending ? (
					<Skeleton className="h-12 w-full" />
				) : (
					session && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar className="size-8 rounded-lg">
										{session.user.image ? (
											<>
												<AvatarImage
													src={session.user.image}
													alt={session.user.name}
												/>
												<AvatarFallback className="rounded-lg">
													{session.user.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											</>
										) : (
											<AvatarFallback className="rounded-lg">
												{session.user.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										)}
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{session.user.name}
										</span>
										<span className="truncate text-xs">
											{session.user.email}
										</span>
									</div>
									<ChevronsUpDown className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar className="h-8 w-8 rounded-lg">
											{session.user.image ? (
												<>
													<AvatarImage
														src={session.user.image}
														alt={session.user.name}
													/>
													<AvatarFallback className="rounded-lg">
														{session.user.name.charAt(0).toUpperCase()}
													</AvatarFallback>
												</>
											) : (
												<AvatarFallback className="rounded-lg">
													{session.user.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											)}
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">
												{session.user.name}
											</span>
											<span className="truncate text-xs">
												{session.user.email}
											</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<BadgeCheck />
										Account
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCard />
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bell />
										Notifications
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleSignOut}>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)
				)}
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
