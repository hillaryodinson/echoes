import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

const LoginPage = () => {
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
				<p className="text-gray-600 mb-8">Enter your email below</p>
				<Input placeholder="name@example.com" className="mb-4" />
				<Button className="bg-[#bd1e59] text-white w-full mb-4">
					Sign In with Email
				</Button>
				<div className="flex items-center mb-4">
					<div className="flex-grow h-px bg-gray-300" />
					<span className="mx-4 text-sm text-gray-500">OR CONTINUE WITH</span>
					<div className="flex-grow h-px bg-gray-300" />
				</div>
				<Button
					variant="outline"
					className="flex items-center justify-center w-full mb-4">
					<ChromeIcon className="text-gray-600 h-5 w-5 mr-2" />
					Google
				</Button>
				<p className="text-xs text-gray-500 mt-4">
					By clicking continue, you agree to our Terms of Service and Privacy
					Policy.
				</p>
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
