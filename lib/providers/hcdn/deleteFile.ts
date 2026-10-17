import type { HCDNClient } from "./client";
import { HCDNAuthenticationError, HCDNError } from "./errors";

export async function deleteFile(client: HCDNClient, fileId: string) {
    const response = await client.request(`/upload/${fileId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        if (response.status == 401){
            throw new HCDNAuthenticationError();
        } else {
            throw new HCDNError("Failed to delete file", response.status, "UNKNOWN_ERROR");
        }
    } else {
        return true;
    }
}