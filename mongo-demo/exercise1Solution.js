const mongosse = require("mongoose");
mongosse
  .connect("mongodb://localhost/mongo-exercises")
  .then(console.log("connecting to database ..."))
  .catch((err) => console.log("Error", err.message));

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
const Course = mongosse.model("course", courseSchema);

async function getCourses() {
  return await Course
  .find({isPuplished:true , tags:'backend'})
  .sort('name') //or sort({name:1})
  .select('name author'); //or select({name:1 ,author:1})
}//async fnc return Promise

async function run(){
    const courses = await getCourses();
    console.log(courses);
}
run();