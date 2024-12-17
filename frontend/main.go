package main

import (
    "github.com/gin-gonic/gin"
    "shop_online/frontend/config"     
    "shop_online/frontend/controllers" 
)

func main() {
    config.ConnectMongo()
    r := gin.Default()
    r.Static("/static", "./static")
    r.LoadHTMLGlob("templates/*")
    r.GET("/", controllers.ShowProducts)
    r.GET("/order/create", controllers.ShowOrderForm)  // Mostrar el formulario
    r.POST("/order/create", controllers.CreateOrder)  // Crear el pedido

    err := r.Run(":8080")
    if err != nil {
        panic(err)
    }
}

