"use server";
import { auth } from "@/server/auth";
import { sendOTP } from "@/services/sms.service";
import { PhoneSchema } from "@/schemas/user.schema";
import { updateUser } from "@/services/user.service";
import { ActionResponse, PhoneType } from "@/types";
import { User } from "@prisma/client";

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

export const updatePhoneNumber = async (
	data: PhoneType
): Promise<ActionResponse<User>> => {
	try {
		const session = await auth();
		if (!session || !session?.user) {
			throw Error("Unauthorized access");
		}

		const { usid, setupStage } = session?.user;

		const isValid = PhoneSchema.safeParse(data);
		if (isValid.error) {
			throw new Error(isValid.error.message);
		}

		const updated = await updateUser(usid, {
			...data,
			setupState: setupStage + 1,
		});
		if (!updated) {
			throw new Error("Phone number was not updated try again");
		}

		console.log("User Id:", usid);
		//send otp to the user
		await sendOTP(usid);

		return {
			success: true,
			data: updated,
			message: "Phone number was updated",
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "An error occurred please try again",
		};
	}
};

export const resendOTP = async () => {
	const session = await auth();
	if (!session?.user.usid) {
		throw new Error("Unauthorized access");
	}
	return sendOTP(session?.user.usid);
};
