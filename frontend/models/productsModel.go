package models


type Product struct {
    ProductName  string  `json:"product_name" bson:"product_name"`
    ProductPrice float64 `json:"product_price" bson:"product_price"`
}