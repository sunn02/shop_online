require('dotenv').config({ path: './backend/.env' });
const jwt = require("jsonwebtoken");
const Users = require('../models/usersModel');

exports.verifyAdmin = (roles = []) => {
  return async (req, res, next) => {
        // Middleware 1: Verificar y decodificar el token JWT
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
          return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await Users.findById(decoded.sub);

          // Middleware 2: Verificar si el usuario es administrador
          if (user && user.role === 'admin') {
            req.user = user;
            return next(); 
          } 
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
  }
}