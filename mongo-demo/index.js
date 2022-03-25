const { func } = require('joi');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('connecting to database ....'))
.catch(err=> console.log('Error' , err.message));

const courseSchema = new mongoose.Schema({
    //Monogdb data validation
    name:{
        type : String ,
        required:true,
        minlength:5,
        maxlength:255
    },
    category:{
        type:String,
        required:true,
        enum:['web' , 'mobile' , 'network'],
        lowercase:true
    },
    author : String,
    tags : {
        //Custom validator
        type: Array,
        validate:{//we use custom validator by define validate property and validator fnc in it and an optional message
            isAsync:true, //for Async validator
            validator:function(v){ //parameter here is the pathed array of tags
                return new Promise((resolve)=>{
                    //some aysnc operations
                    setTimeout(()=>{
                        resolve(v && v.length>0) ;
                    },4000)
                })
            },
            message:'a course should have at least one tag'
        }
    },
    date : {type:Date , default:Date.now},
    isPuplished : Boolean,
    price:{
        type:Number,
        required:function(){return this.isPuplished;} ,//Note :here we can not use arrow fnc as does not have its own this
        //in normal this operator point to the holder of this fnc  , like    here point to the course
        min:10 ,
        max:200
    }
})

//Note : Class vs Obj : obj is an instance of class 
//if class is Human , then obj is Mostafa for example
//so , to create a Class of Course Schema you need to compile this schema as model
//create a class from courseSchema
const Course  = mongoose.model('course' , courseSchema);


async function createCourse(){
    //create Obj of Class Course
    const course = new Course({
        // name : 'React Course',
        category:'web',
        author:'Mosh',
        tags:[],
        isPuplished:true,
        // price:10
    })
    try{
        const result = await course.save();
        console.log(result);
    }
    catch(err){
        console.log('Error:',err.message);
    }
}
createCourse();


//Comparison query Operators
//eq (equal)
//ne (Not equal)
//gt (greater than)
//gte (greater than or equal)
//lt (less than)
//lte (less than or rqual)
//in
//nin (not in)

//Logical Operator
//or
//and

//Regular Expression (regex)
//string start wiht Mosh => /^Mosh/
//string end with Mosh   => /Mosh$/
//string have Mosh       => /.*Mosh.*/  , .* means zero or more chars
//case insenstive        => i

//Pagination
const pageNumber  = 2;
const pageSize = 10;

async function getCourses(){
    const course = await Course
    .find({autor:'Mosh' , isPuplished:true}) //here find and other fncs take a filter this filter is obj
    // .find({price : { $gt:10 , $ls : 20 }})
    // .find({price : { $in : [10,20,30]}}) //here how we can use comparison operator

    // .find()                                        //
    // .or([{author: 'Mosh'} , { isPuplished:true}]) //here we use find empty to use logical operator or , here is oring between array filters(Objs)
    // .and([{},{}]) // this same as find({ , }) only

//     .find({author : /^Mosh/i})
//     .find({author : /Hamedani$/i})
//     .find({author : /.*Mosh.*/i})
    
    // .skip((pageNumber-1)*pageSize)//
    // .limit(pageSize)              //this is Pagination
    .limit(10)
    .sort({name:1}) //1 = assending order , -1= dessending oreder
    .select({name:1 , tags:1})
    .count(); //to count number of courses in db
    console.log(course);
}
// getCourses();


//first approach
// async function updateCourse(id){
//     const course = await Course.findById(id);
//     if(!course) return;
//     if(course.isPuplished) return;
//     course.isPuplished = true;
//     course.author = 'another author';
//     const result = await course.save();
//     console.log(result);
// }

//second approach
async function updateCourse(id){
    //here will return a result
    //course.update() first argument is a filter
    // const result = await Course.update({_id:id} , {
    //     //here we'll use mongodb update Operator
    //     $set:{
    //         author:'Mosh',
    //         isPuplished:false
    //     }
    // });
    // console.log(result);

    //here will return the original document
    // const coures = await Course.findByIdAndUpdate(id , {
    //     //here we'll use mongodb update Operator
    //     $set:{
    //         author:'Mosh',
    //         isPuplished:true
    //     }
    // });

    // //here will return the updated document
    const coures = await Course.findByIdAndUpdate(id , {
        //here we'll use mongodb update Operator
        $set:{
            author:'Mosh',
            isPuplished:false
        }
    } , {new:true}); //the third argument is for return the updated document
    console.log(coures);
    
}
// updateCourse('62164638cd4429dc15752be3');

async function deleteCourse(id){
    const result = await Course.deleteOne({_id:id});
    console.log(result);
}
// deleteCourse('62164638cd4429dc15752be3');

