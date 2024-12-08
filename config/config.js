const { MongoClient } = require('mongodb');

// URL de conexión a MongoDB (ajusta según tu configuración)
const uri = "mongodb://localhost:27017";  // Cambia según tu configuración de MongoDB Compass

// Nombre de la base de datos a la que quieres conectarte
const dbName = 'shop_db';

async function connectToDB() {
    const client = new MongoClient(uri);

    try {
        // Conectarse a MongoDB
        await client.connect();

        console.log("Conectado a MongoDB");

        // Obtener la base de datos
        const db = client.db(dbName);


    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
    } finally {
        await client.close();
    }
}

connectToDB();
