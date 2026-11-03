import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, editoras, livros } from "../models/index.js";

class LivroController {

    static async listarLivros(req, res, next) {
        try {
            const buscaLivros = livros.find()
                .populate("autor", "nome")
                .populate("editora", "nome");
            req.resultado = buscaLivros;
            next();

        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const livroResultado = await livros.findById(id)
                .populate("autor", "nome")
                .populate("editora", "nome");

            if (livroResultado !== null) {
                res.status(200).send(livroResultado);
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
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

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true });

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro atualizado com sucesso" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndDelete(id);

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro removido com sucesso" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivrosPorFiltro(req, res, next) {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const livrosResultado = livros
                    .find(busca)
                    .populate("autor")
                    .populate("editora");

                req.resultado = livrosResultado;
                next();
        
            } else {
                res.status(200).send([]);
            }

        } catch (erro) {
            next(erro);
        }
    };
};

async function processaBusca(parametros) {
    const { nomeEditora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

    let busca = {};

    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

    if (minPaginas || maxPaginas) busca.paginas = {};

    if (minPaginas) busca.paginas.$gte = minPaginas;
    if (maxPaginas) busca.paginas.$lte = maxPaginas;

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });

        if (autor === null) return null;

        busca.autor = autor._id;
    }

    if (nomeEditora) {
        const editora = await editoras.findOne({ nome: nomeEditora });

        if (editora === null) return null;

        busca.editora = editora._id;
    }

    return busca;
}

export default LivroController;