

# Proyecto: Tienda Online

Este proyecto contiene dos componentes principales:  
1. **Backend (Panel de Administración)**: Maneja la lógica del servidor, rutas de la aplicación y CRUD de productos.  
2. **Frontend (Tienda Online)**: Muestra la interfaz de usuario para que los pingüinos puedan ver productos y realizar pedidos.



## Descripción del Proyecto

### **Panel de Administración (Backend)**
- **Login**: Paula puede iniciar sesión utilizando un token JWT en la ruta `http://localhost:5000/login`.  
- **CRUD de productos**: Paula puede crear, leer, actualizar y eliminar productos.  
- **Visualización de pedidos**: Paula puede ver todos los pedidos realizados por los pingüinos.

### **Tienda Online (Frontend)**  
- **Mostrar productos**: Los pingüinos pueden ver todos los productos disponibles en `http://localhost:8080/`.  
- **Crear pedidos**: Los pingüinos pueden realizar pedidos enviando su dirección y seleccionando productos.  



## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente: 
- **Node.js** (para el backend) → [Descargar Node.js](https://nodejs.org/)  
- **Go** (para el frontend) → [Descargar Go](https://golang.org/dl/)  
- **Git** (para clonar el repositorio) → [Descargar Git](https://git-scm.com/)  



## Clonar el Repositorio

Clona este repositorio en tu máquina local usando el siguiente comando:

```bash
git clone https://github.com/sunn02/shop_online
cd shop_online
```



## Backend: Configuración y Ejecución (Panel de Administración)

El backend proporciona las rutas necesarias para manejar el login, CRUD de productos y visualizar pedidos.

### 🚀 Pasos para Ejecutar el Backend

1. Accede a la carpeta del backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor backend:
   ```bash
   npm run dev
   ```

4. El servidor se ejecutará en el puerto **5000**.  

- Para acceder al **Panel de Administración** (login de Paula), ingresa a:  
  [http://localhost:5000/login](http://localhost:5000/login)  

- Las rutas para el CRUD y gestión de pedidos estarán disponibles a partir de este servidor.  



## Frontend: Configuración y Ejecución (Tienda Online)

El frontend está desarrollado con **Go, HTML y CSS** y se comunica con el servidor backend para mostrar productos y procesar pedidos.

### 🚀 Pasos para Ejecutar el Frontend

1. Accede a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias del frontend:
   ```bash
   go mod tidy
   ```

3. Ejecuta el servidor local:
   ```bash
   go run main.go
   ```

4. El servidor del frontend se ejecutará en el puerto **8080**.  

- Para acceder a la **Tienda Online** y ver los productos disponibles, ingresa a:  
  [http://localhost:8080/](http://localhost:8080/)



## Verificar Funcionamiento

1. **Backend**: Accede al panel de administración en `http://localhost:5000/login`.  

2. **Frontend**: Accede a la tienda online en `http://localhost:8080/`.  

3. **Pruebas**:  
   - La lista de productos debería aparecer en el frontend.  
   - El botón **"Pedir"** permite a los pingüinos realizar pedidos.  
   - Paula puede acceder al panel de administración usando su token JWT para gestionar los productos.



¡Listo! Ahora puedes configurar y ejecutar ambos servidores. 🚀
