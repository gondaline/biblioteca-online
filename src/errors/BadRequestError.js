import BaseError from "./BaseError.js";

export default class BadRequestError extends BaseError {
    constructor(message = "Um ou mais dados fornecidos estão incorretos") {
        super(message, 400);
    }
}
