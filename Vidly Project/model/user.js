const PasswordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const mongoose  = require('mongoose');

//Schema of data that mongodb will allow the user to save it on the database
const User = mongoose.model('user' , new mongoose.Schema({
    name:{
        type:String ,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}));

function validateUser(user){ //user credentials that i get from request body
    let  schema = Joi.object({
        name:Joi.string().min(5).max(50),
        email:Joi.string().min(5).max(255).email(),
        password:new PasswordComplexity({
            min: 8,
            max: 1024,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4
        })
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;