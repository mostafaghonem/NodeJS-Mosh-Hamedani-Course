const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//Schema of data that mongodb will allow the user to save it on the database
const Genre = mongoose.model('genre', genreSchema);

function validateGenre(genre) {
  //user input that i get from request body
  let schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
