const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);
const User = require("../models/userModel");

module.exports = {
    async userLogin(req, res) {
        await check('emailId')
            .notEmpty()
            .isEmail()
            .withMessage('email is not provide')
            .run(req);
        await check('password')
            .notEmpty()
            .withMessage('password is not provide')
            .run(req)


        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors);
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId});
        if (!user) return res.status(401).send('Invalid  email');
        const isAuthUser = await User.passwordCompare(password, user.password)
        if (!isAuthUser) return res.status(401).send('Invalid crendentials')
        const token = await user.generateAuthToken()
        res.send({ user: user , token:  token})
    },
}