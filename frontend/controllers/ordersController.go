package controllers

import (
	"context"
	"net/http"
	"log"
	"strconv"
	"shop_online/frontend/config"
	"shop_online/frontend/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	
)

// Mostrar el formulario de pedido para un producto específico
func ShowOrderForm(c *gin.Context) {
	log.Println("Iniciando CreateOrder")

	// Obtener el nombre del producto desde la URL
	productName := c.DefaultQuery("product_name", "")
	if productName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nombre de producto no proporcionado"})
		return
	}
	log.Println("Producto solicitado:", productName)

	// Buscar el producto en la base de datos
	collection := config.DB.Collection("products")
	var product models.Product
	err := collection.FindOne(context.Background(), bson.M{"product_name": productName}).Decode(&product)
	if err != nil {
		// Manejar el error si no se encuentra el producto
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Producto no encontrado zzzz"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener el producto"})
		}
		return
	}
	log.Println("Producto encontrado:", product)

	// Renderizar el formulario con los datos del producto
	c.HTML(http.StatusOK, "order_form.html", gin.H{"product": product})
}


// Crear un nuevo pedido
func CreateOrder(c *gin.Context) {
	log.Println("Iniciando CreateOrder")
	// Obtener los datos del formulario
	productName := c.DefaultPostForm("product_name", "") // Recuperar el nombre del producto desde el formulario
	username := c.DefaultPostForm("username", "")
	address := c.DefaultPostForm("address", "")
	quantityStr := c.DefaultPostForm("quantity", "1")

	// Validar que el nombre del producto exista
	if productName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nombre de producto no proporcionado"})
		return
	}

	// Convertir cantidad a entero
	quantity, err := strconv.Atoi(quantityStr)
	if err != nil || quantity <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cantidad inválida"})
		return
	}

	// Buscar el producto en la base de datos
	collection := config.DB.Collection("products")
	var product models.Product
	err = collection.FindOne(context.Background(), bson.M{"product_name": productName}).Decode(&product)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Producto no encontrado aaaa"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buscar el producto"})
		}
		return
	}

	// Calcular el total del pedido
	total := float64(quantity) * product.ProductPrice

	// Crear el pedido
	order := models.Order{
		ProductName: product.ProductName,
		Costumer:    username,
		Address:     address,
		Total:       total,
	}

	// Guardar el pedido en la base de datos
	orderCollection := config.DB.Collection("orders")
	_, err = orderCollection.InsertOne(context.Background(), order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear el pedido"})
		return
	}

	// Confirmar el éxito
	c.JSON(http.StatusOK, gin.H{"message": "Pedido registrado correctamente", "total": total})
}

