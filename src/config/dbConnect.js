import mongoose from "mongoose";

async function connectDataBase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default connectDataBase;