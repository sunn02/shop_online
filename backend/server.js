require('dotenv').config({ path: './backend/.env' });
const express = require("express");
const { connectDB } = require("./config/config");
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
const port = 5000;

app.use(express.json()); 
app.use("/", authRoutes);

app.listen(port,() => {
    console.log(`Servidor corriendo en el puerto ${port}`)
});