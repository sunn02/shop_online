const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; 

const dbName = 'shop_db';

async function connectToDB() {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        console.log("Conectado a MongoDB");

        const db = client.db(dbName);


    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
    } finally {
        await client.close();
    }
}

connectToDB();
