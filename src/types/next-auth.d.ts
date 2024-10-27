import { DefaultSession } from "next-auth";
declare module "next-auth" {
	interface Session {
		user: {
			userId: string;
			setupStage: number;
			usid: string; //for security user session id (changes when the user resets password | logs out all devices)
		} & DefaultSession["user"];
	}

	// interface Jwt {
	// 	User: {
	// 		userId: string;
	// 		setupStage: number;
	// 		usid: string; //for security user session id (changes when the user resets password | logs out all devices)
	// 	} & DefaultSession["user"];
	// }
}
