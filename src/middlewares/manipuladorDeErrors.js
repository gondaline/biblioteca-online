import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(erro, req, res, next) { //middleware de erro do express que será executada em toda requisição
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." })
    } else {
        res.status(500).json({ message: `${erro.message} - Erro interno do servidor` })
    }
}