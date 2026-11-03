import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome da editora é obrigatório"]
    },
    pais: {
        type: String
    },
    anoFundacao: {
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 1400 && valor <= new Date().getFullYear();
            },
            message: "O ano de fundação deve estar entre 1400 e o ano atual. Valor fornecido: {VALUE}"
        }
    }
}, { versionKey: false });

const editoras = mongoose.model("editoras", editoraSchema);

export default editoras;
