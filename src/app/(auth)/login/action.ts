"use server";
import { sendMail } from "@/lib/mailer";
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

		const message = `<p>Dear ${response?.user?.name},</p><p>you have successfully logged in. </p>`;
		await sendMail(
			response?.user?.email as string,
			"Login Successful",
			message
		);

		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};
