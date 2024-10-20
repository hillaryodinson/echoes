"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumbs } from "@/components/custom/generic/breadcrumbs";
import { UserNav } from "@/components/custom/layout/admin/user-nav";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumbs />
					</div>
					<div className="hidden w-1/3 items-center gap-2 px-4 md:flex ">
						{/* <SearchInput /> */}
					</div>
					<div className="flex items-center gap-2 px-4">
						<UserNav />
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
