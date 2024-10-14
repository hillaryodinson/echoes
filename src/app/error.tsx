"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Optionally log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<Image
					src="/assets/warning.png"
					alt="Sad search"
					width={200}
					height={200}
					className="mx-auto"
					style={{ aspectRatio: "200/200", objectFit: "cover" }}
				/>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					{error.message}
				</h1>
				<p className="mt-4 text-muted-foreground">
					The page you&apos;re looking for doesn&apos;t seem to exist.
					Let&apos;s get you back on track.
				</p>
				<div className="mt-6">
					<button
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						onClick={
							// Attempt to recover by trying to re-render the invoices route
							() => reset()
						}>
						Try again
					</button>
				</div>
			</div>
		</div>
	);
}
