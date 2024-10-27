import { NextAuthConfig } from "next-auth";
export const AuthConfig = {
	session: {
		strategy: "jwt",
		maxAge: 30 * 60,
	},
	callbacks: {
		authorized({ auth }) {
			const isAuthenticated = !!auth?.user;

			return isAuthenticated;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
