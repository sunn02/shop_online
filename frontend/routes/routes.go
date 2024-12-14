

package routes

import (
    "net/http"
    "shop_online/frontend/controllers"
)

func RegisterRoutes() {
    // Rutas para visualización de productos
    http.HandleFunc("/", controllers.ShowProducts)

    // Rutas para pedidos
    http.HandleFunc("/order/new", controllers.RenderOrderForm)
    http.HandleFunc("/order/create", controllers.CreateOrder)
}
