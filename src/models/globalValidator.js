import mongoose from "mongoose";

mongoose.SchemaTypes.String.set("validate", {
    validator: (value) => value.trim() !== "",
    message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});
