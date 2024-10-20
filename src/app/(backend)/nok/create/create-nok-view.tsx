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

export default function CreateNokView() {
	const form = useForm<NokType>({
		resolver: zodResolver(NOKSchema),
	});
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center">
			<div className="p-4 border-blue-500 border rounded-md w-full md:w-2/3">
				{/* <p className="text-xs tracking-tight text-left">
					Add information of your next of kin who you intend to transfer these
					information to when its time
				</p> */}
				<p className="text-xs tracking-normal text-left">
					First, You need to designate someone you trust as your next of kin.
					All information will be transfer this person easily will be accessible
					to them when needed. This simple step can provide peace of mind for
					both you and your loved ones.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(() => {})}
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
										<Input {...field} />
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
							name="altPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-xs">
										Alternative Phone No.
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
