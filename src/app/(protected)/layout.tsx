import { ProtectedSidebar } from "@/app/(protected)/_components/protected-sidebar";
import { SiteProtectedHeader } from "@/app/(protected)/_components/site-protected-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			{/* APP SIDEBAR */}
			<ProtectedSidebar collapsible="offcanvas" variant="inset" />
			<SidebarInset>
				<SiteProtectedHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<main className="flex flex-col gap-4">{children}</main>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
