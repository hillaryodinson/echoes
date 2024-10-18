"use client";
import React, { useTransition } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/user.schema";
import { LoginType } from "@/types";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { doCredentialSignin, doSocialLogin } from "./action";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
	const router = useRouter();
	const toaster = useToast();
	const [isPending, startTransition] = useTransition();
	const form = useForm<LoginType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleCredentialLogin = ({ email, password }: LoginType) => {
		startTransition(async () => {
			try {
				//try to login the user.
				const user = await doCredentialSignin({ email, password });

				//if there is an error, throw an error
				if (!user) {
					throw new Error("Incorrect email or password");
				}

				toaster.toast({
					title: "Success",
					description: "Login was successful. redirecting...",
					variant: "success",
				});

				//if no error, redirect to the dashboard
				router.push("/dashboard");
			} catch (error: Error | unknown) {
				toaster.toast({
					title: "Error",
					description:
						error instanceof Error ? error?.message : "Something went wrong",
					variant: "destructive",
				});
			}
		});
	};

	return (
		<>
			<div className="text-right">
				<Link
					href="/signup"
					className="text-sm font-medium text-gray-600"
					prefetch={false}>
					Sign up
				</Link>
			</div>
			<div className="mt-12">
				<h2 className="text-3xl font-bold mb-4">Sign in to your account</h2>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCredentialLogin)}
						className="space-y-4">
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="name@example.com"
											{...field}
											className="mb-4"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="********"
											{...field}
											className="mb-4"
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button
							className="bg-[#bd1e59] text-white w-full mb-4"
							type="submit"
							value="credentials"
							name="action"
							isLoading={isPending}
							loadingText="Signing In">
							Sign In with Email
						</Button>
					</form>
				</Form>
				<div className="flex items-center my-4">
					<div className="flex-grow h-px bg-gray-300" />
					<span className="mx-4 text-sm text-gray-500">OR CONTINUE WITH</span>
					<div className="flex-grow h-px bg-gray-300" />
				</div>
				<form action={doSocialLogin}>
					<Button
						variant="outline"
						className="flex items-center justify-center w-full mb-4"
						type="submit"
						value="google"
						name="action"
						isLoading={isPending}
						loadingText="Verifying account">
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

export default LoginPage;

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
