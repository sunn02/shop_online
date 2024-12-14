package main

import (
    "net/http"
    "html/template"
    "shop_online/frontend/controllers" 
)

func main() {
    http.HandleFunc("/", controllers.ShowProducts) 
    http.HandleFunc("/order", controllers.ShowOrderForm) 


    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        panic(err)
    }
}

