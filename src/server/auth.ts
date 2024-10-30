import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/config/db";
import { Adapter } from "next-auth/adapters";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendMail, template } from "@/lib/mailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...AuthConfig,

	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials): Promise<User | null> {
				try {
					if (!credentials?.email || !credentials?.password) {
						throw new Error("Invalid credentials");
					}
					const { email, password } = credentials;

					const user = await db.user.findFirst({
						where: { email },
					}); //do user authenthication here;

					if (!user) {
						return null;
					}

					//compare password to ensure its user
					const passwordValidate = bcrypt.compareSync(
						password as string,
						user.password!
					);
					//if password dont match throw invalid user error
					if (!passwordValidate) {
						throw new Error("Invalid password");
					}

					//send notification email to user
					const subject = "Login Successful";
					const message = template(
						subject,
						`<p>Dear ${user?.name},</p><p>you have successfully logged in. </p>`
					);
					await sendMail(user?.email as string, subject, message);

					return user;
				} catch (error) {
					console.log(error);
					return null;
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	adapter: PrismaAdapter(db) as Adapter,
	callbacks: {
		jwt({ token }) {
			// console.log(token, "USER: ", user);
			return token;
		},
		async session({ session }) {
			if (!session.user.setupStage) {
				const account = await db.user.findUnique({
					where: { email: session?.user?.email },
				});
				session.user.setupStage = account?.setupState as number;
				session.user.usid = account?.id as string;
			}
			console.log(session);
			return session;
		},
	},
});
