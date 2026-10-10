import { S3Client } from "@aws-sdk/client-s3";

export function getS3Client(accessUrl: string, accessKeyId: string, secretAccessKey: string) {
	return new S3Client({
		region: "auto",
		endpoint: accessUrl,
		credentials: {
			accessKeyId: accessKeyId,
			secretAccessKey: secretAccessKey,
		},
	});
}