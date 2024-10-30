import { updateOTPByUserId } from "./user.service";

export const generateOTP = () => {
	const digits = "0123456789";
	let OTP = "";
	for (let i = 0; i < 6; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
};
export const sendSMS = async (phone: string, message: string) => {
	const response = await fetch(
		`https://api.ebulksms.com/sendsms?username=slykid4u@gmail.com&apikey=e8c3e03da7807cd20722c8e84ff0fd9d28f0f3e3&sender=echoes& messagetext=${message}&flash=0& recipients=${phone}`
	);
	if (response.ok) {
		return true;
	}
	console.log(response);
	return false;
};

export const sendOTP = async (userId: string) => {
	const otp = generateOTP();

	try {
		const user = await updateOTPByUserId(userId, { phoneOTP: otp });
		const message = "Your verification code is: " + otp;
		const phone = user.phone;
		return await sendSMS(phone!, message);
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : "Something went wrong"
		);
	}
};
