const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userPage");
const IndexRoute = require("./routes/index");
const errorController = require('./controllers/error');


const app = express();
mongoose.set('strictQuery', true);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(IndexRoute);
app.use(authRoutes);
app.use(userRoutes);
app.use(errorController.get404);


const port = 3000||process.env.PORT;
mongoose.connect(process.env.DB_URI,{ useUnifiedTopology: true,useNewUrlParser: true }).then(result=>{
    console.log("connected to database");
    app.listen(port,()=>{
        console.log("runing on port 3000");
    })
}).catch(err=>{
    console.log(err);
})
