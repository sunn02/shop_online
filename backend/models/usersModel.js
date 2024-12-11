const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    } 
})

const Users = mongoose.model('User', usersSchema);

module.exports = Users;