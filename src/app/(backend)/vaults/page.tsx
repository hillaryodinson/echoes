"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVaultsAction } from "./action";
import Link from "next/link";
import GridViewFolderLayout from "@/components/custom/generic/repo-grid-folder-view";
import Loader from "@/components/custom/generic/loader";

export default function Component() {
	const [isGridView, setIsGridView] = useState(true);
	const [columnCount, setColumnCount] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isFetching } = useQuery({
		queryKey: ["vaults"],
		queryFn: async () => await fetchVaultsAction(),
	});

	const itemsPerPage = 20;
	const totalPages = Math.ceil((data ?? []).length / itemsPerPage);
	console.log(data, "TOTAL PAGES");

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = data?.slice(startIndex, endIndex);

	const nextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

	return (
		<Card className="border bg-muted/50">
			<CardContent className="p-6">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-2xl font-bold">Document Repository</h1>
						<div className="flex space-x-2">
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

							<Link
								href="/vaults/create"
								className={buttonVariants({
									variant: "outline",
									size: "icon",
								})}
								aria-label="Add column">
								<Plus className="h-4 w-4" />
							</Link>
						</div>
					</div>
					{isGridView ? (
						isFetching ? (
							<div className="p-4 sm:p-6 md:p-8">
								<div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
									<div className="flex flex-col items-center space-y-4 text-gray-500">
										<Loader
											className="w-4 h-4 bg-blue-500"
											aria-hidden="true"
										/>
										<span className="text-sm font-medium" aria-live="polite">
											Getting vaults
										</span>
									</div>
								</div>
							</div>
						) : (
							<GridViewFolderLayout
								currentItems={currentItems}
								columnCount={columnCount}
								emptyText="No vaults yet. Create one to get started"
							/>
						)
					) : (
						<div className="mt-4 overflow-x-auto">
							<Table>
								<TableHeader className="bg-white border">
									<TableRow>
										<TableHead className="w-[50px]"></TableHead>
										<TableHead className="font-medium text-sm text-gray-500">
											Name
											<ChevronDown className="inline-block ml-1 h-3 w-3 text-gray-400" />
										</TableHead>
										<TableHead className="font-medium text-sm text-gray-500">
											Type
										</TableHead>
										<TableHead className="font-medium text-sm text-gray-500 text-right">
											Size
											<ChevronDown className="inline-block ml-1 h-3 w-3 text-gray-400" />
										</TableHead>
										<TableHead className="font-medium text-sm text-gray-500">
											Modified
											<ChevronDown className="inline-block ml-1 h-3 w-3 text-gray-400" />
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody className="border">
									{currentItems?.map((item) => (
										<TableRow key={item.id}>
											<TableCell className="py-2">
												{<Folder className="h-5 w-5 text-blue-500" />}
											</TableCell>
											<TableCell className="py-2 text-sm">
												{item.name}
											</TableCell>
											<TableCell className="py-2 text-sm">vault</TableCell>
											<TableCell className="py-2 text-sm text-right">
												--
											</TableCell>
											<TableCell className="py-2 text-sm">
												{item.modified.getDate()}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
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
