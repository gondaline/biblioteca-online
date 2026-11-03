import BadRequestError from "./BadRequestError.js";

export default class ValidationError extends BadRequestError {
    constructor(error) {
        const errorMessages = Object.values(error.errors)
            .map(err => err.message)
            .join("; ");

        super(`Os seguintes erros foram encontrados: ${errorMessages}`);
    }
}
