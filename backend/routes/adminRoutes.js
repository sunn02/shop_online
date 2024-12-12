const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../helpers/middleware"); 
const productController = require("../controllers/productsController");


router.use(verifyAdmin); 

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);


module.exports = router;