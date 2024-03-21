export enum RepositoryErrorName {
    NO_RESULTS = 'No results'
}

export class RepositoryError extends Error
{
    name: RepositoryErrorName;
    message: string;
    cause?: any;

    constructor({
        name,
        message,
        cause
    } : {
        name: RepositoryErrorName;
        message: string;
        cause?: any;
    }) {
        super();

        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}