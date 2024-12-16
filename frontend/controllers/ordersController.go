package controllers

import (
	"context"
	"net/http"
	"shop_online/frontend/config"
	"shop_online/frontend/models"

	"github.com/gin-gonic/gin"
)

// CreateOrder maneja la creación de un pedido
func CreateOrder(c *gin.Context) {
	// Conectar a MongoDB
	
	client, err := config.GetMongoClient()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al conectar con la base de datos"})
		return
	}
	defer client.Disconnect(context.TODO())

	// Extraer datos del cuerpo de la solicitud
	var order models.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos del pedido inválidos"})
		return
	}

	// Guardar el pedido en MongoDB
	collection := client.Database("shop_db").Collection("orders")
	_, err = collection.InsertOne(context.TODO(), order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar el pedido"})
		return
	}

	// Mostrar mensaje de éxito
	c.JSON(http.StatusOK, gin.H{"message": "Pedido creado correctamente"})
}

