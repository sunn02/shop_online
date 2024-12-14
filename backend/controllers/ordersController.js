const Order = require('../models/ordersModel'); 

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email') 
      .populate('products.id', 'name price'); 

    res.status(200).json({
      message: 'Órdenes obtenidas exitosamente',
      orders,
    });
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).json({ message: 'Error al obtener las órdenes', error });
  }
};
