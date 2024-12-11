require('dotenv').config({ path: './backend/.env' });
const express = require("express");
const { connectDB } = require("./config/config");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');


connectDB();

const app = express();
const port = 5000;

app.use(express.json()); 
app.use("/", authRoutes);
app.use("/admin", adminRoutes); 


app.listen(port,() => {
    console.log(`Servidor corriendo en el puerto ${port}`)
});