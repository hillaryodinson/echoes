import { randomInt } from "crypto";
import bcrypt from "bcryptjs";

export const genSalt = () => {
	return randomInt(12, 22);
};

export const hashPassword = async (password: string) => {
	const salt = genSalt();
	return await bcrypt.hash(password, salt);
};
