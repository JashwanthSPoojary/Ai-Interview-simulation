import fs from "fs";
import pdfParse from "pdf-parse";

export async function extractTextFromPDF(filePath: string): Promise<string> {
  const fileBuffer = await fs.promises.readFile(filePath);
  const pdfData = await pdfParse(fileBuffer);
  return pdfData.text;
}
