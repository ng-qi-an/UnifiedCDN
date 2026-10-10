export abstract class CustomHttpError extends Error {
  abstract readonly status_code: number

  constructor(message: string) {
    super(message)
  }
}

export class UnauthorisedError extends CustomHttpError  {
    readonly status_code = 401;
    constructor(message = "You are unauthorised to perform this action.") {
        super(message)
        this.name = 'UnauthorisedError'
    }
}

export class InsufficientPermissionsError extends CustomHttpError  {
    readonly status_code = 403;
    constructor(message = "You do not have the permissions to perform this action.") {
        super(message)
        this.name = 'InsufficientPermissionsError'
    }
}

