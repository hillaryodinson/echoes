import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/config/db";
import { Adapter } from "next-auth/adapters";
import { User } from "@prisma/client";
import * as argon from "argon2";

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
					const passwordValidate = await argon.verify(
						user.password,
						password as string
					);
					//if password dont match throw invalid user error
					if (!passwordValidate) {
						throw new Error("Invalid password");
					}

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
		// jwt({ token,  }) {
		// 	console.log(token, "USER: ", user);
		// },
		// session({ session, user, token }) {
		// 	console.log(session, user, token);
		// },
	},
});
