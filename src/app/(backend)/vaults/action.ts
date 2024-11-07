"use server";

import { db } from "@/config/db";
import { VaultSchema } from "@/schemas/vault.schema";
import { auth } from "@/server/auth";
import { createVault } from "@/services/vault.service";
import { VaultType } from "@/types";
import { redirect } from "next/navigation";

export const createVaultAction = async (data: VaultType) => {
	const isValid = VaultSchema.safeParse(data);

	if (isValid.error) {
		throw new Error(isValid.error.message);
	}

	return await createVault(isValid.data);
};

export const fetchVaultsAction = async () => {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

	console.log(session?.user.email);

	return await db.vault.findMany({
		where: {
			owner: {
				email: session?.user.email,
			},
		},
	});
};

export const fetchVaultDataAction = async (vault: string) => {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

	console.log(session?.user.email);

	return await db.vault.findFirst({
		where: {
			id: vault,
			owner: {
				email: session?.user.email,
			},
		},
	});
};

export const fetchVaultContentsAction = async (vault: string) => {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

	return await db.vaultItems.findMany({
		where: {
			id: vault,
			vault: {
				id: vault,
				owner: {
					email: session?.user.email,
				},
			},
		},
	});
};
