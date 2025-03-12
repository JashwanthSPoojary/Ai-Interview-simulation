import { convertRequest } from "@/lib/convertRequest";
import { IncomingForm, Files, Fields } from "formidable";
import { NextResponse } from "next/server";
import path from "path";

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const nodeReq = await convertRequest(request);

    const data = await new Promise<{ fields: Fields; files: Files }>(
      (resolve, reject) => {
        const form = new IncomingForm({
          uploadDir: path.join(process.cwd(), "public/uploads"),
          keepExtensions: true,
          multiples: false,
        });

        form.parse(nodeReq, (err, fields, files) => {
          if (err) {
            console.error("Error parsing form data:", err);
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      }
    );

    if (!data?.files.resume) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Data received successfully",
      fileName: data.files.resume[0].newFilename,
    });
  } catch (error) {
    console.error("Error in setup API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
