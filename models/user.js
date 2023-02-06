const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    list:[{type:String}]
});

const User = mongoose.model('user',userSchema);

module.exports = User;