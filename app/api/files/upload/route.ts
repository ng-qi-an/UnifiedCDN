import { db } from "@/lib/db";
import { InvalidConfigurationError, UnauthorisedError } from "@/lib/errors";
import { errorToResponse, verifyAPIKey } from "@/lib/permissionHelpers";
import { HCDNClient } from "@/lib/providers/hcdn/client";
import { HCDNAuthenticationError } from "@/lib/providers/hcdn/errors";
import { convertUnit } from "@/lib/unitConverter";
import { files as filesDb } from "@/lib/schema/schema";
import { NextRequest } from "next/server";
import { generateId } from "better-auth";

const maxFileSize = convertUnit(1, "gb", "b"); // 1 GB in bytes
const maxFiles = 20; // Maximum number of files allowed

export const GET = verifyAPIKey(async (req, ctx, apiKey) => {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];
        if (files.length === 0) {
            return errorToResponse(new InvalidConfigurationError());
        }
        if (files.length > maxFiles){
            return errorToResponse(new InvalidConfigurationError("You can only upload a maximum of 20 files at a time."));
        }
        if (files.some(file => file.size > maxFileSize)) {
            return errorToResponse(new InvalidConfigurationError("One or more files exceed the maximum allowed size of 1 GB."));
        }
        const appData = await db.query.applications.findFirst({where: {id: apiKey.metadata?.appid}, with: {database: {columns: {provider: true, id: true}}}, columns: {id: true}});
        if (!appData) {
            return errorToResponse(new UnauthorisedError());
        }
        if (appData.database?.provider == "hackclub-cdn"){
            const client = new HCDNClient(apiKey.key);
            try {
                const {uploads, failed} = await client.uploadFiles(files);
                const normalisedUploads = uploads.map(upload => ({
                    id: generateId(),
                    applicationId: appData.id,
                    databaseId: appData.database!.id,
                    key: upload.id,
                    name: upload.filename,
                    contentType: upload.content_type,
                    size: upload.size
                }))
                await db.insert(filesDb).values(normalisedUploads);
                return Response.json({uploads: normalisedUploads, failed});
            } catch (error) {
                if (error instanceof HCDNAuthenticationError){
                    return errorToResponse(new UnauthorisedError());
                } else {
                    console.error("Error uploading files to HCDN:", error);
                    return errorToResponse(error);
                }
            }
        } else {
            return errorToResponse(new InvalidConfigurationError("The api key's database provider is not supported for file uploads."));
        }
    } catch (error) {
        console.error("Error processing file upload:", error);
        return errorToResponse(error);
    }
})