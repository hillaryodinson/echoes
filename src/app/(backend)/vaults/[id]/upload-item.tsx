import RequiredIndicator from "@/components/custom/generic/required-indicator";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import Dropzone from "@/components/custom/generic/dropzone";

const UploadItemComponent = () => {
	const [files, setFiles] = React.useState<File[]>([]);
	const form = useForm({
		mode: "all",
	});

	const uploadFile = async (data: any) => {};

	return (
		<div className="flex flex-col gap-4 p-4 pt-0 items-center">
			<div className="p-4 border-blue-500 border rounded-md w-full">
				<p className="text-xs tracking-normal text-left">
					Create a vault that would store your records and documents.
				</p>
			</div>
			<Form {...form}>
				<form
					method="post"
					onSubmit={form.handleSubmit(uploadFile)}
					className="w-full space-y-4">
					<FormField
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold text-xs">
									Vault Name
									<RequiredIndicator />
								</FormLabel>
								<FormControl>
									<Dropzone onChange={setFiles} />
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type="submit" loadingText="Creating next of kin...">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default UploadItemComponent;
