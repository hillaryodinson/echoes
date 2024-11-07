import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { ChevronDown, Folder, File } from "lucide-react";
import React from "react";

const ListViewLayout = ({ currentItems }: { currentItems: any }) => {
	return (
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
					{currentItems.length > 0 ? (
						currentItems.map((item: any) => (
							<TableRow key={item.id}>
								<TableCell className="py-2">
									{item.type === "folder" ? (
										<Folder className="h-5 w-5 text-blue-500" />
									) : (
										<File className="h-5 w-5 text-gray-500" />
									)}
								</TableCell>
								<TableCell className="py-2 text-sm">{item.name}</TableCell>
								<TableCell className="py-2 text-sm">{item.type}</TableCell>
								<TableCell className="py-2 text-sm text-right">
									{item.size}
								</TableCell>
								<TableCell className="py-2 text-sm">{item.modified}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow key="99WW">
							<TableCell className="py-2 text-center" colSpan={5}>
								No content yet. Please add documents to get started
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default ListViewLayout;
