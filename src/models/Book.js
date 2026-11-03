import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "O título do livro é obrigatório"]
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "publishers",
        required: [true, "A editora é obrigatória"]
    },
    price: { type: Number },
    pages: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 10 && value <= 5000;
            },
            message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors",
        required: [true, "O autor(a) é obrigatório"]
    }
}, { versionKey: false });

const Book = mongoose.model("books", bookSchema);

export default Book;
