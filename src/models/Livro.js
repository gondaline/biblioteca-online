import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores" }
}, { versionKey: false });

const livros = mongoose.model("livros", livroSchema);

export default livros;