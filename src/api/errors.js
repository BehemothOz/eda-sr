export class TimeoutRequestError extends Error {
    constructor({ status, msg }) {
        super(msg);
        this.name = this.constructor.name;
        this.status = status;
    }
}
