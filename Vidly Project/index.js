//modules:
const config = require('config');
const express = require('express');
const { func } = require('joi');
const Joi = require('joi');
const bodyparser = require('body-parser');
const genres = require('./routes/genres');
const home = require('./routes/home')
const morgan = require('morgan');
const users = require('./routes/users');
const login = require('./routes/login');
//-----------------------------
const app = express();

//Produce an error if jwtPrivateKey env variable is not defined. before app start
if(!config.get('jwtPrivateKey')){
    console.error('FATAL Error : jwtPrivateKey is not defined');
    process.exit(1);
}

app.set('view engine' , 'pug');
app.set('views' , './views')

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(require('./midleware/logging'));
app.use(morgan('tiny'));
app.use(express.static('public')) //for static content 
app.use('/api/genres' , genres);
app.use('/api/users' , users);
app.use('/api/login' , login);
app.use('/' , home);
// ------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port , console.log(`Listening on port ${port}`));

