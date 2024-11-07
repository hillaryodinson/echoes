"use server";
import { db } from "@/config/db";
import { hashPassword } from "@/lib/hasher";
import { auth } from "@/server/auth";
import { VaultType } from "@/types";
import { redirect } from "next/navigation";

export const createVault = async (data: VaultType) => {
	const session = await auth();
	let password = null;

	console.log(session?.user);
	if (!session || !session?.user) {
		redirect("/login");
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
