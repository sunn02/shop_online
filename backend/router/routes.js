const express = require("express");
const router = express.Router();
const { jwt } = require("../helpers/jwt");
const Role = require("../helpers/role")
const Controller = require("../controllers/controller");

router.post("/signup", Controller.SignUp);
router.post("/login", loginLimiter, Controller.SignIn);
router.post("/logout", Controller.LogOut);