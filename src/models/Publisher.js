import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O nome da editora é obrigatório"]
    },
    country: {
        type: String
    },
    foundedYear: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 1400 && value <= new Date().getFullYear();
            },
            message: "O ano de fundação deve estar entre 1400 e o ano atual. Valor fornecido: {VALUE}"
        }
    }
}, { versionKey: false });

const Publisher = mongoose.model("publishers", publisherSchema);

export default Publisher;
