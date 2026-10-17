import { db } from "@/lib/db";
import { InvalidConfigurationError, UnauthorisedError } from "@/lib/errors";
import { errorToResponse, verifyAPIKey } from "@/lib/permissionHelpers";
import { HCDNClient } from "@/lib/providers/hcdn/client";
import { HCDNAuthenticationError } from "@/lib/providers/hcdn/errors";
import { convertUnit } from "@/lib/unitConverter";
import { files as filesDb } from "@/lib/schema/schema";
import { generateId } from "better-auth";
import { getS3Client } from "@/lib/providers/s3/getClient";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const maxFileSize = convertUnit(0.5, "gb", "b"); // 0.5 GB in bytes
const maxFiles = 20; // Maximum number of files allowed

export const POST = verifyAPIKey(async (req, ctx, apiKey) => {
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
        console.log("Key meta", apiKey.metadata)
        const appData = await db.query.applications.findFirst({where: {id: apiKey.metadata?.appId}, with: {database: {columns: {provider: true, id: true, keys: true}}}, columns: {id: true}});
        if (!appData) {
            console.log("App data not found for API key:", apiKey.metadata?.appId);
            return errorToResponse(new UnauthorisedError());
        }
        if (appData.database?.provider == "hackclub-cdn"){
            const client = new HCDNClient(appData.database.keys.apiKey);
            try {
                const {uploads, failed} = await client.uploadFiles(files);
                const normalisedUploads: typeof filesDb.$inferInsert[] = uploads.map(upload => ({
                    id: generateId(16),
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
        } else if (appData.database?.provider == "cloudflare-r2" || appData.database?.provider == "amazon-s3") {
            const client = getS3Client(appData.database.keys.accessUrl, appData.database.keys.accessKeyId, appData.database.keys.secretAccessKey);
            const successFiles: typeof filesDb.$inferInsert[] = []
            const failedFiles: {filename: string, reason: string}[] = [];
            await Promise.all(files.map(async(file) => {
                const fileKey = generateId(16);
                try {
                    await client.send(new PutObjectCommand({
                        Bucket: appData.database!.keys.bucketName,
                        Key: `unified-cdn/${fileKey}`,
                        Body: new Uint8Array(await file.arrayBuffer()),
                        ContentType: file.type,
                    }));
                } catch (error) {
                    console.log("Error uploading file to S3:", error);
                    if (error instanceof Error) {
                        return failedFiles.push({filename: file.name, reason: error.message});
                    } else {
                        return failedFiles.push({filename: file.name, reason: 'Unknown error'});
                    }
                }
                successFiles.push({
                    id: generateId(16),
                    applicationId: appData.id,
                    databaseId: appData.database!.id,
                    key: fileKey,
                    name: file.name,
                    contentType: file.type,
                    size: file.size
                })
            }));
            if (successFiles.length === 0) {
                return errorToResponse(new InvalidConfigurationError("All file uploads failed. Please check your configuration and try again."));
            }
            await db.insert(filesDb).values(successFiles);
            return Response.json({uploads: successFiles, failed: failedFiles});
        } else {
            console.log(appData.database?.provider)
            return errorToResponse(new InvalidConfigurationError("The api key's database provider is not supported for file uploads."));
        }
    } catch (error) {
        console.error("Error processing file upload:", error);
        return errorToResponse(error);
    }
})