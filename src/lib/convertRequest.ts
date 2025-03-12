import { IncomingMessage } from "http";
import { Readable } from "stream";

// Define an interface that extends Readable with additional properties
interface ExtendedReadable extends Readable {
  headers: Record<string, string | string[]>;
  method: string;
  url: string;
}

export async function convertRequest(req: Request): Promise<IncomingMessage> {
  try {
    // Read the request body as an ArrayBuffer, then convert to a Node.js Buffer
    const buffer = Buffer.from(await req.arrayBuffer());

    // Create a Readable stream from the buffer
    const readable = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });

    // Cast the stream to our ExtendedReadable to add extra properties without using 'any'
    const extended = readable as ExtendedReadable;
    extended.headers = Object.fromEntries(req.headers);
    extended.method = req.method;
    extended.url = req.url;

    // Finally, cast the extended stream to IncomingMessage
    return extended as unknown as IncomingMessage;
  } catch (error) {
    console.error("Error converting request:", error);
    throw new Error("Failed to convert request"); // Rethrow or handle the error as needed
  }
}
