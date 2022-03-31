const express=require("express");
const bodyParser=require("body-parser");
const session = require('express-session');
const JWT = require("jsonwebtoken");
const mongoose= require("mongoose");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const error = require('../middlewares/error')
const registerController = require('../controllers/register');
const login = require("../controllers/login");
const {paramsId, headerUserId} = require('../middlewares/objectId')
const { userAuth, isLogin, verifyRoles } = require('../middlewares/auth');
// const {authRole} = require('../middlewares/verifyRoles')
const roles_list = require("../config/roles");

const productController = require('../controllers/products')
const messageControoler = require('../controllers/chat')


module.exports = (app) => {

app.post('/user/login', login.userLogin);
app.post('/user/logout',[userAuth, isLogin], login.userLogout);
app.post('/user/registration',verifyRoles(roles_list.ADMIN), registerController.createUser);
app.get('/user',[userAuth, isLogin],verifyRoles(roles_list.ADMIN), registerController.getAllUser,);
app.get('/user/:id', [userAuth, isLogin,paramsId],verifyRoles(roles_list.ADMIN), registerController.getUser);

///products
app.post('/product',upload.single('productImage'),[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.SUBADMIN),productController.createProducts)
app.get('/product',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.SUBADMIN),productController.getAllProducts)
app.get('/product/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.SUBADMIN),productController.getproducts)
app.patch('/product/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.SUBADMIN),productController.updateproducts)
app.delete('/product/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.SUBADMIN),productController.deleteproducts)

///chat
// app.post('/messages', messageControoler.sendMessage)

app.use(error);

}


