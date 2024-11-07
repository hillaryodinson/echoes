import { Card, CardContent } from "@/components/ui/card";
import { File, Folder } from "lucide-react";
import React from "react";
import NotFoundGridComponent from "./not-found-grid";

const GridViewLayout = ({
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
			{currentItems.length > 0 ? (
				<div
					className={`grid gap-4 mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${columnCount}`}>
					{currentItems.map((item: any) => (
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
				<NotFoundGridComponent text={emptyText} />
			)}
		</>
	);
};

export default GridViewLayout;
