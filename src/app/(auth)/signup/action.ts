"use server";

import { LoginSchema } from "@/schemas/user.schema";
import { createUser } from "@/services/user.service";
import { RegistrationType } from "@/types";

export const doSignup = async (data: RegistrationType) => {
	//validate the user information to make sure its ok
	const validated = LoginSchema.safeParse(data);

	if (validated.error) {
		throw new Error(validated.error.message);
	}

	const response = await createUser(data);
	return response;
};
