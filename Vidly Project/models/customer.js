const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
	isGold: {
		type: Boolean,
        default:false
	},
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	phone: {
		type: String,
		required: true,
        minlength:5,
        maxlength:50
	},
});

const Customer = mongoose.model('customer' , customerSchema);

function validateCustomer(reqBody){
    const schema = Joi.object({
        isGold:Joi.boolean(),
        name:Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(5).max(50).required()
    });
    return schema.validate(reqBody);
}

module.exports = {
    Customer,
    validateCustomer
}