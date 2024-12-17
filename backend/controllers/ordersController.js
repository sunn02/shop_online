const { MongoClient } = require('mongodb');
const config = require('../config/config'); 

// Controlador para listar todos los pedidos
exports.listOrders = async (req, res) => {
    try {
        const { token } = req.query;
        
        const client = await MongoClient.connect(config.mongoUri, { dbName: config.dbName });
        const db = client.db(config.dbName); 

        const ordersCollection = db.collection('orders');
        
        const orders = await ordersCollection.find().toArray();
        
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No hay pedidos' });
        }        

        return res.render('admin/orders', { orders: orders, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los pedidos');
    }
};

