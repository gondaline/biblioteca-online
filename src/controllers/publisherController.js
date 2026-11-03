import NotFoundError from "../errors/NotFoundError.js";
import { Publisher } from "../models/index.js";

class PublisherController {

    static async listPublishers(req, res, next) {
        try {
            const publishersQuery = Publisher.find();

            req.result = publishersQuery;
            next();

        } catch (error) {
            next(error);
        }
    }

    static async getPublisherById(req, res, next) {
        try {
            const id = req.params.id;

            const publisher = await Publisher.findById(id);

            if (publisher !== null) {
                res.status(200).json(publisher);
            } else {
                next(new NotFoundError("Id da editora não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }

    static async createPublisher(req, res, next) {
        try {
            const publisher = new Publisher(req.body);

            const createdPublisher = await publisher.save();

            res.status(201).json(
                { message: "Editora cadastrada com sucesso!", publisher: createdPublisher });
        } catch (error) {
            next(error);
        }
    }

    static async updatePublisher(req, res, next) {
        try {
            const id = req.params.id;

            const publisher = await Publisher.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true });

            if (publisher !== null) {
                res.status(200).send({ message: "Editora atualizada com sucesso" });
            } else {
                next(new NotFoundError("Id da editora não localizado."));
            }

        } catch (error) {
            next(error);
        }
    }

    static async deletePublisher(req, res, next) {
        try {
            const id = req.params.id;
            const publisher = await Publisher.findByIdAndDelete(id);

            if (publisher !== null) {
                res.status(200).send({ message: "Editora deletada com sucesso" });
            } else {
                next(new NotFoundError("Id da editora não localizado."));
            }

        } catch (error) {
            next(error);
        }
    }
};

export default PublisherController;
