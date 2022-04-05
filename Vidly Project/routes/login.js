const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

// mongoose.connect('mongodb://localhost/users')
// .then(()=> console.log('connecting to database ....'))
// .catch(err=> console.log('Error' , err.message));

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid Username or Password');

  const validUser = bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).send('Invalid Username or Password');

  //JSON web Token .sign(payload : which is a unique propertoes to the user , PrivateKey that will use to encrypt)
  //note : the generated token will have 2 payload first is the _id and second is iat : is the epoch time is the time that token generated
  //hint : you should not include the jwtPrivateKey in your source code
  const token = user.generateAuthToken();
  //to keep user loged in after Registeration
  res.header('auth-token', token).send(token);
});

function validate(req) {
  let schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
