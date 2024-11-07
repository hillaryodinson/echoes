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

export default function Component() {
	const params = useParams();
	const vault = params.id;
	const toaster = useToast();

	const [isGridView, setIsGridView] = useState(true);
	const [columnCount, setColumnCount] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
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
	const addColumn = () => setColumnCount((prev) => Math.min(prev + 1, 6));

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
								onClick={addColumn}
								disabled={columnCount >= 6}
								aria-label="Add column">
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					</div>
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
			</CardContent>
		</Card>
	);
}
