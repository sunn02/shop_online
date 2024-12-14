const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  products: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true
    },
    quantity: { type: Number, required: true, default: 1 } 
  }],
  adress: { 
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  order_date: { type: Date, default: Date.now }, 
  state: { 
    type: String, 
    enum: ['Pending', 'Delivered', 'Cancelled'], 
    default: 'Pending'
  }
});

module.exports = mongoose.model('Order', orderSchema);
