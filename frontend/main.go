package main

import (
    "github.com/gin-gonic/gin"
    "shop_online/frontend/config"     
    "shop_online/frontend/controllers" 
)

func main() {
    config.ConnectMongo()
    r := gin.Default()
    r.LoadHTMLGlob("templates/*")
    r.GET("/products", controllers.ShowProducts)
    r.POST("/order", controllers.CreateOrder)

    err := r.Run(":8080")
    if err != nil {
        panic(err)
    }
}

