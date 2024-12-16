package models

// Order representa un pedido realizado por un cliente
type Order struct {
	Username  string   `json:"username"`
	Address   string   `json:"address"`
	ProductID []string `json:"product_ids"` // Asegúrate de que sea un slice de strings
}



