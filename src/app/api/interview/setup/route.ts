import { handleFileUpload, deleteFile } from "@/lib/fileHandler";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { analyzeResume } from "@/lib/aiService";
import { saveDeveloper } from "@/lib/prismaService";
import { NextResponse } from "next/server";

export const config = {
  runtime: "nodejs",
  api: { bodyParser: false },
};

export async function POST(request: Request) {
  try {
    const { filePath } = await handleFileUpload(request);
    const resumeText = await extractTextFromPDF(filePath);
    await deleteFile(filePath);

    const parsedData = await analyzeResume(resumeText);
    if (!parsedData) throw new Error("AI failed to process resume");

    const developer = await saveDeveloper(parsedData);

    return NextResponse.json({
      message: "Data saved successfully",
      id: developer.id,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
