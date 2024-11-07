import React from "react";

import GridViewLayout from "./repo-grid-view";
import ListViewLayout from "./repo-list-view";
import Loader from "./loader";

const RepoLayoutViewComponent = ({
	isGridView,
	columnCount,
	currentItems,
	isFetching,
	emptyText = "No items found",
}: {
	isGridView: boolean;
	columnCount: number;
	currentItems: any;
	isFetching?: boolean;
	emptyText?: string;
}) => {
	return (
		<>
			{isGridView ? (
				isFetching ? (
					<div className="p-4 sm:p-6 md:p-8">
						<div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
							<div className="flex flex-col items-center space-y-4 text-gray-500">
								<Loader className="w-4 h-4 bg-blue-500" aria-hidden="true" />
								<span className="text-sm font-medium" aria-live="polite">
									Getting vaults
								</span>
							</div>
						</div>
					</div>
				) : (
					<GridViewLayout
						currentItems={currentItems}
						columnCount={columnCount}
					/>
				)
			) : isFetching ? (
				<div className="p-4 sm:p-6 md:p-8">
					<div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
						<div className="flex flex-col items-center space-y-4 text-gray-500">
							<Loader className="w-12 h-12 animate-spin" aria-hidden="true" />
							<span className="text-sm font-medium" aria-live="polite">
								Getting vaults
							</span>
						</div>
					</div>
				</div>
			) : (
				<ListViewLayout currentItems={currentItems} />
			)}
		</>
	);
};

export default RepoLayoutViewComponent;
