import { db } from "@/config/db";
import { RegistrationType } from "@/types";
import { User } from "@prisma/client";
import * as argon from "argon2";

export const createUser = async (
	data: RegistrationType
): Promise<User | null> => {
	// Create user

	const { name, email, password } = data;
	//check if user already exists
	const user = await db.user.findFirst({
		where: {
			email,
		},
	});

	if (user) {
		throw new Error("User already exists");
	}

	//if no user exist create the user
	const hashedPassword = await argon.hash(password);

	return await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});
};
