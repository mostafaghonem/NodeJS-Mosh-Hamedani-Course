const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();

//get request
router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

//get by id
router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer)
		return res
			.status(400)
			.send('the Customer with the given ID not founded');
	res.send(customer);
});

//post request
//note route handler takes midleware but it's optional, so i'll add auth midlware
router.post('/', auth, async (req, res) => {
	//Validation
	let { error } = validateCustomer(req.body);
	if (error)
		return res.send('Customer Name should be a string and not empty ');

	//create customer
	let customer = new Customer({
		name: req.body.name,
		phone: req.body.number,
		isGold: req.body.isGold,
	});

	//save genre
	customer = await customer.save();

	//send result in response
	res.send(customer);
});

//put req
router.put('/:id', async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
		{ new: true }
	);
	if (!customer) return res.status(400).send('the Customer with the given ID not founded');

	res.send(customer);
});

//delete request
router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);

	if (!customer) return res.status(400).send('the Customer with the given ID not founded');

	res.send(customer);
});

module.exports = router;
