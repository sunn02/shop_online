const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../helpers/middleware"); 
const productsController = require("../controllers/productsController");
const ordersController = require("../controllers/ordersController");


router.get("/products", verifyAdmin, productsController.getAllProducts);
router.post("/products", verifyAdmin, productsController.createProduct);
router.patch("/products/:id", verifyAdmin, productsController.updateProduct);
router.delete("/products/:id", verifyAdmin, productsController.deleteProduct);


router.get('/orders', verifyAdmin, ordersController.listOrders);


module.exports = router;