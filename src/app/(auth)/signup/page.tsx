"use client";
import React, { useTransition } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationType } from "@/types";
import { RegisterSchema } from "@/schemas/user.schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { doSocialLogin } from "../login/action";
import { useMutation } from "@tanstack/react-query";
import { doSignup } from "./action";

const SignupPage = () => {
	const router = useRouter();
	const toaster = useToast();
	const [isPending, startTransition] = useTransition();

	const form = useForm<RegistrationType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const createMutation = useMutation({
		mutationFn: async (data: RegistrationType) => {
			//validate the user data
			try {
				const isValid = RegisterSchema.safeParse(data);
				if (isValid.error) {
					throw new Error("User data is invalid: " + isValid.error.message);
				}

				await doSignup(isValid.data);

				//send an email notification to the user
				//TBD: activation email or just welcome email
				//redirect the user to the login page
				toaster.toast({
					title: "Success",
					description: "Registration was successful. Please login to continue.",
					variant: "success",
				});
				router.replace("/login");
				return;
			} catch (error: Error | unknown) {
				toaster.toast({
					title: "Error",
					description:
						error instanceof Error
							? error.message
							: "An error occurred. please try again",
					variant: "destructive",
				});
			}
		},
		onSuccess: () => {},
	});

	const handleSignup = async (data: RegistrationType) => {
		startTransition(async () => {
			await createMutation.mutateAsync(data);
		});
	};

	return (
		<>
			<div className="text-right">
				<Link
					href="/login"
					className="text-sm font-medium text-gray-600"
					prefetch={false}>
					Login
				</Link>
			</div>
			<div className="mt-12">
				<h2 className="text-3xl font-bold mb-4">Create an account</h2>
				<p className="text-gray-600 mb-8">
					Enter your email below to create your account
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSignup)}
						className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Name" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="john@example.com"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							className="bg-[#bd1e59] text-white w-full mb-4"
							loadingText="...creating account"
							isLoading={isPending}
							type="submit">
							Sign Up
						</Button>
					</form>
				</Form>

				<div className="flex items-center my-6">
					<div className="flex-grow h-px bg-gray-300" />
					<span className="mx-4 text-sm text-gray-500">OR CONTINUE WITH</span>
					<div className="flex-grow h-px bg-gray-300" />
				</div>
				<form action={doSocialLogin}>
					<Button
						variant="outline"
						className="flex items-center justify-center w-full mb-4"
						loadingText="...creating account"
						isLoading={isPending}>
						<ChromeIcon className="text-gray-600 h-5 w-5 mr-2" />
						Google
					</Button>
					<p className="text-xs text-gray-500 mt-4">
						By clicking continue, you agree to our Terms of Service and Privacy
						Policy.
					</p>
				</form>
			</div>
		</>
	);
};

export default SignupPage;

function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<circle cx="12" cy="12" r="10" />
			<circle cx="12" cy="12" r="4" />
			<line x1="21.17" x2="12" y1="8" y2="8" />
			<line x1="3.95" x2="8.54" y1="6.06" y2="14" />
			<line x1="10.88" x2="15.46" y1="21.94" y2="14" />
		</svg>
	);
}
