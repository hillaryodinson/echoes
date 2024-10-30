"use server";
import { PhoneSchema } from "@/schemas/user.schema";
import { auth } from "@/server/auth";
import { sendOTP } from "@/services/sms.service";
import { updateUser } from "@/services/user.service";
import { ActionResponse, PhoneType } from "@/types";
import { User } from "@prisma/client";

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
