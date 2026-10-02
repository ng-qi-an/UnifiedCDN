import { configDotenv } from "dotenv";
import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";

export default async function setupProject(){
    configDotenv();
    if (!process.env.HACKCLUB_CDN_API_KEY) {
        throw new Error("HACKCLUB_CDN_API_KEY is not set in the environment variables.");
    }
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is not set in the environment variables.");
    }
    try {
        await readFile("data/codes.json")
    } catch (error) {
        if (error instanceof Error && error.message.includes("ENOENT")) {
            await mkdir("data", { recursive: true });
            await writeFile("data/codes.json", JSON.stringify({ activeCodes: [] }, null, 2));
        } else {
            throw error;
        }
    }
}

setupProject()