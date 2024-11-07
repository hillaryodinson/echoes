import { Card, CardContent } from "@/components/ui/card";
import { File, Folder, Trash2 } from "lucide-react";
import React from "react";
import NotFoundGridComponent from "./not-found-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const GridViewFolderLayout = ({
	currentItems,
	columnCount,
	emptyText = "No items found",
}: {
	currentItems: any;
	columnCount: number;
	emptyText?: string;
}) => {
	return (
		<>
			{currentItems ? (
				<div
					className={`grid gap-4 mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${columnCount}`}>
					{currentItems.map((item: any) => (
						<Link href={`/vaults/${item.id}`}>
							<Card key={item.id} className="relative">
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-1 top-1 bg-gray-500 hover:bg-gray-600 rounded-full"
									onClick={() => {}}>
									<Trash2 className="h-3 w-3 text-white" />
									<span className="sr-only">Delete item</span>
								</Button>
								<CardContent className="flex flex-col items-center p-4">
									<Folder className="h-8 w-8 mb-2 text-blue-500" />
									<div className="text-center">
										<h2 className="text-xs font-semibold truncate">
											{item.name}
										</h2>
										<p className="text-sm text-gray-500 capitalize">vault</p>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			) : (
				<NotFoundGridComponent text={emptyText} />
			)}
		</>
	);
};

export default GridViewFolderLayout;
