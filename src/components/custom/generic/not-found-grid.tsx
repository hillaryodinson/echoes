import { Folder } from "lucide-react";
import React from "react";

const NotFoundGridComponent = ({
	text = "Item is currently empty",
}: {
	text?: string;
}) => {
	return (
		<div className="p-4 sm:p-6 md:p-8">
			<div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg">
				<div className="flex flex-col items-center space-y-2 text-gray-500">
					<Folder className="w-16 h-16" aria-hidden="true" />
					<span className="text-sm font-medium">{text}</span>
				</div>
			</div>
		</div>
	);
};

export default NotFoundGridComponent;
