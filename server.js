const express=require("express");
const bodyParser=require("body-parser");
const mongoose= require("mongoose");

const app= express();


const error = require('./middlewares/error')


app.use(bodyParser.json())
app.use(express())
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
))

require('./routes/routes')(app);



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