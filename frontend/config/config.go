package config

import (
	"context"
	"fmt"
	"log"
	"time"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Variable global para la base de datos
var DB *mongo.Database
var client *mongo.Client

// ConnectMongo establece la conexión a la base de datos MongoDB
func ConnectMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Establecer opciones de conexión
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Error al conectar con MongoDB:", err)
	}

	// Verificar la conexión
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Error al hacer ping en MongoDB:", err)
	}

	log.Println("Conexión exitosa a MongoDB")
	DB = client.Database("shop_db") // Usar la base de datos "shop_db"
}

// GetMongoClient obtiene el cliente de MongoDB
func GetMongoClient() (*mongo.Client, error) {
	if client == nil {
		return nil, fmt.Errorf("MongoDB cliente no está inicializado")
	}
	return client, nil
}

// GetDatabase obtiene la base de datos
func GetDatabase() *mongo.Database {
	return DB
}

