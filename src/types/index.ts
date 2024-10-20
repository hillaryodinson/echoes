import { LoginSchema, NOKSchema, RegisterSchema } from "@/schemas/user.schema";
import { z } from "zod";

export type LoginType = z.infer<typeof LoginSchema>;
export type RegistrationType = z.infer<typeof RegisterSchema>;
export type NokType = z.infer<typeof NOKSchema>;
