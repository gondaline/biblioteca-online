import mongoose from "mongoose";

mongoose.SchemaTypes.String.set("validate", {
    validator: (valor) => valor.trim() !== "",
    message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});