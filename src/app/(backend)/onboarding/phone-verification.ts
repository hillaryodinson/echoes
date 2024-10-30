"use server";
import { auth } from "@/server/auth";
import { sendOTP } from "@/services/sms.service";
import {
	findUserWithIdAndOTP,
	updateOTPByUserIdAndOTP,
} from "@/services/user.service";

export const verifyOTP = async (userOtp: string) => {
	//get the user from db using session
	const session = await auth();
	//get user id from session & update phoneOTP
	//TODO: Security: Ensure OTP expires after 10 minutes
	try {
		const userId = session?.user.usid;
		const user = await findUserWithIdAndOTP(userId!, userOtp);

		if (!user) {
			throw new Error("Invalid OTP");
		}
		return await updateOTPByUserIdAndOTP(user.id, userOtp, {
			setupState: user.setupState + 1,
			phoneOTP: null,
		});
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : "Something went wrong"
		);
	}
};

export const resendOTP = async () => {
	const session = await auth();
	if (!session?.user.usid) {
		throw new Error("Unauthorized access");
	}
	return sendOTP(session?.user.usid);
};
