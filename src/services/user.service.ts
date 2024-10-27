import { db } from "@/config/db";
import { hashPassword } from "@/lib/hasher";
import { sendMail, template } from "@/lib/mailer";
import { RegistrationType } from "@/types";
import { User } from "@prisma/client";

export const createUser = async (
	data: RegistrationType
): Promise<User | null> => {
	// Create user

	try {
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
		const hashedPassword = await hashPassword(password);

		const account = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		const subject = "Account created successfully";
		const message = template(
			subject,
			`<p>Dear ${name},</p><p>you have successfully created an account. </p>`
		);
		await sendMail(email, subject, message);
		return account;
	} catch (error) {
		console.log(error);
		return null;
	}
};
