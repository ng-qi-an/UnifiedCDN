import multer from 'multer';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express, { type Express, type Request, type Response } from 'express';
import { readFile, writeFile } from 'fs/promises';

configDotenv();
const app: Express = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

type Code = {
    id: string;
    expiresAt: string;
}

async function getCodes(): Promise<Code[]>{
    const data = await readFile("data/codes.json", "utf-8")
    try {
        return JSON.parse(data).activeCodes as Code[];
    } catch (error) {
        throw new Error("Failed to parse codes.json. Please ensure it is valid JSON.");
    }
}

async function saveCodes(codes: Code[]){
    await writeFile("data/codes.json", JSON.stringify({activeCodes: codes}, null, 2));
}

app.get('/', (req: Request, res: Response) => {
  res.send({status: "OK!"});
});

app.get("/upload/createSignedID", async(req: Request, res: Response) => {
  const apiKey = process.env.API_KEY;
  if (req.headers.authorization !== `Bearer ${apiKey}`) {
    return res.status(401).send({error: "Unauthorized"});
  }
  const codes = await getCodes();
  codes.push({
    id: crypto.randomUUID(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // Expires in 15 minutes
  });
  await saveCodes(codes.filter((code) => new Date(code.expiresAt) > new Date())); // Remove expired codes
  res.send({id: codes[codes.length - 1].id});
})

app.post("/upload/:signedId", upload.array('files[]'), async (req: Request, res: Response) => {
    console.log("Incoming request to /upload/:signedId with signedId:", req.params.signedId);
    const signedId = req.params.signedId;
    const codes = await getCodes();
    if (!req.files){
        return res.status(400).send({error: "No files provided"});
    }
    if (!codes.find((code)=> code.id == signedId)){
        return res.status(400).send({error: "Invalid signed ID"});
    } else if (codes.find((code)=> code.id == signedId && new Date(code.expiresAt) < new Date())){
        return res.status(400).send({error: "Signed ID has expired"});
    }
    try {
        const files = Array.isArray(req.files) ? req.files : [];
        if (files.length === 0) {
         return res.status(400).json({ error: 'No files provided' });
        }
        const outgoing = new FormData();
        for (const file of files) {
            const filename = file.originalname;
            outgoing.append('files[]', new Blob([new Uint8Array(file.buffer)]), filename);
        }
        const response = await fetch(`${process.env.HACKCLUB_CDN_API_URL}/uploads`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${process.env.HACKCLUB_CDN_API_KEY}` },
            body: outgoing,
        });
        const data = await response.json()
        console.log("[uploads]", data.uploads)
        const combinedUploads = [...data.uploads.map((upload: any) => ({...upload, status: "uploaded"})), ...data.failed.map((failed: any) => ({...failed, status: "failed"}))];
        const finalUploads = combinedUploads.map((upload: any) => ({
            fileName: upload.filename,
            status: upload.status,
            size: upload.size,
            contentType: upload.content_type,
            url: upload.url,
            createdAt: new Date(upload.createdAt)
        }))
        await saveCodes(codes.filter((code) => code.id != signedId && new Date(code.expiresAt) > new Date())); // Remove expired codes
        return res.json({
            status: "success",
            files: finalUploads
        })
    } catch (error) {
        console.error('CDN upload failed', error);
        return res.status(502).json({ error: 'Unable to upload files' });
    }
})

if (!process.env.OPEN_PORT) {
    console.error("OPEN_PORT is not set in the environment variables. Using default port 80.");
}
console.log("Server is running on port " + (process.env.OPEN_PORT || 80));
app.listen(process.env.OPEN_PORT || 80);