package controllers

import (
	"context"
	"fmt"
	"net/http"
	"shop_online/frontend/models"
	"shop_online/frontend/config"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateOrder maneja la creación de un pedido
func CreateOrder(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// Conectar a MongoDB
		client, err := config.GetMongoClient()
		if err != nil {
			http.Error(w, "Error al conectar con la base de datos", http.StatusInternalServerError)
			return
		}
		defer client.Disconnect(context.TODO())

		// Extraer datos del formulario
		order := models.Order{
			Username:  r.FormValue("username"),
			Address:   r.FormValue("address"),
			ProductID: r.Form["product_ids"],
		}

		// Guardar en MongoDB
		collection := client.Database("shop_db").Collection("orders")
		_, err = collection.InsertOne(context.TODO(), order)
		if err != nil {
			http.Error(w, "Error al guardar el pedido", http.StatusInternalServerError)
			return
		}

		// Mostrar mensaje de éxito
		w.Write([]byte("Pedido creado correctamente"))
		return
	}

	// Si no es POST, mostrar un error
	http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
}
