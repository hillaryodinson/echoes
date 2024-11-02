"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

// Sample data for demonstration
const allItems = Array(50)
	.fill(null)
	.map((_, index) => ({
		id: index + 1,
		name:
			index % 3 === 0
				? `Folder ${index + 1}`
				: `Document ${index + 1}.${index % 2 === 0 ? "docx" : "pdf"}`,
		type: index % 3 === 0 ? "folder" : "document",
		size:
			index % 3 === 0 ? "--" : `${Math.floor(Math.random() * 1000) + 10} KB`,
		modified: new Date(
			Date.now() - Math.floor(Math.random() * 10000000000)
		).toLocaleDateString(),
	}));

export default function Component() {
	const [isGridView, setIsGridView] = useState(true);
	const [columnCount, setColumnCount] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;
	const totalPages = Math.ceil(allItems.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = allItems.slice(startIndex, endIndex);

	const nextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const addColumn = () => setColumnCount((prev) => Math.min(prev + 1, 6));

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
							{isGridView && (
								<Button
									variant="outline"
									size="icon"
									onClick={addColumn}
									disabled={columnCount >= 6}
									aria-label="Add column">
									<Plus className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>
					{isGridView ? (
						<div
							className={`grid gap-4 mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${columnCount}`}>
							{currentItems.map((item) => (
								<Card key={item.id}>
									<CardContent className="flex flex-col items-center p-4">
										{item.type === "folder" ? (
											<Folder className="h-8 w-8 mb-2 text-blue-500" />
										) : (
											<File className="h-8 w-8 mb-2 text-gray-500" />
										)}
										<div className="text-center">
											<h2 className="text-xs font-semibold truncate">
												{item.name}
											</h2>
											<p className="text-sm text-gray-500 capitalize">
												{item.type}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
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
									{currentItems.map((item) => (
										<TableRow key={item.id}>
											<TableCell className="py-2">
												{item.type === "folder" ? (
													<Folder className="h-5 w-5 text-blue-500" />
												) : (
													<File className="h-5 w-5 text-gray-500" />
												)}
											</TableCell>
											<TableCell className="py-2 text-sm">
												{item.name}
											</TableCell>
											<TableCell className="py-2 text-sm">
												{item.type}
											</TableCell>
											<TableCell className="py-2 text-sm text-right">
												{item.size}
											</TableCell>
											<TableCell className="py-2 text-sm">
												{item.modified}
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
