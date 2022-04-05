const mongosse = require('mongoose');
mongosse.connect('mongodb://localhost/mongo-exercises');

//create Coures Schema
const courseSchema = new mongosse.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

//create Class Course from Course schema
const Course = mongosse.model('course', courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort('-price')
    .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}
run();
