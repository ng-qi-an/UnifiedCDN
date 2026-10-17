import type { HCDNClient } from "./client";
import { HCDNAuthenticationError, HCDNError } from "./errors";

export async function uploadFiles(client: HCDNClient, files: File[]) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files[]", file);
        });
        const response = await client.request("/uploads", {
            method: "POST",
            body: formData,
        })
        if (!response.ok) {
            if (response.status == 401){
                throw new HCDNAuthenticationError();
            } else {
                throw new HCDNError("Failed to upload files", response.status, "UNKNOWN_ERROR");
            }
        }
        const data = await response.json();
        const parsedData: {uploads: {id: string, filename: string, url: string, content_type: string, created_at: string, size:number}[], failed: {filename: string, reason: string}[]} = data;
        return parsedData;
}