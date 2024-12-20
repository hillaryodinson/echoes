"use server";

import { signIn, signOut } from "@/server/auth";
import { User } from "@prisma/client";

export async function doSocialLogin(formData: FormData) {
	const provider = formData.get("action") as string;
	await signIn(provider, { redirectTo: "/dashboard", redirect: true });
}

export const doLogout = async () => {
	await signOut({ redirectTo: "/", redirect: true });
};

export const doCredentialSignin = async (credentials: {
	email: string;
	password: string;
}): Promise<User | null> => {
	try {
		const response = await signIn("credentials", {
			...credentials,
			redirect: false,
		});
		console.log("USER", response);

		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};
