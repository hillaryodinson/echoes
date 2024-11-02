"use server";

import { db } from "@/config/db";
import { NOKSchema } from "@/schemas/user.schema";
import { auth } from "@/server/auth";
import { NokType } from "@/types";
import { redirect } from "next/navigation";

export const createNokOnboarding = async (data: NokType) => {
	const session = await auth();

	console.log(session?.user);
	if (!session || !session?.user) {
		redirect("/login");
	}

	const isValid = NOKSchema.safeParse(data);

	if (isValid.error) {
		throw new Error(isValid.error.message);
	}

	const user = await db.user.findFirst({
		where: {
			email: session?.user?.email as string,
		},
	});

	if (!user) {
		throw new Error("User dont exist");
	}

	await db.user.update({
		where: {
			id: user.id,
		},
		data: {
			setupState: user.setupState + 1,
		},
	});

	return await db.nok.create({
		data: {
			name: data.name,
			phone: data.phone,
			email: data.email,
			altEmail: data.altEmail,
			altPhone: data.altPhone,
			user: {
				connect: {
					id: user.id,
				},
			},
		},
	});
};
