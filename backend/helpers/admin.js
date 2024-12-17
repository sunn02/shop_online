const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('../models/usersModel');

const saltRounds = 10; 
const username = 'Paula';  
const password = 'admin123';  
const role = 'admin';  

mongoose.connect('mongodb://localhost:27017/shop_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
        console.log('El usuario admin ya existe.');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Users({
        username,
        password: hashedPassword,
        role
    });

    await newUser.save();
    console.log('Usuario Admin creado exitosamente.');
})
.catch(err => {
    console.error('Error al conectar a MongoDB:', err);
})
.finally(() => {
    mongoose.connection.close();
});
