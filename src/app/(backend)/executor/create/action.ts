"use server";

import { db } from "@/config/db";
import { NOKSchema } from "@/schemas/user.schema";
import { auth } from "@/server/auth";
import { NokType } from "@/types";
import { redirect } from "next/navigation";

export const createWillExecutor = async (data: NokType) => {
	const session = await auth();

	console.log(session?.user);
	if (!session || !session?.user) {
		redirect("/login");
	}

	const isValid = NOKSchema.safeParse(data);

	if (isValid.error) {
		throw new Error(isValid.error.message);
	}

	return await db.willExecutor.create({
		data: {
			name: data.name,
			phone: data.phone,
			email: data.email,
			altEmail: data.altEmail,
			altPhone: data.altPhone,
			User: {
				connect: {
					email: session?.user?.email as string,
				},
			},
		},
	});
};
