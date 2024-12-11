const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../helpers/middleware"); 
const productController = require("../controllers/productsController");


router.use(verifyAdmin); 

router.get("/admin/products", productController.getAllProducts);
router.post("/admin/products", productController.createProduct);
router.put("/admin/products/:id", productController.updateProduct);
router.delete("/admin/products/:id", productController.deleteProduct);

module.exports = router;