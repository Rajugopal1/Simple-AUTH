const express=require("express");
const bodyParser=require("body-parser");
const session = require('express-session');
const JWT = require("jsonwebtoken");
const mongoose= require("mongoose");
const multer  = require('multer')

// const upload = multer({ dest: 'uploads/' })
const app= express();
const http = require('http').Server(app)
const io = require('socket.io')(http);

const error = require('./middlewares/error')
const Message = require('./models/chatModel')
// const registerController = require('./controllers/register');
// const login = require("./controllers/login");
// const homeController = require("./controllers/home")
// const {paramsId, headerUserId} = require('./middlewares/objectId')
// const { userAuth, isLogin } = require('./middlewares/auth');


app.post('/messages', (req, res) => {
    
    
    try{
        const message = req.body
        console.log(message);
         Message.create(message);
        io.emit('message', message);
       return res.sendStatus(200);

    }
    catch(err) {
        return res.send({message:err.message})
    }
  })

  app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })


app.use(bodyParser.json())
app.use(express())
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
))

require('./routes/routes')(app);

io.on('connection', () =>{
    console.log('a user is connected')
  })

app.listen((5000), () => {
    console.log("Listening on port 5000")
})

//create connection to connect to mongoDb:
let db = mongoose.connect('mongodb://localhost:27017/SimpleAuth',{});


 db = mongoose.connection;
//test the connection
db.on('error',()=>console.log("error in connecting to database"))
db.once('open',()=>console.log("connected to database"))

app.use(error);