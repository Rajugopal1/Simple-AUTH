const { check, validationResult } = require('express-validator');
const Product = require('../models/productModel')

const validationInput = async (req) => {

    await check('name')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('name should be 3 to 20 characters').run(req);
    await check('type')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('type should be 3 to 20 characters').run(req);
    await check('quantity')
           .trim()
           .isNumeric()
           .withMessage('quantity should be number').run(req);
    await check('price')
           .trim()
           .isNumeric()
           .withMessage('price should be a number').run(req); 

}

module.exports = {
    async createProducts(req, res, next){
        const fileName = req.file.filename;
        console.log(fileName);
        try {
            await validationInput(req);
            const errors = validationResult(req)

            if (!errors.isEmpty()) return res.status(400).send(errors)
            let products = req.body;
            products = await Product.create({...products, productImage: fileName})
            return res.send(products)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await Product.find()
            res.send(products)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },
    async getproducts(req, res) {
        try {
            const id = req.params.id;
            const products = await Product.findOne({_id :id})
            res.send(products)
        } catch (error) {
            console.log(error)
            res.status(400).send({message: error.message})
        }
    },
    async updateproducts(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const products = await Product.findByIdAndUpdate(id,updateData)
            res.send(products)
        } catch (error) {
            console.log(error)
            res.status(400).send({message: error.message})
        }
    },
    async deleteproducts(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const products = await Product.findByIdAndDelete(id)
            res.send(products)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}