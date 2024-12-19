const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../helpers/middleware"); 
const productsController = require("../controllers/productsController");
const ordersController = require("../controllers/ordersController");
const Products = require("../models/productsModel");


router.get('/dashboard', verifyAdmin, (req, res) => {
    const token = req.query.token; 
    res.render('admin/dashboard', { token }); 
});

router.get("/products", verifyAdmin, productsController.getAllProducts);
router.post("/products", verifyAdmin, productsController.createProduct);
router.patch("/products/:id", verifyAdmin, productsController.updateProduct);
router.delete("/products/:id", verifyAdmin, productsController.deleteProduct);


router.get('/orders', verifyAdmin, ordersController.listOrders);

router.get('/products/:id/edit_form', verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;

    const productSelected = await Products.findById(id)

    res.render('admin/edit_form', { token, product: productSelected });
});

router.get('/products/create_form', verifyAdmin, async(req, res) => {
    const { token } = req.query
    
    res.render('admin/create_form', { token })
});

module.exports = router;