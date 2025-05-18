import Link from "next/link";

import { Loader2 } from "lucide-react";

import { NavSidebarUserMenu } from "@/app/(protected)/_components/nav-sidebar-user-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";

export const ProtectedSidebar = ({
	...props
}: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link href="/dashboard">
								<Loader2 className="h-5 w-5 animate-spin" />
								<span className="text-base font-semibold">BufferBoxs</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent></SidebarContent>

			<SidebarFooter>
				<NavSidebarUserMenu />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
