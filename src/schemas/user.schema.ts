import { z } from "zod";
import validator from "validator";

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

export const ProfileSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }).optional(),
	email: z
		.string()
		.email({ message: "Invalid email" })
		.min(1, { message: "Email is required" })
		.optional(),
	phone: z
		.string()
		.min(1, { message: "Phone is required" })
		.refine(validator.isMobilePhone)
		.optional(),
	setupState: z.number().min(0).max(6).optional(),
});

export const NOKSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z
		.string()
		.email({ message: "Invalid email" })
		.min(1, { message: "Email is required" }),
	altEmail: z
		.string()
		.email({ message: "Invalid email" })
		.min(1, { message: "Email is required" })
		.optional(),
	phone: z
		.string()
		.min(1, { message: "Phone is required" })
		.refine(validator.isMobilePhone),
	altPhone: z
		.string()
		.min(1, { message: "Phone is required" })
		.refine(validator.isMobilePhone)
		.optional(),
});

export const PhoneSchema = z.object({
	phone: z
		.string()
		.min(1, { message: "Phone is required" })
		.refine(validator.isMobilePhone),
});

export const OtpSchema = z.object({
	otp: z.string().min(6, { message: "OTP is required" }).max(6),
});
