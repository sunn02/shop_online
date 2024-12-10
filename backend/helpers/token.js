require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = await connectDB();
const usersCollection = db.collection("users");


exports.jwtAdmin = (roles = []) => {
  return [
     // Middleware 1: Verificar y decodificar el token JWT
    async (req, res, next) => {

      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded); 
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    },

     // Middleware 2: Verificar si el usuario es administrador
    async (req, res, next) => {
      console.log("JWT user:", req.user);  

      try {
        const db = await connectDB();
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ _id: req.user.sub });

        if (!user || (roles.length && !roles.includes(user.role))) {
          return res.status(403).json({ message: "Forbidden" });
        }


        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
          }
  
        if (user.role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        next();
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    },
  ];
};