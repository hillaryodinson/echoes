import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";

interface modalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
	closeOnBgClick?: boolean;
}
function Modal({
	isOpen,
	setIsOpen,
	title,
	description,
	children,
	className,
	closeOnBgClick = true,
}: modalProps) {
	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen} modal={true}>
			<DialogContent
				className={cn("overflow-y-auto", className)}
				onInteractOutside={
					closeOnBgClick
						? () => setIsOpen(false)
						: (e) => {
								e.preventDefault();
						  }
				}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">{children}</div>
			</DialogContent>
		</Dialog>
	);
}

export default Modal;
