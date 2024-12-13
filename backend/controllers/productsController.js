const Products = require('../models/productsModel');

exports.getAllProducts = async(req, res) => {
    try {
        const products = await Products.find();
        res.json(products)
    } catch (error) {
        console.error('Error al obtener los temas:', error);
        res.status(500).send('Error al obtener los temas');
    }
}

exports.createProduct = async(req, res) => {
    const { product_name, product_price } = req.body;

    if (!product_name || !product_price) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const newProduct = new Products({
        product_name,
        product_price
        })
        await newProduct.save();
} catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).send('Error al crear el producto');
}
}

exports.updateProduct = async(req, res) => {
    const { id } = req.params;
    const { product_name, product_price } = req.body;

    try {
        const updatedProduct = await Products.findByIdAndUpdate(
        id, 
        { product_name, product_price},
        { new: true } 
        ); 
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    }
    catch (error){
        console.error(error)
        res.status(500).send('Error al actualizar el producto');
}
};

exports.deleteProduct = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error){
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error al eliminar el producto');
    }
}

