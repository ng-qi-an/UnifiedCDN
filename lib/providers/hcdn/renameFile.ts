import type { HCDNClient } from "./client";
import { HCDNAuthenticationError, HCDNError } from "./errors";

export async function renameFile(client: HCDNClient, fileId: string, newName: string) {
    const response = await client.request(`/uploads/${fileId}/rename`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ filename: newName })
    });
    if (!response.ok) {
        if (response.status == 401){
            throw new HCDNAuthenticationError();
        } else {
            throw new HCDNError("Failed to rename file", response.status, "UNKNOWN_ERROR");
        }
    } else {
        return newName;
    }
}