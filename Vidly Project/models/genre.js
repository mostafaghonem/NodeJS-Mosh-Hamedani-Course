const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:5,
    maxlength:50
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

//Note : exports is refrence to module.exports
exports.Genre = Genre;
exports.validateGenre = validateGenre;

//or we can export with it
// module.exports={
//   Genre,
//   validateGenre
// }
