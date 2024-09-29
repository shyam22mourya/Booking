class ExpressError extends Error {
    constructor(status, message) {
        super();  // Pass the message to the parent Error class
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError;
