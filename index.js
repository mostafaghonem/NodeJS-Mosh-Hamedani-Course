//Modules:
//--------
const Logger = require("./logger");
// const config = require('config');
const debug = require('debug')('app:debug')
// const startupDebuger = require('debug')('app:startup'); //set in console with set DEBUG=app:startup
// const dbDebuger = require('debug')('app:db');//set in console with set DEBUG=app:db ,, Note: DEBUG is an environment Variable
//and we can enable debug for all nameSpaces with set DEBUG=app:*
//and for multiple nameSpaces with set DEBUG=app:satrtup,db
//and we can set DEBUG and run the app at the same time : DEBUG=app:db nodemon index.js
const http = require("http");
const { consumers } = require("stream");
// const EventEmitter = require('events')
//Create Server with Express (route handler)
const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
const courses = require('./routes/courses');
const home = require('./routes/home.js');
// ============================================
// ============================================

// function sayHello(name){
//     console.log(`Hello ${name}`);
// }

// sayHello("Mostafa Ghonem");
// // global.console.log("HII")

// console.log(log);
// log("Hello Message");
// =================================================
//Event Module:

// //create Obj from class EventEmitter
// const emitter = new EventEmitter();

// //add Listener
// emitter.addListener("messageLogged" , (eventArg)=>{
//     console.log("the Emitt message released" , eventArg)
// })

// //Raise an event : (emitt means that produce a signal )
// //and pass a data with that event
// emitter.emit("messageLogged" , {id:1 , url:'http://something'});
// =========================================================
//Event Module: release emitt from another module

const { join } = require("path/posix");
const { restart } = require("nodemon");
//create Obj from class Logger
const logger = new Logger();

//add Listener
logger.addListener("messageLogged", (eventArg) => {
  console.log("the Emitt message released", eventArg);
});

//Release Emitter with call log method
logger.log("Emitt to the listner from a class");

//============================================================
//http module :

//old method
// const server = http.createServer();
// server.addListener('connection' , ()=>{
//     console.log("New Connection...")
// })

//another method
// const server = http.createServer((req,res)=>{
//     if(req.url ==='/'){
//         res.write("Hello World");
//         res.end();
//     }
// });

// server.listen(3000);
// console.log("Server Listen on port 3000....")
// ============================================================
//create an app from express fnc
const app = express();

//Environment
//we can know the current env by this
console.log(process.env.NODE_ENV);
//or by
console.log(app.get("env"));
//and we can set cuurent env in console by set NODE_ENV=anyThing

//template engine : create dynamic html and return it to the client intead return JSON
app.set('view engine' , 'pug');
app.set('views' , './views');//default

app.use(express.json()); //this a midleware

//body-parser : parses incoming requests bodies in a midleware before your handler available under req.body
// (parses the JSON , buffer , string and URLencoded data that submitted using HTTP post request)
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

//url encoded midleware (to make the app can read the url ecoded requests)
//but first we must use body-parser backage
// app.use(express.urlencoded({extended:true}));

//configuration
// console.log(`application name ${config.get("name")}`);
// console.log(`mail Server ${config.get('mail.host')}`);


//Morgan to print logs in console
if (app.get('env') === 'devolpment') {
  app.use(morgan("tiny")); //tiny is a format and there is others
  // startupDebuger('Morgan Enabled...');
  debug('Morgan Enabled...');
}

// //Db work..
// dbDebuger('Connected to Database.....')

//midleware for static content in public folder
app.use(express.static("public")); //localhost:3000/readMe.txt or any static content

//Logging in console midleware
app.use(require("./midleware/logging"));

//Authenticating in console midlewre
app.use(require("./midleware/authenticating"));

app.use('/api/courses' , courses);

//route handler with express also is a Midleware 
app.use('/' , home);
// =============================================================

//note : env is the current process's environment and we can set it's Variabels with SET
//ex: in console : set PORT = anyPortNumber
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
