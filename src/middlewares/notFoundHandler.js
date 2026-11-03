import NotFoundError from "../errors/NotFoundError.js";

export default function notFoundHandler(req, res, next) {
    const error404 = new NotFoundError();
    next(error404);
}
