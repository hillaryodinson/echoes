import { db } from "@/config/db";
import { hashPassword } from "@/lib/hasher";
import { sendMail, template } from "@/lib/mailer";
import { auth } from "@/server/auth";
import { RegistrationType, UpdateProfileType } from "@/types";
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

export const updateUser = async (
	id: string,
	data: UpdateProfileType & { setupState: number }
): Promise<User | null> => {
	// Create user
	try {
		const session = await auth();
		const { name, email, phone, setupState } = data;
		//check if user already exists
		const user = await db.user.findFirst({
			where: {
				id,
			},
		});

		if (!user) {
			throw new Error("Account not found");
		}

		if (session?.user.usid !== user.id) {
			console.log({ session: session, user: user });
			throw new Error("Authorization failed. Not Allowed");
		}

		const record: UpdateProfileType = {};
		if (name) {
			record.name = name;
		}

		if (email) {
			record.email = email;
		}

		if (phone) {
			record.phone = phone;
		}

		if (setupState) {
			record.setupState = setupState;
		}

		const account = await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				...record,
			},
		});

		return account;
	} catch (error) {
		console.log(error);
		return null;
	}
};
