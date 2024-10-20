import { auth } from "@/server/auth";
import React from "react";
import { logout } from "./action";

const DashboardPage = async () => {
	const session = await auth();
	const username = session?.user?.name;
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
			<div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
				<div className="mx-auto max-w-md text-center">
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Welcome {username}
					</h1>
					<p className="mt-4 text-muted-foreground">
						The page you&apos;re looking for doesn&apos;t seem to exist.
						Let&apos;s get you back on track.
					</p>
					<div className="mt-6">
						<form action={logout}>
							<button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
								Log Out
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
