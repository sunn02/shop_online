const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../helpers/middleware");
const authController = require("../controllers/authController");

router.post("/signup", authController.SignUp);
router.post("/login", authController.SignIn);

module.exports = router;