package controllers

import (
    "html/template"
    "net/http"
    "shop_online/frontend/models"
    "shop_online/frontend/config"
)

// ShowProducts muestra todos los productos disponibles
func ShowProducts(w http.ResponseWriter, r *http.Request) {
    // Obtener productos desde la base de datos
    products, err := models.GetAllProducts(database.DB)
    if err != nil {
        http.Error(w, "Error al obtener los productos", http.StatusInternalServerError)
        return
    }

    // Renderizar la página principal con los productos
    tmpl, err := template.ParseFiles("templates/index.html")
    if err != nil {
        http.Error(w, "Error al cargar la plantilla", http.StatusInternalServerError)
        return
    }

    tmpl.Execute(w, products)
}
