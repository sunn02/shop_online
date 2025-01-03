require('dotenv').config({ path: './backend/.env' });
const express = require("express");
const methodOverride = require('method-override');
const path = require("path");
const { connectDB } = require("./config/config");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');


connectDB();

const app = express();
const port = 5000;


app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));


app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);
app.use("/admin", adminRoutes); 


app.listen(port,() => {
    console.log(`Servidor corriendo en el puerto ${port}`)
});