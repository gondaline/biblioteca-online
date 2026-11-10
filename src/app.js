import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const connection = await connectDatabase();

connection.on("error", (error) => console.error("Erro de conexão", error));

const app = express();
routes(app);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;