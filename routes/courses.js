const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'OOP' },
  { id: 2, name: 'DS' },
  { id: 3, name: 'ALGO' },
];

router.get('/', (req, res) => {
  res.send(`Courses : ${JSON.stringify(courses)}`);
});

//route parameter
router.get('/:id', (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Course Id is out of range');
  } else {
    res.send(course);
  }
});
//Note - the colon : indicate that it's a paramter
router.get('/:year/:month', (req, res) => {
  res.send(req.params);
});

//Note : paramter that come after ? is a query param that query data from dataBase
router.get('/', (req, res) => {
  res.send(req.query); //get /api/posts?sortBy=name
});

//Post request
//with input validation
router.post('/', (req, res) => {
  //Validation
  let { error } = courseNameValidation(req.body);
  if (error) {
    return res.send('Course name should be string and minimum 3 char');
  }
  //if input is valid
  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  //save the created course
  courses.push(course);
  res.send(course);
});

//Put request
router.put('/:id', (req, res) => {
  //check if courses exist or not
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Course is not Exist');
  }
  //validation Fnc
  let { error } = courseNameValidation(req.body); //{error} === result.error this is called Obj destruction
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

//Delete request
router.delete('/:id', (req, res) => {
  //check if courses exist or not
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Course is not Exist');
  }

  let index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

//Validation Fnc
function courseNameValidation(reqBody) {
  let schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  //note : schema.validate return error or value
  return schema.validate(reqBody);
}

module.exports = router;
