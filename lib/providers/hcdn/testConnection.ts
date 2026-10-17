import type { HCDNClient } from "./client";
import { HCDNAuthenticationError, HCDNError } from "./errors";

export async function testConnection(client: HCDNClient) {
    const response = await client.request("/me");
    if (!response.ok) {
        if (response.status == 401){
            throw new HCDNAuthenticationError();
        } else {
            throw new HCDNError("Failed to test connection", response.status, "UNKNOWN_ERROR");
        }
    } else {
        return true;
    }
}