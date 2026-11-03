import express from "express";
import books from "./bookRoutes.js";
import authors from "./authorRoutes.js";
import publishers from "./publisherRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send({
        message: "API Biblioteca Online",
        routes: ["/books", "/books/search", "/authors", "/publishers"]
    }));
    app.use(express.json(), books, authors, publishers)
};

export default routes;
