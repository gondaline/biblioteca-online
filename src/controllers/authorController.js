import NotFoundError from "../errors/NotFoundError.js";
import { Author } from "../models/index.js";

class AuthorController {

    static async listAuthors(req, res, next) {
        try {
            const authorsQuery = Author.find();

            req.result = authorsQuery;
            next();

        } catch (error) {
            next(error);
        }
    }

    static async getAuthorById(req, res, next) {
        try {
            const id = req.params.id;

            const author = await Author.findById(id);

            if (author !== null) {
                res.status(200).json(author);
            } else {
                next(new NotFoundError("Id do autor não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }

    static async createAuthor(req, res, next) {
        try {
            const author = new Author(req.body);

            const createdAuthor = await author.save();

            res.status(201).json(
                { message: "Autor cadastrado com sucesso!", author: createdAuthor });
        } catch (error) {
            next(error);
        }
    }

    static async updateAuthor(req, res, next) {
        try {
            const id = req.params.id;

            const author = await Author.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true });

            if (author !== null) {
                res.status(200).send({ message: "Autor atualizado com sucesso" });
            } else {
                next(new NotFoundError("Id do autor não localizado."));
            }

        } catch (error) {
            next(error);
        }
    }

    static async deleteAuthor(req, res, next) {
        try {
            const id = req.params.id;
            const author = await Author.findByIdAndDelete(id);

            if (author !== null) {
                res.status(200).send({ message: "Autor deletado com sucesso" });
            } else {
                next(new NotFoundError("Id do autor não localizado."));
            }

        } catch (error) {
            next(error);
        }
    }
};

export default AuthorController;
