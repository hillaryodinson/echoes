import RequiredIndicator from "@/components/custom/generic/required-indicator";
import { Button } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from "@/components/ui/form";
import { PhoneSchema } from "@/schemas/user.schema";
import { PhoneType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { Form, useForm } from "react-hook-form";

const PhoneOnboardingPage = () => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<PhoneType>({
		resolver: zodResolver(PhoneSchema),
		defaultValues: {
			phone: "",
		},
	});

	const handlePhoneVerification = () => {};
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center">
			<div className="p-4 border-blue-500 border rounded-md w-full md:w-2/3">
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
										<Input
											{...field}
											className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							isLoading={isPending}
							loadingText="Creating next of kin...">
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default PhoneOnboardingPage;
