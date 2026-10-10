import { HCDNClient } from "./client";

export function getHCDNClient(apiKey: string) {
    return new HCDNClient(apiKey)
}