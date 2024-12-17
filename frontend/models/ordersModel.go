package models

type Order struct {
	ProductName string  `json:"product_name" bson:"product_name"` // Nombre del producto
	Costumer    string  `json:"costumer" bson:"costumer"`         // Nombre del cliente
	Address     string  `json:"address" bson:"address"`           // Dirección del cliente
	Total       float64 `json:"total" bson:"total"`               // Total del pedido
}
