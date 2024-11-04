import { z } from "zod";

export const VaultSchema = z.object({
	name: z.string().min(1, { message: "Vault Name is required" }),
	password: z.union([
		z.string().min(1, { message: "Password is required" }).nullish(),
		z.literal(""),
	]),
});
