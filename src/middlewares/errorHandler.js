import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequestError from "../errors/BadRequestError.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
export default function errorHandler(error, req, res, next) { // Express error middleware: runs whenever next(error) is called
    if (error instanceof mongoose.Error.CastError) {
        new BadRequestError().sendResponse(res);

    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendResponse(res);

    } else if (error instanceof BaseError) {
        error.sendResponse(res);

    } else {
        new BaseError().sendResponse(res);
    }
}
