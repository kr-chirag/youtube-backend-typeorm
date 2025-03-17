export class CustomError extends Error {
    statusCode: number;
    field?: string;
    constructor(statusCode: number, message: string, field?: string) {
        super(message);
        this.statusCode = statusCode;
        this.field = field;
    }

    get error() {
        return {
            message: this.message,
            field: this.field,
        };
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string, field?: string) {
        super(400, message || "Bad Request", field);
    }
}

export class AuthError extends CustomError {
    constructor() {
        super(403, "access denied");
    }
}
