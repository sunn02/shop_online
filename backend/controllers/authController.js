require('dotenv').config({ path: './backend/.env' });
const jwt = require("jsonwebtoken");
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const Users = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const window = new JSDOM('').window;
const purify = DOMPurify(window);

exports.SignUp = async(req, res) => {
    try{
        const username = purify.sanitize(req.body.username);
        const password = purify.sanitize(req.body.password);

        const user = await Users.findOne({ username });
        if (user){
            return res.status(409).json({ error: "El usuario ya existe" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await new Users({
                username: username,
                password: hashedPassword,
            });
            await newUser.save();

            return res.status(201).json({
                message: "User created successfully",
                user: { username: username } 
        }); 
        }
    }
    catch (error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.SignIn = async(req, res) => {
    const username = purify.sanitize(req.body.username);
    const password = purify.sanitize(req.body.password);
    console.log("Datos recibidos del cliente:", { username, password });

    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }

    try {
        const user = await Users.findOne({ username })
        console.log(`User: ${user.username}`);
        console.log(`Password entered: ${password}`);
        console.log(`Password stored: ${user.password}`);
        if (user) {  
            const isPasswordValid = await bcrypt.compare(password, user.password); 
            console.log(`Is password valid: ${isPasswordValid}`);
            console.log(`User role: ${user.role}`);

            if (isPasswordValid){
                if (user.role == 'admin' ){
                    const token = jwt.sign(
                        { sub: user.id, role: user.role }, process.env.JWT_SECRET, {
                            expiresIn: "7d", }
                    );
                    res.redirect(`/admin/products?token=${encodeURIComponent(token)}`);
                }
            } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } 

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



