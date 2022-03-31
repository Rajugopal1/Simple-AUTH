const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chatSchema = new mongoose.Schema({
    name: {type: String} ,
    message: {type: String}
})


module.exports = mongoose.model('chat', chatSchema)