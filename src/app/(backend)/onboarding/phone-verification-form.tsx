"use client";
import { Button } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpSchema } from "@/schemas/user.schema";
import { OtpType, setupStages } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { verifyOTP } from "./phone-verification";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const PhoneVerificationForm = ({ currentStage }: { currentStage: number }) => {
	const [isPending, startTransition] = useTransition();
	const toaster = useToast();
	const router = useRouter();
	const createMutation = useMutation({
		mutationFn: (data: OtpType) => verifyOTP(data.otp),
		onSuccess: (data) => {
			console.log(data);
			toaster.toast({
				title: "Success",
				description: "OTP verified successfully",
				variant: "success",
			});
			const nextStageName = setupStages[currentStage + 1];
			router.push(`/onboarding?stage=${nextStageName}`);
		},
		onError: (error) => {
			toaster.toast({
				title: "Error",
				description:
					error instanceof Error
						? error.message
						: "Something went wrong. Please try again",
				variant: "destructive",
			});
		},
	});

	const form = useForm<OtpType>({
		resolver: zodResolver(OtpSchema),
		defaultValues: {
			otp: "",
		},
	});

	const onSubmit = async (data: OtpType) => {
		startTransition(async () => {
			createMutation.mutate(data);
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
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-6 py-10 justify-center items-center text-center">
					<FormField
						control={form.control}
						name="otp"
						render={({ field }) => (
							<FormItem className="w-full items-center justify-center flex flex-col space-y-4">
								<FormLabel>One-Time Password</FormLabel>
								<FormControl>
									<InputOTP maxLength={6} {...field}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormDescription>
									Please enter the one-time password sent to your phone.
								</FormDescription>
								{/* <FormDescription>
									<Button
										variant={"link"}
										onClick={() => {}}
										type="button"
										loadingText="Sending OTP">
										Resend OTP
									</Button>
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						isLoading={isPending}
						loadingText="verifying otp">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default PhoneVerificationForm;
