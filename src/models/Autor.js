import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    nacionalidade: { type: String }
}, { versionKey: false });

const autores = mongoose.model("autores", autorSchema);

export { autores, autorSchema }; 