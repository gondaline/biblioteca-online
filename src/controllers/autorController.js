import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

    static async listarAutores(req, res, next) {
        try {
            const listaAutores = autores.find()

            req.resultado = listaAutores;
            next();
            
        } catch (erro) {
            next(erro);
        }
    }

    static async listarAutorPorId(req, res, next) {
        try {
            const id = req.params.id;

            const autorEncontrado = await autores.findById(id);

            if (autorEncontrado !== null) {
                res.status(200).json(autorEncontrado);
            } else {
                next(new NaoEncontrado(`Id do Autor não localizado.`));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarAutor(req, res, next) {
        try {
            let autor = new autores(req.body);

            const autorResultado = await autor.save()

            res.status(201).json(
                { message: "Autor cadastrado com sucesso!", autor: autorResultado });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarAutor(req, res, next) {
        try {
            const id = req.params.id;

            const autorResultado = await autores.findByIdAndUpdate(id, req.body);

            if (autorResultado !== null) {
                res.status(200).send({ message: "Autor atualizado com sucesso" });
            } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
            }

        } catch (erro) {
            next(erro);
        }
    }

    static async deletarAutor(req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findByIdAndDelete(id);

            if (autorResultado !== null) {
                res.status(200).send({ message: "Autor deletado com sucesso" });
            } else {
                next(new NaoEncontrado("Id do Autor não localizado."));
            }

        } catch (erro) {
            next(erro);
        }
    }
};

export default AutorController;