import { z } from "zod";

/**
 * Schema for login
 */
export const LoginSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email" })
		.min(1, { message: "Email is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

/**
 * Schema for register
 */
export const RegisterSchema = LoginSchema.extend({
	name: z.string().min(1, { message: "Name is required" }),
	email: z
		.string()
		.email({ message: "Invalid email" })
		.min(1, { message: "Email is required" }),
	password: z.string().min(1, { message: "Password is required" }),
	confirmPassword: z.string().min(1, { message: "Password is required" }),
}).superRefine(({ confirmPassword, password }, ctx) => {
	if (confirmPassword !== password) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});
	}
});
