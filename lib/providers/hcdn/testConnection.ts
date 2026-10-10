import type { HCDNClient } from "./client";
import { HCDNAuthenticationError } from "./errors";

export async function testConnection(client: HCDNClient) {
    const response = await client.request("/me");
    if (!response.ok) {
        if (response.status == 401){
            throw new HCDNAuthenticationError();
        }
    } else {
        return true;
    }
}