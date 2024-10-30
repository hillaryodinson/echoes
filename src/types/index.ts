import {
	LoginSchema,
	NOKSchema,
	OtpSchema,
	PhoneSchema,
	ProfileSchema,
	RegisterSchema,
} from "@/schemas/user.schema";
import { z } from "zod";

export type LoginType = z.infer<typeof LoginSchema>;
export type RegistrationType = z.infer<typeof RegisterSchema>;
export type UpdateProfileType = z.infer<typeof ProfileSchema>;
export type NokType = z.infer<typeof NOKSchema>;
export type PhoneType = z.infer<typeof PhoneSchema>;
export type OtpType = z.infer<typeof OtpSchema>;

export const setupStages: Record<number, string> = {
	1: "phone_no_setup",
	2: "phone_verification",
	3: "nok_setup",
	4: "will_executor_setup",
	5: "executor_setup",
	6: "walkthrough",
	0: "completed",
};

export interface ActionResponse<T> {
	success: boolean;
	message: string;
	data?: T;
}
