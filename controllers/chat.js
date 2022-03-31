// const { check, validationResult } = require('express-validator');
// const Message = require('../models/chatModel')
// const express=require("express");
// const app= express();
// const http = require('http').Server(app)
// const io = require('socket.io')(http);

// io.on('connection', () =>{
//     console.log('a user is connected')
//   })

// module.exports = {
//     async sendMessage(req, res){
       
//        try{
//         var message = new Message(req.body);
//         message.create((err) =>{
//           if(err)
//             sendStatus(500);
//           io.emit('message', req.body);
//           res.sendStatus(200);
//         })

//        } 
//        catch(err) {
//          return  res.send({message: err.message})
//        }
//     }
// }