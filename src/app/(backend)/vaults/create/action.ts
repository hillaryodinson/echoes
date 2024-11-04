"use server";

import { db } from "@/config/db";
import { NOKSchema } from "@/schemas/user.schema";
import { VaultSchema } from "@/schemas/vault.schema";
import { auth } from "@/server/auth";
import { VaultType } from "@/types";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { hashPassword } from "@/lib/hasher";

export const createVault = async (data: VaultType) => {
	const session = await auth();
	let password = null;

	console.log(session?.user);
	if (!session || !session?.user) {
		redirect("/login");
	}

	const isValid = VaultSchema.safeParse(data);

	if (isValid.error) {
		throw new Error(isValid.error.message);
	}

	const count = await db.vault.count({
		where: {
			owner: {
				email: session?.user?.email as string,
			},
			name: data.name,
		},
	});

	const newVaultName = count > 0 ? `${data.name} (${count})` : data.name;
	if (data.password) {
		password = await hashPassword(data.password);
	}

	return await db.vault.create({
		data: {
			name: newVaultName,
			password: password,
			owner: {
				connect: {
					email: session?.user?.email as string,
				},
			},
		},
	});
};
