"use client";

import { use, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableHeader,
} from "@/components/ui/table";
import {
	Folder,
	File,
	LayoutGrid,
	LayoutList,
	ChevronLeft,
	ChevronRight,
	Plus,
	ChevronDown,
	ArrowLeft,
	Columns2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
	fetchVaultContentsAction,
	fetchVaultDataAction,
	fetchVaultsAction,
} from "../action";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import RepoLayoutViewComponent from "@/components/custom/generic/repo-layout-view";
import Modal from "@/components/custom/generic/modal";
import { cn } from "@/lib/utils";
import UploadItemComponent from "./upload-item";

export default function Component() {
	const params = useParams();
	const vault = params.id;
	const toaster = useToast();

	const [isGridView, setIsGridView] = useState(true);
	const [columnCount, setColumnCount] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showColumn, setShowColumn] = useState<boolean>(false);

	const itemsPerPage = 20;
	const { data, isFetching } = useQuery({
		queryKey: ["fetch_vaults", vault],
		queryFn: async () => {
			if (vault) {
				toaster.toast({
					title: "Error",
					description: "Vault not found",
					variant: "destructive",
					duration: 3000,
				});
				return [];
			}
			return await fetchVaultContentsAction(vault as string);
		},
	});
	const vaultData = useQuery({
		queryKey: ["fetch_vault", vault],
		queryFn: () => fetchVaultDataAction(vault as string),
	});

	const totalPages = Math.ceil((data ?? []).length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = data?.slice(startIndex, endIndex);

	const nextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const addColumn = () => {
		alert("I am here");
	};

	return (
		<Card className="border bg-muted/50">
			<CardContent className="p-6">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-2xl font-bold">
							{vaultData.isFetched && vaultData.data?.name}
						</h1>
						<div className="flex space-x-2">
							<Link
								href="/vaults"
								className={buttonVariants({
									variant: "outline",
									size: "icon",
								})}>
								<ArrowLeft className="h-4 w-4" />
							</Link>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setIsGridView(!isGridView)}
								aria-label={
									isGridView ? "Switch to list view" : "Switch to grid view"
								}>
								{isGridView ? (
									<LayoutList className="h-4 w-4" />
								) : (
									<LayoutGrid className="h-4 w-4" />
								)}
							</Button>

							<Button
								variant="outline"
								size="icon"
								onClick={() => setIsOpen((prev) => !prev)}
								aria-label="Add document">
								<Plus className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setShowColumn((prev) => !prev)}
								aria-label="Add document">
								<Columns2 className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div
						className={cn("relative py-6 lg:gap-10 lg:py-8 xl:grid ", {
							"xl:grid-cols-[1fr_300px]": showColumn,
						})}>
						<div>
							<RepoLayoutViewComponent
								isGridView={isGridView}
								columnCount={columnCount}
								currentItems={currentItems}
								isFetching={isFetching}
							/>
							<div className="flex justify-center items-center space-x-2 mt-4">
								<Button
									onClick={prevPage}
									disabled={currentPage === 1}
									aria-label="Previous page">
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<span>
									Page {currentPage} of {totalPages}
								</span>
								<Button
									onClick={nextPage}
									disabled={currentPage === totalPages}
									aria-label="Next page">
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
						{showColumn && (
							<div className="hidden text-sm xl:block">
								<div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
									<div className="no-scrollbar h-full overflow-auto pb-10">
										<div className="space-y-2">
											<p className="font-medium">On This Page</p>
											<ul className="m-0 list-none">
												<li className="mt-0 pt-2">
													<a
														href="#installation"
														className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
														Installation
													</a>
												</li>
												<li className="mt-0 pt-2">
													<a
														href="#usage"
														className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
														Usage
													</a>
												</li>
												<li className="mt-0 pt-2">
													<a
														href="#examples"
														className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
														Examples
													</a>
													<ul className="m-0 list-none pl-4">
														<li className="mt-0 pt-2">
															<a
																href="#custom-close-button"
																className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
																Custom close button
															</a>
														</li>
													</ul>
												</li>
												<li className="mt-0 pt-2">
													<a
														href="#notes"
														className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
														Notes
													</a>
												</li>
											</ul>
										</div>
										<div className="group relative flex flex-col gap-2 rounded-lg border p-4 text-sm mt-6 max-w-[80%]">
											<div className="text-balance text-lg font-semibold leading-tight group-hover:underline">
												Bring your app built with shadcn to life on Vercel
											</div>
											<div>
												Trusted by OpenAI, Sonos, Chick-fil-A, and more.
											</div>
											<div>
												Vercel provides tools and infrastructure to deploy apps
												and features at scale.
											</div>
											<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs mt-2 w-fit">
												Deploy Now
											</button>
											<a
												target="_blank"
												rel="noreferrer"
												className="absolute inset-0"
												href="https://vercel.com/new?utm_source=shadcn_site&amp;utm_medium=web&amp;utm_campaign=docs_cta_deploy_now_callout">
												<span className="sr-only">Deploy to Vercel</span>
											</a>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>

					<Modal
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						closeOnBgClick={false}
						title="Upload Document"
						className="min-w-fit max-h-screen overflow-y-auto">
						<UploadItemComponent />
					</Modal>
				</div>
			</CardContent>
		</Card>
	);
}
