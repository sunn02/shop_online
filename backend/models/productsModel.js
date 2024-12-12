const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    product_name:{
        type: String,
        required: true,
        unique: true,
    },
    product_price: {
        type: Number,
        required: true,
    }
})

const Products = mongoose.model('Product', productsSchema);

module.exports = Products;