const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../helpers/middleware");
const authController = require("../controllers/authController");

router.get("/signup", (req, res) => {
    res.render("signup"); 
});

router.get("/login", (req, res) => {
    res.render("login"); 
});

router.post("/signup", authController.SignUp);
router.post("/login", authController.SignIn);

module.exports = router;