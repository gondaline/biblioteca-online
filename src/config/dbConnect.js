import mongoose from "mongoose";

async function connectDatabase() {

    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Conexão com o banco feita com sucesso!");
    } catch (error) {
        console.error("Não foi possível conectar ao banco:", error.message);
        process.exit(1);
    }

    return mongoose.connection;
}

export default connectDatabase;