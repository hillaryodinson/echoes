import { randomInt } from "crypto";
import bcrypt from "bcryptjs";

export const genSalt = () => {
	return randomInt(6, 12);
};

export const hashPassword = async (password: string) => {
	const salt = genSalt();
	return await bcrypt.hashSync(password, salt);
};
