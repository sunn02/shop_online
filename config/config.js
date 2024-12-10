const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

const dbName = 'shop_db';

async function connectDB() {
    try {
        
        await client.connect();
        console.log("Conectado a MongoDB");
        const db = client.db(dbName);
        return db
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        throw error;
    } 
}

module.exports = { connectDB };