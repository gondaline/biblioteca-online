import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O nome do(a) autor(a) é obrigatório"]
    },
    nationality: {
        type: String
    }
}, { versionKey: false });

const Author = mongoose.model("authors", authorSchema);

export default Author;
