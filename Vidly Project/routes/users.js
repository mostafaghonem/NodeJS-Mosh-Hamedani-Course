const bcrypt = require('bcrypt');
const _ = require('lodash'); //module to treat with  objects
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already exist.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10); //generate salt to add it before each password
  user.password = await bcrypt.hash(user.password, salt); //hash each password with a different salt

  await user.save();

  //to keep user loged in after Registeration
  const token = user.generateAuthToken();
  res.header('auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
