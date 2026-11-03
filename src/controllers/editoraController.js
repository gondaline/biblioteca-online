import NaoEncontrado from "../erros/NaoEncontrado.js";
import { editoras } from "../models/index.js";

class EditoraController {

    static async listarEditoras(req, res, next) {
        try {
            const listaEditoras = editoras.find();

            req.resultado = listaEditoras;
            next();

        } catch (erro) {
            next(erro);
        }
    }

    static async listarEditoraPorId(req, res, next) {
        try {
            const id = req.params.id;

            const editoraEncontrada = await editoras.findById(id);

            if (editoraEncontrada !== null) {
                res.status(200).json(editoraEncontrada);
            } else {
                next(new NaoEncontrado("Id da Editora não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarEditora(req, res, next) {
        try {
            let editora = new editoras(req.body);

            const editoraResultado = await editora.save();

            res.status(201).json(
                { message: "Editora cadastrada com sucesso!", editora: editoraResultado });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarEditora(req, res, next) {
        try {
            const id = req.params.id;

            const editoraResultado = await editoras.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true });

            if (editoraResultado !== null) {
                res.status(200).send({ message: "Editora atualizada com sucesso" });
            } else {
                next(new NaoEncontrado("Id da Editora não localizado."));
            }

        } catch (erro) {
            next(erro);
        }
    }

    static async deletarEditora(req, res, next) {
        try {
            const id = req.params.id;
            const editoraResultado = await editoras.findByIdAndDelete(id);

            if (editoraResultado !== null) {
                res.status(200).send({ message: "Editora deletada com sucesso" });
            } else {
                next(new NaoEncontrado("Id da Editora não localizado."));
            }

        } catch (erro) {
            next(erro);
        }
    }
};

export default EditoraController;
