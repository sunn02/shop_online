package config

import (
    "context"
    "log"
    "time"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectMongo() {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017") 
    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal("Error al conectar con MongoDB:", err)
    }

    // Verificar la conexión
    err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal("Error al hacer ping en MongoDB:", err)
    }

    log.Println("Conexión exitosa a MongoDB")

    DB = client.Database("shop_db") // Cambia el nombre de la base de datos si es necesario
}
