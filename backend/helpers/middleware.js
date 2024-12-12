require('dotenv').config({ path: './backend/.env' });
const jwt = require("jsonwebtoken");
const Users = require('../models/usersModel');

exports.verifyAdmin = async (req, res, next) => {
  try {
        // Middleware 1: Verificar y decodificar el token JWT
        const token = req.query.token;

        if (!token) {
          return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log(decoded)
          
          const user = await Users.findById(decoded.sub);
          console.log(user)
          // Middleware 2: Verificar si el usuario es administrador

          if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: You are not authorized" });
          }

          req.user = user;
          return next(); 

    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
  }
