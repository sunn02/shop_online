let mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
    email: String,
    password: String
})

module.exports = mongoose.model('Users', usersSchema)