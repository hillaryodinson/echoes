"use server";
import { signIn, signOut } from "@/server/auth";
import { User } from "@prisma/client";

export async function doSocialLogin(formData: FormData) {
	const provider = formData.get("action") as string;
	await signIn(provider, { redirectTo: "/admin", redirect: true });
}

export const doLogout = async () => {
	await signOut({ redirectTo: "/" });
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

		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};
