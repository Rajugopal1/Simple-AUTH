const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const productSchema = new mongoose.Schema({
    name: {type: String, required:true} ,
    type: {type: String, required:true}, 
    quantity: {type :Number},
    price: {type: Number},
    productImage: {type: String}
})


module.exports = mongoose.model('product', productSchema)