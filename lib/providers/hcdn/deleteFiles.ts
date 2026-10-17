import type { HCDNClient } from "./client";
import { HCDNAuthenticationError, HCDNError } from "./errors";

export async function deleteFiles(client: HCDNClient, fileIds: string[]) {
        const response = await client.request("/uploads/batch", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ids: fileIds }),
        })
        if (!response.ok) {
            if (response.status == 401){
                throw new HCDNAuthenticationError();
            } else {
                throw new HCDNError("Failed to delete files", response.status, "UNKNOWN_ERROR");
            }
        }
        const data = await response.json();
        const parsedData: {deleted: {id: string, filename: string}[], failed: string[]} = {deleted: data.deleted, failed: data.not_found || []};
        return parsedData;
}