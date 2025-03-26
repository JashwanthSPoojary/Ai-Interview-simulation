import { IncomingForm, Files, Fields } from "formidable";
import path from "path";
import fs from "fs";
import { convertRequest } from "./convertRequest";

export async function handleFileUpload(request: Request): Promise<{ fields: Fields, filePath: string }> {
  const nodeReq = await convertRequest(request);

  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
      multiples: false,
    });

    form.parse(nodeReq, (err, fields, files) => {
      if (err || !files.resume) {
        return reject("Resume file is required");
      }

      const filePath = path.join(process.cwd(), "public/uploads", files.resume[0].newFilename);
      resolve({ fields, filePath });
    });
  });
}

export async function deleteFile(filePath: string) {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
