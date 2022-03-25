const express = require('express');
const router = express.Router();

//genres
const genres = [
    {id:1 , name:"Horro"},
    {id:2 , name:"Action"},
    {id:3 , name:"Romantic"},
    {id:4 , name:"Drama"},
]
//get request 
router.get('/' , (req,res)=>{
    res.send(`Geners ${JSON.stringify(genres)}`)
})

//get by id
router.get('/:id' , (req,res)=>{
    let genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre) res.status(404).send("Genre Id not founded");
    //if founded
    res.send(genre);
})

//post request 
router.post('/' ,(req,res)=>{
    //Validation
    let {error} = genreNameValidation(req.body);
    if(error){
        return res.send("genres Name should be a string and not empty ")
    }
    //create genre
    let genre = {
        id:genres.length+1,
        name:req.body.name
    }
    //push genre
    genres.push(genre);
    //send result in response 
    res.send(genre);
})

//put req
router.put('/:id' , (req,res)=>{
    //check id
    let genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('genres id does not exist..');
    //genre name validation
    let {error} = genreNameValidation(req.body);
    if(error) return res.send('genres Name should be a string and not empty');

    //update the genre
    genre.name = req.body.name;
    res.send(genre);
})

//delete request
router.delete('/:id' , (req,res)=>{
    //check id
    let genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('genres id does not exist..');

    //delete genre
    let index = genres.indexOf(genre);
    genres.splice(index , 1);
    //send deleted genre
    res.send(genre);
})

function genreNameValidation(reqBody){
    let schema = Joi.object({
        name:Joi.string().required()
    })
    return schema.validate(reqBody);
}

module.exports = router;