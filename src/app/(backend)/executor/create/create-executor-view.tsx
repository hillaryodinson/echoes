"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NOKSchema } from "@/schemas/user.schema";
import { NokType } from "@/types";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import RequiredIndicator from "@/components/custom/generic/required-indicator";
import { useMutation } from "@tanstack/react-query";
import { createWillExecutor } from "./action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function CreateNokView() {
	const toaster = useToast();
	const router = useRouter();
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<NokType>({
		resolver: zodResolver(NOKSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			altEmail: "",
			altPhone: "",
		},
	});

	const createMutation = useMutation({
		mutationFn: createWillExecutor,
		onSuccess: () => {
			toaster.toast({
				title: "Success",
				description: "Nice you successfully added your next of kin.",
				variant: "success",
			});

			router.push("/dashboard");
		},
		onError(error) {
			toaster.toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	const handleCreateWillExecutor = (data: NokType) => {
		startTransition(async () => {
			createMutation.mutate(data);
		});
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center">
			<div className="p-4 border-blue-500 border rounded-md w-full md:w-2/3">
				<p className="text-xs tracking-normal text-left">
					First, You need to designate someone you trust as your executor of
					your will. Specific notification will be transfer to this person when
					needed.
				</p>
			</div>
			<Form {...form}>
				<form
					method="post"
					onSubmit={form.handleSubmit(handleCreateWillExecutor)}
					className="w-full md:w-2/3 border rounded-md shadow-sm space-y-4 md:p-8 p-4 py-8 mt-8">
					<FormField
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold text-xs">
									Next of Kin Name
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
					<div className="grid md:grid-cols-2 gap-4">
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-xs">
										Email
										<RequiredIndicator />
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="email"
											className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name="altEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-xs">
										Alternative Email
									</FormLabel>
									<FormControl>
										<Input {...field} type="email" />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<div className="grid md:grid-cols-2 gap-4">
						<FormField
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-xs">
										Phone No.
										<RequiredIndicator />
									</FormLabel>
									<FormControl>
										<Input type="tel" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name="altPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-xs">
										Alternative Phone No.
									</FormLabel>
									<FormControl>
										<Input {...field} type="tel" />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
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
