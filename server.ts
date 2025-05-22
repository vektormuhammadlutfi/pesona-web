import { join } from 'path';
import { fileURLToPath } from 'url';

interface Bun {
  serve: (options: {
    port: number;
    fetch: (req: Request) => Promise<Response>;
  }) => {
    stop: () => Promise<void>;
  };
  file: (filePath: string) => BunFile;
}

interface BunFile {
  text(): Promise<string>;
}

declare const Bun: Bun;

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const port = parseInt(process.env.PORT || '3000', 10);
const distDir = join(__dirname, 'dist');

Bun.serve({
  port,
  async fetch(req) {
    // Extract the path from the request URL, removing the leading slash
    const path = req.url.substring(1); 

    // Construct the full file path
    const filePath = join(distDir, path);

    try {
      const file = Bun.file(filePath);
      // Handle index.html for root requests
      if (path === "" || path === "index.html") {
        return new Response(await file.text(), {
          headers: {
            "Content-Type": "text/html"
          }
        });
      } else {
        const ext = path.split(".").pop();
        const contentType = getContentType(ext);
        return new Response(await file.text(), {
          headers: {
            "Content-Type": contentType
          }
        });
      }
    } catch (err) {
      console.error("Error serving file:", err);
      return new Response('Not Found', { status: 404 });
    }
  },
});

function getContentType(ext: string | undefined): string {
  switch (ext) {
    case "js":
      return "application/javascript";
    case "css":
      return "text/css";
    case "html":
      return "text/html";
    default:
      return "application/octet-stream";
  }
}
