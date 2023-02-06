const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

const errorController = require('./controllers/error')

app.get("/",(req,res)=>{
    res.render("home/home")
})


app.use(errorController.get404);
const port = 3000||process.env.PORT;
mongoose.connect(process.env.DB_URI,{ useUnifiedTopology: true,useNewUrlParser: true }).then(result=>{
    console.log("connected to database");
    app.listen(port,()=>{
        console.log("runing on port 3000")
    })
}).catch(err=>{
    console.log(err);
})
