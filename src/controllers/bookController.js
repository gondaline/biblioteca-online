import NotFoundError from "../errors/NotFoundError.js";
import { Author, Book, Publisher } from "../models/index.js";

class BookController {

    static async listBooks(req, res, next) {
        try {
            const booksQuery = Book.find()
                .populate("author", "name")
                .populate("publisher", "name");

            req.result = booksQuery;
            next();

        } catch (error) {
            next(error);
        }
    }

    static async getBookById(req, res, next) {
        try {
            const id = req.params.id;
            const book = await Book.findById(id)
                .populate("author", "name")
                .populate("publisher", "name");

            if (book !== null) {
                res.status(200).send(book);
            } else {
                next(new NotFoundError("Id do livro não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }

    static async createBook(req, res, next) {
        try {
            const book = new Book(req.body);

            const createdBook = await book.save();

            res.status(201).json({ message: "Livro cadastrado com sucesso!", book: createdBook });
        } catch (error) {
            next(error);
        }
    }

    static async updateBook(req, res, next) {
        try {
            const id = req.params.id;

            const book = await Book.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true });

            if (book !== null) {
                res.status(200).send({ message: "Livro atualizado com sucesso" });
            } else {
                next(new NotFoundError("Id do livro não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteBook(req, res, next) {
        try {
            const id = req.params.id;

            const book = await Book.findByIdAndDelete(id);

            if (book !== null) {
                res.status(200).send({ message: "Livro removido com sucesso" });
            } else {
                next(new NotFoundError("Id do livro não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }

    static async searchBooks(req, res, next) {
        try {
            const filter = await buildSearchFilter(req.query);

            if (filter !== null) {
                const booksQuery = Book
                    .find(filter)
                    .populate("author")
                    .populate("publisher");

                req.result = booksQuery;
                next();

            } else {
                res.status(200).send([]);
            }

        } catch (error) {
            next(error);
        }
    };
};

async function buildSearchFilter(params) {
    const { publisherName, title, minPages, maxPages, authorName } = params;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };

    if (minPages || maxPages) filter.pages = {};

    if (minPages) filter.pages.$gte = minPages;
    if (maxPages) filter.pages.$lte = maxPages;

    if (authorName) {
        const author = await Author.findOne({ name: authorName });

        if (author === null) return null;

        filter.author = author._id;
    }

    if (publisherName) {
        const publisher = await Publisher.findOne({ name: publisherName });

        if (publisher === null) return null;

        filter.publisher = publisher._id;
    }

    return filter;
}

export default BookController;
