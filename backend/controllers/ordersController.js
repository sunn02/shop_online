const { MongoClient } = require('mongodb');
const config = require('../config/config'); 

// Controlador para listar todos los pedidos
exports.listOrders = async (req, res) => {
    try {
        // Conectar a la base de datos usando la configuración definida en config/mongodb.js
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(config.DB_NAME); 

        // Acceder a la colección de pedidos
        const ordersCollection = db.collection('Order');
        
        // Obtener todos los pedidos de la colección
        const orders = await ordersCollection.find().toArray();
        
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No hay pedidos' });
        }

        // Renderizar la vista 'admin/orders' con los pedidos obtenidos
        return res.render('admin/orders', { orders: orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los pedidos');
    }
};

