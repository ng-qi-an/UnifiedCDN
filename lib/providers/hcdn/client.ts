import { testConnection } from "./testConnection";

export class HCDNClient {
    constructor (private readonly apiKey: string, private readonly baseUrl: string = "https://cdn.hackclub.com/api/v4") {}
    async request(path: string, options: RequestInit = {}) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${this.apiKey}`,
            },
        });
        return response;
    }
    async testConnection(){
        return testConnection(this);
    }
}
