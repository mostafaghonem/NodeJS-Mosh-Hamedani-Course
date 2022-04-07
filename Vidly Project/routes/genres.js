const auth = require('../midleware/auth');
const { Genre, validateGenre } = require('../models/genre');
const express = require('express');
const router = express.Router();



//get request
router.get('/', async(req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

//get by id
router.get('/:id', async(req, res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(400).send('the genre with the given ID not founded');
  res.send(genre);
});

//post request
//note route handler takes midleware but it's optional, so i'll add auth midlware
router.post('/',auth,async (req, res) => {
    //Validation
    let { error } = validateGenre(req.body);
    if (error) return res.send('genres Name should be a string and not empty ');

    //create genre
    let genre = new Genre({ name: req.body.name });

    //save genre
    genre = await genre.save();

    //send result in response
    res.send(genre);
  }
);

//put req
router.put('/:id', async(req, res) => {
  
  const {error} = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id , {name:req.body.name} , {new:true});
  if(!genre) return res.status(400).send('the genre with the given ID not founded');

  res.send(genre);
});

//delete request
router.delete('/:id', async(req, res) => {
  const genre  = await Genre.findByIdAndRemove(req.params.id);
  
  if(!genre) return res.status(400).send('the genre with the given ID not founded');

  res.send(genre);
});

// function genreNameValidation(reqBody) {
//   let schema = Joi.object({
//     name: Joi.string().required(),
//   });
//   return schema.validate(reqBody);
// }

module.exports = router;
