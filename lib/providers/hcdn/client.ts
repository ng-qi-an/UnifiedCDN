import { deleteFile } from "./deleteFile";
import { deleteFiles } from "./deleteFiles";
import { renameFile } from "./renameFile";
import { testConnection } from "./testConnection";
import { uploadFiles } from "./uploadFiles";

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
    async uploadFiles(files: File[]) {
        return uploadFiles(this, files);
    }
    async renameFile(fileId: string, newName: string) {
        return renameFile(this, fileId, newName);
    }
    async deleteFile(fileId: string) {
        return deleteFile(this, fileId);
    }
    async deleteFiles(fileIds: string[]) {
        return deleteFiles(this, fileIds);
    }
}
