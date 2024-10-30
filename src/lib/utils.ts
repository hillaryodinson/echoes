import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getKey = (obj: any, value: string) =>
	Object.keys(obj).find((key) => obj[key] === value);
