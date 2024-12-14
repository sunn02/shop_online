package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Order representa un pedido en la tienda
type Order struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Username  string             `bson:"username"`
	Address   string             `bson:"address"`
	ProductID []string           `bson:"product_ids"`
}



