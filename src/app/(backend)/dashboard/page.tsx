import { auth } from "@/server/auth";
import React from "react";
import { logout } from "./action";

const DashboardPage = async () => {
	const session = await auth();
	const username = session?.user?.name;
	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
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
	);
};

export default DashboardPage;
