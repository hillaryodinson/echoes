import { LoginSchema, RegisterSchema } from "@/schemas/user.schema";
import { z } from "zod";

export type LoginType = z.infer<typeof LoginSchema>;
export type RegistrationType = z.infer<typeof RegisterSchema>;
