require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
console.log("MONGO_URI:", mongoUri);
console.log("DB_NAME:", dbName);
const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, { dbName });
        console.log("Conectado a MongoDB con Mongoose");

    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        throw error;
    } 
}

module.exports = { 
    connectDB,
    mongoUri: process.env.MONGO_URI,  // Exportando mongoUri
    dbName: process.env.DB_NAME  };