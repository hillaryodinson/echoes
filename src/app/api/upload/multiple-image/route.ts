"use server";

import { debug } from "console";
import { randomUUID } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { type NextRequest, type NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		//get the form data
		const formData = await req.formData();
		const projectId = formData.get("projectId") as string;

		//retrieve image from formdata
		const images = formData.getAll("images") as File[];

		if (!images || !projectId) {
			console.log(projectId, images);
			throw Error("Invalid data");
		}

		const errors: { error: string; file: string }[] = [];
		const uploadedImageNames: string[] = [];

		//check if image is an instance of blob
		for (const file of images) {
			const name = await uploadImage(file);
			if (name) {
				uploadedImageNames.push(name);
				//update project images in db
				console.log("CATCHER: I stopßed here: ", uploadedImageNames);
			} else {
				errors.push({ error: "Not a file", file: JSON.stringify(file) });
			}
		}

		//await updateProjectImages(projectId, uploadedImageNames);
		return Response.json({
			success: uploadedImageNames.length < 0 ? false : true,
			message: `${uploadedImageNames.length} files out of ${images.length} was uploaded.`,
			errorFiles: errors,
			uploadedFiles: uploadedImageNames,
		});
	} catch (error) {
		console.log(error);
		return Response.json({
			success: false,
			message: "An unknown error occured",
		});
	}
}

async function uploadImage(image: File): Promise<string | null> {
	// console.log(typeof image);
	if (!image || !(image instanceof Blob)) {
		return null;
	}

	const imageBuffer = await image.arrayBuffer();
	const name = randomUUID();
	const ext = path.extname(image.name);

	//create thumbnail
	const thumbnailBuffer = await sharp(Buffer.from(imageBuffer))
		.blur(1)
		.resize(10)
		.toBuffer();

	//create file location to store image.
	const localImageDir = path.join(process.cwd(), "public/uploads/projects/");
	const localThumbDir = path.join(process.cwd(), "public/uploads/thumbnails/");

	if (!existsSync(localImageDir)) {
		//create both localImage & localThumb directories
		mkdirSync(localImageDir, { recursive: true });
		mkdirSync(localThumbDir, { recursive: true });
	}

	//write the image and thumbnail to their right
	writeFileSync(path.join(localImageDir, name + ext), Buffer.from(imageBuffer));
	writeFileSync(
		path.join(localThumbDir, "thumb-" + name + ext),
		thumbnailBuffer
	);

	//return only file name because we know the location where the document is stored.
	return name + ext;
}

async function uploadFile(file: File): Promise<string | null> {
	// console.log(typeof image);
	if (!file || !(file instanceof Blob)) {
		return null;
	}

	const validFileTypes: { [key: string]: string[] } = {
		image: ["image/jpeg", "image/jpg", "image/png", "image/gif"],
		document: ["application/pdf", "application/msword"],
		video: ["video/mp4", "video/quicktime"],
	};

	const validFileSizes: { [key: string]: number } = {
		image: 1024 * 1024 * 5,
		document: 1024 * 1024 * 10,
		video: 1024 * 1024 * 50,
	};

	const fileType = file.type.split("/")[0];
	const fileSize = file.size;

	if (
		!(fileType in validFileTypes) ||
		!validFileTypes[fileType].includes(file.type) ||
		fileSize > validFileSizes[fileType]
	) {
		return null;
	}

	const fileBuffer = await file.arrayBuffer();
	const name = randomUUID();
	const ext = path.extname(file.name);

	//create file location to store file.
	const localFileDir = path.join(process.cwd(), `public/uploads/${fileType}s/`);

	if (!existsSync(localFileDir)) {
		//create directory
		mkdirSync(localFileDir, { recursive: true });
	}

	//write the file to its right location
	writeFileSync(path.join(localFileDir, name + ext), Buffer.from(fileBuffer));

	//return only file name because we know the location where the document is stored.
	return name + ext;
}

export async function GET(req: NextRequest, res: NextResponse) {
	Response.json({ text: "hello" });
}
