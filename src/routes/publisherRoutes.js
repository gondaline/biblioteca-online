import express from "express";
import PublisherController from "../controllers/publisherController.js";
import paginate from "../middlewares/paginate.js";

const routes = express.Router();

routes.get("/publishers", PublisherController.listPublishers, paginate)
routes.get("/publishers/:id", PublisherController.getPublisherById)
routes.post("/publishers", PublisherController.createPublisher)
routes.put("/publishers/:id", PublisherController.updatePublisher)
routes.delete("/publishers/:id", PublisherController.deletePublisher)

export default routes;
