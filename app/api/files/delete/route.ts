import { db } from "@/lib/db";
import { InvalidConfigurationError, UnauthorisedError } from "@/lib/errors";
import { errorToResponse, userHasPermissionServer, verifyAPIKeyOrUser } from "@/lib/permissionHelpers";
import { HCDNClient } from "@/lib/providers/hcdn/client";
import { HCDNAuthenticationError } from "@/lib/providers/hcdn/errors";
import { files as filesDb } from "@/lib/schema/schema";
import { getS3Client } from "@/lib/providers/s3/getClient";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { isCredentialError } from "@/lib/providers/s3/isCredentialError";
import { Application } from "@/lib/schema/schemaTypes";
import { and, eq, inArray } from "drizzle-orm";


export const DELETE = verifyAPIKeyOrUser(async (req, ctx, apiKey, user) => {
    try {
        const data = await req.json();
        const files = data.files as string[];
        console.log("files to delete:", files.length)
        if (files.length === 0) {
            return errorToResponse(new InvalidConfigurationError());
        }
        let appData: Pick<Application, "id"> & { database: { provider: string, id: string, keys: any | undefined } | null } | null = null;
        if (apiKey){
            appData = await db.query.applications.findFirst({where: {id: apiKey.metadata?.appId}, with: {database: {columns: {provider: true, id: true, keys: true}}}, columns: {id: true}}) ?? null;
        } else if (user){
            if (!data.appId){
                return errorToResponse(new InvalidConfigurationError("Missing appId in request body."));
            }
            const viewAllPerms = await userHasPermissionServer({applications: ['viewAll']}, user);
            appData = await db.query.applications.findFirst({where: {id: data.appId as string, ownerId: !viewAllPerms.isAuthorised ? user.id : {isNotNull: true}}, with: {database: {columns: {provider: true, id: true, keys: true}}}, columns: {id: true}}) ?? null;
        }
        if (!appData) {
            return errorToResponse(new UnauthorisedError());
        }
        const filesFromDb = await db.select({id: filesDb.id, key: filesDb.key}).from(filesDb).where(and(inArray(filesDb.id, files), eq(filesDb.applicationId, appData.id)));
        if (appData.database?.provider == "hackclub-cdn"){
            const client = new HCDNClient(appData.database.keys.apiKey);
            try {
                const {deleted, failed} = await client.deleteFiles(filesFromDb.map(f => f.key));
                if (deleted.length == 0){
                    return errorToResponse(new InvalidConfigurationError("No files were deleted. Check that the files exist in the provider."));
                }
                await db.delete(filesDb).where(inArray(filesDb.key, deleted.map(d => d.id)));
                const deletedFiles = filesFromDb.filter(f => deleted.find(d => d.id == f.key)).map(f => f.id);
                const failedFiles = filesFromDb.filter(f => failed.includes(f.key)).map(f => f.id);
                return Response.json({deleted: deletedFiles, failed: failedFiles});
            } catch (error) {
                if (error instanceof HCDNAuthenticationError){
                    return errorToResponse(new UnauthorisedError("Could not connect to database provider. Please check your database key configurations."));
                } else {
                    console.error("Error uploading files to HCDN:", error);
                    return errorToResponse(error);
                }
            }
        } else if (appData.database?.provider == "cloudflare-r2" || appData.database?.provider == "amazon-s3") {
            const client = getS3Client(appData.database.keys.accessUrl, appData.database.keys.accessKeyId, appData.database.keys.secretAccessKey);
            try {
                const response = await client.send(new DeleteObjectsCommand({
                    Bucket: appData.database!.keys.bucketName,
                    Delete: {
                        Objects: filesFromDb.map((file)=> ({Key: file.key})),
                    }
                }));
                if (!response.Deleted || response.Deleted.length == 0){
                    return errorToResponse(new InvalidConfigurationError("No files were deleted. Check that the files exist in the provider."));
                }
                const deletedFiles = filesFromDb.filter(f => response.Deleted!.find(d => d.Key == f.key)).map(f => f.id);
                await db.delete(filesDb).where(inArray(filesDb.id, deletedFiles));
                const failedFiles = filesFromDb.filter(f => !response.Deleted!.find(d => d.Key == f.key)).map(f => f.id);
                return Response.json({deleted: deletedFiles, failed: failedFiles});
            } catch (error) {
                console.log("Error uploading file to S3:", error);
                if (isCredentialError(error)){
                    return errorToResponse(new UnauthorisedError("Could not connect to database provider. Please check your database key configurations."));
                } else {
                    console.error("Error deleting files on S3:", error);
                    return errorToResponse(error);
                }
            }
        } else {
            console.log(appData.database?.provider)
            return errorToResponse(new InvalidConfigurationError("The api key's database provider is not supported for file uploads."));
        }
    } catch (error) {
        console.error("Error processing file upload:", error);
        return errorToResponse(error);
    }
})