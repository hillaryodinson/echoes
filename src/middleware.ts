import NextAuth from "next-auth";
import { AuthConfig } from "@/server/auth.config";
import {
	AUTH_LOGIN_ROUTE,
	DEFAULT_REDIRECT,
	PUBLIC_ROUTES,
	//ROOT,
} from "@/lib/routes";

const { auth } = NextAuth(AuthConfig);

// export { auth as middleware } from "@/server/auth";
export default auth((req) => {
	const { nextUrl } = req;

	const isAuthenticated = !!req.auth;
	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	//check if authenticated
	if (isAuthenticated && isPublicRoute)
		return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

	if (!isAuthenticated && !isPublicRoute)
		return Response.redirect(new URL(AUTH_LOGIN_ROUTE, nextUrl));
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
