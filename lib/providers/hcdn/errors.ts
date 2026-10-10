export class HCDNError extends Error {
    constructor(
        message: string,
        public readonly status?: number,
        public readonly code?: string
    ) {
        super(message);
        this.name = "GenericHCDNError";
    }
}

export class HCDNAuthenticationError extends HCDNError {
    constructor(message = "Invalid API key") {
        super(message, 401, "AUTHENTICATION_FAILED");
        this.name = "HCDNAuthenticationError";
    }
}