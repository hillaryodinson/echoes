"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updatePhoneNumber } from "./action";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneSchema } from "@/schemas/user.schema";
import { setupStages, PhoneType, ActionResponse } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import RequiredIndicator from "@/components/custom/generic/required-indicator";
import { User } from "@prisma/client";

const PhoneOnboardingPage = ({ currentStage }: { currentStage: number }) => {
	const [isPending, startTransition] = useTransition();
	const toaster = useToast();
	const router = useRouter();

	const form = useForm<PhoneType>({
		resolver: zodResolver(PhoneSchema),
		defaultValues: {
			phone: "",
		},
	});

	const updateMutation = useMutation({
		mutationKey: ["update-phone"],
		mutationFn: updatePhoneNumber,
		onSuccess: (data: ActionResponse<User>) => {
			if (data.success) {
				toaster.toast({
					title: "Success",
					description: "Phone number was updated successfully",
					variant: "success",
				});
				const nextStageName = setupStages[currentStage + 1];
				router.push(`/onboarding?stage=${nextStageName}`);
			} else {
				toaster.toast({
					title: "Error",
					description: data.message,
					variant: "destructive",
				});
			}
		},
		onError: () => {
			toaster.toast({
				title: "Error",
				description: "Something went wrong. Please try again",
				variant: "destructive",
			});
		},
	});

	const handlePhoneVerification = async (data: PhoneType) => {
		startTransition(async () => {
			updateMutation.mutateAsync(data);
		});
	};
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center">
			<div className="p-4 border-blue-500 border rounded-md w-full md:w-2/3">
				<p className="text-xs tracking-tight text-left italic">
					Lets get your phone number, we will use this to remind you to validate
					you are alive. If we dont get feedback after 5 attempts we will
					initiate transition protocol. You know contact your next of kin and
					begin the wealth transfer
				</p>
			</div>
			<Form {...form}>
				<form
					method="post"
					onSubmit={form.handleSubmit(handlePhoneVerification)}
					className="w-full md:w-2/3 border rounded-md shadow-sm space-y-4 md:p-8 p-4 py-8 mt-8">
					<FormField
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold text-xs">
									Phone Number
									<RequiredIndicator />
								</FormLabel>
								<FormControl>
									<div className="relative">
										<div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none text-muted-foreground">
											<Phone className="h-4 w-4" />
										</div>
										<Input
											{...field}
											className="appearance-none outline-none block ps-10 p-2.5 text-gray-800 w-full bg-transparent pl-11"
											placeholder="123-456-7890"
										/>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						isLoading={isPending}
						loadingText="Setting up Phone Number">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default PhoneOnboardingPage;
