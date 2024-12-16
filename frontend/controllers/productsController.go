package controllers

import (
	"context"
	"log"
	"net/http"
	"time"

	"shop_online/frontend/config"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// Product representa un producto (estructurado con JSON tags)
type Product struct {
    ProductName  string  `json:"product_name" bson:"product_name"`  // Campo del producto
    ProductPrice float64 `json:"product_price" bson:"product_price"` // Precio del producto
}

// ShowProducts obtiene los productos desde la colección de MongoDB
func ShowProducts(c *gin.Context) {
	// Establecer un contexto con tiempo de espera
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Usar la conexión global a la base de datos desde config.DB
	collection := config.DB.Collection("products")

	// Obtener todos los productos de la colección
	cursor, err := collection.Find(ctx, bson.M{}) // `bson.M{}` filtra todos los documentos
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener productos"})
		return
	}
	defer cursor.Close(ctx)

	// Decodificar los productos
	var products []Product
	if err := cursor.All(ctx, &products); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al decodificar productos"})
		return
	}
	log.Printf("Número de productos obtenidos: %d", len(products))

	for _, product := range products {
		log.Printf("Producto: %s, Precio: %.2f", product.ProductName, product.ProductPrice) }

	// Responder con los productos en formato JSON
	c.HTML(http.StatusOK, "index.html", gin.H{"products": products})
}
