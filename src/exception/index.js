class DBProviderException {
    constructor(error, { exceptionProvider = console, ...rest } = {}) {
        this.error = error;
        this.exceptionProvider = exceptionProvider;
    }

    logException() {
        this.exceptionProvider.error(`Error: Message: ${this.error.message}, Stack => ${this.error.stack}`);
    }
}