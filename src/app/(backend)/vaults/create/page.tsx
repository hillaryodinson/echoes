"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NOKSchema } from "@/schemas/user.schema";
import { NokType, VaultType } from "@/types";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import RequiredIndicator from "@/components/custom/generic/required-indicator";
import { useMutation } from "@tanstack/react-query";
import { createVault } from "./action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { VaultSchema } from "@/schemas/vault.schema";
import { Switch } from "@/components/ui/switch";

export default function CreateNokView() {
	const toaster = useToast();
	const router = useRouter();
	const [isChecked, setIsChecked] = React.useState(false);
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<VaultType>({
		resolver: zodResolver(VaultSchema),
		defaultValues: {
			name: "Personal Vault",
			password: "",
		},
	});

	const handleEmptyPassword = () => {
		setIsChecked(!isChecked);
		form.setValue("password", "");
	};

	const createMutation = useMutation({
		mutationFn: createVault,
		onSuccess: (data) => {
			toaster.toast({
				title: "Success",
				description: "Vault was added successfully",
				variant: "success",
			});

			router.push(`/vaults/${data.id}`);
		},
		onError(error) {
			toaster.toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	const handleCreateVault = (data: VaultType) => {
		startTransition(async () => {
			createMutation.mutate(data);
		});
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center">
			<div className="p-4 border-blue-500 border rounded-md w-full md:w-2/3">
				<p className="text-xs tracking-normal text-left">
					Create a vault that would store your records and documents.
				</p>
			</div>
			<Form {...form}>
				<form
					method="post"
					onSubmit={form.handleSubmit(handleCreateVault)}
					className="w-full md:w-2/3 border rounded-md shadow-sm space-y-4 md:p-8 p-4 py-8 mt-8">
					<FormField
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold text-xs">
									Vault Name
									<RequiredIndicator />
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div>
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormDescription>
									Would you like to add a password to protect this vault?
									<br />
									Only your designated next of kin will be able to access it
									after your passing.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={isChecked}
									onCheckedChange={handleEmptyPassword}
								/>
							</FormControl>
						</FormItem>
					</div>
					{isChecked && (
						<FormField
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-xs">
										Password
										<RequiredIndicator />
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											{...field}
											className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<Button
						type="submit"
						isLoading={isPending}
						loadingText="Creating next of kin...">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
