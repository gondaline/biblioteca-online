import livros from "../models/Livro.js";

class LivroController {

    static async listarLivros(req, res, next) {
        try {            
            const listaLivros = await livros.find()
                .populate("autor")

            res.status(200).json(listaLivros);
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findById(id)
                .populate("autor", "nome");

            res.status(200).json(livroEncontrado);
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarLivro(req, res, next) {
        try {
            let livro = new livros(req.body);

            const livroResultado = await livro.save();

            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: livroResultado });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).json({ message: "livro atualizado!" });
        } catch (erro) {
            next(erro);
        }
    }

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livros.findByIdAndDelete(id);
            res.status(200).json({ message: "livro deletado com sucesso!" });
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivrosPorEditora(req, res, next) {
        const paramEditora = req.query.editora;
        try {
            const livrosPorEditora = await livros.find({ editora: paramEditora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            next(erro);
        }
    }
};

export default LivroController;